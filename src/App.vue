<script src="./router/index.js"></script>
<template>
  <!--Router Page-->
  <div class="container">
    <router-view/>
    <div class="large-bg">
      <!--<img src="https://cn.bing.com/th?id=OHR.springequinox_ZH-CN1099430476_1920x1080.jpg&rf=NorthMale_1920x1080.jpg&pid=hp" alt="">-->
      <img src="https://cn.bing.com/th?id=OHR.BesenheideBDJ_ZH-CN2139380821_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp" alt="">
      <!--      <div class="test"></div>-->
      <!--<video src="https://az29176.vo.msecnd.net/videocontent/Xmas_Tree_Lights_NimiaRF_4K_951127_768_ZH-CN.mp4" autoplay="autoplay" loop="loop"></video>-->
    </div>
  </div>
</template>

<script>
  // import LunaUI from './assets/css/luna-ui.vue'
  export default {
    name: "luna-ui",
    components:{

    }
  }
</script>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
  }
  button{
    outline: 0;
    cursor: pointer;
    overflow: hidden;
  }
  a{
    text-decoration: none;
  }
  #app {
    /*Review Fontfamily&Smoother text*/
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body::-webkit-scrollbar,div::-webkit-scrollbar,table::-webkit-scrollbar {
    width: 5px;
    background-color: rgba(0, 0, 0, 0)
  }
  body::-webkit-scrollbar-thumb,div::-webkit-scrollbar-thumb,table::-webkit-scrollbar-thumb {
    background: silver;
    border-radius: 5rem
  }
  .large-bg{
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    z-index: -1;
    img{
      width: 100%;
      filter:brightness(0.8);
    }
    video{
      width: 100%;
      filter:brightness(0.5);
    }
  }
  @media (max-device-width:1024px) {
    .large-bg{
      img{
        height: 100vh;
        width: auto;
        position: fixed;
        right: -50%;
      }
      video{
        height: 100vh;
        width: auto;
        position: fixed;
        right: -50%;
      }
    }
  }
</style>
