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
  userRole: number;
  riskStatus: string;
  riskScore: number;
  suspectCaseId: number;
  lastAccessAt: string;
}
