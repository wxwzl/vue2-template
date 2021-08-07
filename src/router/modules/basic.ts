import { CustomRoute } from "@router/types";
const routes: Array<CustomRoute> = [
  {
    path: "/404",
    name: "404",
    component: (): any => import("@/modules/error-pages/404.vue"),
    meta: {
      hidden: true,
      title: "404",
      needToken: false,
    },
  },
  { path: "**", redirect: "/404", meta: { title: "404", needToken: false, hidden: true } },
];
export default routes;
