import { Case } from "@/types/types";
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
        created_at: formatDateTime(item.created_at),
        assignee: "-",
      };
    });

    return newResponseData;
  } catch (error) {
    throw new Error("Failed to fetch cases: " + error);
  }
};
