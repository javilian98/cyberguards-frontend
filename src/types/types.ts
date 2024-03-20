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
  email: string;
  profession: string;
  roleId: number;
  riskStatus: string;
  riskScore: number;
  suspectCaseId: number;
  lastAccessAt: string;
}

export interface UserAuth {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
}

export interface EmployeeListItem {
  id: string;
  firstName: string;
  lastName: string;
  businessUnit: string;
  riskScore: number;
  offenceLogCount: number;
}

export interface ThreatListItem {
  id: string;
  firstName: string;
  lastName: string;
  businessUnit: string;
  riskScore: number;
}

export interface ThreatDetail {
  id: string;
  employeeId: string;
  riskScore: number;
  offenceLogCount: number;
  employeeInfo: {
    businessUnit: string;
    firstname: string;
    lastname: string;
  };
  logs: {
    buildingAccess: BuildingAccessLogAPIResponse[];
    pcAccess: PCAccessLogAPIResponse[];
    proxy: ProxyLogAPIResponse[];
  };
}

export interface BuildingAccessLogAPIResponse {
  id: number;
  employeeid: number;
  access_date_time: string;
  direction: string;
  status: string;
  office_location: string;
  suspect: number;
}
export type PCAccessLogAPIResponse = {
  id: number;
  employeeid: number;
  access_date_time: string;
  log_on_off: string;
  machine_name: string;
  machine_location: string;
  suspect: number;
};
export type ProxyLogAPIResponse = {
  id: number;
  employeeid: number;
  access_date_time: string;
  machine_name: string;
  url: string;
  category: string;
  bytes_in: number;
  bytes_out: number;
  suspect: number;
};

export interface ThreatAPIResponse {
  id: number;
  employeeId: number;
  riskScore: number;
}

export interface ThreatDetailAPIResponse {
  id: number;
  employeeId: number;
  riskScore: number;
  offenceLogCount: number;
  employeeInfo: {
    business_unit: string;
    email: string;
    employeeid: number;
    firstname: string;
    lastname: string;
    gender: string;
    joined_date: string;
    location: string;
    profile: number;
    suspect: boolean;
    terminated_date: string | null;
  };
  logs: {
    buildingAccess: BuildingAccessLogAPIResponse[];
    pcAccess: PCAccessLogAPIResponse[];
    proxy: ProxyLogAPIResponse[];
  };
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

export type CaseAuditLog = {
  id?: string;
  caseId: string;
  action: string;
  edits: string | null;
  // employeeId: string;
  assignee: string;
  assigneeId?: string;
  createdAt?: string;
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