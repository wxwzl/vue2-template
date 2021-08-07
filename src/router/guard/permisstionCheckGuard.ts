import VueRouter from "vue-router";
export function createPermisstionCheckGuard(router: VueRouter): void {
  router.beforeEach(async (to, from, next) => {
    next();
    return true;
  });
}
