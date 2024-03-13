import {
  BuildingAccessLogs,
  EmployeeListItem,
  PCAccessLogs,
  ProxyLogs,
} from "@/types/types";
import { create } from "zustand";

export const employeesData: EmployeeListItem[] = [
  {
    id: "1",
    firstName: "James",
    lastName: "Meadows",
    businessUnit: "Wealth Management",
    riskScore: 80,
    totalOffences: 5,
  },
  {
    id: "2",
    firstName: "Denise",
    lastName: "Munoz",
    businessUnit: "Technology & Ops",
    riskScore: 50,
    totalOffences: 1,
  },
  {
    id: "3",
    firstName: "Victor",
    lastName: "Ezell",
    businessUnit: "Wealth Management",
    riskScore: 30,
    totalOffences: 2,
  },
];

const buildingAccessLogsData: BuildingAccessLogs[] = [
  {
    logId: "b1",
    employeeId: "1",
    accessDateTime: "2 Mar 2024",
    officeLocation: "Singapore",
    details: {
      accessIn: {
        accessDateTime: "2024-03-02 08:13:23.000000",
        direction: "IN",
        status: "Success",
        officeLocation: "Singapore",
        suspectType: 0,
      },
      accessOut: {
        accessDateTime: "2024-03-02 16:30:23.000000",
        direction: "OUT",
        status: "Success",
        officeLocation: "Singapore",
        suspectType: 0,
      },
    },
  },
  {
    logId: "b2",
    employeeId: "1",
    accessDateTime: "22 Feb 2024",
    officeLocation: "Singapore",
    details: {
      accessIn: {
        accessDateTime: "2024-02-22 04:37:55.000000",
        direction: "IN",
        status: "Success",
        officeLocation: "Singapore",
        suspectType: 0,
      },
      accessOut: {
        accessDateTime: "2024-02-22 12:30:49.000000",
        direction: "OUT",
        status: "Success",
        officeLocation: "Singapore",
        suspectType: 0,
      },
    },
  },
  {
    logId: "b3",
    employeeId: "2",
    accessDateTime: "4 Feb 2024",
    officeLocation: "Singapore",
    details: {
      accessIn: {
        accessDateTime: "2024-02-04 02:37:55.000000",
        direction: "IN",
        status: "Success",
        officeLocation: "Singapore",
        suspectType: 0,
      },
      accessOut: {
        accessDateTime: "2024-02-04 10:30:49.000000",
        direction: "OUT",
        status: "Success",
        officeLocation: "Singapore",
        suspectType: 0,
      },
    },
  },
  {
    logId: "b4",
    employeeId: "3",
    accessDateTime: "19 Feb 2024",
    officeLocation: "Singapore",
    details: {
      accessIn: {
        accessDateTime: "2024-02-19 05:37:55.000000",
        direction: "IN",
        status: "Success",
        officeLocation: "Singapore",
        suspectType: 0,
      },
      accessOut: {
        accessDateTime: "2024-02-19 09:30:49.000000",
        direction: "OUT",
        status: "Success",
        officeLocation: "Singapore",
        suspectType: 0,
      },
    },
  },
];

const pcAccessLogsData: PCAccessLogs[] = [
  {
    logId: "pc1",
    employeeId: "1",
    accessDateTime: "21 Feb 2024",
    machineLocation: "Singapore",
    machineName: "PC_1",
    details: {
      logOn: {
        accessDateTime: "2024-02-21 16:30:49.000000",
        status: "Log On",
        machineName: "PC_1",
        machineLocation: "Singapore",
        suspectType: 0,
      },
      logOff: {
        accessDateTime: "2024-02-21 19:30:49.000000",
        status: "Log Off",
        machineName: "PC_1",
        machineLocation: "Singapore",
        suspectType: 0,
      },
    },
  },
  {
    logId: "pc2",
    employeeId: "1",
    accessDateTime: "17 Feb 2024",
    machineLocation: "Singapore",
    machineName: "PC_2",
    details: {
      logOn: {
        accessDateTime: "2024-02-17 16:30:49.000000",
        status: "Log On",
        machineName: "PC_2",
        machineLocation: "Singapore",
        suspectType: 0,
      },
      logOff: {
        accessDateTime: "2024-02-17 19:30:49.000000",
        status: "Log Off",
        machineName: "PC_2",
        machineLocation: "Singapore",
        suspectType: 0,
      },
    },
  },
];

