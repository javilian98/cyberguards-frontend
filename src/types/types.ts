export interface Case {
  id: string;
  title: string;
  risk_status: "low" | "medium" | "high";
  risk_score: number;
  created_at: string;
  assignee?: string;
  assigned_date_time?: string;
}
