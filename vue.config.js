/* eslint-disable */
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const IS_LOCALORDEV = ["local", "mock"].includes(process.env.VUE_APP_MODE);
const path = require("path");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const stylelintWebpackPlugin = require("stylelint-webpack-plugin");
const devServer = require("./buildConfig/devServer");
const { getEnv, MultiEnvHtmlWebpackPlugin } = require("multi-env-html-webpack-plugin");

function resolve(str) {
  return path.resolve(__dirname, str);
}
let publicPath = process.env.VUE_APP_PUBLIC_PATH + process.env.VUE_APP_STATICDIR;

const cdn = {
  css: [publicPath + "/elementui-2.15.6/theme/index.css"],
  js: [
    publicPath + "/vue-router-3.5.3/vue-router.min.js",
    publicPath + "/vuex-3.6.2/vuex.min.js",
    publicPath +
      (process.env.NODE_ENV == "development"
        ? "/vue-2.6.14/vue.js"
        : "/vue-2.6.14/vue.runtime.min.js"),
    publicPath + "/elementui-2.15.6/lib/index.js",
    publicPath + "/axios-0.24.0/axios.js",
  ],
};
const globalEnvName = "_env";

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH, // 默认'/'，部署应用包时的基本 URL
  outputDir: process.env.VUE_APP_OUTPUTDIR || "dist", // 'dist', 生产环境构建文件的目录
  assetsDir: process.env.VUE_APP_ASSETDIR || "", // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: "warning",
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  parallel: require("os").cpus().length > 1,
  pwa: {
    name: process.env.VUE_APP_APPNAME,
    iconPaths: {
      favicon32: "favicon.ico",
      favicon16: "favicon.ico",
      appleTouchIcon: "favicon.ico",
      maskIcon: "favicon.ico",
      msTileImage: "favicon.ico",
    },
    workboxOptions: {
      exclude: [/index\.html$/, /service-worker\.js$/, /favicon\.ico$/, /img\/icons/],
    },
  },
  // transpileDependencies: ['vuex-module-decorators'],
  devServer: devServer,
  css: {
    extract: IS_PROD,
    sourceMap: false,
    // loaderOptions: {
    //   scss: {
    //     // 向全局sass样式传入共享的全局变量, $src可以配置图片cdn前缀
    //     // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
    //     prependData: `
    //     $src: "${process.env.VUE_APP_PUBLIC_PATH}/${process.env.VUE_APP_ASSETDIR}";
    //     `
    //   }
    // }
  },
  configureWebpack: () => {
    let config = {
      externals: {
        vue: "Vue",
        "element-ui": "ELEMENT",
        "vue-router": "VueRouter",
        vuex: "Vuex",
        axios: "axios",
      },
      plugins: [
        new HardSourceWebpackPlugin({
          // cacheDirectory是在高速缓存写入。默认情况下，将缓存存储在node_modules下的目录中，因此如
          // 果清除了node_modules，则缓存也是如此
          // cacheDirectory: "node_modules/.cache/hard-source/[confighash]",
          // Either an absolute path or relative to webpack's options.context.
          // Sets webpack's recordsPath if not already set.
          // recordsPath: "node_modules/.cache/hard-source/[confighash]/records.json",
          // configHash在启动webpack实例时转换webpack配置，并用于cacheDirectory为不同的webpack配
          // 置构建不同的缓存
          configHash: function (webpackConfig) {
            // node-object-hash on npm can be used to build this.
            return require("node-object-hash")({ sort: false }).hash(webpackConfig);
          },
          // 当加载器，插件，其他构建时脚本或其他动态依赖项发生更改时，hard-source需要替换缓存以确保输
          // 出正确。environmentHash被用来确定这一点。如果散列与先前的构建不同，则将使用新的缓存
          environmentHash: {
            root: process.cwd(),
            directories: [],
            files: ["package-lock.json", "yarn.lock"],
          },
        }),
        new stylelintWebpackPlugin({
          files: ["src/**/*.{html,vue,css,sass,scss,less}"],
          extensions: ["vue", "css", "less", "scss", "sass"],
          caches: true,
          fix: true,
          failOnError: true,
        }),
      ],
    };
    if (!IS_LOCALORDEV) {
      config.plugins.push(
        new MultiEnvHtmlWebpackPlugin([
          {
            index: "./dist/index.html",
            outputs: [
              {
                data: { [`${globalEnvName}`]: getEnv("development") },
                file: "./dist/index-development.html",
              },
              {
                data: { [`${globalEnvName}`]: getEnv("test") },
                file: "./dist/index-test.html",
              },
              {
                data: { [`${globalEnvName}`]: getEnv("production") },
                file: "./dist/index-production.html",
              },
              {
                data: { [`${globalEnvName}`]: getEnv("uat") },
                file: "./dist/index-uat.html",
              },
              {
                data: {
                  [`${globalEnvName}`]: getEnv(process.env.VUE_APP_MODE),
                },
                file: "./dist/index.html",
              },
            ],
          },
        ])
      );
    }
    return config;
  },
  chainWebpack(config) {
    config.entry("app").clear().add("./src/main.ts");
    if (!IS_LOCALORDEV) {
      config.plugin("define").tap(() => {
        return [
          {
            "process.env": `window.${globalEnvName}`,
          },
        ];
      });
    }

    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set("name", process.env.VUE_APP_APPNAME);
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial",
      },
    ]);
    // 修复HMR
    config.resolve.symlinks(true);

    /** 处理svg 图片 打包svg图片为雪碧图*/
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.exclude.add(/node_modules/);
    svgRule
      .test(/\.svg$/)
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });
    // const imagesRule = config.module.rule("images");
    // // imagesRule.exclude.add(resolve("src/icons"));
    // config.module.rule("images").test(/\.(png|jpe?g|gif)(\?.*)?$/);

    config.resolve.alias
      // .set("vue$", "vue/dist/vue.esm.js")
      .set("@", resolve("src"))
      .set("@components", resolve("src/components"))
      .set("@utils", resolve("src/utils"))
      .set("@modules", resolve("src/modules"))
      .set("@store", resolve("src/store"))
      .set("@styles", resolve("src/assets/styles"))
      .set("@mixins", resolve("src/mixins"))
      .set("@assets", resolve("src/assets"))
      .set("@images", resolve("src/assets/images"))
      .set("@router", resolve("src/router"))
      .set("@service", resolve("src/service"))
      .set("@dataTypes", resolve("src/dataTypes"))
      .set("@mixins", resolve("src/mixins"));
    if (IS_PROD) {
      //不需要配置该项，vue-cli 内部自带TerserWebpackPlugin
      // //配置混淆压缩，去除console.log；
      // config.plugin("minify").use(UglifyJsPlugin, [
      //   {
      //     uglifyOptions: {
      //       compress: {
      //         warnings: false,
      //         drop_console: true,
      //         drop_debugger: false,
      //         pure_funcs: ["console.log"], //移除console
      //       },
      //     },
      //     sourceMap: false,
      //     parallel: true,
      //   }
      // ]);
      //设置gzip压缩
      const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
      config.plugin("gzip").use(CompressionWebpackPlugin, [
        {
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
        },
      ]);
      //添加打包分析
      config.plugin("webpack-report").use(BundleAnalyzerPlugin, [
        {
          analyzerMode: "static",
        },
      ]);
    } else {
      // 开发环境, sourcemap不包含列信息
      // 参考：https://webpack.js.org/configuration/devtool/#development
      config.devtool("cheap-source-map");
    }
    // 如果使用多页面打包，使用vue inspect --plugins查看html是否在结果数组中
    config.plugin("html").tap((args) => {
      // html中添加cdn
      args[0].cdn = cdn;
      args[0].title = process.env.VUE_APP_APPNAME;
      return args;
    });
    config.plugin("copy").tap((args) => {
      args[0].push({
        from: resolve(process.env.VUE_APP_STATICDIR),
        to: resolve(process.env.VUE_APP_OUTPUTDIR + "/" + process.env.VUE_APP_STATICDIR),
        ignore: [".*"],
      });
      return args;
    });
  },
};
