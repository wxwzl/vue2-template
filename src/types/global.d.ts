declare module "window";

declare module "document";
declare module "HTMLElement";
declare namespace NodeJS {
  interface Process {
    env: ProcessEnv;
  }
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production";
    readonly VUE_APP_MODE: "development" | "production" | "local" | "rebuild-dev" | "rebuild-test";
    readonly BASE_URL: string;
    readonly VUE_APP_API: string;
    readonly VUE_APP_ROUTE_BASE: string;
    readonly VUE_APP_TITLE: string;
    readonly VUE_APP_OPENNProgress: 0 | 1;
    readonly VUE_APP_APPNAME: string;
  }
}

declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";
