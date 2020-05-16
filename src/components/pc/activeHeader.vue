<template>
  <header class="header" :class="theme">
    <!--        User Area-->
    <div class="userArea">
      <div class="userIcon">
        <img :src="userIcon" alt />
      </div>
      <div class="information">
        <div class="userInfo">
          <!--                    Username Area-->
          <span class="userName">{{ userName }}</span>
          <!--                    Viper Icon Area-->
          <!--          <div class="VIPer font-Gothic" v-show="isViper === 'true'">-->
          <!--            VIP-->
          <!--          </div>-->
        </div>
        <div class="netWorkStatus" :class="{ networkError: !navigator.onLine }">
          <!--                        Network status-->
          <i
            class="iconfont"
            :class="{
              'icon-HotelDetails_icn_Internet': navigator.onLine,
              'icon-infonointernet': !navigator.onLine,
            }"
          ></i>
          <span v-show="navigator.onLine">{{ $t("lang.titles.online") }}</span>
          <span v-show="!navigator.onLine">{{
            $t("lang.titles.offline")
          }}</span>
        </div>
      </div>
    </div>
    <!--        Title-->
    <div class="title">
      <h2>{{ msgHeader }}</h2>
      <!-- <img :src="imgSrc" alt /> -->
    </div>
    <div class="guide">
      <div class="btnGroup">
        <div
          :class="{ languageActive: $i18n.locale !== 'zh-CN' }"
          @click="setLang('en-US')"
        >
          <img src="../../assets/icons/language-english.svg" alt />
        </div>
        <div
          :class="{ languageActive: $i18n.locale === 'zh-CN' }"
          @click="setLang('zh-CN')"
        >
          <img src="../../assets/icons/language-chinese.svg" alt />
        </div>
      </div>
      <Button
        color="#eb7290"
        background="#FFFFFF"
        icon="iconfont icon-guide"
        pre
        :width="130"
        @click="toAbout"
      >
        <span>{{ $t("lang.titles.guide") }}</span>
      </Button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      navigator: {
        onLine: true
      },
      imgSrc: '',
      langSlideDown: ''
    }
  },
  created () {
    this.$emit('cgLang', this.$t('lang'))
  },
  mounted () {
    this.navigator.onLine = window.navigator.onLine
    setInterval(this.getNavigator, 1000)
    // this.getData(publicApi.imgCode, {}).then(res => {
    //   this.imgSrc = res.data
    // })
  },
  beforeDestroy () {
    if (this.timer) {
      // 如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer) // 关闭
    }
  },
  methods: {
    cgLang () {
      this.langSlideDown = this.langSlideDown !== true
    },
    setLang (value) {
      this.$i18n.locale = value
      this.langSlideDown = false
      this.$emit('cgLang', this.$t('lang'))
    },
    getNavigator () {
      this.navigator.onLine = window.navigator.onLine
    },
    toAbout () {
      this.$router.push('AboutUs')
    }
  },
  filters: {
    languageTrans (value) {
      if (value === 'zh-CN') {
        value = '中文'
      } else {
        value = 'English'
      }
      return value
    }
  },
  props: {
    theme: {
      type: String,
      default: 'glass'
    },
    msgHeader: {
      type: String,
      required: true
    },
    isViper: {
      type: String,
      default: 'false'
    },
    userIcon: {
      type: String,
      default: ''
    },
    userName: {
      type: String,
      default: 'Visitor'
    },
    userLanguage: {
      type: String,
      default: 'En'
    }
  }
}
</script>

<style></style>
