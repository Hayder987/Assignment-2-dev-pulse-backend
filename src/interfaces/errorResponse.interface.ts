

export interface IErrorResponse<T = unknown> {
  success: false;
  message: string;
  errors?: T;
}