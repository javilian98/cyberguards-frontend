import { Case, CaseAuditLog } from "@/types/types";
import { create } from "zustand";

interface CaseStore {
  cases: Case[];
  setCases: (items: Case[]) => void;
  selectedCases: Case[];
  setSelectedCases: (items: Case[]) => void;
  currentSelectedCase: Case;
  setCurrentSelectedCase: (item: Case) => void;
  resetCurrentSelectedCase: () => void;

  caseAuditLogs: CaseAuditLog[];
  setCaseAuditLogs: (items: CaseAuditLog[]) => void;
}

const initCurrentSelectedCase: Case = {
  id: "",
  title: "",
  riskScore: 0,
  createdAt: "",
  assignee: {
    fullName: "",
  },
  assignedDateTime: "",
  caseStatus: 0,
};

export const useCaseStore = create<CaseStore>((set) => ({
  cases: [],
  setCases: (items: Case[]) => set(() => ({ cases: items })),

  selectedCases: [],
  setSelectedCases: (items: Case[]) => set(() => ({ selectedCases: items })),

  currentSelectedCase: initCurrentSelectedCase,
  setCurrentSelectedCase: (item: Case) =>
    set(() => ({ currentSelectedCase: item })),
  resetCurrentSelectedCase: () =>
    set(() => ({ currentSelectedCase: initCurrentSelectedCase })),

  caseAuditLogs: [],
  setCaseAuditLogs: (items: CaseAuditLog[]) =>
    set(() => ({ caseAuditLogs: items })),
}));
