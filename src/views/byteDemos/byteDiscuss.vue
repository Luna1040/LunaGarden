<template>
  <div class="portTest">
    <h1>RegisterForm</h1>
    <Form ref="RegisterForm" :form="RegisterForm" :width="640" label-position="top" :label-width="150"></Form>
    <Button theme="primary" :width="590" :loading="loading" @click="registerSubmit">{{ $t('lang.register.register') }}</Button>
    <h1>LoginForm</h1>
    <Form ref="LoginForm" :form="LoginForm" :width="640" label-position="top" :label-width="150"></Form>
    <Button theme="primary" :width="590" @click="loginConfirm">{{ $t('lang.login.login2') }}</Button>
    <Form ref="AddProjectForm" :form="AddProjectForm" :width="640" label-position="top" :label-width="150"></Form>
    <Button theme="primary" :width="590" @click="loginConfirm">{{ $t('lang.login.login2') }}</Button>
  </div>
</template>

<script>
import { login } from '@/assets/js/Luna-GetData/url'

export default {
  name: 'byteDiscuss',
  data() {
    return {
      loading: false,
      registerData: {
        userName: '',
        password: '',
        email: '',
        bankId: ''
      },
      RegisterForm: [
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
                value: this.registerData.userName,
                theme: this.theme,
                background: 'rgba(255,255,255,0.3)',
                validateOnChange: params.validateOnChange,
                validateMethods: params.validateMethods,
                width: '100%'
              },
              on: {
                input: (event) => {
                  this.registerData.userName = event
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
                value: this.registerData.password,
                theme: this.theme,
                type: 'password',
                validateOnChange: params.validateOnChange,
                validateMethods: params.validateMethods,
                width: '100%',
                background: 'rgba(255,255,255,0.3)'
              },
              on: {
                input: (event) => {
                  this.registerData.password = event
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
                value: this.registerData.email,
                theme: this.theme,
                background: 'rgba(255,255,255,0.3)',
                validateOnChange: params.validateOnChange,
                validateMethods: params.validateMethods,
                width: '100%'
              },
              on: {
                input: (event) => {
                  this.registerData.email = event
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
                value: this.registerData.bankId,
                theme: this.theme,
                background: 'rgba(255,255,255,0.3)',
                validateOnChange: params.validateOnChange,
                validateMethods: params.validateMethods,
                width: '100%',
                disabled: true
              },
              on: {
                input: (event) => {
                  this.registerData.bankId = event
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
      ],
      loginData: {
        userName: '',
        password: ''
      },
      LoginForm: [],
      lang: {},
      logLang: {},
      ProjectData: {
        creatorID: '',
        creatorName: '',
        id: '',
        projectName: '',
        important: 0,
        projectMember: [],
        projectOwnerID: '',
        projectOwnerName: ''
      },
      AddProjectForm: [
        {
          title: this.$t('lang.project.projectName'),
          validate: 'projectName',
          validateOnChange: true,
          required: true,
          emptyWarning: this.$t('lang.project.alert1'),
          render: (h, params) => {
            return h('Input', {
              props: {
                value: this.ProjectData.projectName,
                theme: this.theme,
                background: 'rgba(255,255,255,0.3)',
                validateOnChange: params.validateOnChange,
                validateMethods: params.validateMethods,
                width: '100%'
              },
              on: {
                input: (event) => {
                  this.ProjectData.projectName = event
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
          title: this.$t('lang.project.important'),
          render: (h, params) => {
            return h('ButtonGroup', {
              props: {
                'btn-group': this.importantGroup,
                theme: this.theme,
                type: 'password',
                validateOnChange: params.validateOnChange,
                validateMethods: params.validateMethods,
                width: '100%',
                background: 'rgba(255,255,255,0.3)'
              },
              on: {
                input: (event) => {
                  this.registerData.password = event
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
                value: this.registerData.email,
                theme: this.theme,
                background: 'rgba(255,255,255,0.3)',
                validateOnChange: params.validateOnChange,
                validateMethods: params.validateMethods,
                width: '100%'
              },
              on: {
                input: (event) => {
                  this.registerData.email = event
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
          title: this.$t('lang.project.projectMember'),
          validate: 'projectMember',
          required: false,
          render: (h, params) => {
            return h('Select', {
              props: {
                value: this.ProjectData.projectMember,
                theme: this.theme,
                background: 'rgba(255,255,255,0.3)',
                width: '100%',
              },
              on: {
                input: (event) => {
                  this.registerData.bankId = event
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
      ],
      importantGroup: [
        {
          name: 'Very Important',
          theme: 'error',
          methods: 'choiceImportantStatus',
          width: 140
        },
        {
          name: 'Important',
          theme: 'warning',
          methods: 'choiceImportantStatus',
          width: 140
        },
        {
          name: 'Normal',
          theme: 'primary',
          methods: 'choiceImportantStatus',
          width: 140
        },
        {
          name: 'Not Important',
          theme: 'alert',
          methods: 'choiceImportantStatus',
          width: 140,
          styles: {marginTop: '16px'}
        },
        {
          name: 'Not Necessary',
          theme: 'normal',
          methods: 'choiceImportantStatus',
          width: 140,
          styles: {marginTop: '16px'}
        },
      ]
    }
  },
  created() {
    this.lang = this.t
    this.logLang = this.logT
    this.LoginForm = [
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
    registerSubmit () {
      if (this.$refs.RegisterForm.examine(this.registerData)) {
        // Error
        this.$Message.error({ content: '请检查填写错误项！' })
        return
      }
      this.loading = true
      const params = JSON.parse(JSON.stringify(this.registerData))
      params.uid = this.uuidGet()
      if (params.bankId === '') {
        this.bankIdEmpty = true
      }
      params.password = this.encrypt(params.password)
      this.getData(login.registerConfirm, params).then((res) => {
        if (res.success) {
          this.$Message.success({ content: '注册成功！' })
          localStorage.setItem('userInfo', JSON.stringify(res.data))
          this.$router.push('TodoPanel')
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
          } else {
            this.$Message.error({ content: this.$t('lang.unknownError') })
          }
        }
        this.loading = false
      })
    },
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
  }
}
</script>

<style scoped lang="scss">

</style>
