<template>
  <div class="loginRegister">
    <Container class-name="spare loginSpare" :flex="false" :width="1000" :height="454" background="rgba(255,255,255,0.3)">
      <p class="desc">{{ $t('lang.login.desc') }}</p>
      <p class="desc">{{ $t('lang.login.desc2') }}</p>
      <Form ref="form" style="margin: 0 auto;" background="rgba(0,0,0,0)" border="0" :shadow="false" :form="form" :theme="theme" :width="640" label-position="top" :label-width="150"></Form>
      <div class="linkGroup">
        <Button theme="primary" :width="590" @click="loginConfirm">{{ this.$t('lang.login.login2') }}</Button>
        <p>{{ $t('lang.login.register') }}</p>
        <Button theme="primary" @click="toRegister">{{ $t('lang.login.register2') }}</Button>
        <router-link to="forgot" class="pink">{{ $t('lang.login.forgot') }}</router-link>
      </div>
    </Container>
  </div>
</template>
<script>
import { login } from '../../assets/js/Luna-GetData/url.js'

export default {
  name: 'login',
  data() {
    return {
      loginData: {
        userName: '',
        password: ''
      },
      theme: 'light',
      form: [],
      lang: {},
      logLang: {}
    }
  },
  created() {
    this.lang = this.t
    this.logLang = this.logT
    this.form = [
      {
        title: this.lang.userName,
        validate: 'userName',
        validateOnChange: true,
        required: true,
        emptyWarning: this.lang.alert1,
        description: this.logLang.userNameDesc,
        validateMethods: [
          {
            type: 'length',
            max: 20,
            maxErrText: this.lang.alert3,
            min: 4,
            minErrText: this.lang.alert2
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
                this.loginData.userName = event
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
        title: this.lang.password,
        validate: 'password',
        validateOnChange: true,
        required: true,
        emptyWarning: this.lang.alert3,
        description: this.lang.passwordDesc,
        validateMethods: [
          {
            type: 'length',
            max: 24,
            maxErrText: this.lang.alert8,
            min: 6,
            minErrText: this.lang.alert7
          },
          {
            type: 'noChinese',
            errText: this.lang.alert14
          },
          {
            type: 'noChineseChara',
            errText: this.lang.alert15
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
                this.loginData.password = event
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
  },
  watch: {
    t() {
      this.lang = this.t
      this.logLang = this.logT
      this.form = [
        {
          title: this.lang.userName,
          validate: 'userName',
          validateOnChange: true,
          required: true,
          emptyWarning: this.lang.alert1,
          description: this.logLang.userNameDesc,
          validateMethods: [
            {
              type: 'length',
              max: 20,
              maxErrText: this.lang.alert3,
              min: 4,
              minErrText: this.lang.alert2
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
                  this.loginData.userName = event
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
          title: this.lang.password,
          validate: 'password',
          validateOnChange: true,
          required: true,
          emptyWarning: this.lang.alert3,
          description: this.lang.passwordDesc,
          validateMethods: [
            {
              type: 'length',
              max: 24,
              maxErrText: this.lang.alert8,
              min: 6,
              minErrText: this.lang.alert7
            },
            {
              type: 'noChinese',
              errText: this.lang.alert14
            },
            {
              type: 'noChineseChara',
              errText: this.lang.alert15
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
                  this.loginData.password = event
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
  computed: {
    t() {
      return this.$t('lang.register')
    },
    logT() {
      return this.$t('lang.login')
    }
  },
  methods: {
    loginConfirm() {
      const params = JSON.parse(JSON.stringify(this.loginData))
      params.password = this.encrypt(params.password)
      this.getData(login.loginConfirm, params).then((res) => {
        if (res.success) {
          this.$Message.success({ content: this.$t('lang.login.alert5') })
          this.$router.push('Home')
        } else {
          if (res.code === 1) {
            this.$Message.error({ content: this.$t('lang.login.alert1') })
          } else if (res.code === 2) {
            this.$Message.error({ content: this.$t('lang.login.alert2') })
          } else if (res.code === 3) {
            this.$Message.error({ content: this.$t('lang.login.alert3') })
          } else if (res.code === 4) {
            this.$Message.error({ content: this.$t('lang.login.alert4') })
          } else {
            this.$Message.error({ content: this.$t('lang.unknownError') })
          }
        }
      })
    },
    toRegister() {
      this.$router.push('register')
    }
  }
}
</script>
