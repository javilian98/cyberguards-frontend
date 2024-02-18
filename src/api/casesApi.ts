import { Case, CaseDetail } from "@/types/types";
import { formatDateTime } from "@/utils/utils";
import axios from "axios";

const casesApi = axios.create({
  baseURL: "http://localhost:10000",
});

export const getCaseList = async (): Promise<Case[]> => {
  try {
    const response = await casesApi.get("/api/cases");

    const newResponseData = response.data.map((item: Case) => {
      return {
        ...item,
        createdAt: formatDateTime(item.createdAt),
        assignee: "-",
      };
    });

    return newResponseData;
  } catch (error) {
    throw new Error("Failed to fetch cases: " + error);
  }
};

export const getCase = async (id: string): Promise<CaseDetail> => {
  try {
    const response = await casesApi.get(`/api/cases/${id}`);

    const newResponseData: CaseDetail = response.data;

    const caseDetailData = {
      ...newResponseData,
      createdAt: formatDateTime(newResponseData.createdAt),
      assignee: "-",
    };

    return caseDetailData;
  } catch (error) {
    throw new Error("Failed to fetch case detail: " + error);
  }
};

export const createCase = async (
  caseItem: Omit<CaseDetail, "id">
): Promise<CaseDetail> => {
  try {
    const response = await casesApi.post("/api/cases", caseItem);

    return response.data;
  } catch (error) {
    throw new Error("Failed to create case: " + error);
  }
};

export const updateCase = async (
  caseItem: Omit<CaseDetail, "id">,
  id: string
): Promise<CaseDetail> => {
  try {
    const response = await casesApi.put(`/api/cases/${id}`, caseItem);

    return response.data;
  } catch (error) {
    throw new Error("Failed to update case: " + error);
  }
};

export const deleteCase = async (id: string): Promise<void> => {
  try {
    const response = await casesApi.delete(`/api/cases/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create case: " + error);
  }
};