import VueRouter from "vue-router";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
const openNProgress = new Boolean(process.env.openNProgress);
export function createProgressStartGuard(router: VueRouter): void {
  if (openNProgress) {
    router.beforeEach(async (to, from, next) => {
      if (to.meta.topProgress !== false) {
        NProgress.start();
      }
      next();
      return true;
    });
  }
}

export function createProgressEndGuard(router: VueRouter): void {
  if (openNProgress) {
    router.afterEach(async (to) => {
      if (to.meta.topProgress !== false) {
        NProgress.done();
      }
      return true;
    });
  }
}
export function createProgressGuard(router: VueRouter): void {
  if (openNProgress) {
    // NProgress.inc(0.1);
    // NProgress.configure({ easing: 'ease', speed: 200, showSpinner: false });
    router.beforeEach(async (to, from, next) => {
      if (to.meta.topProgress !== false) {
        NProgress.start();
      }
      next();
      return true;
    });

    router.afterEach(async (to) => {
      if (to.meta.topProgress !== false) {
        NProgress.done();
      }
      return true;
    });
  }
}
