module.exports = {
  // compress: true,
  // overlay: { // 让浏览器 overlay 同时显示警告和错误
  //   warnings: true,
  //   errors: true
  // },
  // open: false, // 是否打开浏览器
  // host: "localhost",
  // port: "8080", // 代理断就
  // https: false,
  // hotOnly: false, // 热更新
  proxy: {
    "/api": {
      target: "http://192.168.50.142:59010", // 目标代理接口地址
      secure: false,
      changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
      // ws: true, // 是否启用websockets
      pathRewrite: {
        "^/api": "/",
      },
    },
  },
};
