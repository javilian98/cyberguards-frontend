import { Case, CaseDetail } from "@/types/types";
import { formatDateTime } from "@/utils/utils";
import axios from "axios";

export const bffApi = axios.create({
  baseURL: "http://localhost:9999",
});

export const getCaseList = async (): Promise<Case[]> => {
  try {
    const response = await bffApi.get("/api/cases");

    const newResponseData = response.data.map((item: Case) => {
      return {
        ...item,
        createdAt: formatDateTime(item.createdAt),
        assignee: item.assignee?.fullName ? item.assignee?.fullName : null,
      };
    });

    return newResponseData;
  } catch (error) {
    throw new Error("Failed to fetch cases: " + error);
  }
};

export const getCase = async (id: string): Promise<CaseDetail> => {
  try {
    const response = await bffApi.get(`/api/cases/${id}`);

    const newResponseData: CaseDetail = response.data;

    console.log("GET CASEEE ", newResponseData);

    const caseDetailData = {
      ...newResponseData,
      createdAt: formatDateTime(newResponseData.createdAt),
      assignee: {
        fullName: newResponseData.assignee?.fullName
          ? newResponseData.assignee?.fullName
          : null,
      },
    };

    return caseDetailData;
  } catch (error) {
    throw new Error("Failed to fetch case detail: " + error);
  }
};

export const createCase = async (
  caseItem: Omit<CaseDetail, "id" | "assignee">
): Promise<CaseDetail> => {
  try {
    const caseItemFormatted = {
      title: caseItem.title,
      description: caseItem.description,
      riskScore: caseItem.riskScore,
      riskStatus: caseItem.riskStatus,
      assigneeId: "Alice Doe",
      threatPageUrl: caseItem.threatPageUrl,
    };
    const response = await bffApi.post("/api/cases", caseItemFormatted);

    return response.data;
  } catch (error) {
    throw new Error("Failed to create case: " + error);
  }
};

export const updateCase = async (
  caseItem: Omit<CaseDetail, "id" | "assignee">,
  id: string
): Promise<CaseDetail> => {
  try {
    const response = await bffApi.put(`/api/cases/${id}`, caseItem);

    return response.data;
  } catch (error) {
    throw new Error("Failed to update case: " + error);
  }
};

export const deleteCase = async (id: string): Promise<void> => {
  try {
    const response = await bffApi.delete(`/api/cases/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create case: " + error);
  }
};
