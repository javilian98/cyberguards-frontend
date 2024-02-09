export interface Case {
  id: string;
  title: string;
  riskStatus: "low" | "medium" | "high";
  riskScore: number;
  caseDateTime: string;
  assignee: string;
  assignedDateTime: string;
}
