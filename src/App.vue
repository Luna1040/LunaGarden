<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="Router"></router-view>
    </transition>
    <div
      :class="{ bcImage177: width177 === 177 , bcImage16: width177 === 16 , bcImage0: width177 === 0}"
    >
      <img src="bc1.jpg" alt />
    </div>
    <!-- 移动端通用footer -->
    <footer>
      <div
        class="activeBar"
        :class="{activeHome : footerActive === 'home' , activeNote : footerActive === 'note' , activeUI : footerActive === 'ui' , activeDiary : footerActive === 'diary'}"
      ></div>
      <div class="figGroup">
        <router-link
          to="/mHome"
          :class="{active : footerActive === 'home'}"
          @click="footerActive = 'home'"
        >
          <figure>
            <i class="iconfont"></i>
            <figcaption>Home</figcaption>
          </figure>
        </router-link>
        <router-link
          to="/mNote"
          :class="{active : footerActive === 'note'}"
          @click="footerActive = 'note'"
        >
          <figure>
            <i class="iconfont"></i>
            <figcaption>Note</figcaption>
          </figure>
        </router-link>
        <router-link
          to="/mDiary"
          :class="{active : footerActive === 'diary'}"
          @click="footerActive = 'diary'"
        >
          <figure>
            <i class="iconfont"></i>
            <figcaption>Diary</figcaption>
          </figure>
        </router-link>
        <router-link
          to="/mUI"
          :class="{active : footerActive === 'ui'}"
          @click="footerActive = 'ui'"
        >
          <figure>
            <i class="iconfont"></i>
            <figcaption>Luna-UI</figcaption>
          </figure>
        </router-link>
      </div>
      <button
        class="fluidBtn"
        :class="{leftMove : footerActive === 'note' , rightMove : footerActive === 'home'}"
      >
        <i class="iconfont" :class="{show : footerActive === 'note'}"></i>
      </button>
    </footer>
    <Modal v-model="firstAlert" @on-cancel="hideModal">
      <div slot="header">
        <p>{{ $t('lang.firstAlert.attention') }}</p>
      </div>
      <div>
        <p>{{ $t('lang.firstAlert.line1') }}</p>
        <p>{{ $t('lang.firstAlert.line2') }}</p>
        <p class="error desc">{{ $t('lang.firstAlert.line3') }}</p>
        <p class="error desc">{{ $t('lang.firstAlert.line4') }}</p>
      </div>
      <div slot="footer">
        <button v-ripple class="normalButton" @click="hideModal">{{ $t('lang.firstAlert.no') }}</button>
        <button v-ripple class="primaryButton" @click="toGuide">{{ $t('lang.firstAlert.sure') }}</button>
      </div>
    </Modal>
  </div>
</template>
<script>
import './assets/css/public.scss'

export default {
  name: 'app',
  data () {
    return {
      footerActive: 'home',
      firstAlert: false,
      width177: true,
      transitionName: 'slide-right'
    }
  },
  created () {
    // 计算窗口比例调整背景图
    if (window.innerWidth / window.innerHeight > 1.777) {
      this.width177 = 177
    } else if (window.innerWidth / window.innerHeight < 1) {
      this.width177 = 0
    } else {
      this.width177 = 16
    }
    // 是否为初次访问
    // 根据localstorage的预设凭据初次判断
    if (localStorage.getItem('firstLoad')) {
      // 根据localstorage中必须的内容格式取值，若没有，则首先赋值
      if (!localStorage.getItem('todoList')) {
        localStorage.setItem('todoList', JSON.stringify([]))
      }
      if (!localStorage.getItem('businessList')) {
        localStorage.setItem('businessList', JSON.stringify([]))
      }
      if (localStorage.getItem('userInfo')) {
        if (JSON.parse(localStorage.getItem('userInfo')).uid) {
          this.getUserInfo(JSON.parse(localStorage.getItem('userInfo')).uid)
        }
      } else {
        localStorage.setItem('userInfo', JSON.stringify({}))
      }
    } else {
      // 初次访问，创建默认数据格式保存于localstorage中
      localStorage.setItem('todoList', JSON.stringify([]))
      localStorage.setItem('businessList', JSON.stringify([]))
      // 创建凭据证明下次打开时非初次访问
      localStorage.setItem('firstLoad', JSON.stringify(1))
      // 提示是否进入引导模式
      this.firstAlert = true
    }

    // 若不是，判断是否登录

    // 若未登录，从localstorage获取内容渲染

    // 若已登录，从服务器端获取内容
  },
  watch: {
    $route (to, from) {
      // 切换动画
      if (to.meta.index <= from.meta.index) {
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
      this.$router.isBack = false
    }
  },
  mounted () {
    window.onresize = () => {
      if (window.innerWidth / window.innerHeight >= 1.777) {
        this.width177 = 177
      } else if (window.innerWidth / window.innerHeight < 1) {
        this.width177 = 0
      } else {
        this.width177 = 16
      }
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
    hideModal () {
      this.firstAlert = false
    },
    toGuide () {
      this.$router.push('aboutUs')
      this.hideModal()
    }
  }
}
</script>
<style lang="scss">
  .Router {
    width: 100%;
    position: absolute;
    z-index: 0;
    height: 100%;
    transition: all 0.5s  cubic-bezier(0.8, 0, 0.2, 1) 0s;
    will-change: transform;
    top: 0;
    backface-visibility: hidden;
    overflow: hidden;
  }
  .slide-left-enter,
  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
</style>
