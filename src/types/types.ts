export interface Case {
  id: string;
  title: string;
  riskStatus: "low" | "medium" | "high";
  riskScore: number;
  createdAt: string;
  assignee?: {
    fullName: string | null;
  };
  assignedDateTime?: string;
  caseStatus: number;
}

export interface CaseDetail {
  id: string;
  title: string;
  description: string;
  riskStatus: "low" | "medium" | "high";
  riskScore: number;
  createdAt?: string;
  assigneeId?: string;
  assignedDateTime?: string;
  threatPageUrl: string;
  assignee?: {
    fullName: string | null;
  };
  caseStatus: number;
}

export interface UserListItem {
  id: string;
  roleId: number;
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
  roleId: number;
  riskStatus: string;
  riskScore: number;
  suspectCaseId: number;
  lastAccessAt: string;
}

export enum CASE_STATUS {
  open = "1",
  assigned = "2",
  inProgress = "3",
  closed = "0",
}

export enum ROLE_ID {
  normal = "0",
  analyst = "1",
  admin = "2",
}
