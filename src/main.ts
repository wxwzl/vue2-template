import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import installPlugin from "@/plugins";
import "@/styles/index.less"; // 全局通用样式
installPlugin();

Vue.config.productionTip = false;
if (process.env.NODE_ENV != "production") {
  Vue.config.devtools = true;
}
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
