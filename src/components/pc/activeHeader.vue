<template>
  <header class="header">
    <div class="userArea">
      <div class="userIcon" @click="showSettings">
        <img src="userIcon.jpg" alt="" />
      </div>
    </div>
    <div class="title">
      <p>Luna Garden</p>
      <h2>{{ msgHeader }}</h2>
    </div>
    <nav class="menuGroup">
      <figure class="menuItem" v-for="i in menuList" :key="i.id">
        <i class="iconfont" :class="i.icon"></i>
        <figcaption>{{ i.title }}</figcaption>
      </figure>
    </nav>
    <div class="guide">
      <div class="btnGroup">
        <div :class="{ languageActive: $i18n.locale !== 'zh-CN' }" @click="setLang('en-US')">
          <img src="../../assets/icons/language-english.svg" alt />
        </div>
        <div :class="{ languageActive: $i18n.locale === 'zh-CN' }" @click="setLang('zh-CN')">
          <img src="../../assets/icons/language-chinese.svg" alt />
        </div>
      </div>
      <Button color="#eb7290" background="#FFFFFF" icon="iconfont icon-guide" pre :width="130" @click="toAbout">
        <span>{{ $t('lang.titles.Guide') }}</span>
      </Button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      navigator: {
        onLine: true
      },
      imgSrc: '',
      langSlideDown: '',
    }
  },
  created() {
    this.$emit('cgLang', this.$t('lang'))
  },
  mounted() {
    this.navigator.onLine = window.navigator.onLine
    setInterval(this.getNavigator, 1000)
    // this.getData(publicApi.imgCode, {}).then(res => {
    //   this.imgSrc = res.data
    // })
  },
  beforeDestroy() {
    if (this.timer) {
      // 如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer) // 关闭
    }
  },
  methods: {
    showSettings() {},
    cgLang() {
      this.langSlideDown = this.langSlideDown !== true
    },
    setLang(value) {
      this.$i18n.locale = value
    },
    getNavigator() {
      this.navigator.onLine = window.navigator.onLine
    },
    toAbout() {
      this.$router.push('AboutUs')
    }
  },
  filters: {
    languageTrans(value) {
      if (value === 'zh-CN') {
        value = '中文'
      } else {
        value = 'English'
      }
      return value
    }
  },
  props: {
    msgHeader: {
      type: String,
      required: true
    },
    userInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    menuList: {
      type: Object,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style></style>
