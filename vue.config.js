module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://114.118.75.39:38765/api/', // 服务器
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  }
}
