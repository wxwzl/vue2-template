import { post } from "@/utils/httpUtil";
import { RequestConfig } from "@utils/httpUtil/interface/RequestConfig";
export function loginApi(
  data: { identity: string; password: string },
  config?: RequestConfig
): Promise<any> {
  return post("/user/login", data, config);
}
