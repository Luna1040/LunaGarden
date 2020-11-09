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
    { path: '/', name: 'Start', component: Start },
    { path: '/Start', name: 'Start', component: Start },
    { path: '/mStart', name: 'mStart', component: Start },
    // LunaUI的展示
    { path: '/LunaUI', name: 'LunaUI', component: LunaUI },
    { path: '/mLunaUI', name: 'LunaUI', component: LunaUI },
    // 待办事项面板
    { path: '/TodoPanel', name: 'TodoPanel', component: TodoPanel, meta: { index: 1 } },
    { path: '/mTodoPanel', name: 'mTodoPanel', component: mTodoPanel, meta: { index: 1 } },
    // 聊天页面
    { path: '/Chatting', name: 'Chatting', component: Chatting },
    { path: '/mChatting', name: 'mChatting', component: mChatting },
    // 汇报中心
    { path: '/Report', name: 'Report', component: Report },
    { path: '/mReport', name: 'mReport', component: mReport },
    // 引导页面
    { path: '/Guide', name: 'Guide', component: Guide, meta: { index: 999 } },
    { path: '/mGuide', name: 'mGuide', component: mGuide, meta: { index: 999 } },
    // 关于我们
    { path: '/AboutUs', name: 'AboutUs', component: AboutUs, meta: { index: 999 } },
    { path: '/mAboutUs', name: 'mAboutUs', component: mAboutUs, meta: { index: 999 } },
    // 登录
    { path: '/Login', name: 'Login', component: Login },
    { path: '/mLogin', name: 'mLogin', component: mLogin },
    // 注册
    { path: '/Register', name: 'Register', component: Register },
    { path: '/mRegister', name: 'mRegister', component: mRegister },
    // 忘记密码
    { path: '/Forgot', name: 'Forgot', component: Forgot },
    { path: '/mForgot', name: 'mForgot', component: mForgot },
    // 修改密码
    { path: '/Reset', name: 'Reset', component: ResetPsw },
    { path: '/mReset', name: 'mReset', component: mResetPsw },
    // Demos
    { path: '/ByteDemo', name: 'ByteDemo', component: ByteDemo },
    { path: '/mByteDemo', name: 'mByteDemo', component: mByteDemo },
    { path: '/Cursor', name: 'Cursor', component: ByteCursor },
    { path: '/mCursor', name: 'mCursor', component: ByteCursor },
    { path: '/Discuss', name: 'Discuss', component: ByteDiscuss },
    { path: '/mDiscuss', name: 'mDiscuss', component: ByteDiscuss },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'start') {
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
  } else {
    next()
  }
})
export default router
