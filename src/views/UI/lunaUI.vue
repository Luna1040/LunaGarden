<template>
  <div class="lunaUIViewer Container">
<!--    <div class="controlPanel">-->
<!--      <Button :theme="theme" @click="showModal">显示弹窗</Button>-->
<!--      <Button :theme="theme" @click="showMessage">显示通知</Button>-->
<!--      <Button :theme="theme" @click="cgTheme">切换模式</Button>-->
<!--      <Button :theme="theme" @click="setLang">切换语言(Luna18n)</Button>-->
<!--      <Button :theme="theme" @click="logLang">获取当前语言包(Luna18n)</Button>-->
<!--    </div>-->
    <ButtonGroup :btn-group="controlButtonsData" :theme="theme" @showModal="showModal" @showMessage="showMessage" @cgTheme="cgTheme" @setLang="setLang" @logLang="logLang"></ButtonGroup>
    <Container :theme="theme" :flex="false">
      <p>Luna Container</p>
      <Tree :data="tree" :width="300" title="Luna Tr222ee" @onSelect="selectTree"></Tree>
      <List>
        <ListItem v-for="(i, index) in listData" :key="index" :img="i.img" :title="i.userName" :label="i.discribe"></ListItem>
      </List>
      <Form ref="form" :form="form" :theme="theme" :width="240" label-position="top"></Form>
      <Button theme="primary" @click="submit">提交</Button>
      <Button @click="submit">重置</Button>
      <Card :theme="theme" :width="200" :height="200" title="Luna Card">
        <p>LUNA CARD</p>
      </Card>
      <Table :data="tableData" :columns="columns" border :loading="loading" header-fixed :shadow="true" :width="100" :theme="theme"></Table>
      <Page :limit="page" elevator counter :theme="theme"></Page>
      <Select v-model="selectValue" :select-data="selectData" key-value="id" key-label="name" :filterable="true" corner="large" :theme="theme"></Select>
      <Input v-model="selectValue" :theme="theme"></Input>
      <Modal v-model="GuideModal" :title="$t('lang.LunaUI.GuideModal.GuideModal')" :theme="theme" type="primary">
        <p>{{ $t('lang.LunaUI.GuideModal.Guide1') }}</p>
        <p>{{ $t('lang.LunaUI.GuideModal.Guide2') }}</p>
        <p>{{ $t('lang.LunaUI.GuideModal.Guide3') }}</p>
        <p>{{ $t('lang.LunaUI.GuideModal.Guide4') }}</p>
        <template slot="footer">
          <Button theme="primary" @click="GuideModal = false">{{ $t('lang.LunaUI.GuideModal.Confirm') }}</Button>
        </template>
      </Modal>
    </Container>
  </div>
</template>

<script>
import { login } from '../../assets/js/Luna-GetData/url'

