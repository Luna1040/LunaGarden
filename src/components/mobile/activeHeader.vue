<template>
  <header class="mHeader" :class="theme">
    <!--        User Area-->
    <div class="userArea">
      <div class="userIcon">
        <img :src="userIcon" alt />
      </div>
      <div class="information">
        <div class="netWorkStatus" :class="{networkError: !navigator.onLine}">
          <i
                  class="iconfont"
                  :class="{'icon-HotelDetails_icn_Internet' : navigator.onLine , 'icon-infonointernet' : !navigator.onLine}"
          ></i>
        </div>
      </div>
    </div>
    <div class="title">
      <h2>{{msgHeader}}</h2>
    </div>
    <div class="guide">
      <div class="btnGroup">
        <div>
          <img v-if="$i18n.locale === 'zh-CN' && !langSlideDown" src="../../assets/icons/language-chinese.svg" @click="langSlideDown = true"/>
          <img v-else-if="$i18n.locale === 'zh-CN' && langSlideDown" src="../../assets/icons/language-english.svg" @click="setLang('en-US')" />
          <img v-else-if="$i18n.locale === 'en-US' && !langSlideDown" src="../../assets/icons/language-english.svg" @click="langSlideDown = true"/>
          <img v-else-if="$i18n.locale === 'en-US' && langSlideDown" src="../../assets/icons/language-chinese.svg" @click="setLang('zh-CN')" />
        </div>
        <transition name="langSlideDown">
        <div v-show="langSlideDown">
          <img v-if="$i18n.locale === 'zh-CN' && langSlideDown" src="../../assets/icons/language-chinese.svg" @click="setLang('zh-CN')" alt />
          <img v-if="$i18n.locale === 'en-US' && langSlideDown" src="../../assets/icons/language-english.svg" @click="setLang('en-US')" alt />
        </div>
        </transition>
      </div>
      <Button corner="round" color="#eb7290" background="#FFFFFF" @click="toAbout" :width="32" :height="32">
        <i class="iconfont icon-guide"></i>
      </Button>
    </div>
  </header>
</template>

<script>
import { publicApi } from '../../assets/js/url.js'

export default {
  name: 'app',
  data () {
    return {
      navigator: {
        onLine: true
      },
      imgSrc: '',
      langSlideDown: false
    }
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

<style>
</style>
