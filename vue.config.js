module.exports = {
  lintOnSave: false,
  publicPath: './',
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://192.168.31.180:3000/api', // 服务器
        // target: 'http://10.18.190.188:3000/api/',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  }
};
