import { IResponse } from "@/utils/httpUtil/interface/ResponseHelper";
export interface CustomError {
  code: number;
  msg: string;
}
export interface HttpConfigInterface {
  requestInterceptor: (config: any) => void;
  responseInterceptor: (res: IResponse<any>) => boolean;
  errorHandler: (res: IResponse<any>) => void;
  baseURL: string;
  timeout: number;
  withCredentials: false;
  ErrorArray: Array<CustomError>;
  defaultOriginalData: boolean; //设置当响应成功时是否返回完整的响应数据的默认值;
}
