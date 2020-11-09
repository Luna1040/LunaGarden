<template>
  <div id="app" :class="{ LightTheme: theme === 'light', DarkTheme: theme === 'dark' }">
    <Header
      v-if="$route.name !== 'Start' && $route.name !== 'mStart' && $route.name !== 'Login' && $route.name !== 'mLogin' && $route.name !== 'Register' && $route.name !== 'mRegister'"
      :msg-header="$t('lang.titles.' + $route.name)" :user-info="userInfo" :menu-list="menuList"
      :is-collapse="isCollapse"></Header>
    <transition :name="transitionName">
      <router-view class="Router" :class="{collapse: isCollapse}"></router-view>
    </transition>
    <!-- 移动端通用footer -->
    <!--    <footer>-->
    <!--      <div-->
    <!--        class="activeBar"-->
    <!--        :class="{-->
    <!--          activeHome: footerActive === 'todoPanel',-->
    <!--          activeNote: footerActive === 'note',-->
    <!--          activeUI: footerActive === 'ui',-->
    <!--          activeDiary: footerActive === 'diary'-->
    <!--        }"-->
    <!--      ></div>-->
    <!--      <div class="figGroup">-->
    <!--        <router-link-->
    <!--          to="/mHome"-->
    <!--          :class="{ active: footerActive === 'todoPanel' }"-->
    <!--          @click="footerActive = 'todoPanel'"-->
    <!--        >-->
    <!--          <figure>-->
    <!--            <i class="iconfont"></i>-->
    <!--            <figcaption>Home</figcaption>-->
    <!--          </figure>-->
    <!--        </router-link>-->
    <!--        <router-link-->
    <!--          to="/mNote"-->
    <!--          :class="{ active: footerActive === 'note' }"-->
    <!--          @click="footerActive = 'note'"-->
    <!--        >-->
    <!--          <figure>-->
    <!--            <i class="iconfont"></i>-->
    <!--            <figcaption>Note</figcaption>-->
    <!--          </figure>-->
    <!--        </router-link>-->
    <!--        <router-link-->
    <!--          to="/mDiary"-->
    <!--          :class="{ active: footerActive === 'diary' }"-->
    <!--          @click="footerActive = 'diary'"-->
    <!--        >-->
    <!--          <figure>-->
    <!--            <i class="iconfont"></i>-->
    <!--            <figcaption>Diary</figcaption>-->
    <!--          </figure>-->
    <!--        </router-link>-->
    <!--        <router-link-->
    <!--          to="/mUI"-->
    <!--          :class="{ active: footerActive === 'ui' }"-->
    <!--          @click="footerActive = 'ui'"-->
    <!--        >-->
    <!--          <figure>-->
    <!--            <i class="iconfont"></i>-->
    <!--            <figcaption>Luna-UI</figcaption>-->
    <!--          </figure>-->
    <!--        </router-link>-->
    <!--      </div>-->
    <!--      <button-->
    <!--        class="fluidBtn"-->
    <!--        :class="{-->
    <!--          leftMove: footerActive === 'note',-->
    <!--          rightMove: footerActive === 'todoPanel'-->
    <!--        }"-->
    <!--      >-->
    <!--        <i class="iconfont" :class="{ show: footerActive === 'note' }"></i>-->
    <!--      </button>-->
    <!--    </footer>-->
  </div>
</template>
<script>
import './assets/css/public.scss'
import Header from './components/pc/activeHeader.vue'
import mHeader from './components/mobile/activeHeader'
import Start from '@/start'
import LunaUI from '@/views/UI/lunaUI'
import TodoPanel from '@/views/todoPanel/TodoPanel'
import mTodoPanel from '@/views/todoPanel/mTodoPanel'
import Chatting from '@/views/chatting/Chatting'
import mChatting from '@/views/chatting/mChatting'
import Report from '@/views/report/Report'
import mReport from '@/views/report/mReport'
import Guide from '@/views/guide/Guide'
import mGuide from '@/views/guide/mGuide'
import AboutUs from '@/views/about/About'
import mAboutUs from '@/views/about/mAbout'
import Login from '@/views/login/Login'
import mLogin from '@/views/login/mLogin'
import Register from '@/views/login/Register'
import mRegister from '@/views/login/mRegister'
import Forgot from '@/views/login/Forgot'
import mForgot from '@/views/login/mForgot'
import ResetPsw from '@/views/login/ResetPsw'
import mResetPsw from '@/views/login/mResetPsw'
import ByteDemo from '@/views/byteDemos/byteDemo'
import mByteDemo from '@/views/byteDemos/mByteDemo'
import ByteCursor from '@/views/byteDemos/byteCursor'
import ByteDiscuss from '@/views/byteDemos/byteDiscuss'

