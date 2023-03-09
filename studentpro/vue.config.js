const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/ueditor': {// 匹配所有以 '/api'开头的请求路径
        target: 'http://localhost:3333',// 代理目标的基础路径
        // pathRewrite: { '^/api': '' },//正则匹配所有以api开头的路径，把api替换为''空
        changeOrigin: true,//默认值为true,可省略不写
        ws: true  //用于支持websocket 默认值为true,可省略不写
      }
    }
  }

})

