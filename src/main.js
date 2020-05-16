import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import ElementUi from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import VueResource from 'vue-resource'
import directives from './directives'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './assets/css/public.scss'
import './assets/css/LunaAnimates.scss'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import md5 from 'js-md5'
// import './assets/js/luna18n/index.js'
import './assets/js/publicRes.js'
import './assets/js/publicReq.js'
import './assets/js/timeFormat.js'
import './assets/js/getId.js'
import './assets/js/colorMatch.js'
import './assets/js/encrypt.js'
import './assets/icon/iconfont.css'
import './assets/public/lunaUI'

const zh = require('./lang/zh.js')
const en = require('./lang/en.js')
// import './assets/css/LunaUI/LunaUI.scss'
// import './assets/css/LunaUI/lunaCol.scss'

// window.Vue = Vue;
Vue.config.productionTip = false
Vue.use(directives)
Vue.use(VueI18n)
Vue.use(VueResource)
Vue.use(VueAwesomeSwiper)
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
