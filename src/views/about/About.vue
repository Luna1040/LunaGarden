<template>
  <div class="aboutUs">
    <Header
            :msg-header="$t('lang.titles.about')"
            user-icon="userIcon.jpg"
            user-name="Luna Lovegood"
            is-viper="true"
            user-language="English"
    ></Header>
    <div class="about">
      <Form ref="form" :form="form" :theme="theme"></Form>
      <Button @click="submit" theme="primary">提交</Button>
      <h1>{{ $t('lang.aboutUs.title') }}</h1>
      <p>{{ $t('lang.aboutUs.desc') }}</p>
      <p>{{ $t('lang.aboutUs.desc2') }}</p>
      <p>{{ $t('lang.aboutUs.desc3') }}</p>
      <p>{{ $t('lang.aboutUs.desc4') }}</p>
      <p>{{ $t('lang.aboutUs.desc5') }}</p>
      <p>{{ $t('lang.aboutUs.desc6') }}</p>
      <p>{{ $t('lang.aboutUs.desc7') }}</p>
      <p>{{ $t('lang.aboutUs.desc8') }}</p>
      <p>{{ $t('lang.aboutUs.desc9') }}</p>
      <h1>{{ $t('lang.aboutUs.title2') }}</h1>
      <div class="cardGroup">
        <figure>
          <img src="userIcon.jpg" alt />
          <figcaption>{{ $t('lang.aboutUs.author') }}</figcaption>
          <figcaption>{{ $t('lang.aboutUs.authorDesc') }}</figcaption>
        </figure>
        <figure>
          <img src="userIcon.jpg" alt />
          <figcaption>{{ $t('lang.aboutUs.people') }}</figcaption>
          <figcaption>{{ $t('lang.aboutUs.developer') }}</figcaption>
        </figure>
        <figure>
          <img src="userIcon.jpg" alt />
          <figcaption>{{ $t('lang.aboutUs.people4') }}</figcaption>
          <figcaption>{{ $t('lang.aboutUs.UI') }}</figcaption>
        </figure>
        <figure>
          <img src="userIcon.jpg" alt />
          <figcaption>{{ $t('lang.aboutUs.people3') }}</figcaption>
          <figcaption>{{ $t('lang.aboutUs.developer') }}</figcaption>
        </figure>
        <figure>
          <img src="userIcon.jpg" alt />
          <figcaption>{{ $t('lang.aboutUs.people2') }}</figcaption>
          <figcaption>{{ $t('lang.aboutUs.mystery') }}</figcaption>
        </figure>
      </div>
      <h1>{{ $t('lang.aboutUs.title3') }}</h1>
      <div class="cardGroup">
        <figure>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-Vue" />
          </svg>

          <figcaption>{{ $t('lang.aboutUs.organ') }}</figcaption>
          <figcaption>{{ $t('lang.aboutUs.organDesc') }}</figcaption>
        </figure>
        <figure>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-microsoft" />
          </svg>
          <figcaption>{{ $t('lang.aboutUs.organ2') }}</figcaption>
          <figcaption>{{ $t('lang.aboutUs.organDesc2') }}</figcaption>
        </figure>
        <figure>
          <svg class="icon iconText" aria-hidden="true">
            <use xlink:href="#icon-logo_google_text" />
          </svg>
          <figcaption>{{ $t('lang.aboutUs.organ3') }}</figcaption>
          <figcaption>{{ $t('lang.aboutUs.organDesc3') }}</figcaption>
        </figure>
        <figure>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-iconfont" />
          </svg>
          <figcaption>Icon Font</figcaption>
          <figcaption>{{ $t('lang.aboutUs.organDesc4') }}</figcaption>
        </figure>
        <figure>
          <svg class="icon iconText" aria-hidden="true">
            <use xlink:href="#icon-Bing" />
          </svg>
          <figcaption>{{ $t('lang.aboutUs.organ5') }}</figcaption>
          <figcaption>{{ $t('lang.aboutUs.organDesc5') }}</figcaption>
        </figure>
      </div>
      <Table :data="tableData" :columns="columns" border :loading="loading" headerFixed :shadow="true" :width="100" :theme="theme"></Table>
      <Page :limit="page" elevator counter :theme="theme"></Page>
      <Select v-model="selectValue" :selectData="selectData" keyValue="id" keyLabel="name" :filterable="true" corner="large" :theme="theme"></Select>
      <Input v-model="selectValue" :theme="theme"></Input>
      <Modal v-model="dark" title="NIGHT MODE" :theme="theme" type="primary">
        <p>TEST</p>
      </Modal>
      <Card :theme="theme" :width="200" :height="200" title="Luna Card">
        <p>TEST LUNA CARD</p>
      </Card>
      <Container :theme="theme">
        <p>Luna Container</p>
      </Container>
      <Button @click="dark = !dark" :theme="theme">显示弹窗</Button>
      <Button @click="cgTheme" :theme="theme">切换模式</Button>
    </div>
  </div>
