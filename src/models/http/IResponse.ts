export interface IResponse<T> {
  body: T;

  status: number;
  statusText: string;
}