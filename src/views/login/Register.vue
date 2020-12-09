<template>
  <div class="publicNormalBc">
    <div class="leftBlurArea">
      <h1>{{ $t('lang.titles.Register') }}</h1>
      <p class="desc">{{ $t('lang.login.desc') }}</p>
      <p class="desc">{{ $t('lang.login.desc2') }}</p>
      <Form ref="form" style="margin: 0 auto;" background="rgba(0,0,0,0)" label-color="#FFFFFF" border="0" :shadow="false" :form="form" :width="552" label-position="top" :label-width="220"></Form>
      <div class="linkGroup">
        <!--        <router-link to="register" class="button">{{ $t('lang.register.register') }}</router-link>-->
        <Button theme="primary" style="margin: 0 auto;" :width="502" :loading="loading" @click="registSubmit">{{ $t('lang.register.register') }}</Button>
        <router-link to="login" class="forgot">{{ $t('lang.register.login') }}</router-link>
      </div>
    </div>
    <Modal v-model="bankIdEmpty" :title="$t('lang.register.bankIdEmpty')" type="primary">
      <p>{{ this.$t('lang.register.alert12') }}</p>
      <div slot="footer">
        <Button theme="primary" :loading="loading" to="/TodoPanel" @click="bankIdEmpty = false">{{ this.$t('lang.todoPanel.button.OK') }}</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { login } from '../../assets/js/Luna-GetData/url.js'

