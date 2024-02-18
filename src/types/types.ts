export interface Case {
  id: string;
  title: string;
  riskStatus: "low" | "medium" | "high";
  riskScore: number;
  createdAt: string;
  assignee?: string;
  assignedDateTime?: string;
}

export interface CaseDetail {
  id: string;
  title: string;
  description: string;
  riskStatus: "low" | "medium" | "high";
  riskScore: number;
  createdAt?: string;
  assignee?: string;
  assignedDateTime?: string;
  threatPageUrl: string;
}

export interface UserListItem {
  id: string;
  firstName: string;
  lastName: string;
  profession: string;
  riskScore: number;
  suspectCaseId: number;
  lastAccessAt: string;
}
export interface UserDetail {
  id: string;
  firstName: string;
  lastName: string;
  profession: string;
  userRole: number;
  riskStatus: string;
  riskScore: number;
  suspectCaseId: number;
  lastAccessAt: string;
}
