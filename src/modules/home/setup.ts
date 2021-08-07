/**模块的初始化脚本
 * 为什么会存在这个脚本？
 * 因为我们可能需要在模块的代码运行之前做一些初始化的操作，比如注入该模块的service相关的方法，在vue的实例methods方法里能够这样访问this.$service.home[某个业务方法名];
 * 如果觉得这样的访问路径长，可以在模块通用mixins里添加一个方法getService，获取，参考home模块目录下的service/index.
 */
export * from "./service";
