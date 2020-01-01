<template>
  <div class="login">
    <Header
      :msg-header="$t('lang.titles.login')"
      user-icon="userIcon.jpg"
      user-name="Luna Lovegood"
      is-viper="true"
      user-language="English"
    ></Header>
    <div class="loginSpare">
      <p class="desc">{{ $t('lang.login.desc') }}</p>
      <p class="desc">{{ $t('lang.login.desc2') }}</p>
      <div class="loginForm">
        <input type="text" :placeholder="$t('lang.login.userName')" />
        <input type="password" :placeholder="$t('lang.login.password')" />
        <button class="button loginBtn" @click="loginConfirm">{{ $t('lang.login.login') }}</button>
      </div>
      <div class="linkGroup">
          <p class="pink">{{ $t('lang.login.register') }}</p>
        <router-link to="register" class="button">{{ $t('lang.login.register2') }}</router-link>
        <router-link to="forgot" class="pink">{{ $t('lang.login.forgot') }}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../../components/activeHeader";
import { login } from '../../assets/js/url.js'

export default {
  name: "login",
  data() {
    return {
      loginData: {
        userName: "",
        password: ""
      }
    };
  },
  components: {
    Header
  },
  methods: {
    loginConfirm() {
      this.getData(login.loginConfirm, this.loginData)
    }
  }
};
</script>
<style lang="scss" scoped>
.login{
    width: 100%
}
.loginSpare{
    width: 1000px;
    max-width: 1000px;
    height: 400px;
    margin: 0 auto;
    background-color: rgba(255,255,255,0.7);
    border-radius: 20px;
    margin-top: 100px;
    .desc{
        font-size: 12px;
        font-weight: 600!important;
        padding-top: 18px
    }
    .loginForm{
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 300px;
        input{
            width: 100%;
            margin-top: 16px;
            border: 1px solid rgba(243, 88, 139, 1);
            color: rgba(243, 88, 139, 1);
            background-color: #FFFFFF;
            padding: 8px 0;
            padding-left: 18px;
            border-radius: 20px;
        }
    }
    .button{
        background-color: rgba(243, 88, 139, 0.55);
        color: #FFFFFF;
        width: 318px;
        display: block;
        border-radius: 20px;
        margin: 0 auto;
        padding: 8px 0;
        margin-bottom: 16px;
        transition: all 0.5s;
    }
    .button:hover{
        background-color: rgba(243, 88, 139, 0.75);
    }
    .pink{
        color: rgba(243, 88, 139, 1);
        font-weight: 600;
    }
    .loginBtn{
        position: relative;
        left: -9px;
        margin-top: 16px;
    }
}
@media screen and (max-width: 420px) {
  .loginSpare {
    width: 100%;
    background-color: rgba(255,255,255,0.3);
  }
}
</style>
