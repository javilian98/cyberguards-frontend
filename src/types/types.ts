export interface Case {
  id: string;
  title: string;
  riskScore: number;
  createdAt: string;
  assigneeId?: string;
  assignee?: {
    fullName: string | null;
  };
  assignedDateTime?: string;
  employeeId?: string;
  employee?: {
    fullName: string | null;
  };
  caseStatus: number;
}

export interface CaseDetail {
  id: string;
  title: string;
  description: string;
  riskScore: number;
  createdAt?: string;
  assigneeId?: string;
  assignedDateTime?: string;
  assignee?: {
    fullName: string | null;
  };
  employeeId?: string;
  employee?: {
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

export interface EmployeeListItem {
  id: string;
  firstName: string;
  lastName: string;
  businessUnit: string;
  riskScore: number;
  totalOffences: number;
}

export interface BuildingAccessLogs {
  logId: string;
  employeeId: string;
  accessDateTime: string;
  direction: string;
  status: string;
  officeLocation: string;
  suspectType: number;
}
export type PCAccessLogs = {
  logId: string;
  employeeId: string;
  accessDateTime: string;
  logOnOff: string;
  machineName: string;
  machineLocation: string;
  suspectType: number;
};
export type ProxyLogs = {
  logId: string;
  employeeId: string;
  accessDateTime: string;
  machineName: string;
  url: string;
  category: string;
  bytesIn: number;
  bytesOut: number;
  suspectType: number;
};

export type CaseAuditLogs = {
  id: string;
  caseId: string;
  caseAction: string;
  employeeId: string;
  assignee: string;
  createdAt: string;
};

export enum CASE_STATUS {
  open = 1,
  assigned = 2,
  inProgress = 3,
  closed = 0,
}

export enum ROLE_ID {
  normal = 0,
  analyst = 1,
  admin = 2,
}

export enum SUSPECT_TYPE {
  none = 0,
  afterHourLogin = 1,
  potentialAccountSharing = 2,
  terminatedEmployeeLogin = 3,
  failedAttemptToEnterBuilding = 4,
  impossibleTraveller = 5,
  potentialDataExfiltration = 6,
}
