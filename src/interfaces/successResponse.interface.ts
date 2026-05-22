

export interface ISuccessResponse<T> {
  success: true;
  message?: string;
  data?: T;
}