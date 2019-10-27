<template>
    <header :class="theme">
        <!--        User Area-->
        <div class="userArea">
            <div class="userIcon">
                <img :src="userIcon" alt="">
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
                    <i class="iconfont"
                       :class="{'icon-HotelDetails_icn_Internet' : navigator.onLine === true , 'icon-infonointernet' : navigator.onLine === false}"></i>
                    <span v-show="navigator.onLine === true">{{$t('lang.titles.online')}}</span>
                    <span v-show="navigator.onLine === false">{{$t('lang.titles.offline')}}</span>
                </div>
            </div>
        </div>
        <!--        Title-->
        <div class="title">
            <h2>{{msgHeader}}</h2>
            <div class="cgLang" @click="cgLang">{{$i18n.locale | languageTrans}}<i></i></div>
            <ul class="langSelect"
                :class="{langSlideDown: langSlideDown === true , langSlideUp: langSlideDown === false , '' : langSlideDown === ''}">
                <li v-waves @click="setLang('en-US')">English</li>
                <li v-waves @click="setLang('zh-CN')">中文</li>
            </ul>
        </div>
        <div class="guide">
            <router-link to="guide"><i class="iconfont icon-guide"></i>{{$t('lang.titles.guide')}}</router-link>
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
        langSlideDown: '',
      }
    },
    mounted() {
      this.navigator.onLine = window.navigator.onLine;
      setInterval(this.getNavigator, 1000)
    },
    beforeDestroy() {
      if(this.timer) { //如果定时器还在运行 或者直接关闭，不用判断
        clearInterval(this.timer); //关闭
      }
    },
    methods: {
      cgLang() {
        this.langSlideDown = this.langSlideDown !== true;
      },
      setLang(value) {
        this.$i18n.locale = value;
        this.langSlideDown = false
      },
      getNavigator(){
        this.navigator.onLine = window.navigator.onLine;
      }
    },
    filters: {
      languageTrans(value) {
        if(value === 'zh-CN'){
          value = '中文'
        }else {
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
    },
  }
</script>

<style>
</style>