export default {
  name: 'lunaUI.vue',
  data() {
    return {
      loading: false,
      GuideModal: false,
      theme: 'light',
      page: 22,
      selectValue: '',
      tree: [
        {
          title: 'parent 1',
          expand: true,
          children: [
            {
              title: 'parent 1-1',
              expand: false,
              children: [
                {
                  title: 'leaf 1-1-1'
                },
                {
                  title: 'leaf 1-1-2',
                  expand: true,
                  children: [
                    {
                      title: 'grandChild 1-1-2-2-2-2-2-1grandChild 1-1-2-2-2-2-2-1grandChild 1-1-2-2-2-2-2-1grandChild 1-1-2-2-2-2-2-1grandChild 1-1-2-2-2-2-2-1grandChild 1-1-2-2-2-2-2-1grandChild 1-1-2-2-2-2-2-1grandChild 1-1-2-2-2-2-2-1grandChild 1-1-2-2-2-2-2-1',
                      selected: true
                    },
                    {
                      title: 'grandChild 1-1-2-2',
                      selected: false
                    }
                  ]
                }
              ]
            },
            {
              title: 'parent 1-2',
              expand: false,
              children: [
                {
                  title: 'leaf 1-2-1'
                },
                {
                  title: 'leaf 1-2-1'
                }
              ]
            }
          ]
        }
      ],
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
            return h(
              'div',
              {
                style: {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }
              },
              [
                h(
                  'Button',
                  {
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
                  },
                  '修改'
                )
              ]
            )
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
          name: '中国银行',
          id: '1'
        },
        {
          name: '中国招商银行',
          id: '2'
        },
        {
          name: '中国农业银行中国农业银行中国农业银行',
          id: '3'
        },
        {
          name: '中国建设银行',
          id: '4'
        },
        {
          name: '中国浦发银行',
          id: '5'
        },
        {
          name: '中国农村信用社',
          id: '6'
        },
        {
          name: '中国人民银行',
          id: '7'
        }
      ],
      form: [
        {
          title: 'Username：',
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
                value: this.createData.userName,
                theme: this.theme,
                validateOnChange: params.validateOnChange,
                validateMethods: params.validateMethods
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
                value: this.createData.password,
                theme: this.theme,
                type: 'password',
                validateOnChange: params.validateOnChange,
                validateMethods: params.validateMethods
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
        },
        {
          title: 'Bank：',
          validate: 'bank',
          validateOnChange: true,
          required: true,
          emptyWarning: '银行不能为空',
          render: (h, params) => {
            return h('Select', {
              props: {
                value: this.createData.bank,
                theme: this.theme,
                selectData: this.selectData,
                keyValue: 'id',
                keyLabel: 'name',
                filterable: true,
                wrap: true
              },
              on: {
                input: (event) => {
                  this.createData.bank = event
                }
              }
            })
          },
          errStatus: false,
          errText: ''
        },
        {
          title: 'Email：',
          validate: 'email',
          validateOnChange: true,
          required: true,
          emptyWarning: '邮箱不能为空',
          validateMethods: [
            {
              type: 'email',
              errText: '邮箱格式不正确'
            }
          ],
          render: (h, params) => {
            return h('Input', {
              props: {
                value: this.createData.email,
                theme: this.theme,
                validateOnChange: params.validateOnChange,
                validateMethods: params.validateMethods
              },
              on: {
                input: (event) => {
                  this.createData.email = event
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
      ],
      createData: {
        userName: '',
        password: '',
        email: '',
        bank: ''
      },
      listData: [
        {
          userName: '卢娜',
          describe: 'Luna-UI的作者',
          img: 'https://raw.githubusercontent.com/Luna1040/projectImages/master/images/userIcons/userIcon.jpg'
        }
      ]
    }
  },
  computed: {
    controlButtonsData() {
      return [
        {
          name: this.$t('lang.LunaUI.showModal'),
          methods: 'showModal'
        },
        {
          name: this.$t('lang.LunaUI.showMessage'),
          methods: 'showMessage'
        },
        {
          name: this.$t('lang.LunaUI.cgTheme'),
          methods: 'cgTheme'
        },
        {
          name: this.$t('lang.LunaUI.logLang'),
          methods: 'logLang'
        },
        {
          name: this.$t('lang.LunaUI.setLang'),
          methods: 'setLang'
        }
      ]
    }
  },
  created() {
    // 弹窗拦截其余弹窗
    // let fileList = [
    //   {
    //     name: '邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他邱琦雯有人提起物业让他.txt',
    //     size: 155
    //   },
    //   {
    //     name: 'empty',
    //     size: 0
    //   },
    //   {
    //     name: 'sizeOver',
    //     size: 150
    //   }
    // ]
    // for (let i = 0; i < fileList.length; i++) {
    //   if (fileList[i].name.length > 50) {
    //     this.errorMessage = '超长'
    //     this.wrongList.push(fileList[i].name)
    //     this.dark = true
    //     continue
    //   } else if (fileList[i].size === 0) {
    //     if (this.dark === false) {
    //       this.wrongList.push(fileList[i].name)
    //       this.errorMessage = '空'
    //       this.dark = true
    //     }
    //     continue
    //   } else if (fileList[i].size > 50 && this.dark === false) {
    //     if (this.dark === false) {
    //       this.wrongList.push(fileList[i].name)
    //       this.errorMessage = '大于50'
    //       this.dark = true
    //     }
    //     continue
    //   }
    // }
    // 文件名称截取
    // let name = 'test.222.txt'
    // let frontName = name.split('.').slice(0, name.split('.').length - 1).join('.')
    // console.log(frontName)
  },
  methods: {
    selectTree(value) {
      console.log(value)
    },
    showMessage() {
      this.$Message.info({
        content: this.$t('lang.LunaUI.GuideMessage.Guide1'),
        icon: 'iconfont icon-search1',
        duration: 3
      })
      this.$Message.error({
        content: this.$t('lang.LunaUI.GuideMessage.Guide2'),
        icon: 'iconfont icon-search1',
        theme: 'light',
        duration: 3
      })
      this.$Message.warning({
        content: this.$t('lang.LunaUI.GuideMessage.Guide3'),
        icon: 'iconfont icon-search1',
        theme: 'light',
        duration: 3
      })
      this.$Message.success({
        content: this.$t('lang.LunaUI.GuideMessage.Guide4'),
        icon: 'iconfont icon-search1',
        theme: 'light',
        duration: 3
      })
      this.$Message.primary({
        content: this.$t('lang.LunaUI.GuideMessage.Guide5'),
        icon: 'iconfont icon-search1',
        theme: 'light',
        duration: 3
      })
      this.$Message.alert({
        content: this.$t('lang.LunaUI.GuideMessage.Guide6'),
        icon: 'iconfont icon-search1',
        theme: 'light',
        duration: 3
      })
    },
    cgTheme() {
      if (this.theme === 'light') {
        this.theme = 'dark'
      } else {
        this.theme = 'light'
      }
    },
    submit() {
      if (this.$refs.form.examine(this.createData)) {
        // Error
        this.$Message.error({ content: '请检查填写错误项！' })
      } else {
        this.createData.uid = this.uuidGet()
        this.getData(login.registerConfirm, this.createData).then((res) => {
          if (res.success) {
            this.$Message.success({ content: '注册成功！' })
            localStorage.setItem('userInfo', JSON.stringify(res.data))
          } else {
            if (res.code === 1) {
              this.$Message.error({ content: '密码不能少于6位！' })
            } else if (res.code === 2) {
              this.$Message.error({ content: '用户名长度不能少于4位！' })
            }
          }
        })
        // Success
      }
    },
    logLang() {
      this.$Message.primary({ content: this.$lang() })
    },
    setLang() {
      if (this.$i18n.locale === 'zh-CN') {
        this.$i18n.locale = 'en-US'
      } else {
        this.$i18n.locale = 'zh-CN'
      }
    },
    showModal() {
      this.GuideModal = !this.GuideModal
    }
  }
}
</script>

<style scoped></style>
