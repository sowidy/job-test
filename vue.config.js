'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

// const path = require('path')

module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8082",//需代理的后端接口
        secure: false,//开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",//重写匹配的字段。把/api 转为 /
        }
      }
    },
  }
}