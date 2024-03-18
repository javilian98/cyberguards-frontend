import {
  BuildingAccessLogAPIResponse,
  // BuildingAccessLogs,
  EmployeeListItem,
  PCAccessLogAPIResponse,
  // PCAccessLogs,
  ProxyLogAPIResponse,
  // ProxyLogs,
} from "@/types/types";
import { create } from "zustand";

export const employeesData: EmployeeListItem[] = [
  {
    id: "1",
    firstName: "James",
    lastName: "Meadows",
    businessUnit: "Wealth Management",
    riskScore: 80,
    offenceLogCount: 5,
  },
  {
    id: "2",
    firstName: "Denise",
    lastName: "Munoz",
    businessUnit: "Technology & Ops",
    riskScore: 50,
    offenceLogCount: 1,
  },
  {
    id: "3",
    firstName: "Victor",
    lastName: "Ezell",
    businessUnit: "Wealth Management",
    riskScore: 30,
    offenceLogCount: 2,
  },
];

// const buildingAccessLogsData: BuildingAccessLogs[] = [
//   {
//     logId: "1",
//     employeeId: "1",
//     accessDateTime: "2 Mar 2024, 8:13am",
//     direction: "IN",
//     status: "Success",
//     officeLocation: "Singapore",
//     suspectType: 1,
//   },
//   {
//     logId: "2",
//     employeeId: "1",
//     accessDateTime: "2 Mar 2024, 4:30pm",
//     direction: "OUT",
//     status: "Success",
//     officeLocation: "Singapore",
//     suspectType: 1,
//   },
//   {
//     logId: "3",
//     employeeId: "1",
//     accessDateTime: "22 Feb 2024, 4:37am",
//     direction: "IN",
//     status: "Success",
//     officeLocation: "Singapore",
//     suspectType: 1,
//   },
//   {
//     logId: "4",
//     employeeId: "1",
//     accessDateTime: "22 Feb 2024, 12:30pm",
//     direction: "OUT",
//     status: "Success",
//     officeLocation: "Singapore",
//     suspectType: 1,
//   },
//   {
//     logId: "5",
//     employeeId: "2",
//     accessDateTime: "4 Feb 2024, 2:37am",
//     direction: "IN",
//     status: "Success",
//     officeLocation: "Singapore",
//     suspectType: 1,
//   },
//   {
//     logId: "6",
//     employeeId: "2",
//     accessDateTime: "4 Feb 2024, 10:30am",
//     direction: "OUT",
//     status: "Success",
//     officeLocation: "Singapore",
//     suspectType: 1,
//   },
// ];

// const pcAccessLogsData: PCAccessLogs[] = [
//   {
//     logId: "1",
//     employeeId: "1",
//     accessDateTime: "21 Feb 2024, 4:30pm",
//     logOnOff: "Log On",
//     machineName: "PC_1",
//     machineLocation: "Singapore",
//     suspectType: 0,
//   },
//   {
//     logId: "1",
//     employeeId: "1",
//     accessDateTime: "21 Feb 2024, 7:30pm",
//     logOnOff: "Log Off",
//     machineName: "PC_1",
//     machineLocation: "Singapore",
//     suspectType: 0,
//   },
//   {
//     logId: "pc2",
//     employeeId: "1",
//     accessDateTime: "17 Feb 2024, 4:30pm",
//     logOnOff: "Log On",
//     machineLocation: "Singapore",
//     machineName: "PC_2",
//     suspectType: 0,
//   },
//   {
//     logId: "pc2",
//     employeeId: "1",
//     accessDateTime: "17 Feb 2024, 7:30pm",
//     logOnOff: "Log Off",
//     machineLocation: "Singapore",
//     machineName: "PC_2",
//     suspectType: 0,
//   },
// ];