export default {
  name: 'login',
  data() {
    return {
      loading: false,
      companyList: [
        {
          id: '_1040657022X',
          name: 'Luna Org'
        },
        {
          id: '_786623314V',
          name: '北京锐融天下'
        },
        {
          id: '_cncuf88791Z',
          name: '北京中关村E谷'
        },
        {
          id: '_ubff89638989',
          name: '清华零壹实验室'
        },
        {
          id: 'uf8897546632V',
          name: '清华非名实验室'
        },
        {
          id: '_786661234406G',
          name: '西安鎏金热工'
        },
        {
          id: '_88112635397GH',
          name: '北京青鸟科技'
        }
      ],
      loginData: {
        userName: '',
        password: '',
        email: '',
        bankId: '',
        company: '_1040657022X'
      },
      bankIdEmpty: false,
      lang: {},
      logLang: {},
      theme: 'light',
      form: []
    }
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
          title: this.$t('lang.register.userName'),
          validate: 'userName',
          validateOnChange: true,
          required: true,
          emptyWarning: this.$t('lang.register.alert1'),
          description: this.$t('lang.register.userNameDesc'),
          validateMethods: [
            {
              type: 'length',
              max: 20,
              maxErrText: this.$t('lang.register.alert3'),
              min: 4,
              minErrText: this.$t('lang.register.alert2')
            },
            {
              type: 'noChara',
              errText: this.$t('lang.register.alert13')
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
          title: this.$t('lang.register.password'),
          validate: 'password',
          validateOnChange: true,
          required: true,
          emptyWarning: this.$t('lang.register.alert4'),
          description: this.$t('lang.register.passwordDesc'),
          validateMethods: [
            {
              type: 'length',
              max: 24,
              maxErrText: this.$t('lang.register.alert8'),
              min: 6,
              minErrText: this.$t('lang.register.alert7')
            },
            {
              type: 'noChinese',
              errText: this.$t('lang.register.alert14')
            },
            {
              type: 'noChineseChara',
              errText: this.$t('lang.register.alert15')
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
        },
        {
          title: this.$t('lang.register.email'),
          validate: 'email',
          validateOnChange: true,
          required: true,
          emptyWarning: this.$t('lang.register.alert10'),
          description: this.$t('lang.register.userNameDesc'),
          validateMethods: [
            {
              type: 'email',
              errText: this.$t('lang.register.alert11')
            }
          ],
          render: (h, params) => {
            return h('Input', {
              props: {
                value: this.loginData.email,
                theme: this.theme,
                background: 'rgba(255,255,255,0.3)',
                validateOnChange: params.validateOnChange,
                validateMethods: params.validateMethods,
                width: '100%'
              },
              on: {
                input: (event) => {
                  this.loginData.email = event
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
          title: this.$t('lang.register.bankId'),
          validate: 'bankId',
          required: false,
          description: this.$t('lang.register.bankIdDesc'),
          validateMethods: [
            // {
            //   type: 'length',
            //   max: 19,
            //   maxErrText: this.$t('lang.register.alert17'),
            //   min: 16,
            //   minErrText: this.$t('lang.register.alert16')
            // },
            // {
            //   type: 'noChinese',
            //   errText: this.$t('lang.register.alert14')
            // },
            // {
            //   type: 'noEnglish',
            //   errText: this.$t('lang.register.alert18')
            // },
            // {
            //   type: 'noChara',
            //   errText: this.$t('lang.register.alert13')
            // },
            // {
            //   type: 'noChineseChara',
            //   errText: this.$t('lang.register.alert15')
            // }
          ],
          render: (h, params) => {
            return h('Input', {
              props: {
                value: this.loginData.bankId,
                theme: this.theme,
                background: 'rgba(255,255,255,0.3)',
                validateOnChange: params.validateOnChange,
                validateMethods: params.validateMethods,
                width: '100%',
                disabled: true
              },
              on: {
                input: (event) => {
                  this.loginData.bankId = event
                }
                // onValidate: (value) => {
                // params.data.errStatus = value.errStatus
                // params.data.errText = value.errText
                // }
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
  created() {
    this.lang = this.t
    this.logLang = this.logT
    this.form = [
      {
        title: this.lang.company,
        required: true,
        description: this.t.companyDesc,
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
        title: this.$t('lang.register.userName'),
        validate: 'userName',
        validateOnChange: true,
        required: true,
        emptyWarning: this.$t('lang.register.alert1'),
        description: this.$t('lang.register.userNameDesc'),
        validateMethods: [
          {
            type: 'length',
            max: 20,
            maxErrText: this.$t('lang.register.alert3'),
            min: 4,
            minErrText: this.$t('lang.register.alert2')
          },
          {
            type: 'noChara',
            errText: this.$t('lang.register.alert13')
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
        title: this.$t('lang.register.password'),
        validate: 'password',
        validateOnChange: true,
        required: true,
        emptyWarning: this.$t('lang.register.alert4'),
        description: this.$t('lang.register.passwordDesc'),
        validateMethods: [
          {
            type: 'length',
            max: 24,
            maxErrText: this.$t('lang.register.alert8'),
            min: 6,
            minErrText: this.$t('lang.register.alert7')
          },
          {
            type: 'noChinese',
            errText: this.$t('lang.register.alert14')
          },
          {
            type: 'noChineseChara',
            errText: this.$t('lang.register.alert15')
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
      },
      {
        title: this.$t('lang.register.email'),
        validate: 'email',
        validateOnChange: true,
        required: true,
        emptyWarning: this.$t('lang.register.alert10'),
        description: this.$t('lang.register.userNameDesc'),
        validateMethods: [
          {
            type: 'email',
            errText: this.$t('lang.register.alert11')
          }
        ],
        render: (h, params) => {
          return h('Input', {
            props: {
              value: this.loginData.email,
              theme: this.theme,
              background: 'rgba(255,255,255,0.3)',
              validateOnChange: params.validateOnChange,
              validateMethods: params.validateMethods,
              width: '100%'
            },
            on: {
              input: (event) => {
                this.loginData.email = event
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
        title: this.$t('lang.register.bankId'),
        validate: 'bankId',
        required: false,
        description: this.$t('lang.register.bankIdDesc'),
        validateMethods: [
          // {
          //   type: 'length',
          //   max: 19,
          //   maxErrText: this.$t('lang.register.alert17'),
          //   min: 16,
          //   minErrText: this.$t('lang.register.alert16')
          // },
          // {
          //   type: 'noChinese',
          //   errText: this.$t('lang.register.alert14')
          // },
          // {
          //   type: 'noEnglish',
          //   errText: this.$t('lang.register.alert18')
          // },
          // {
          //   type: 'noChara',
          //   errText: this.$t('lang.register.alert13')
          // },
          // {
          //   type: 'noChineseChara',
          //   errText: this.$t('lang.register.alert15')
          // }
        ],
        render: (h, params) => {
          return h('Input', {
            props: {
              value: this.loginData.bankId,
              theme: this.theme,
              background: 'rgba(255,255,255,0.3)',
              validateOnChange: params.validateOnChange,
              validateMethods: params.validateMethods,
              width: '100%',
              disabled: true
            },
            on: {
              input: (event) => {
                this.loginData.bankId = event
              }
              // onValidate: (value) => {
              // params.data.errStatus = value.errStatus
              // params.data.errText = value.errText
              // }
            }
          })
        },
        errStatus: false,
        errText: ''
      }
    ]
  },
  methods: {
    registSubmit() {
      if (this.$refs.form.examine(this.loginData)) {
        // Error
        this.$Message.error({ content: '请检查填写错误项！' })
        return
      }
      this.loading = true
      const params = JSON.parse(JSON.stringify(this.loginData))
      params.uid = this.uuidGet()
      if (params.bankId === '') {
        this.bankIdEmpty = true
      }
      params.password = this.encrypt(params.password)
      this.getData(login.registerConfirm, params).then((res) => {
        if (res.success) {
          this.$Message.success({ content: '注册成功！' })
          localStorage.setItem('userInfo', JSON.stringify(res.data))
          this.$router.push('Home')
        } else {
          if (res.code === 1) {
            this.$Message.error({ content: this.$t('lang.register.alert1') })
          } else if (res.code === 2) {
            this.$Message.error({ content: this.$t('lang.register.alert2') })
          } else if (res.code === 3) {
            this.$Message.error({ content: this.$t('lang.register.alert3') })
          } else if (res.code === 5) {
            this.$Message.error({ content: this.$t('lang.register.alert5') })
          } else if (res.code === 6) {
            this.$Message.error({ content: this.$t('lang.register.alert6') })
          } else if (res.code === 19) {
            this.$Message.error({ content: this.$t('lang.register.alert19') })
          } else if (res.code === 20) {
            this.$Message.error({ content: this.$t('lang.register.alert20') })
          } else {
            this.$Message.error({ content: this.$t('lang.unknownError') })
          }
        }
        this.loading = false
      })
    }
  }
}
</script>
