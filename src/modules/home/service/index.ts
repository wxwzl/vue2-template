import * as api from "../api";
/*
负责管理除UI之外的所有所有非响应式数据和不跟ui有关的逻辑处理层，api请求及api请求会的响应数据处理。尽量在具体的vue实例里只负责拿到数据，
再经过一个ui框架和数据之间的一个适配方法如util里的elementDataAdaptor里的方法就可以将数据渲染到页面上。
*/
const moduleService = {
  ...api,
};
export default moduleService;
