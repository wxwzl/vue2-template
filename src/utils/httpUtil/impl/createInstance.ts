import { HttpConfigInterface } from "../interface/HttpConfigInterface";
import ResponseHelper from "@/utils/httpUtil/impl/ResponseHelper";
import { IResponse } from "@/utils/httpUtil/interface/ResponseHelper";
import { extend, isEmpty } from "@utils/commonUtil";
import { RequestConfig } from "@/utils/httpUtil/interface/RequestConfig";
import axios from "axios";
export function createService(
  httpConfig: HttpConfigInterface
): { service: any; request: (option: RequestConfig) => Promise<any> } {
  const responseHelper = new ResponseHelper(httpConfig.ErrorArray);
  const service = axios.create({
    baseURL: httpConfig.baseURL, // url = base url + request url
    withCredentials: httpConfig.withCredentials, // send cookies when cross-domain requests
    timeout: httpConfig.timeout, // request timeout
  });
  // eslint-disable-next-line
  const emptyFunction = function () {};

  function responseHandler(res: IResponse<any>) {
    if (res.origin.config.skipResInterceptor) {
      return res;
    }
    if (httpConfig.responseInterceptor) {
      if (httpConfig.responseInterceptor(res)) {
        return new Promise(emptyFunction);
      }
    }
    if (res.status) {
      return res;
    } else {
      return Promise.reject(res);
    }
  }
  // 请求拦截
  // request interceptor
  service.interceptors.request.use(
    (config: any) => {
      // do something before request is sent
      httpConfig.requestInterceptor && httpConfig.requestInterceptor(config);
      return config;
    },
    (error: any) => {
      console.log("request-error:", error.response);
      const res = responseHelper.getResponseFromError(error.response);
      return responseHandler(res);
    }
  );
  // 响应拦截
  // response interceptor
  service.interceptors.response.use(
    (response: any): any => {
      const res = responseHelper.getResponse(response);
      return responseHandler(res);
    },
    (error: any) => {
      const res = responseHelper.getResponseFromError(error.response);
      return responseHandler(res);
    }
  );
  function request<T>(option: RequestConfig): Promise<T> {
    if (isEmpty(option.originalData)) {
      option.originalData = httpConfig.defaultOriginalData;
    }
    return service(option)
      .then(
        (res: any): Promise<T> => {
          if (option.validator && option.validator(res) != true) {
            return Promise.reject(res);
          }
          if (option.originalData) {
            return Promise.resolve(res);
          } else {
            return Promise.resolve(res.data);
          }
        }
      )
      .catch(
        (err: IResponse<any>): Promise<T> => {
          if (option.ignoreError != true) {
            httpConfig.errorHandler(err);
          }
          return Promise.reject(err);
        }
      );
  }
  return { service, request };
}
export function createGET(
  request: <T>(option: RequestConfig) => Promise<T>
): <T>(url: string, data?: any, config?: RequestConfig) => Promise<T> {
  return function get<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    const option: RequestConfig = {
      url,
      method: "get",
      params: data || {},
    };
    extend(option, config);
    return request(option);
  };
}

export function createPOST(
  request: <T>(option: RequestConfig) => Promise<T>
): <T>(url: string, data?: any, config?: RequestConfig) => Promise<T> {
  return function post<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    const option: RequestConfig = {
      url,
      method: "post",
      data: data || {},
    };
    extend(option, config);
    return request(option);
  };
}

export function createPUT(
  request: <T>(option: RequestConfig) => Promise<T>
): <T>(url: string, data?: any, config?: RequestConfig) => Promise<T> {
  return function put<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    const option: RequestConfig = {
      url,
      method: "put",
      data: data || {},
    };
    extend(option, config);
    return request(option);
  };
}
export function createDEL(
  request: <T>(option: RequestConfig) => Promise<T>
): <T>(url: string, data?: any, config?: RequestConfig) => Promise<T> {
  return function del<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    const option: RequestConfig = {
      url,
      method: "delete",
      params: data || {},
    };
    extend(option, config);
    return request(option);
  };
}
export function createPATCH(
  request: <T>(option: RequestConfig) => Promise<T>
): <T>(url: string, data?: any, config?: RequestConfig) => Promise<T> {
  return function patch<T>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    const option: RequestConfig = {
      url,
      method: "patch",
      data: data || {},
      headers: { "Content-Type": "x-www-form-urlencoded" },
    };
    extend(option, config);
    return request(option);
  };
}
