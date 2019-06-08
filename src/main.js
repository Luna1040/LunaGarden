import Vue from 'vue';
import App from './App.vue';
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router.js';
import  VueResource  from  'vue-resource';
import directives from './directives';
import '../src/assets/icon/iconfont.css'
// import axios from 'axios'

Vue.use(VueResource);
Vue.use(ElementUi);
Vue.use(directives);
// Vue.use(axios);

Vue.config.productionTip = false;
new Vue({
    router,
  render: h => h(App),
}).$mount('#app');

// Vue.prototype.$http=axios;
