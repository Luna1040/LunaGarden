<template>
  <div id="app" :class="{ LightTheme: $store.state.theme === 'light', DarkTheme: $store.state.theme === 'dark' }">
    <Header
      v-if="$route.name !== 'Start' && $route.name !== 'mStart' && $route.name !== 'Login' && $route.name !== 'mLogin' && $route.name !== 'Register' && $route.name !== 'mRegister'"
      :msg-header="$t('lang.titles.' + $route.name)" :user-info="$store.state.userInfo" :menu-list="menuList"
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

export default {
  name: 'app',
  data() {
    return {
      // footerActive: 'todoPanel',
      // firstAlert: false,
      // width177: true,
      transitionName: 'slide-right',
      // showSideBar: true,
      // theme: 'light',
      // theme: 'dark',
      isCollapse: false,
      menuList: [
        {
          id: 1,
          title: 'TodoPanel',
          icon: 'icon-LunaTodoPanel',
          link: '/TodoPanel'
        },
        {
          id: 2,
          title: 'ReportCenter',
          icon: 'icon-LunaReportCenter',
          link: '/ReportCenter'
        },
        {
          id: 3,
          title: 'TeamCenter',
          icon: 'icon-LunaTeamCenter',
          link: '/TeamCenter'
        },
        {
          id: 4,
          title: 'TaskPanel',
          icon: 'icon-LunaTaskPanel',
          link: '/TaskPanel'
        },
        {
          id: 5,
          title: 'RequestPanel',
          icon: 'icon-LunaRequestPanel',
          link: '/RequestPanel'
        },
        {
          id: 6,
          title: 'TeamControl',
          icon: 'icon-LunaTeamControl',
          link: '/TeamControl'
        },
        {
          id: 7,
          title: 'LunaUI',
          icon: 'icon-LunaLunaUI',
          link: '/LunaUI'
        },
        {
          id: 8,
          title: 'AboutUs',
          icon: 'icon-LunaAboutUs',
          link: '/AboutUs'
        }
      ]
    }
  },
  components: {
    Header,
    // mHeader,
  },
  created() {
    // 检测是否有用户信息留存
    // 从localstorage取userInfo获取id后，刷新用户信息
    if(this.getLocal('userInfo') !== null) {
      // 若用户信息内有用户id
      if(this.getLocal('userInfo').uid) {
        //有 -> 获取设置&获取菜单 -> publicReq.js
        this.getUserInfo(this.getLocal('userInfo').uid)
      } else {
        this.setLocal('userInfo', {})
        // 没有 -> 跳转登录
        this.$router.push('/Login')
      }
    } else {
      this.setLocal('userInfo', {})
      //没有留存 -> 跳转登录
      this.$router.push('/Login')
    }
    //根据时间设置主题
    // 设置时间对象
    const date = new Date()
    const Month = date.getMonth() + 1
    const Hour = date.getHours() + 1
    // 初始化调用一次判断是否需要切换主题
    this.ThemeChange()
    // 定时器5分钟调用一次判断是否需要切换主题
    setInterval(() => {this.ThemeChange()}, 30000)
  },
  watch: {
    $route(to, from) {
      // 路由跳转时，判断是否切换pc移动端页面
      if (window.innerWidth >= window.innerHeight) {
        if (this.$route.name.indexOf('m') === 0) {
          this.$router.push(this.$route.name.substr(1))
        }
      } else {
        if (this.$route.name.indexOf('m') !== 0) {
          this.$router.push('m' + this.$route.name)
        }
      }
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
    },
    ThemeChange(Month, Hour){
      // 首先判断季节
      if(Month < 2 || Month > 10) {
        // 冬季
        if(Hour < 7 || Hour > 17) {
          this.commitX('changeTheme', 'dark')
        } else {
          this.commitX('changeTheme', 'light')
        }
      } else {
        // 夏季
        if(Hour < 6 || Hour > 19) {
          this.commitX('changeTheme', 'dark')
        } else {
          this.commitX('changeTheme', 'light')
        }
      }
    }
  }
}
</script>
<style lang="scss">

</style>
