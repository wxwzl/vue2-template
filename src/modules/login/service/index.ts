import { IResponse } from "@utils/httpUtil/interface/ResponseHelper";
import { loginApi } from "../api";
import { setSession } from "../setup";
/**登录api的数据处理 */
export function login(identity: string, password: string, callBack: Function, context?: any) {
  const params = { identity, password };
  return loginApi(params, {
    validator: function (response: IResponse<any>) {
      const token = response.data.token;
      if (token) {
        return true;
      } else {
        response.message = "登录失败!";
        return false;
      }
    },
  })
    .then(function (data: any) {
      const token = data.token;
      setSession("token", token);
      callBack && callBack.call(context);
    })
    .catch(function () {}); // eslint-disable-line
}
