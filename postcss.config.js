module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 14, // 换算的基数
      unitPrecision: 3,
      // 忽略转换正则匹配项。插件会转化所有的样式的px。比如引入了三方UI，也会被转化。目前我使用 selectorBlackList字段，来过滤
      //如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
      selectorBlackList: ["ig"],
      mediaQuery: false, //Allow px to be converted in media queries.
      propList: ["*"],
      exclude: [/node_modules/],
      // exclude: function(file){
      //   console.log("file:",file,"\n");
      //   if( /node_modules/i.test(file)){
      //     return true;
      //   }
      //   if(file.indexOf("nprogress")>=0){
      //     return true;
      //   }
      //   return false;
      // }
    },
  },
};
