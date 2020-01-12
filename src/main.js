import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import ElementUi from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import VueResource from 'vue-resource';
import directives from './directives';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './assets/css/public.scss'
import './assets/css/LunaAnimates.scss'
import VueI18n from 'vue-i18n'
import axios from 'axios'
import './assets/js/publicRes.js'
import './assets/icon/iconfont.css';
import './assets/public/lunaUI'


// window.Vue = Vue;
Vue.config.productionTip = false;
Vue.use(directives);
Vue.use(VueI18n);
Vue.use(VueResource);
Vue.use(VueAwesomeSwiper);
Vue.prototype.$ajax = axios;
const i18n = new VueI18n({
  locale: window.navigator.language,
  messages: {
    'zh-CN': require('./lang/zh'),   // 中文语言包
    'en-US': require('./lang/en')    // 英文语言包
  }
});
// Vue.use(VueI18n);

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');


