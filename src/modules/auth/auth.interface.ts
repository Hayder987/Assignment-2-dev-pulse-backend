
// user post method payload type
export interface IUserPayload {
  name: string;
  email: string;
  password: string;
  role?: "contributor" | "maintainer";
};

// user login method payload type
export interface ILoginPayload {
    email: string;
    password: string  
};

// user role type
export const USER_ROLES = {
    contributor:"contributor",
    maintainer : "maintainer"
} as const;

export type Roles = "contributor" | "maintainer";

export const AUTH_ACTION = {
  register:"register",
  login:"login"
} as const;

export type AuthAction = "register" | "login";