export default {
  name: 'app',
  data() {
    return {
      // footerActive: 'todoPanel',
      // firstAlert: false,
      // width177: true,
      transitionName: 'slide-right',
      // showSideBar: true,
      theme: 'light',
      // theme: 'dark',
      userInfo: {},
      isCollapse: false,
      menuList: [
        {
          id: 1,
          title: 'TodoPanel',
          icon: 'icon-LunaTodoPanel',
          link: '/Home'
        },
        {
          id: 2,
          title: 'ReportCenter',
          icon: 'icon-LunaReportCenter',
          link: '/Report'
        },
        {
          id: 3,
          title: 'TeamCenter',
          icon: 'icon-LunaTeamCenter',
          link: '/Home'
        },
        {
          id: 4,
          title: 'TaskPanel',
          icon: 'icon-LunaTaskPanel',
          link: '/Home'
        },
        {
          id: 5,
          title: 'RequestPanel',
          icon: 'icon-LunaRequestPanel',
          link: '/Home'
        },
        {
          id: 6,
          title: 'TeamControl',
          icon: 'icon-LunaTeamControl',
          link: '/Home'
        },
        {
          id: 7,
          title: 'LunaUI',
          icon: 'icon-LunaLunaUI',
          link: '/Home'
        },
        {
          id: 8,
          title: 'AboutUs',
          icon: 'icon-LunaAboutUs',
          link: '/Home'
        }
      ]
    }
  },
  components: {
    Header,
    mHeader,
  },
  created() {
    // 动态路由
    let arr = [
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
    this.$router.options.routes = arr
    this.$router.addRoutes(arr)
    this.$router.push(window.location.hash.split('#')[1])
    if (localStorage.getItem('firstLoad') === null) {
      // 直接生成基于localstorage的todoList
      localStorage.setItem('todoList', JSON.stringify([]))
      localStorage.setItem('firstLoad', JSON.stringify(1))
      this.$router.push('/Start')
    } else {
      // 若local中无todoList，则创建
      if (!localStorage.getItem('todoList')) {
        localStorage.setItem('todoList', JSON.stringify([]))
      }
      // 检测是否有用户信息留存
      if (localStorage.getItem('userInfo') === null) {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        // 若用户信息内有用户id
        if (userInfo.uid) {
          // 刷新登录信息
          this.getUserInfo(userInfo.uid).then((res) => {
            this.userInfo = res.data
          })
        }
      } else {
        localStorage.setItem('userInfo', JSON.stringify({}))
      }
    }
  },
  watch: {
    $route(to, from) {
      // 切换动画
      if (to.meta.index <= from.meta.index) {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
      this.$router.isBack = false
    }
  },
  mounted() {
    // 若有新消息，则向桌面发送通知
    // const notify = new Notification('花神通讯：花神给您发送了一条消息', {
    //   body: '不给人急啊？',
    //   lang: 'zh-CN',
    //   icon:
    //     'userIcon.jpg'
    // })
    // notify.onshow = function () {
    //   // 通知已经发送至桌面
    // }
    // notify.onclick = function () {
    //   // 点击了通知
    // }
    // notify.onerror = function () {
    //   // 手动关闭
    //   notify.close()
    // }
    // notify.onclose = function () {
    //   // console.log('close')
    // }
    if (window.Notification) {
      // 支持
      this.isAllowNotify()
    } else {
      // 不支持
    }
    // 监听窗口改变，路由跳转实时导向移动端或pc端
    window.onresize = () => {
      if (window.innerWidth >= window.innerHeight) {
        if (this.$route.name.indexOf('m') === 0) {
          this.$router.push(this.$route.name.substr(1))
        }
      } else {
        if (this.$route.name.indexOf('m') !== 0) {
          this.$router.push('m' + this.$route.name)
        }
      }
    }
    window.onmousewheel = (ev) => {
      if (ev.wheelDeltaY < 0) {
        this.isCollapse = true
        return
      }
      this.isCollapse = false
    }
  },
  methods: {
    //
    isAllowNotify() {
      if (window.Notification && Notification.permission !== 'denied') {
        Notification.requestPermission(function(status) {
          //若status非granted，则为拒绝通知，保存至线上用户信息，同时更新vueX状态
          // if (status === 'granted') {
          // } else {
          //   const n = new Notification(
          //     '拒绝后无法获取最新消息通知。'
          //   )
          // }
        })
      }
    }
  }
}
</script>
<style lang="scss">

</style>
