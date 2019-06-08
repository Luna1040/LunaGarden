import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path:'/',
      name:'loading',
      component:()=>import("./loading.vue")
    },
    {
      path: '/app',
      name:'App',
      component: () => import("./App.vue"),
      children :[
        {
          path:'/home',
          name:'home',
          component : () => import("./home/home")
        },
        {
          path:'/mhome',
          name:'mhome',
          component : () => import("./home/mhome")
        },
        {
          path:'/padhome',
          name:'padhome',
          component : () => import("./home/padhome")
        },
        {
          path:'/guide',
          name:'guide',
          component : () => import("./home/homeGuide")
        },
        {
          path:'/m.guide',
          name:'m.guide',
          component : () => import("./home/homeGuide")
        },
        {
          path:'/pwKeeper',
          name:'pwKeeper',
          component:()=>import("./privateModules/privateModules")
        },
        {
          path:'/mpwKeeper',
          name:'mpwKeeper',
          component:()=>import("./privateModules/mprivateModules")
        },
        {
          path:'/login',
          name:'login',
          component:()=>import("./logmodule/login")
        },
        {
          path:'/mlogin',
          name:'mlogin',
          component:()=>import("./logmodule/mlogin")
        },
        {
          path:'/regist',
          name:'regist',
          component:()=>import("./logmodule/regist")
        },
        {
          path:'/mregist',
          name:'mregist',
          component:()=>import("./logmodule/mregist")
        },
        {
          path:'/test',
          name:'test',
          component:()=>import("./logmodule/test")
        },
        {
          path:'/admin',
          name:'admin',
          component:()=>import("./admin/admin")
        },
        {
          path:'/search',
          name:'search',
          component:()=>import("./privateModules/search")
        },
        {
          path:'/note',
          name:'note',
          component:()=>import("./note/note")
        },
      ]
    },
  ]
})