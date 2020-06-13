import Vue from 'vue'
import Router from 'vue-router'
// 启动画面
import Start from './start.vue'
// 主页引入
import Home from './views/home/Home.vue'
import mHome from './views/home/mHome.vue'
// 笔记本引入
import Note from './views/note/Note.vue'
import mNote from './views/note/mNote.vue'
// 日记引入
import Diary from './views/diary/Diary.vue'
import mDiary from './views/diary/mDiary.vue'
// 引导模式引入
import Guide from './views/guide/Guide.vue'
import mGuide from './views/guide/mGuide.vue'
// 用户中心引入
import User from './views/user/UserCenter.vue'
import mUser from './views/user/mUserCenter.vue'
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
// LunaUI
import LunaUI from './views/UI/lunaUI.vue'
// 字节测试
import ByteDemo from './views/byteDemos/byteDemo'
import mByteDemo from './views/byteDemos/mByteDemo'
import ByteCursor from './views/byteDemos/byteCursor'
import ByteDiscuss from './views/byteDemos/byteDiscuss'

Vue.use(Router)

const router = new Router({
  routes: [
    // 首屏展示加载动画
    { path: '/', name: 'start', component: Start },
    { path: '/ByteDemo', name: 'ByteDemo', component: ByteDemo },
    { path: '/mByteDemo', name: 'mByteDemo', component: mByteDemo },
    { path: '/Cursor', name: 'Cursor', component: ByteCursor },
    { path: '/mCursor', name: 'mCursor', component: ByteCursor },
    { path: '/Discuss', name: 'Discuss', component: ByteDiscuss },
    { path: '/mDiscuss', name: 'mDiscuss', component: ByteDiscuss },
    { path: '/LunaUI', name: 'LunaUI', component: LunaUI },
    { path: '/mLunaUI', name: 'LunaUI', component: LunaUI },
    // PC页面统一整合
    { path: '/Home', name: 'Home', component: Home, meta: { index: 0 } },
    { path: '/Guide', name: 'Guide', component: Guide, meta: { index: 999 } },
    { path: '/User', name: 'User', component: User },
    { path: '/Note', name: 'Note', component: Note },
    { path: '/Diary', name: 'Diary', component: Diary },
    // 移动端页面统一整合
    { path: '/mHome', name: 'mHome', component: mHome, meta: { index: 0 } },
    { path: '/mGuide', name: 'mGuide', component: mGuide, meta: { index: 999 } },
    { path: '/mUser', name: 'mUser', component: mUser },
    { path: '/mNote', name: 'mNote', component: mNote },
    { path: '/mDiary', name: 'mDiary', component: mDiary },
    { path: '/AboutUs', name: 'AboutUs', component: AboutUs, meta: { index: 999 } },
    { path: '/mAboutUs', name: 'mAboutUs', component: mAboutUs, meta: { index: 999 } },
    { path: '/Login', name: 'Login', component: Login },
    { path: '/mLogin', name: 'mLogin', component: mLogin },
    { path: '/Register', name: 'Register', component: Register },
    { path: '/mRegister', name: 'mRegister', component: mRegister },
    { path: '/Forgot', name: 'Forgot', component: Forgot },
    { path: '/mForgot', name: 'mForgot', component: mForgot },
    { path: '/Reset', name: 'Reset', component: ResetPsw },
    { path: '/mReset', name: 'mReset', component: mResetPsw },
    { path: '/Chatting', name: 'Chatting', component: Chatting },
    { path: '/mChatting', name: 'mChatting', component: mChatting }
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
