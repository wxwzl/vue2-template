export interface IResponse<T = any> {
  code: number;
  status: boolean;
  message: string;
  data: T;
  origin: any;
}

export interface IResponseHelper {
  getMessage(res: any): string;
  getCode(res: any): number;
  getData(response: any): any;
  isSuccess(res: any): boolean;
  getResponse(res: any): IResponse<any>;
  getResponseFromError(error: any): IResponse<any>;
}
