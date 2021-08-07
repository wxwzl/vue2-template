import VueRouter from "vue-router";
import { setDocumentTitle } from "@utils/domUtil";
import { createProgressEndGuard } from "./NProgressGuard";
export function onChangeRouterSuccess(router: VueRouter): void {
  router.afterEach(async (to) => {
    setDocumentTitle(to.meta.title);
    return true;
  });
  createProgressEndGuard(router);
}
