<template>
  <div id="app" :class="{ LightTheme: theme === 'light', DarkTheme: theme === 'dark' }">
    <Header :msg-header="$t('lang.titles.' + $route.name)" v-if="$route.name !== 'Start' && $route.name !== 'mStart' && $route.name !== 'Login' && $route.name !== 'mLogin' && $route.name !== 'Register' && $route.name !== 'mRegister'" :user-info="userInfo" :menu-list="menuList"></Header>
    <transition :name="transitionName">
      <router-view class="Router"></router-view>
    </transition>
    <!-- 移动端通用footer -->
    <!--    <footer>-->
    <!--      <div-->
    <!--        class="activeBar"-->
    <!--        :class="{-->
    <!--          activeHome: footerActive === 'home',-->
    <!--          activeNote: footerActive === 'note',-->
    <!--          activeUI: footerActive === 'ui',-->
    <!--          activeDiary: footerActive === 'diary'-->
    <!--        }"-->
    <!--      ></div>-->
    <!--      <div class="figGroup">-->
    <!--        <router-link-->
    <!--          to="/mHome"-->
    <!--          :class="{ active: footerActive === 'home' }"-->
    <!--          @click="footerActive = 'home'"-->
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
    <!--          rightMove: footerActive === 'home'-->
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

export default {
  name: 'app',
  data() {
    return {
      // footerActive: 'home',
      // firstAlert: false,
      // width177: true,
      transitionName: 'slide-right',
      // showSideBar: true,
      theme: 'light',
      userInfo: {},
      menuList: [
        {
          id: 1,
          title: 'Todo Panel',
          icon: 'icon-cancel',
          link: '/Home'
        },
        {
          id: 2,
          title: 'Report Center',
          icon: 'icon-cancel',
          link: '/Report'
        },
        {
          id: 3,
          title: 'Team Center',
          icon: 'icon-cancel',
          link: '/Home'
        },
        {
          id: 4,
          title: 'Task Panel',
          icon: 'icon-cancel',
          link: '/Home'
        },
        {
          id: 5,
          title: 'Request Panel',
          icon: 'icon-cancel',
          link: '/Home'
        },
        {
          id: 6,
          title: 'Team Control',
          icon: 'icon-cancel',
          link: '/Home'
        },
        {
          id: 7,
          title: 'Luna UI',
          icon: 'icon-cancel',
          link: '/Home'
        },
        {
          id: 8,
          title: 'About Us',
          icon: 'icon-cancel',
          link: '/Home'
        },
      ]
    }
  },
  components: {
    Header
  },
  created() {
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
      if (!localStorage.getItem('userInfo')) {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'))
        // 若用户信息内有用户id
        if (userInfo.uid) {
          // 刷新登录信息
          this.getUserInfo(userInfo.uid).then((res) => {
            this.userInfo = res.data
          })
        }
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
  },
  methods: {
    //
    isAllowNotify() {
      if (window.Notification && Notification.permission !== 'denied') {
        Notification.requestPermission(function (status) {
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
