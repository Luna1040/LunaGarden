<template>
  <div class="publicNormalBc">
    <div class="leftBlurArea">
      <h1>{{ $t('lang.titles.Login') }}</h1>
      <p class="desc">{{ $t('lang.login.desc') }}</p>
      <p class="desc">{{ $t('lang.login.desc2') }}</p>
      <Form ref="form" style="margin: 0 auto;" background="rgba(0,0,0,0)" label-color="#FFFFFF" border="0" :shadow="false" :form="form" :width="552" label-position="top" :label-width="150"></Form>
      <div class="linkGroup">
        <router-link to="/Forgot" class="forgot">{{ $t('lang.login.forgot') }}</router-link>
        <Button theme="primary" :width="502" style="margin: 0 auto;" @click="loginConfirm">{{ this.$t('lang.login.login2') }}</Button>
        <p style="text-align: center;">{{ $t('lang.login.register') }}</p>
        <Button :width="502" style="margin: 0 auto;" theme="primary" to="/Register">{{ $t('lang.login.register2') }}</Button>
      </div>
    </div>
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
        password: '',
        // Default Value
        company: '_1040657022X'
      },
      theme: 'light',
      companyList: [
        {
          id: '_1040657022X',
          name: 'Luna Org'
        },
        {
          id: '_786623314V',
          name: '锐融天下'
        },
        {
          id: '_cncuf88791Z',
          name: '中关村E谷'
        },
        {
          id: '_ubff898989',
          name: '清华零壹实验室'
        },
        {
          id: 'uf8897546632V',
          name: '清华非名实验室'
        },
        {
          id: '_786661234406G',
          name: '西安鎏金药业'
        },
        {
          id: '_8897GH',
          name: '北京青鸟科技'
        }
      ],
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
        title: this.lang.company,
        required: true,
        description: this.logLang.companyDesc,
        render: (h, params) => {
          return h('Select', {
            props: {
              value: this.loginData.company,
              background: 'rgba(255,255,255,0.3)',
              width: '100%',
              selectData: this.companyList,
              filterable: true,
              keyValue: 'id',
              keyLabel: 'name'
            },
            on: {
              input: (event) => {
                this.loginData.company = event
              }
            }
          })
        },
        errStatus: false,
        errText: ''
      },
      {
        title: this.lang.userName,
        validate: 'userName',
        validateOnChange: true,
        required: true,
        emptyWarning: this.lang.alert1,
        // description: this.logLang.userNameDesc,
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
        // description: this.lang.passwordDesc,
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
          title: this.lang.company,
          required: true,
          description: this.logLang.companyDesc,
          render: (h, params) => {
            return h('Select', {
              props: {
                value: this.loginData.company,
                background: 'rgba(255,255,255,0.3)',
                width: '100%',
                selectData: this.companyList,
                filterable: true,
                keyValue: 'id',
                keyLabel: 'name'
              },
              on: {
                input: (event) => {
                  this.loginData.company = event
                }
              }
            })
          },
          errStatus: false,
          errText: ''
        },
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
          this.getUserInfo(res.data.uid)
            .then((r) => {
              this.$router.push('/TodoPanel')
            })
            .catch((r) => {
              this.$Message.error(this.$t('lang.unknownError'))
              // console.log(r)
            })
        } else {
          if (res.code === 1) {
            this.$Message.error({ content: this.$t('lang.login.alert1') })
          } else if (res.code === 2) {
            this.$Message.error({ content: this.$t('lang.login.alert2') })
          } else if (res.code === 3) {
            this.$Message.error({ content: this.$t('lang.login.alert3') })
          } else if (res.code === 4) {
            this.$Message.error({ content: this.$t('lang.login.alert4') })
          } else if (res.code === 6) {
            this.$Message.error({ content: this.$t('lang.login.alert6') })
          } else {
            this.$Message.error({ content: this.$t('lang.unknownError') })
          }
        }
      })
    }
  }
}
</script>
