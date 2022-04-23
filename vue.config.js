// vue.config.js
const version = new Date().getTime()
module.exports = {
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico',
    },
  },
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: '匿名聊天室',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
  },
  devServer: {
    proxy: {
      "/api": {
        //target: "http://118.31.51.147:8000/",
        target: 'http://localhost:8001',
        secure: false,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  lintOnSave: false, //关闭eslint检查
}
