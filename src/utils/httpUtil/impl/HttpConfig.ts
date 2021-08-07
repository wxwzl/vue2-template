import { getSession } from "@utils/localStorageUtil";
import { IResponse } from "@/utils/httpUtil/interface/ResponseHelper";
import { HttpConfigInterface } from "../interface/HttpConfigInterface";
import router from "@router/index";
import { Message } from "element-ui";
const config: HttpConfigInterface = {
  requestInterceptor: (config: any) => {
    // do something before request is sent
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json;charset=UTF-8";
    }
    const token = getSession("token");
    config.headers["Authorization"] = "Bearer admin=" + token;
    return config;
  },
  responseInterceptor: (res: IResponse<any>) => {
    if (res.code === 401) {
      router.push({ name: "login" });
      return true;
    }
    return false;
  },
  errorHandler: (res: IResponse<any>) => {
    Message.error(res.message);
  },
  baseURL: process.env.VUE_APP_API,
  timeout: 20000,
  withCredentials: false,
  defaultOriginalData: false,
  ErrorArray: [
    { code: 403, msg: "没有权限" },
    { code: 404, msg: "找不到页面或接口" },
  ],
};
export default config;
