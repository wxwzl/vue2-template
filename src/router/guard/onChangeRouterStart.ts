import VueRouter from "vue-router";
import { createProgressStartGuard } from "./NProgressGuard";
export function onChangeRouterStart(router: VueRouter): void {
  createProgressStartGuard(router);
  router.beforeEach(async (to, from, next) => {
    next();
    return true;
  });
}
