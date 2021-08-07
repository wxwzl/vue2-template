import { AxiosRequestConfig } from "axios";
import { IResponse } from "@/utils/httpUtil/interface/ResponseHelper";
export interface RequestConfig extends AxiosRequestConfig {
  validator?: (res: IResponse<any>) => boolean; //数据格式校验,只有请求成功的响应才会走的格式校验这一步
  ignoreError?: boolean; //是否跳过全局的错误弹窗提示
  skipResInterceptor?: boolean; //是否跳过响应拦截器
  originalData?: boolean; //当响应成功时是否返回完整的响应数据，默认只返回Data;
}
