module.exports = {
  lintOnSave: false,
  publicPath: "./",
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://192.144.202.13:9099/api', // 服务器
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  }
};
