import { CustomRoute } from "@router/types";
const routes: Array<CustomRoute> = [
  {
    path: "/home",
    name: "home",
    component: (): any => import("@/modules/home/pages/Home.vue"),
    meta: {
      hidden: true,
      title: process.env.VUE_APP_APPNAME,
    },
  },
];
export default routes;
