

export interface IUserPayload {
  name: string;
  email: string;
  password: string;
  role: "contributor" | "maintainer";
};

export interface ILoginPayload {
    email: string;
    password: string  
};

export const USER_ROLES = {
    contributor:"contributor",
    maintainer : "maintainer"
} as const;

export type Roles = "contributor" | "maintainer";
