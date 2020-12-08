<template>
  <div class="login">
    <Header
      :msg-header="$t('lang.titles.login')"
      user-icon="https://lunagarden.net/res/userIcons/userIcon.jpg"
      user-name="Luna Lovegood"
      is-viper="true"
      user-language="English"
    ></Header>
    <!--    <div class="loginSpare">-->
    <!--      <p class="desc">{{ $t('lang.login.desc') }}</p>-->
    <!--      <p class="desc">{{ $t('lang.login.desc2') }}</p>-->
    <!--      <div class="loginForm">-->
    <!--        <input type="text" :placeholder="$t('lang.login.userName')" />-->
    <!--        <input type="password" :placeholder="$lang('lang.login.password')" />-->
    <!--        <button class="button loginBtn" @click="loginConfirm">{{ $t('lang.login.login') }}</button>-->
    <!--      </div>-->
    <!--      <Form-->
    <!--        ref="form"-->
    <!--        :form="form"-->
    <!--        :theme="theme"-->
    <!--        :width="240"-->
    <!--        label-position="top"-->
    <!--      ></Form>-->
    <!--      <div class="linkGroup">-->
    <!--        <p class="pink">{{ $t('lang.login.register') }}</p>-->
    <!--        <router-link to="register" class="button">{{ $t('lang.login.register2') }}</router-link>-->
    <!--        <router-link to="forgot" class="pink">{{ $t('lang.login.forgot') }}</router-link>-->
    <!--      </div>-->
    <!--    </div>-->
    <Container class-name="loginSpare" :flex="false" :width="1000" :height="400" background="rgba(255,255,255,0.3)">
      <div class="blurBc"></div>
      <p class="desc">{{ $t('lang.login.desc') }}</p>
      <p class="desc">{{ $t('lang.login.desc2') }}</p>
      <Form
        ref="form"
        style="margin: 0 auto"
        background="rgba(0,0,0,0)"
        border="0"
        :shadow="false"
        :form="form"
        :theme="theme"
        :width="640"
        label-position="top"
        :label-width="150"
      ></Form>
    </Container>
  </div>
</template>
<script>
import Header from '../../components/pc/activeHeader'
import { login } from '../../assets/js/Luna-GetData/url.js'

export default {
  name: 'login',
  data () {
    return {
      loginData: {
        userName: '',
        password: ''
      },
      theme: 'light',
      form: [
        {
          title: this.$lang('login.userName'),
          validate: 'userName',
          validateOnChange: true,
          required: true,
          emptyWarning: '用户名不能为空',
          validateMethods: [
            {
              type: 'length',
              max: 20,
              maxErrText: '用户名不能多于20位字符！',
              min: 4,
              minErrText: '用户名不能少于4位字符！'
            },
            {
              type: 'noChara',
              errText: '不允许输入特殊符号！'
            }
          ],
          render: (h, params) => {
            return h('Input', {
              props: {
                value: this.loginData.userName,
                theme: this.theme,
                background: 'rgba(255,255,255,0.3)',
                validateOnChange: params.validateOnChange,
                validateMethods: params.validateMethods,
                width: '100%'
              },
              on: {
                input: (event) => {
                  this.createData.userName = event
                },
                onValidate: (value) => {
                  params.data.errStatus = value.errStatus
                  params.data.errText = value.errText
                }
              }
            })
          },
          errStatus: false,
          errText: ''
        },
        {
          title: 'Password：',
          validate: 'password',
          validateOnChange: true,
          required: true,
          emptyWarning: '密码不能为空',
          description: '输入密码',
          validateMethods: [
            {
              type: 'length',
              max: 24,
              maxErrText: '密码不能多于24位字符！',
              min: 6,
              minErrText: '密码不能少于6位字符！'
            },
            {
              type: 'noChinese',
              errText: '不允许输入中文！'
            },
            {
              type: 'noChineseChara',
              errText: '不允许输入中文特殊符号！'
            }
          ],
          render: (h, params) => {
            return h('Input', {
              props: {
                value: this.loginData.password,
                theme: this.theme,
                type: 'password',
                validateOnChange: params.validateOnChange,
                validateMethods: params.validateMethods,
                width: '100%',
                background: 'rgba(255,255,255,0.3)'
              },
              on: {
                input: (event) => {
                  this.createData.password = event
                },
                onValidate: (value) => {
                  params.data.errStatus = value.errStatus
                  params.data.errText = value.errText
                }
              }
            })
          },
          errStatus: false,
          errText: ''
        }
      ]
    }
  },
  created () {
  },
  components: {
    Header
  },
  methods: {
    loginConfirm () {
      const params = JSON.parse(JSON.stringify(this.loginData))
      params.password = this.encrypt(params.password)
      this.getData(login.loginConfirm, params)
    }
  }
}
</script>
<style lang="scss" scoped>
.login{
    width: 100%
}
.loginSpare{
  position: relative;
  overflow: hidden;
  top: calc(50% - 200px);
    margin: 0 auto;
    background-color: rgba(255,255,255,0.7);
    border-radius: 20px;
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
</style>
