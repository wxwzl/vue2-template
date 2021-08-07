import { IResponseHelper, IResponse } from "@/utils/httpUtil/interface/ResponseHelper";
import { isBlob, isEmpty, isString, walkArray } from "@utils/commonUtil";
import { CustomError } from "../interface/HttpConfigInterface";

export class Response implements IResponse {
  code: number;
  status: boolean;
  message: string;
  data: any;
  origin: Record<string | number, any>;
  constructor(
    code: number,
    status: boolean,
    message: string,
    data: any,
    origin: Record<string | number, any>
  ) {
    this.code = code;
    this.status = status;
    this.message = message;
    this.data = data;
    this.origin = origin;
  }

  public setMessage(msg: string): IResponse {
    this.message = msg;
    return this;
  }

  public setData(data: any): IResponse {
    this.data = data;
    return this;
  }
}
class ResponseHelper implements IResponseHelper {
  errorArray: Array<{ code: string | number; msg: string }> = [];
  constructor(errorArray: Array<{ code: string | number; msg: string }>) {
    this.errorArray = errorArray;
  }
  public getMessage(res: any): string {
    let msg: string = res.message;
    const code: number = this.getCode(res);
    walkArray(this.errorArray, function (item: CustomError) {
      if (item.code == code) {
        msg = item.msg;
        return true;
      }
    });
    return msg || "请求出错";
  }

  public getCode(res: any): number {
    return res.status ? res.status : res.code;
  }

  public getData(response: any): any {
    let data: any = response.data;
    if (isString(data) && data) {
      try {
        response.data = JSON.parse(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (isEmpty(data)) {
      data = {};
    }
    return data;
  }

  public isSuccess(res: any): boolean {
    return this.getCode(res) === 200;
  }

  public getResponse(response: any): IResponse {
    if (isBlob(response.data) || isString(response.data)) {
      console.log(typeof response.data);
      const code = response.status;
      const data = response.data;
      const status = true;
      const message = "请求成功";
      return new Response(code, status, message, data, response);
    } else {
      const res = this.getResponseData(response);
      let status = false;
      const code: number = this.getCode(res);
      const data: any = this.getData(res);
      const message: string = this.getMessage(res);
      if (this.isSuccess(res)) {
        status = true;
      } else {
        status = false;
      }
      return new Response(code, status, message, data, response);
    }
  }
  public getResponseData(res: any) {
    return res.data;
  }
  public getResponseFromError(error: any): IResponse {
    let status = false;
    const code: number = error.status ? error.status : error.code;
    const data: any = this.getData(error);
    const message: string = this.getMessage(error);
    if (this.isSuccess(error)) {
      status = true;
    } else {
      status = false;
    }
    return new Response(code, status, message, data, error);
  }
}
export default ResponseHelper;