</template>
<script>
import Header from '../../components/activeHeader'
import '../../assets/icons/logo/iconfont.js'
export default {
  name: 'app',
  data () {
    return {
      loading: true,
      dark: false,
      theme: 'light',
      page: 22,
      selectValue: '',
      columns: [
        {
          title: '序号',
          type: 'index',
          align: 'center',
          width: 80,
          fixed: 'left'
        },
        {
          title: '名称',
          key: 'name',
          align: 'center',
          width: 200,
          className: 'testTableClass',
          ellipsis: true,
          fullDisplay: true
        },
        {
          title: '操作',
          type: 'custom',
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
            return h('div', {
              style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }
            }, [
              h('Button', {
                props: {
                  shadow: false,
                  theme: 'primary',
                  loading: true
                },
                on: {
                  click: () => {
                    // alert('111')
                  }
                }
              }, '修改')
            ])
          }
        }
      ],
      tableData: [
        {
          name: 'test',
          id: '777'
        },
        {
          name: 'test',
          id: '777'
        },
        {
          name: 'test',
          id: '777'
        },
        {
          name: 'test',
          id: '777'
        },
        {
          name: 'test',
          id: '777'
        },
        {
          name: 'test',
          id: '777'
        },
        {
          name: 'test',
          id: '777'
        },
        {
          name: 'test2',
          id: '7772'
        },
        {
          name: 'test2',
          id: '7772'
        },
        {
          name: 'test2',
          id: '7772'
        },
        {
          name: 'test2',
          id: '7772'
        },
        {
          name: 'test2',
          id: '7772'
        }
      ],
      selectData: [
        {
          name: 'test',
          id: '777'
        },
        {
          name: 'test2',
          id: '7772'
        }
      ],
      form: [
        {
          title: 'Username：',
          validate: 'userName',
          required: true,
          emptyWarning: '用户名不能为空',
          validateMethods: {
            length: {
              on: ['blur', 'change'],
              max: 20,
              maxErrText: '用户名不能多于20位字符！',
              min: 5,
              minErrText: '用户名不能少于5位字符！'
            },
            noChara: {
              on: ['blur', 'change'], errText: '不允许输入特殊符号！'
            },
            noChinese: {
              on: ['blur', 'change'], errText: '不允许输入中文！'
            },
            noEnglish: {
              on: ['blur', 'change'], errText: '不允许输入英文！'
            },
            noEnglishChara: {
              on: ['blur', 'change'], errText: '不允许输入英文特殊符号！'
            },
            noChineseChara: {
              on: ['blur', 'change'], errText: '不允许输入中文特殊符号！'
            },
            noNumber: {
              on: ['blur', 'change'],
              errText: '不允许输入数字！'
            }
          },
          render: (h) => {
            return h('Input', {
              props: {
                value: this.createData.userName,
                theme: this.theme
              },
              on: {
                input: (event) => {
                  this.createData.userName = event
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
          required: true,
          emptyWarning: '密码不能为空',
          description: '输入密码',
          validateMethods: [
            {
              type: 'length',
              on: ['blur', 'change'],
              max: 20,
              maxErrText: '用户名不能多于20位字符！',
              min: 5,
              minErrText: '用户名不能少于5位字符！'
            },
            {
              type: 'noChara',
              on: ['blur', 'change'],
              errText: '不允许输入特殊符号！'
            },
            {
              type: 'noChinese',
              on: ['blur', 'change'],
              errText: '不允许输入中文！'
            },
            {
              type: 'noEnglish',
              on: ['blur', 'change'],
              errText: '不允许输入英文！'
            },
            {
              type: 'noEnglishChara',
              on: ['blur', 'change'],
              errText: '不允许输入英文特殊符号！'
            },
            {
              type: 'noChineseChara',
              on: ['blur', 'change'],
              errText: '不允许输入中文特殊符号！'
            },
            {
              type: 'noNumber',
              on: ['blur', 'change'],
              errText: '不允许输入数字！'
            }
          ],
          render: (h) => {
            return h('Input', {
              props: {
                value: this.createData.password,
                theme: this.theme,
                type: 'password'
              },
              on: {
                input: (event) => {
                  this.createData.password = event
                }
              }
            })
          },
          errStatus: false,
          errText: ''
        }
      ],
      createData: {
        userName: '',
        password: ''
      }
    }
  },
  created () {

  },
  methods: {
    cgTheme () {
      if (this.theme === 'light') {
        this.theme = 'dark'
      } else {
        this.theme = 'light'
      }
    },
    submit () {
      this.$refs.form.examine(this.createData)
    }
  },
  components: {
    Header
  }
}
</script>
<style lang='scss' scoped>
  .icon {
    width: 88px;
    height: 88px;
    fill: currentColor;
    overflow: hidden;
    margin-bottom: 16px;
  }
  .iconText {
    width: 150px;
  }
</style>
