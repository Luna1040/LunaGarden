import Vue from 'vue'
import Router from 'vue-router'
// 启动画面
import Start from './start.vue'
// 主页引入
import TodoPanel from './views/todoPanel/TodoPanel.vue'
import mTodoPanel from './views/todoPanel/mTodoPanel.vue'
// 引导模式
import Guide from './views/guide/Guide.vue'
import mGuide from './views/guide/mGuide.vue'
// 关于我们
import AboutUs from './views/about/About.vue'
import mAboutUs from './views/about/mAbout.vue'
// 登录相关
import Login from './views/login/Login.vue'
import mLogin from './views/login/mLogin.vue'
import Register from './views/login/Register.vue'
import mRegister from './views/login/mRegister.vue'
import Forgot from './views/login/Forgot.vue'
import mForgot from './views/login/mForgot.vue'
import ResetPsw from './views/login/ResetPsw.vue'
import mResetPsw from './views/login/mResetPsw.vue'
import Chatting from './views/chatting/Chatting.vue'
import mChatting from './views/chatting/mChatting.vue'
// css
import LunaUI from './views/UI/lunaUI.vue'
import Report from './views/report/Report.vue'
import mReport from './views/report/mReport.vue'
// 字节测试
import ByteDemo from './views/byteDemos/byteDemo'
import mByteDemo from './views/byteDemos/mByteDemo'
import ByteCursor from './views/byteDemos/byteCursor'
import ByteDiscuss from './views/byteDemos/byteDiscuss'

Vue.use(Router)

const router = new Router({
  routes: [
    // 首屏展示加载动画
    { path: '/', name: 'Start', component: Start, meta: { index: 0 } },
    { path: '/Start', name: 'Start', component: Start, meta: { index: 0 } },
    { path: '/mStart', name: 'mStart', component: Start, meta: { index: 0 } },
    // 登录
    { path: '/Login', name: 'Login', component: Login, meta: { index: 1 } },
    { path: '/mLogin', name: 'mLogin', component: mLogin, meta: { index: 1 } },
    // 注册
    { path: '/Register', name: 'Register', component: Register, meta: { index: 2 } },
    { path: '/mRegister', name: 'mRegister', component: mRegister, meta: { index: 2 } },
    // 忘记密码
    { path: '/Forgot', name: 'Forgot', component: Forgot, meta: { index: 3 } },
    { path: '/mForgot', name: 'mForgot', component: mForgot, meta: { index: 3 } },
    // 修改密码
    { path: '/Reset', name: 'Reset', component: ResetPsw, meta: { index: 4 } },
    { path: '/mReset', name: 'mReset', component: mResetPsw, meta: { index: 4 } },
    // Demos
    { path: '/ByteDemo', name: 'ByteDemo', component: ByteDemo, meta: { index: 998 } },
    { path: '/mByteDemo', name: 'mByteDemo', component: mByteDemo, meta: { index: 998 } },
    { path: '/Cursor', name: 'Cursor', component: ByteCursor, meta: { index: 997 } },
    { path: '/mCursor', name: 'mCursor', component: ByteCursor, meta: { index: 997 } },
    { path: '/Discuss', name: 'Discuss', component: ByteDiscuss, meta: { index: 996 } },
    { path: '/mDiscuss', name: 'mDiscuss', component: ByteDiscuss, meta: { index: 996 } }
  ]
})

router.beforeEach((to, from, next) => {
  // 路由分别引导
  if (window.innerWidth > window.innerHeight) {
    if (to.name.indexOf('m') === 0) {
      next({
        name: to.name.substr(1)
      })
    } else {
      next()
    }
  } else {
    if (to.name.indexOf('m') !== 0) {
      next({
        name: 'm' + to.name
      })
    } else {
      next()
    }
  }
})
export default router
