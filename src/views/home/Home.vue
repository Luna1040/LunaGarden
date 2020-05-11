<template>
  <div class="home">
    <Header
      :msg-header="$t('lang.titles.home')"
      user-icon="userIcon.jpg"
      user-name="Luna Lovegood"
      is-viper="true"
      user-language="English"
    ></Header>
    <div class="searchArea">
      <div class="inputArea" :class="{ inputAreaActive: todoText !== '' }">
        <Button
          :width="32"
          :height="32"
          corner="round"
          color="#333"
          class="searchBtn"
          theme="primary"
          shadow
          border="0"
          @click="matchQuery"
        >
          <i class="iconfont icon-search1"></i>
        </Button>
        <Input
          v-model="todoText"
          type="text"
          class="searchInput"
          :placeholder="$t('lang.home.input')"
          border-color="rgba(0,0,0,0)"
          ghost
          width="100%"
          font-size="32"
          @on-keyup="keyup($event)"
          @on-keydown="keydown($event)"
        ></Input
        >
        <Button
          :width="32"
          :height="32"
          corner="round"
          color="#333"
          class="searchBtn"
          theme="primary"
          shadow
          border="0"
          @click="addTodo"
        >
          <i class="iconfont icon-add1"></i>
        </Button>
      </div>
      <transition name="searchListAnimation">
        <ul v-if="todoText.trim() !== ''" class="searchAssociation">
          <li v-if="todoText !== '' && searchArr.length === 0">暂无搜索数据</li>
          <li
            v-for="(item, index) in searchArr"
            :key="index"
            class="list-group-item-text"
            @click="choice(item)"
          >
            {{ item }}
          </li>
        </ul>
      </transition>
    </div>
    <div id="navigation">
      <div slot="button-prev" class="swiper-button-prev">
        {{ $t("lang.home.prev") }}
      </div>
      <div slot="button-next" class="swiper-button-next">
        {{ $t("lang.home.next") }}
      </div>
    </div>
    <swiper ref="mySwiper" :options="swiperOption">
      <swiper-slide :class="{ 'todoList-shorter': searchArr.length !== 0 }">
        <ul class="todoList">
          <li v-for="(i, index) in todoList" :key="i.id">
            <div>
              <span :class="{ successText: i.completed === true }"
              >{{ $t("lang.home.timeStamp") }}{{ i.time }}</span
              >
              <span :class="{ successText: i.completed === true }"
              >{{ $t("lang.home.content") }}{{ i.content }}</span
              >
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
        <ul
          class="todoList"
          :class="{ 'todoList-shorter': searchArr.length !== 0 }"
        >
          <li v-for="(i, index) in businessList" :key="i.id">
            <div>
              <span :class="{ successText: i.completed === true }"
              >{{ $t("lang.home.timeStamp") }}{{ i.time }}</span
              >
              <span :class="{ successText: i.completed === true }"
              >{{ $t("lang.home.content") }}{{ i.content }}</span
              >
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
        {{ $t("lang.home.alert.addAlertSuccess") }}
      </p>
      <p v-show="addStatus === 'failAdd'">
        {{ $t("lang.home.alert.addAlertFail") }}
      </p>
      <p v-show="addStatus === 'errorAdd'">
        {{ $t("lang.home.alert.addAlertNetError") }}
      </p>
      <p v-show="addStatus === 'successAdd'" class="error desc">
        {{ $t("lang.home.alert.addAlertSuccess2") }}
      </p>
      <p v-show="addStatus === 'failAdd'" class="error desc">
        {{ $t("lang.home.alert.addAlertFail2") }}
      </p>
      <p v-show="addStatus === 'errorAdd'" class="error desc">
        {{ $t("lang.home.alert.addAlertNetError2") }}
      </p>
    </div>
    <Modal
      v-model="emptyWarning"
      :title="$t('lang.firstAlert.attention')"
      @on-cancel="emptyWarningCancel()"
    >
      <div>
        <p class="primaryText">{{ $t("lang.home.alert.emptyAlert") }}</p>
      </div>
      <div slot="footer">
        <button v-ripple class="primaryButton" @click="emptyWarningCancel()">
          {{ $t("lang.home.button.OK") }}
        </button>
      </div>
    </Modal>
    <Modal
      v-model="del"
      :title="$t('lang.firstAlert.warning')"
      type="error"
      @on-cancel="delCancel()"
    >
      <div>
        <p class="defaultTextColor">{{ $t("lang.home.alert.delMsg") }}</p>
        <p class="errorText smFont">{{ $t("lang.home.alert.delMsg2") }}</p>
      </div>
      <div slot="footer">
        <button v-ripple class="normalButton" @click="delCancel()">
          {{ $t("lang.home.button.cancel") }}
        </button>
        <button v-ripple class="errorButton" @click="delConfirm()">
          {{ $t("lang.home.button.DEL") }}
        </button>
      </div>
    </Modal>
    <Modal
      v-model="create"
      :title="$t('lang.home.alert.create')"
      type="primary"
      theme="dark"
      @on-cancel="createCancel()"
    >
    </Modal>
  </div>
