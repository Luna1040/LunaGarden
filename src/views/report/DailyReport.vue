<template>
  <div class="reportView daily">
    <div class="dailyContainer">
      <Card :width="550">
        <div slot="header" class="lunaCardTitle">
          <div class="cardAvatar">
            <img :src="userInfo.userIcon" alt="" />
          </div>
          {{ currentDay }}
        </div>
        <Form ref="form" style="margin: 0 auto;" background="rgba(0,0,0,0)" border="0" :shadow="false" :form="form" :theme="theme" :width="500" label-position="top" :label-width="150">
          <Button theme="primary" @click="addCurrentList">添加</Button>
        </Form>
        <Card title="今日工作" :width="456" style="margin: 0 auto;" class-name="workList">
          <transition name="slideDown">
            <p v-if="currentList.length === 0">暂无工作记录</p>
            <transition-group v-else appear name="listSlideDown" tag="ul">
              <li v-for="(i, index) in currentList" :key="i.id">
                <div>
                  <div class="urgentStatus" :class="{ urgent: i.urgent === 1, important: i.urgent === 2, warning: i.urgent === 3, normal: i.urgent === 4, notNecessary: i.urgent === 5 }" @mouseenter="showDelIcon(index)" @mouseleave="hideDelIcon(index)" @click="delList(i.showDelIcon, index)">
                    <transition name="slideDown">
                      <i v-if="i.showDelIcon" class="iconfont icon-ICON_cancel"></i>
                    </transition>
                  </div>
                  <span class="listContent">{{ i.content }}</span>
                </div>
                <span :class="{ success: parseInt(i.process) === 100, normal: parseInt(i.process) >= 50 && parseInt(i.process) < 100, error: parseInt(i.process) < 50 }">{{ i.process }}%</span>
              </li>
            </transition-group>
          </transition>
        </Card>
      </Card>
      <Card v-for="(i, index) in listData" :key="index" flex :width="550">
        <div slot="header" class="lunaCardTitle" :class="{ urgent: i.urgent === 1, important: i.urgent === 2, warning: i.urgent === 3, normal: i.urgent === 4, notNecessary: i.urgent === 5 }">
          <div class="cardAvatar">
            <img :src="userInfo.userIcon" alt="" />
          </div>
          {{ urgentStatus(i.urgent) }}
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DailyReport',
  props: {
    lang: {
      type: Object,
      default: () => {
        return {}
      }
    },
    userInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      theme: 'light',
      formData: {
        content: '',
        process: '0',
        urgent: 5,
        showDelIcon: false,
        deleting: false
      },
      currentList: [
        {
            id: '12',
          content: 'LunaGardenLunaGardenLunaGardenLunaGardenLunaGardenLunaGardenLunaGardenLunaGardenLunaGardenLunaGardenLunaGardenLunaGardenLunaGardenLunaGardenLunaGardenLunaGarden',
          process: '100',
          urgent: 5,
          showDelIcon: false,
          deleting: false
        },
        {
            id: '1x',
            content: 'Luna Garden Bug修复，样式修正。',
          process: '75',
          urgent: 4,
          showDelIcon: false,
          deleting: false
        },
        {
            id: '12c',
            content: 'Luna Garden Bug修复，样式修正。',
          process: '40',
          urgent: 3,
          showDelIcon: false,
          deleting: false
        },
        {
            id: '12qwe',
            content: 'Luna Garden Bug修复，样式修正。',
          process: 0,
          urgent: 2,
          showDelIcon: false,
          deleting: false
        },
        {
            id: '12zzz',
            content: 'Luna Garden Bug修复，样式修正。',
          process: 0,
          urgent: 1,
          showDelIcon: false,
          deleting: false
        }
      ],
      listData: [],
      form: [],
      radioData: [
        { label: this.lang['urgent'], value: '', trueValue: 1 },
        { label: this.lang['important'], value: '', trueValue: 2 },
        { label: this.lang['warning'], value: '', trueValue: 3 },
        { label: this.lang['normal'], value: '', trueValue: 4 },
        { label: this.lang['notNecessary'], value: '', trueValue: 5 }
      ]
    }
  },
  created() {
    this.getData()
    this.form = [
      {
        title: this.lang.content,
        validate: 'content',
        validateOnChange: true,
        required: true,
        emptyWarning: this.lang.alert1,
        render: (h, params) => {
          return h('Input', {
            props: {
              value: this.formData.content,
              theme: this.theme,
              validateOnChange: params.validateOnChange,
              validateMethods: params.validateMethods,
              width: '100%'
            },
            on: {
              input: (event) => {
                this.formData.content = event
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
        title: this.lang.process,
        validate: 'process',
        validateOnChange: true,
        required: true,
        emptyWarning: this.lang.alert2,
        render: (h, params) => {
          return h('Input', {
            props: {
              value: this.formData.process,
              theme: this.theme,
              validateOnChange: params.validateOnChange,
              validateMethods: params.validateMethods,
              width: '100px'
            },
            on: {
              input: (event) => {
                this.formData.process = event
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
        title: this.lang.urgentText,
        validate: 'urgent',
        render: (h, params) => {
          return h('RadioGroup', {
            props: {
              value: this.formData.urgent,
              radioData: this.radioData
            },
            on: {
              input: (event) => {
                this.formData.urgent = event
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
    lang() {
      this.form = [
        {
          title: this.lang.content,
          validate: 'content',
          validateOnChange: true,
          required: true,
          emptyWarning: this.lang.alert1,
          render: (h, params) => {
            return h('Input', {
              props: {
                value: this.formData.content,
                theme: this.theme,
                validateOnChange: params.validateOnChange,
                validateMethods: params.validateMethods,
                width: '100%'
              },
              on: {
                input: (event) => {
                  this.formData.content = event
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
          title: this.lang.process,
          validate: 'process',
          validateOnChange: true,
          required: true,
          emptyWarning: this.lang.alert2,
          render: (h, params) => {
            return h('Input', {
              props: {
                value: this.formData.process,
                theme: this.theme,
                validateOnChange: params.validateOnChange,
                validateMethods: params.validateMethods,
                width: '100px'
              },
              on: {
                input: (event) => {
                  this.formData.process = event
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
          title: this.lang.urgentText,
          validate: 'urgent',
          render: (h, params) => {
            return h('RadioGroup', {
              props: {
                value: this.formData.urgent,
                radioData: this.radioData
              },
              on: {
                input: (event) => {
                  this.formData.urgent = event
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
    currentDay() {
      const d = new Date()
      return d.toDateString()
    }
  },
  methods: {
    getData() {},
    urgentStatus(val) {
      switch (val) {
        case 1:
          return 'Urgent'
        case 2:
          return 'Important'
        case 3:
          return 'Warning'
        case 4:
          return 'Normal'
        case 5:
          return 'Not Necessary'
      }
    },
    addCurrentList() {
      if (this.$refs.form.examine(this.formData)) {
        this.$Message.error({ content: '请检查填写错误项！' })
        return
      }
      const params = JSON.parse(JSON.stringify(this.formData))
        params.id = this.uuidGet()
      this.currentList.push(params)
    },
    showDelIcon(i) {
      if (!this.currentList[i].showDelIcon) {
        this.currentList[i].showDelIcon = true
      }
    },
    hideDelIcon(i) {
      if (this.currentList[i].showDelIcon) {
        this.currentList[i].showDelIcon = false
      }
    },
    delList(status, i) {
      if (status) {
          this.currentList.splice(i, 1)
      }
    }
  }
}
</script>

<style scoped></style>
