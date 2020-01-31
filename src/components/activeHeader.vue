<template>
  <header :class="theme">
    <!--        User Area-->
    <div class="userArea">
      <div class="userIcon">
        <img :src="userIcon" alt />
      </div>
      <div class="information">
        <div class="userInfo">
          <!--                    Username Area-->
          <span class="userName">{{userName}}</span>
          <!--                    Viper Icon Area-->
          <div class="VIPer" v-show="isViper === 'true'">
            <span class="font-Gothic">VIP</span>
          </div>
        </div>
        <div class="netWorkStatus">
          <!--                        Network status-->
          <i
                  class="iconfont"
                  :class="{'icon-HotelDetails_icn_Internet' : navigator.onLine === true , 'icon-infonointernet' : navigator.onLine === false}"
          ></i>
          <span v-show="navigator.onLine === true">{{$t('lang.titles.online')}}</span>
          <span v-show="navigator.onLine === false">{{$t('lang.titles.offline')}}</span>
        </div>
      </div>
    </div>
    <!--        Title-->
    <div class="title">
      <h2>{{msgHeader}}</h2>
      <!-- <img :src="imgSrc" alt /> -->
    </div>
    <div class="guide">
      <div class="btnGroup">
        <div @click="setLang('en-US')" :class="{languageActive: $i18n.locale !== 'zh-CN'}">
          <img src="../assets/icons/language-english.svg" alt />
          <div class="languageBlackHover"></div>
        </div>
        <div @click="setLang('zh-CN')" :class="{languageActive: $i18n.locale === 'zh-CN'}">
          <img src="../assets/icons/language-chinese.svg" alt />
          <div class="languageBlackHover"></div>
        </div>
      </div>
      <router-link to="AboutUs">
        <Button color="#eb7290" background="#FFFFFF" icon="iconfont icon-guide" pre :width="90">
          <span>{{$t('lang.titles.guide')}}</span>
        </Button>
      </router-link>
    </div>
  </header>
</template>

<script>
  import { publicApi } from "../assets/js/url.js";

  export default {
    name: "app",
    data() {
      return {
        navigator: {
          onLine: true
        },
        imgSrc: "",
        langSlideDown: ""
      };
    },
    mounted() {
      this.navigator.onLine = window.navigator.onLine;
      setInterval(this.getNavigator, 1000);
      this.getData(publicApi.imgCode, {}).then(res => {
        this.imgSrc = res.data;
      });
    },
    beforeDestroy() {
      if (this.timer) {
        //如果定时器还在运行 或者直接关闭，不用判断
        clearInterval(this.timer); //关闭
      }
    },
    methods: {
      cgLang() {
        this.langSlideDown = this.langSlideDown !== true;
      },
      setLang(value) {
        this.$i18n.locale = value;
        this.langSlideDown = false;
      },
      getNavigator() {
        this.navigator.onLine = window.navigator.onLine;
      }
    },
    filters: {
      languageTrans(value) {
        if (value === "zh-CN") {
          value = "中文";
        } else {
          value = "English";
        }
        return value;
      }
    },
    props: {
      theme: {
        type: String,
        default: "glass"
      },
      msgHeader: {
        type: String,
        required: true
      },
      isViper: {
        type: String,
        default: "false"
      },
      userIcon: {
        type: String,
        default: ""
      },
      userName: {
        type: String,
        default: "Visitor"
      },
      userLanguage: {
        type: String,
        default: "En"
      }
    }
  };
</script>

<style>
</style>
