import VueRouter from "vue-router";
export function createTokenCheckGuard(router: VueRouter): void {
  router.beforeEach(async (to, from, next) => {
    // if (to.meta.needToken !== false) {
    //   const token = getSession("token");
    //   if (token) {
    //     next();
    //   } else {
    //     next({ name: "login" });
    //   }
    // }
    next();
    return true;
  });
}
