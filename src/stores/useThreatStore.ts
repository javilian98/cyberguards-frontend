import { EmployeeListItem } from "@/types/types";
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

interface ThreatStore {
  employees: EmployeeListItem[];
  setEmployees: (items: EmployeeListItem[]) => void;
  // selectedEmployees: EmployeeListItem[];
  // setSelectedEmployees: (items: EmployeeListItem[]) => void;
  currentSelectedEmployee: EmployeeListItem | undefined;
  setCurrentSelectedEmployee: (item: EmployeeListItem) => void;
  resetCurrentSelectedEmployee: () => void;
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

  // selectedUsers: [],
  // setSelectedUsers: (items: EmployeeListItem[]) =>
  //   set(() => ({ selectedUsers: items })),

  currentSelectedEmployee: initCurrentSelectedEmployee,
  setCurrentSelectedEmployee: (item: EmployeeListItem) =>
    set(() => ({ currentSelectedEmployee: item })),
  resetCurrentSelectedEmployee: () =>
    set(() => ({ currentSelectedEmployee: initCurrentSelectedEmployee })),
}));
