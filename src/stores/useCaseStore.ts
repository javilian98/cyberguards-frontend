import { Case } from "@/types/types";
import { create } from "zustand";

interface CaseStore {
  cases: Case[];
  setCases: (items: Case[]) => void;
  selectedCases: Case[];
  setSelectedCases: (items: Case[]) => void;
  currentSelectedCase: Case;
  setCurrentSelectedCase: (item: Case) => void;
  resetCurrentSelectedCase: () => void;
}

const initCurrentSelectedCase: Case = {
  id: "",
  title: "",
  riskStatus: "low",
  riskScore: 0,
  createdAt: "",
  assignee: "",
  assignedDateTime: "",
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
}));
