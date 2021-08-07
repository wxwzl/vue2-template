import VueRouter from "vue-router";

import { createTokenCheckGuard } from "./tokenCheckGuard";
import { createPermisstionCheckGuard } from "./permisstionCheckGuard";
import { onChangeRouterSuccess } from "./onChangeRouterSuccess";
import { onChangeRouterStart } from "./onChangeRouterStart";
export function createGuard(router: VueRouter): void {
  /**开始转换路由 */
  onChangeRouterStart(router);

  /**第一步：校验token */
  createTokenCheckGuard(router);

  /**第二步：校验用户角色权限*/
  createPermisstionCheckGuard(router);

  /**转换路由成功*/
  onChangeRouterSuccess(router);
}
