
export type IssueType = "bug" | "feature_request";

export type IssueStatus = "open" | "in_progress" | "resolved";

export interface IIssue {
  title: string;
  description: string;
  type: IssueType;
  status?: IssueStatus;
};

export type IIssueUpdate = Partial<IIssue>;

export interface QueryParams {
  sort?: string;
  type?: string;
  status?: string;
};

export const reqMethod ={
  post : "POST",
  patch : "PATCH"
} as const;


export type ReqMethod = "POST" | "PATCH";