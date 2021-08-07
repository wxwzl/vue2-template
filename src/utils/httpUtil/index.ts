import {
  createDEL,
  createGET,
  createPATCH,
  createPOST,
  createPUT,
  createService,
} from "./impl/createInstance";
export {
  createDEL,
  createGET,
  createPATCH,
  createPOST,
  createPUT,
  createService,
} from "./impl/createInstance";
import httpConfig from "./impl/HttpConfig";
const { service, request } = createService(httpConfig);
export const defaultInstance = service;
export const get = createGET(request);
export const del = createDEL(request);
export const post = createPOST(request);
export const put = createPUT(request);
export const patch = createPATCH(request);
