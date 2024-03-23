import { UserListItem, UserDetail } from "@/types/types";
import { axiosBFFService } from "@/utils/baseApi";
import { formatDateTime } from "@/utils/utils";


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
    const response = await axiosBFFService.get("/api/users", {
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
    const response = await axiosBFFService.get(`/api/users/${id}`);

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

export const getUserByEmail = async (email: string): Promise<UserDetail> => {
  try {
    const response = await axiosBFFService.get(`/api/users/email/${email}`);

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

export const createUser = async (
  userItem: Omit<
    UserDetail,
    "id" | "lastAccessAt" | "riskStatus" | "riskScore" | "suspectCaseId"
  >
): Promise<UserDetail> => {
  try {
    const userItemFormatted = {
      firstName: userItem.firstName,
      lastName: userItem.lastName,
      email: userItem.email,
      profession: userItem.profession,
      roleId: userItem.roleId,
      riskStatus: "low",
      riskScore: 0,
      suspectCaseId: 0,
    };
    const response = await axiosBFFService.post("/api/users", userItemFormatted);

    return response.data;
  } catch (error) {
    throw new Error("Failed to create user: " + error);
  }
};

export const updateUser = async (
  userItem: Omit<
    UserDetail,
    "id" | "lastAccessAt" | "riskStatus" | "riskScore" | "suspectCaseId"
  >,
  id: string
): Promise<UserDetail> => {
  try {
    const userItemFormatted = {
      firstName: userItem.firstName,
      lastName: userItem.lastName,
      email: userItem.email,
      profession: userItem.profession,
      roleId: userItem.roleId,
      riskStatus: "low",
      riskScore: 0,
      suspectCaseId: 0,
    };
    const response = await axiosBFFService.put(`/api/users/${id}`, userItemFormatted);

    return response.data;
  } catch (error) {
    throw new Error("Failed to update user: " + error);
  }
};

export const deleteUser = async (id: string): Promise<void> => {
  try {
    const response = await axiosBFFService.delete(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create case: " + error);
  }
};
