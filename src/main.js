import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/public.scss'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import md5 from 'js-md5'
import './assets/js/Luna-GetData'
import './assets/js/publicFunction.js'
import './assets/LunaUI'

const zh = require('./lang/zh.js')
const en = require('./lang/en.js')
Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.prototype.$ajax = axios
Vue.prototype.$md5 = md5
const i18n = new VueI18n({
  locale: window.navigator.language,
  messages: {
    'zh-CN': require('./lang/zh'), // 中文语言包
    'en-US': require('./lang/en') // 英文语言包
  }
})
// Vue.use(VueI18n);

new Vue({
  router,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
