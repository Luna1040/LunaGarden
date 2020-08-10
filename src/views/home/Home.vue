<template>
  <div class="home">
    <div class="searchArea">
      <div class="inputArea" :class="{ inputAreaActive: todoText !== '' }">
        <Button :width="32" :height="32" corner="round" color="#333" class="searchBtn" theme="primary" shadow border="0" @click="matchQuery">
          <i class="iconfont icon-search1"></i>
        </Button>
        <Input v-model="todoText" type="text" class="searchInput" :placeholder="$t('lang.home.input')" border-color="rgba(0,0,0,0)!important" box-shadow="none!important" ghost width="100%" font-size="32" @on-keyup="keyup($event)" @on-keydown="keydown($event)" />
        <Button :width="32" :height="32" corner="round" color="#333" class="searchBtn" theme="primary" shadow border="0" @click="addTodo">
          <i class="iconfont icon-add1"></i>
        </Button>
      </div>
      <transition name="searchListAnimation">
        <ul v-if="todoText.trim() !== ''" class="searchAssociation">
          <li v-if="todoText !== '' && searchArr.length === 0">暂无搜索数据</li>
          <li v-for="(item, index) in searchArr" :key="index" class="list-group-item-text" @click="choice(item)">
            {{ item }}
          </li>
        </ul>
      </transition>
    </div>
    <div id="navigation" :class="{ todoListShorter: searchArr.length !== 0 }">
      <div slot="button-prev" class="swiper-button-prev">
        {{ $t('lang.home.prev') }}
      </div>
      <div slot="button-next" class="swiper-button-next">
        {{ $t('lang.home.next') }}
      </div>
    </div>
    <swiper ref="mySwiper" :options="swiperOption">
      <swiper-slide :class="{ 'todoList-shorter': searchArr.length !== 0 }">
        <ul class="todoList">
          <li v-for="(i, index) in todoList" :key="i.id">
            <div>
              <span :class="{ successText: i.completed === true }">{{ $t('lang.home.timeStamp') }}{{ i.time }}</span>
              <span :class="{ successText: i.completed === true }">{{ $t('lang.home.content') }}{{ i.content }}</span>
            </div>
            <div class="dragBtn" @click="mousedown(index)">
              <div
                class="dragMenu"
                :class="{
                  dragMenuShow: dragActive === index,
                  dragMenuHide: dragActive === -1
                }"
              >
                <i class="iconfont icon-cancel" @click.stop="dragClose()"></i>
                <div @click.stop="cgStatus(i.id)">
                  <!-- 完成计划 -->
                  <button v-show="i.completed === false">
                    <i class="iconfont icon-quedingx"></i>
                  </button>
                  <button v-show="i.completed === true">
                    <i class="iconfont icon-quedingx"></i>
                  </button>
                </div>
                <div @click.stop="editShow(i.id)">
                  <!-- 编辑计划 -->
                  <button>
                    <i class="iconfont icon-remark"></i>
                  </button>
                </div>
                <div @click.stop="copyContent(i.id)">
                  <!-- 复制文本 -->
                  <button>
                    <i class="iconfont icon-copy-l"></i>
                  </button>
                </div>
                <div @click.stop="delShow(i.id)">
                  <!-- 删除计划 -->
                  <button>
                    <i class="iconfont icon-ICON_cancel"></i>
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </swiper-slide>
      <swiper-slide>
        <ul class="todoList" :class="{ 'todoList-shorter': searchArr.length !== 0 }">
          <li v-for="(i, index) in businessList" :key="i.id">
            <div>
              <span :class="{ successText: i.completed === true }">{{ $t('lang.home.timeStamp') }}{{ i.time }}</span>
              <span :class="{ successText: i.completed === true }">{{ $t('lang.home.content') }}{{ i.content }}</span>
            </div>
            <div class="dragBtn" @click="mousedown(index)">
              <div
                class="dragMenu"
                :class="{
                  dragMenuShow: dragActive === index,
                  dragMenuHide: dragActive === -1
                }"
              >
                <i class="iconfont icon-cancel" @click.stop="dragClose()"></i>
                <div @click.stop="cgStatus(i.id)">
                  <!-- 完成计划 -->
                  <button v-show="i.completed === false">
                    <i class="iconfont icon-quedingx"></i>
                  </button>
                  <button v-show="i.completed === true">
                    <i class="iconfont icon-quedingx"></i>
                  </button>
                </div>
                <div @click.stop="editShow(i.id)">
                  <!-- 编辑计划 -->
                  <button>
                    <i class="iconfont icon-remark"></i>
                  </button>
                </div>
                <div @click.stop="copyContent(i.id)">
                  <!-- 复制文本 -->
                  <button>
                    <i class="iconfont icon-copy-l"></i>
                  </button>
                </div>
                <div @click.stop="delShow(i.id)">
                  <!-- 删除计划 -->
                  <button>
                    <i class="iconfont icon-ICON_cancel"></i>
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </swiper-slide>
    </swiper>
    <div
      class="toast"
      :class="{
        showToast: toastLaunch === true,
        hideToast: toastLaunch === false,
        hide: toastLaunch === ''
      }"
    >
      <p v-show="addStatus === 'successAdd'">
        {{ $t('lang.home.alert.addAlertSuccess') }}
      </p>
      <p v-show="addStatus === 'failAdd'">
        {{ $t('lang.home.alert.addAlertFail') }}
      </p>
      <p v-show="addStatus === 'errorAdd'">
        {{ $t('lang.home.alert.addAlertNetError') }}
      </p>
      <p v-show="addStatus === 'successAdd'" class="error desc">
        {{ $t('lang.home.alert.addAlertSuccess2') }}
      </p>
      <p v-show="addStatus === 'failAdd'" class="error desc">
        {{ $t('lang.home.alert.addAlertFail2') }}
      </p>
      <p v-show="addStatus === 'errorAdd'" class="error desc">
        {{ $t('lang.home.alert.addAlertNetError2') }}
      </p>
    </div>
    <Modal v-model="emptyWarning" :title="$t('lang.firstAlert.attention')" @on-cancel="emptyWarningCancel()">
      <div>
        <p class="primaryText">{{ $t('lang.home.alert.emptyAlert') }}</p>
      </div>
      <div slot="footer">
        <button v-ripple class="primaryButton" @click="emptyWarningCancel()">
          {{ $t('lang.home.button.OK') }}
        </button>
      </div>
    </Modal>
    <Modal v-model="del" :title="$t('lang.firstAlert.warning')" type="error" @on-cancel="delCancel()">
      <div>
        <p class="defaultTextColor">{{ $t('lang.home.alert.delMsg') }}</p>
        <p class="errorText smFont">{{ $t('lang.home.alert.delMsg2') }}</p>
      </div>
      <div slot="footer">
        <button v-ripple class="normalButton" @click="delCancel()">
          {{ $t('lang.home.button.cancel') }}
        </button>
        <button v-ripple class="errorButton" @click="delConfirm()">
          {{ $t('lang.home.button.DEL') }}
        </button>
      </div>
    </Modal>
    <Modal v-model="diffModal" title="不同步的内容" type="primary" :theme="theme" :footer-show="false" :closeable="false" @on-cancel="createCancel()">
      <ul class="diffList">
        <li v-for="(i, index) in diffList" :key="i.id">
          <span>{{ i.content }}</span>
          <div class="btnGroup">
            <Button theme="primary" @click="mergeDiff(i.flag, i, index)">添加</Button>
            <Button theme="error" @click="delDiff(i.flag, i, index)">删除</Button>
          </div>
        </li>
      </ul>
    </Modal>
    <Modal v-model="create" :title="$t('lang.home.create.create')" type="primary" :theme="theme" @on-cancel="createCancel()">
      <Form ref="form" style="margin: 0 auto;" background="rgba(0,0,0,0)" border="0" :shadow="false" :form="form" :theme="theme" :width="320" label-position="top" :label-width="150"></Form>
    </Modal>
  </div>