</template>

<script>
import Header from '../../components/pc/activeHeader'
import {publicApi} from "../../assets/js/url";

export default {
  name: 'home',
  data () {
    return {
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
      createData: {
        title: '',
        content: '',
        status: false,
        deadLine: '',
        notice: true
      },
      activeList: 'prev'
    }
  },
  components: {
    Header
  },
  created () {
    this.todoList = JSON.parse(localStorage.getItem('todoList'))
    this.businessList = JSON.parse(localStorage.getItem('businessList'))
    this.getDataGet(publicApi.testPort).then(res => {
      console.log(res)
    })
  },
  methods: {
    mousedown (index) {
      this.dragActive = index
    },
    keyup (event) {
      if (
        event.keyCode === 38 ||
        event.keyCode === 40 ||
        event.keyCode === 13
      ) {
      } else {
        if (this.todoText !== '') {
          let url = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su'
          this.$http
            .jsonp(url, {
              params: {
                wd: this.todoText
              },
              jsonp: 'cb'
            })
            .then(res => {
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
    choice (value) {
      window.open('https://cn.bing.com/search?q=' + value)
    },
    keydown (event) {
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
    matchQuery () {
      if (this.todoText !== '') {
        window.open('https://cn.bing.com/search?q=' + this.todoText)
      } else {
        this.emptyWarning = true
      }
    },
    emptyWarningCancel () {
      this.emptyWarning = false
    },
    addTodo () {
      // 非空验证
      if (this.todoText === '') {
        this.create = true
      } else {
        let id = this.uuidGet()
        let time = this.timeFormat(new Date())
        if (this.activeList === 'prev') {
          let localData = JSON.parse(localStorage.getItem('todoList'))
          // 设置储存条目内容
          let tempObj = {
            id: id,
            time: time,
            content: this.todoText,
            completed: false
          }
          // 添加li
          this.todoList.push(tempObj)
          localData.push(tempObj)
          // 定义textContent以方便删除
          this.textContent = localData
          // 存入localStorage
          localStorage.setItem('todoList', JSON.stringify(localData))
        } else {
          let localData = JSON.parse(localStorage.getItem('businessList'))
          // 设置储存条目内容
          let tempObj = {
            id: id,
            time: time,
            content: this.todoText,
            completed: false
          }
          // 添加li
          this.businessList.push(tempObj)
          localData.push(tempObj)
          // 定义textContent以方便删除
          this.textContent = localData
          // 存入localStorage
          localStorage.setItem('businessList', JSON.stringify(localData))
        }
        // 清空输入框
        this.todoText = ''
        // 发送空值查询请求
        this.keyup({ keyCode: 10 })
        // addStatus
        // 成功 successAdd  //未登录 failAdd //未联网 errorAdd
      }
    },
    createConfirm () {
      let params = JSON.parse(JSON.stringify(this.createData))
      this.todoList.push(params)
      localStorage.setItem('todoList', this.todoList)
      this.createCancel()
    },
    createCancel () {
      this.createData = {
        title: '',
        content: '',
        status: false,
        deadLine: '',
        notice: true
      }
      this.create = false
    },
    hideModal () {
      this.addAlert = false
      let _this = this
      setTimeout(function () {
        _this.addAlert = ''
      }, 500)
    },
    hideToast () {
      this.toastLaunch = false
      let _this = this
      setTimeout(function () {
        _this.toastLaunch = ''
      }, 500)
    },
    dragClose () {
      this.dragActive = -1
    },
    cgStatus (id) {
      this.todoList.forEach((item, index) => {
        if (item.id === id) {
          this.todoList[index].completed = !this.todoList[index].completed
        }
      })
      localStorage.setItem('todoList', JSON.stringify(this.todoList))
      this.dragClose()
    },
    editShow () {
      this.dragClose()
    },
    delShow (id) {
      this.del = true
      this.choiceId = id
      this.dragClose()
    },
    delCancel () {
      this.del = false
      this.choiceId = ''
    },
    delConfirm () {
      this.todoList.forEach((item, index) => {
        if (item.id === this.choiceId) {
          this.todoList.splice(index, 1)
        }
      })
      localStorage.setItem('todoList', JSON.stringify(this.todoList))
      this.delCancel()
    },
    copyContent () {
      this.dragClose()
    },
    test () {
      alert('111')
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
