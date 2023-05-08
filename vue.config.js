const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer:{
    host: '0.0.0.0',      // 监听地址
    port: 7707,           // 监听端口
    open: true            // 启动后是否打开网页
  },
  transpileDependencies: true,
  // 关闭语法检测
  lintOnSave: false
})
