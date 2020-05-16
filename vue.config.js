module.exports = {
  lintOnSave: false,
  publicPath: './',
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        // target: 'http://192.144.202.13:9099/api', // 服务器
        target: 'http://192.168.68.153:3000/api',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  }
};