</template>

<script>
import { home } from '@/assets/js/url'

export default {
  name: 'home',
  data() {
    return {
      theme: 'light',
      del: false,
      emptyWarning: false,
      create: false,
      choiceId: '',
      todoText: '',
      addAlert: '',
      toastLaunch: '',
      addStatus: '',
      modal: '',
      searchArr: [],
      todoList: [],
      businessList: [],
      dragActive: -1,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      swiperOption: {
        notNextTick: true,
        autoplay: false,
        navigation: {
          nextEl: '#navigation>.swiper-button-next', // 前进按钮的css选择器或HTML元素。
          prevEl: '#navigation>.swiper-button-prev' // 后退按钮的css选择器或HTML元素。
        },
        autoplayDisableOnInteraction: false,
        loop: false,
        on: {
          slideChange: () => {
            this.dragActive = -1
            this.activeList = this.$refs.mySwiper.swiper.swipeDirection
          }
        }
      },
      form: [
        {
          title: this.$t('lang.home.create.title'),
          validate: 'userName',
          validateOnChange: true,
          required: true,
          emptyWarning: this.$t('lang.home.create.emptyTitle'),
          validateMethods: [
            {
              type: 'length',
              max: 100,
              maxErrText: this.$t('lang.home.create.maxTitle'),
              min: 1,
              minErrText: this.$t('lang.home.create.maxTitle')
            }
          ],
          render: (h, params) => {
            return h('Input', {
              props: {
                value: this.createData.title,
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
        }
      ],
      createData: {
        title: '',
        content: '',
        status: false,
        deadLine: '',
        notice: true
      },
      activeList: 'prev',
      userInfo: {},
      diffList: [],
      diffModal: false
    }
  },
  created() {
    this.todoList = JSON.parse(localStorage.getItem('todoList'))
    this.businessList = JSON.parse(localStorage.getItem('businessList'))
    if (localStorage.getItem('userInfo')) {
      this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    }
    this.Data()
    if(window.WebSocket) {
      const ws = new WebSocket('ws://10.18.190.188:3001')
      ws.onopen = e => {
        console.log('服务器连接成功')
        ws.send(JSON.stringify({
          id: '111',
          name: '卢娜',
          time: '2020/08/10',
          icon: 'userIcon.jpg',
          msg: '经由WebSocket获取的消息'
        }))
      }
      ws.onclose = () => {
        console.log('连接出错，请刷新重试')
      }
      ws.onmessage = e => {
        console.log(JSON.parse(e.data))
      }
    }
  },
  methods: {
    Data() {
      this.getData(home.getTodoList, { uid: this.userInfo.uid }).then((res) => {
        let that = this
        if (res.success === true) {
          let temp = res.data
          if (JSON.stringify(temp) !== JSON.stringify(this.todoList)) {
            this.$Message.error({ content: '本地数据与线上内容有差异，请选择保留内容或需要删除的内容！' })
            let local = []
            let cloud = []
            this.todoList.forEach((i) => {
              local.push(i.id)
            })
            temp.forEach((i) => {
              cloud.push(i.id)
            })
            local.concat(cloud).filter(function (v, i, arr) {
              // 找出差异ID
              if (arr.indexOf(v) === arr.lastIndexOf(v)) {
                //确认在本地有差异还是在云端有差异
                //本地判断
                for (let index = 0; index < local.length; index++) {
                  if (arr[i] === local[index]) {
                    for (let a = 0; a < that.todoList.length; a++) {
                      if (that.todoList[a].id === arr[i]) {
                        let inf = that.todoList[a]
                        inf.flag = 'local'
                        that.diffList.push(inf)
                      }
                    }
                  } else {
                    //云端储存
                    for (let a = 0; a < temp.length; a++) {
                      if (temp[a].id === arr[i]) {
                        let inf = temp[a]
                        inf.flag = 'cloud'
                        that.diffList.push(inf)
                      }
                    }
                  }
                }
              }
            })
            this.diffModal = true
          }
        }
      })
    },
    mousedown(index) {
      this.dragActive = index
    },
    keyup(event) {
      if (event.keyCode === 38 || event.keyCode === 40 || event.keyCode === 13) {
      } else {
        if (this.todoText !== '') {
          const url = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su'
          this.$http
            .jsonp(url, {
              params: {
                wd: this.todoText
              },
              jsonp: 'cb'
            })
            .then((res) => {
              if (res.data.s.length !== 0) {
                this.searchArr = res.data.s
              } else {
                this.searchArr = []
              }
            })
        } else {
          this.searchArr = []
        }
      }
    },
    choice(value) {
      window.open('https://cn.bing.com/search?q=' + value)
    },
    keydown(event) {
      // 下键：40 上键：38
      if (event.keyCode === 38) {
        // 按的上键
        this.listIndex--
        if (this.listIndex < 0) {
          this.listIndex = this.arr.length - 1
        }
        this.todoText = this.arr[this.listIndex]
      } else if (event.keyCode === 40) {
        // 说明你按的是下键
        this.listIndex++
        if (this.listIndex > this.arr.length - 1) {
          this.listIndex = 0
        }
        this.todoText = this.arr[this.listIndex]
      } else if (event.keyCode === 13) {
        window.open('https://cn.bing.com/search?q=' + this.todoText)
      }
    },
    matchQuery() {
      if (this.todoText !== '') {
        window.open('https://cn.bing.com/search?q=' + this.todoText)
      } else {
        this.emptyWarning = true
      }
    },
    emptyWarningCancel() {
      this.emptyWarning = false
    },
    addTodo() {
      // 非空验证
      if (this.todoText === '') {
        this.create = true
      } else {
        const id = this.uuidGet()
        const time = this.timeFormat(new Date())
        const localData = JSON.parse(localStorage.getItem('todoList'))
        // 设置储存条目内容
        const tempObj = {
          id: id,
          time: time,
          content: this.todoText,
          completed: false
        }
        if (this.userInfo === {}) {
          this.$Message.error({ content: '请先登录后再进行操作！' })
          return
        } else if (!this.userInfo.uid) {
          this.$Message.error({ content: '登录过期，请重新登录！' })
          return
        } else {
          tempObj.uid = this.userInfo.uid
        }
        if (window.navigator.onLine) {
          this.getData(home.addTodoList, tempObj).then((res) => {
            if (res.success) {
              this.$Message.success({ content: '添加成功！' })
              // 添加li
              this.todoList.push(tempObj)
              localData.push(tempObj)
              // 存入localStorage
              localStorage.setItem('todoList', JSON.stringify(localData))
              // 清空输入框
              this.todoText = ''
              // 发送空值查询请求
              this.keyup({ keyCode: 10 })
            } else {
              this.$Message.error({ content: '添加失败！' })
            }
          })
        } else {
          this.$Message.warning({ content: '无法连接网络，当前内容已保存在本地，将于联网后进行同步！' })
          this.todoList.push(tempObj)
          localData.push(tempObj)
          // 存入localStorage
          localStorage.setItem('todoList', JSON.stringify(localData))
          // 清空输入框
          this.todoText = ''
          // 发送空值查询请求
          this.keyup({ keyCode: 10 })
        }
        // addStatus
        // 成功 successAdd  //未登录 failAdd //未联网 errorAdd
      }
    },
    createConfirm() {
      const params = JSON.parse(JSON.stringify(this.createData))
      this.todoList.push(params)
      localStorage.setItem('todoList', this.todoList)
      this.createCancel()
    },
    createCancel() {
      this.createData = {
        title: '',
        content: '',
        status: false,
        deadLine: '',
        notice: true
      }
      this.create = false
    },
    hideModal() {
      this.addAlert = false
      const _this = this
      setTimeout(function () {
        _this.addAlert = ''
      }, 500)
    },
    hideToast() {
      this.toastLaunch = false
      const _this = this
      setTimeout(function () {
        _this.toastLaunch = ''
      }, 500)
    },
    dragClose() {
      this.dragActive = -1
    },
    cgStatus(id) {
      this.todoList.forEach((item, index) => {
        if (item.id === id) {
          this.todoList[index].completed = !this.todoList[index].completed
        }
      })
      localStorage.setItem('todoList', JSON.stringify(this.todoList))
      this.dragClose()
    },
    editShow() {
      this.dragClose()
    },
    delShow(id) {
      this.del = true
      this.choiceId = id
      this.dragClose()
    },
    delCancel() {
      this.del = false
      this.choiceId = ''
    },
    delConfirm() {
      this.todoList.forEach((item, index) => {
        if (item.id === this.choiceId) {
          this.todoList.splice(index, 1)
        }
      })
      localStorage.setItem('todoList', JSON.stringify(this.todoList))
      this.delCancel()
    },
    copyContent() {
      this.dragClose()
    },
    mergeDiff(flag, item, index) {
      delete item.flag
      if (flag === 'local') {
        item.uid = this.userInfo.uid
        this.getData(home.addTodoList, item).then((res) => {
          if (res.success) {
            this.$Message.success({ content: '添加成功！' })
          } else {
            this.$Message.error({ content: '添加失败！' })
          }
        })
      } else {
        this.$Message.success({ content: '添加成功！' })
        this.todoList.push(item)
        localStorage.setItem('todoList', JSON.stringify(this.todoList))
      }
      this.diffList.splice(index, 1)
      if (this.diffList.length === 0) {
        this.diffModal = false
      }
    },
    delDiff(flag, item, index) {
      delete item.flag
      if (flag === 'local') {
        item.uid = this.userInfo.uid
        this.getData(home.addTodoList, item).then((res) => {
          if (res.success) {
            this.$Message.success({ content: '添加成功！' })
            // 添加li
            this.todoList.push(item)
            item.push(item)
            // 存入localStorage
            localStorage.setItem('todoList', JSON.stringify(this.todoList))
          } else {
            this.$Message.error({ content: '添加失败！' })
          }
        })
      } else {
        this.$Message.success({ content: '添加成功！' })
        this.todoList.push(item)
        localStorage.setItem('todoList', JSON.stringify(this.todoList))
      }
      this.diffList.splice(index, 1)
      if (this.diffList.length === 0) {
        this.diffModal = false
      }
    }
  }
}
</script>
<!--谷歌搜索list模块-->
<!--https://www.google.com/complete/search?q=Luna&cp=4&client=psy-ab&xssi=t&gs_ri=gws-wiz&hl=zh-CN&authuser=0&psi=kpypXfa4L620mAXIoDc.1571396755338&ei=kpypXfa4L620mAXIoDc-->
<!--百度搜索List模块-->
<!--https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1442,21118,29567,29221,22158&wd=Luna&req=2&csor=4&cb=jQuery110201946216263738294_1571396837817&_=1571396837820-->
<!--bing搜索List模块-->
<!--https://cn.bing.com/AS/Suggestions?pt=page.home&mkt=zh-cn&ds=mobileweb&qry=luna&cp=0&cvid=4C94085CD28049A3AC1BBC34170774C3-->
<style scoped lang="scss">
.successText {
  color: aquamarine;
  text-decoration: line-through;
}
</style>
