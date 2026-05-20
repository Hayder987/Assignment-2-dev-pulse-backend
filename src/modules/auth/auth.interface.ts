

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
