import { CustomRoute } from "@router/types";
const routes: Array<CustomRoute> = [
  {
    path: "/",
    name: "login",
    component: (): any => import("@/modules/login/pages/index.vue"),
    meta: {
      title: "登录",
      hidden: true,
    },
  },
];
export default routes;
