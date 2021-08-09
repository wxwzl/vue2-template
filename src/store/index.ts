import instance from "./instance";

/**加载同级目录下的module里的所有脚本 */
const modulesFiles = require.context("./modules", true, /\.ts$/);
modulesFiles.keys().forEach((modulePath) => {
  modulesFiles(modulePath);
});

/** 实现自动加载@modules 下的模块里的store文件夹里的文件 ：要求模块名不能与/store/modules下的文件名重复,注意这里只有要求在项目一加载就需要的store才放置在store文件夹下，modules
 * 下的大部分是动态模块
 */
const serviceModulesFiles = require.context(
  "../modules",
  true,
  /\.\/[a-zA-Z0-9_-]+\/store\/.+\.ts$/
);
serviceModulesFiles.keys().forEach((modulePath) => {
  serviceModulesFiles(modulePath);
});

export default instance;
