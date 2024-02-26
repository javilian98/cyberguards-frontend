import { UserListItem, UserDetail } from "@/types/types";
import { formatDateTime } from "@/utils/utils";
import axios from "axios";

const usersApi = axios.create({
  baseURL: "http://localhost:10001",
});

export const getUserList = async (): Promise<UserListItem[]> => {
  try {
    const response = await usersApi.get("/api/users");

    const newResponseData = response.data.map((item: UserListItem) => {
      return {
        ...item,
        lastAccessAt: formatDateTime(item.lastAccessAt),
      };
    });

    return newResponseData;
  } catch (error) {
    throw new Error("Failed to fetch cases: " + error);
  }
};

export const getUser = async (id: string): Promise<UserDetail> => {
  try {
    const response = await usersApi.get(`/api/users/${id}`);

    const newResponseData: UserDetail = response.data;

    const userDetailData = {
      ...newResponseData,
      lastAccessAt: formatDateTime(newResponseData.lastAccessAt),
    };

    return userDetailData;
  } catch (error) {
    throw new Error("Failed to fetch case detail: " + error);
  }
};

// export const createCase = async (
//   caseItem: Omit<CaseDetail, "id">
// ): Promise<CaseDetail> => {
//   try {
//     const response = await casesApi.post("/api/cases", caseItem);

//     return response.data;
//   } catch (error) {
//     throw new Error("Failed to create case: " + error);
//   }
// };

// export const updateCase = async (
//   caseItem: Omit<CaseDetail, "id">,
//   id: string
// ): Promise<CaseDetail> => {
//   try {
//     const response = await casesApi.put(`/api/cases/${id}`, caseItem);

//     return response.data;
//   } catch (error) {
//     throw new Error("Failed to update case: " + error);
//   }
// };

export const deleteUser = async (id: string): Promise<void> => {
  try {
    const response = await usersApi.delete(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create case: " + error);
  }
};
