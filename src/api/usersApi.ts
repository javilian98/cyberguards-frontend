import { UserListItem, UserDetail } from "@/types/types";
import { formatDateTime } from "@/utils/utils";
import axios from "axios";

export const usersApi = axios.create({
  baseURL: "http://localhost:10001",
});

type GetUserListArgs = {
  roleId?: number;
  skip?: number;
  take?: number;
};
export const getUserList = async ({
  roleId = undefined,
  skip = 0,
  take = 10,
}: GetUserListArgs = {}): Promise<UserListItem[]> => {
  try {
    const response = await usersApi.get("/api/users", {
      params: {
        roleId,
        skip,
        take,
      },
    });

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

export const deleteUser = async (id: string): Promise<void> => {
  try {
    const response = await usersApi.delete(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create case: " + error);
  }
};
