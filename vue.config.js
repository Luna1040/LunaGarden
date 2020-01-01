module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://bloguser.m5e.cn', // 服务器
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  }
}