const proxyLogsData: ProxyLogs[] = [
  {
    logId: "px1",
    employeeId: "1",
    accessDateTime: "17 Feb 2024",
    bytesIn: 3373816,
    bytesOut: 2406833,
    details: {
      accessDateTime: "2024-02-17 19:30:49.000000",
      machineName: "PC_1",
      url: "https://www.careers.sl",
      category: "Finance, Insurance",
      bytesIn: 3373816,
      bytesOut: 2406833,
      suspectType: "6",
    },
  },
  {
    logId: "px2",
    employeeId: "3",
    accessDateTime: "5 Jan 2024",
    bytesIn: 963286,
    bytesOut: 4987004,
    details: {
      accessDateTime: "2024-01-05 12:39:24.000000",
      machineName: "PC_1",
      url: "https://www.careers.sl",
      category: "Community and Society, Philanthropy",
      bytesIn: 963286,
      bytesOut: 4987004,
      suspectType: "6",
    },
  },
];

// Combine and flatten the arrays
const combinedLogsData: (BuildingAccessLogs | PCAccessLogs | ProxyLogs)[] = [
  ...buildingAccessLogsData,
  ...pcAccessLogsData,
  ...proxyLogsData,
];

interface ThreatStore {
  employees: EmployeeListItem[];
  setEmployees: (items: EmployeeListItem[]) => void;
  currentSelectedEmployee: EmployeeListItem | undefined;
  setCurrentSelectedEmployee: (item: EmployeeListItem) => void;
  resetCurrentSelectedEmployee: () => void;

  logType: string;
  setLogType: (value: string) => void;
  resetLogType: () => void;

  logs: (BuildingAccessLogs | PCAccessLogs | ProxyLogs)[];
  setLogs: (logs: BuildingAccessLogs[] | PCAccessLogs[] | ProxyLogs[]) => void;
  currentSelectedLog: BuildingAccessLogs | PCAccessLogs | ProxyLogs | undefined;
  setCurrentSelectedLog: (
    item: BuildingAccessLogs | PCAccessLogs | ProxyLogs | undefined
  ) => void;
  resetCurrentSelectedLog: () => void;
}

const initCurrentSelectedEmployee: EmployeeListItem = {
  id: "",
  firstName: "",
  lastName: "",
  businessUnit: "",
  riskScore: 0,
  totalOffences: 0,
};

export const useThreatStore = create<ThreatStore>((set) => ({
  employees: employeesData,
  setEmployees: (items: EmployeeListItem[]) =>
    set(() => ({ employees: items })),
  currentSelectedEmployee: initCurrentSelectedEmployee,
  setCurrentSelectedEmployee: (item: EmployeeListItem) =>
    set(() => ({ currentSelectedEmployee: item })),
  resetCurrentSelectedEmployee: () =>
    set(() => ({ currentSelectedEmployee: initCurrentSelectedEmployee })),

  logType: "",
  setLogType: (value: string) => set(() => ({ logType: value })),
  resetLogType: () => set(() => ({ logType: "" })),

  logs: combinedLogsData,
  setLogs: (items: BuildingAccessLogs[] | PCAccessLogs[] | ProxyLogs[]) =>
    set(() => ({ logs: items })),
  currentSelectedLog: undefined,
  setCurrentSelectedLog: (
    item: BuildingAccessLogs | PCAccessLogs | ProxyLogs | undefined
  ) => set(() => ({ currentSelectedLog: item })),
  resetCurrentSelectedLog: () => set(() => ({ currentSelectedLog: undefined })),
}));
