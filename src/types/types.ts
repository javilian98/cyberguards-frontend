export interface Case {
  id: string;
  title: string;
  riskScore: number;
  createdAt: string;
  assigneeId?: string;
  logId?: string;
  assignee?: {
    fullName: string | null;
  };
  assignedDateTime?: string;
  suspectedUser?: {
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
  logId?: string;
  assignedDateTime?: string;
  threatPageUrl: string;
  assignee?: {
    fullName: string | null;
  };
  suspectedUserId?: string;
  suspectedUser?: {
    fullName: string | null;
  };
  suspectTypeId: number;
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
  suspectType: string;
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
