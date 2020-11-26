module.exports = {
  lintOnSave: false,
  publicPath: './',
  configureWebpack: {
    watch: true
  },
  devServer: {
    disableHostCheck: true,
    port: 7230,
    proxy: {
      '/api': {
        // target: 'http://192.168.31.180:3000/api', // 服务器
        target: 'http://192.168.68.125:3000/api/',
        // target: 'https://lunagarden.net/api/',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  }
};