// const proxyLogsData: ProxyLogs[] = [
//   {
//     logId: "px1",
//     employeeId: "1",
//     accessDateTime: "17 Feb 2024, 7:30pm",
//     machineName: "PC_1",
//     url: "https://www.careers.sl",
//     category: "Finance, Insurance",
//     bytesIn: 3373816,
//     bytesOut: 2406833,
//     suspectType: 6,
//   },
//   {
//     logId: "px2",
//     employeeId: "3",
//     accessDateTime: "5 Jan 2024, 12:39pm",
//     machineName: "PC_1",
//     url: "https://www.careers.sl",
//     category: "Community and Society, Philanthropy",
//     bytesIn: 963286,
//     bytesOut: 4987004,
//     suspectType: 6,
//   },
// ];

// // Combine and flatten the arrays
// const combinedLogsData: (BuildingAccessLogs | PCAccessLogs | ProxyLogs)[] = [
//   ...buildingAccessLogsData,
//   ...pcAccessLogsData,
//   ...proxyLogsData,
// ];

interface ThreatStore {
  employees: EmployeeListItem[];
  setEmployees: (items: EmployeeListItem[]) => void;
  // currentSelectedEmployee: EmployeeListItem | undefined;
  // setCurrentSelectedEmployee: (item: EmployeeListItem) => void;
  // resetCurrentSelectedEmployee: () => void;

  // logType: string;
  // setLogType: (value: string) => void;
  // resetLogType: () => void;

  // logs: (BuildingAccessLogs | PCAccessLogs | ProxyLogs)[];
  // setLogs: (logs: BuildingAccessLogs[] | PCAccessLogs[] | ProxyLogs[]) => void;

  logs: (
    | BuildingAccessLogAPIResponse
    | PCAccessLogAPIResponse
    | ProxyLogAPIResponse
  )[];
  setLogs: (
    logs:
      | BuildingAccessLogAPIResponse[]
      | PCAccessLogAPIResponse[]
      | ProxyLogAPIResponse[]
  ) => void;

  // currentSelectedLog: BuildingAccessLogs | PCAccessLogs | ProxyLogs | undefined;
  // setCurrentSelectedLog: (
  //   item: BuildingAccessLogs | PCAccessLogs | ProxyLogs | undefined
  // ) => void;
  // resetCurrentSelectedLog: () => void;
}

// const initCurrentSelectedEmployee: EmployeeListItem = {
//   id: "",
//   firstName: "",
//   lastName: "",
//   businessUnit: "",
//   riskScore: 0,
//   // offenceLogCount: 0,
// };

export const useThreatStore = create<ThreatStore>((set) => ({
  employees: [],
  setEmployees: (items: EmployeeListItem[]) =>
    set(() => ({ employees: items })),
  // currentSelectedEmployee: initCurrentSelectedEmployee,
  // setCurrentSelectedEmployee: (item: EmployeeListItem) =>
  //   set(() => ({ currentSelectedEmployee: item })),
  // resetCurrentSelectedEmployee: () =>
  //   set(() => ({ currentSelectedEmployee: initCurrentSelectedEmployee })),

  // logType: "",
  // setLogType: (value: string) => set(() => ({ logType: value })),
  // resetLogType: () => set(() => ({ logType: "" })),

  // logs: combinedLogsData,
  // setLogs: (items: BuildingAccessLogs[] | PCAccessLogs[] | ProxyLogs[]) =>
  //   set(() => ({ logs: items })),

  logs: [],
  setLogs: (
    items:
      | BuildingAccessLogAPIResponse[]
      | PCAccessLogAPIResponse[]
      | ProxyLogAPIResponse[]
  ) => set(() => ({ logs: items })),

  // currentSelectedLog: undefined,
  // setCurrentSelectedLog: (
  //   item: BuildingAccessLogs | PCAccessLogs | ProxyLogs | undefined
  // ) => set(() => ({ currentSelectedLog: item })),
  // resetCurrentSelectedLog: () => set(() => ({ currentSelectedLog: undefined })),
}));
