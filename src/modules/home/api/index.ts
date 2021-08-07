import { get } from "@/utils/httpUtil";
import { RequestConfig } from "@utils/httpUtil/interface/RequestConfig";
export function getHomeDataApi(
  data: { identity: string; password: string },
  config?: RequestConfig
): Promise<any> {
  return get("/home/getHomeData", data, config);
}
