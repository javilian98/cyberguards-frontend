import {
  ThreatDetail,
  ThreatDetailAPIResponse,
  ThreatListItem,
} from "@/types/types";
import axios from "axios";

export const bffApi = axios.create({
  baseURL: "http://localhost:9999",
});

export const getThreatList = async (): Promise<ThreatListItem[]> => {
  try {
    const response = await bffApi.get("/api/threats");

    const responseData = response.data;
    // const newResponseData = response.data.map((item: ThreatListItem) => {
    //   return {
    //     ...item,
    //     createdAt: formatDateTime(item.createdAt),
    //     assigneeId: item.assigneeId,
    //     assignee: item.assignee?.fullName ? item.assignee?.fullName : null,
    //   };
    // });

    return responseData;
  } catch (error) {
    throw new Error("Failed to fetch cases: " + error);
  }
};

export const getThreatByEmployeeId = async (
  employeeId: string
): Promise<ThreatDetail> => {
  try {
    const response = await bffApi.get(`/api/threats/employee/${employeeId}`);

    const responseData: ThreatDetailAPIResponse = response.data;

    const responseDataFormatted: ThreatDetail = {
      id: responseData.id.toString(),
      employeeId: responseData.employeeId.toString(),
      riskScore: responseData.riskScore,
      offenceLogCount: responseData.offenceLogCount,
      employeeInfo: {
        businessUnit: responseData.employeeInfo.business_unit,
        firstname: responseData.employeeInfo.firstname,
        lastname: responseData.employeeInfo.lastname,
      },
      logs: {
        buildingAccess: responseData.logs.buildingAccess,
        pcAccess: responseData.logs.pcAccess,
        proxy: responseData.logs.proxy,
      },
    };

    return responseDataFormatted;
  } catch (error) {
    throw new Error("Failed to fetch cases: " + error);
  }
};

export const getNewThreat = async (): Promise<ThreatListItem[]> => {
    try {
      const response = await bffApi.get("/api/threats/generate");
  
      const responseData = response.data;
      // const newResponseData = response.data.map((item: ThreatListItem) => {
      //   return {
      //     ...item,
      //     createdAt: formatDateTime(item.createdAt),
      //     assigneeId: item.assigneeId,
      //     assignee: item.assignee?.fullName ? item.assignee?.fullName : null,
      //   };
      // });
  
      return responseData;
    } catch (error) {
      throw new Error("Failed to fetch cases: " + error);
    }
  };