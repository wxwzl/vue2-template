declare module "*.vue" {
  import Vue from "vue";

  // import VueRouter, { Route } from "vue-router";
  // import { Store } from "vuex";
  // declare module "vue/types/vue" {
  //   interface Vue {
  //     getInstance: () => any;
  //   }
  // }
  //打包后无效
  // Vue.prototype.getInstance = function () {
  //   return this as any;
  // };
  export default Vue;
}
