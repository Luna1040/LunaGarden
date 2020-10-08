import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import directives from './directives'
import './assets/css/public.scss'
import './assets/css/LunaAnimates.scss'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import md5 from 'js-md5'
import './assets/js/publicRes.js'
import './assets/js/publicReq.js'
import './assets/js/timeFormat.js'
import './assets/js/getId.js'
import './assets/js/colorMatch.js'
import './assets/js/encrypt.js'
import './assets/public/lunaUI'

const zh = require('./lang/zh.js')
const en = require('./lang/en.js')
Vue.config.productionTip = false
Vue.use(directives)
Vue.use(VueI18n)
Vue.use(VueResource)
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
