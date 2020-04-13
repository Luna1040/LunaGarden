<template>
    <div class="mHome">
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
                        @click="matchQuery"
                        theme="primary"
                        shadow
                        border="0"
                >
                    <i class="iconfont icon-search1"></i>
                </Button>
                <Input
                        type="text"
                        class="searchInput"
                        :placeholder="$t('lang.home.input')"
                        v-model="todoText"
                        border-color="rgba(0,0,0,0)"
                        ghost
                        width="100%"
                        font-size="32"
                        maxlength="150"
                        @on-keyup="keyup($event)"
                        @on-keydown="keydown($event)"
                ></Input
                ><br />
                <Button
                        :width="32"
                        :height="32"
                        corner="round"
                        color="#333"
                        class="searchBtn"
                        @click="addTodo"
                        theme="primary"
                        shadow
                        border="0"
                >
                    <i class="iconfont icon-add1"></i>
                </Button>
            </div>
            <transition name="searchListAnimation">
                <ul class="searchAssociation" v-if="todoText.trim() !== ''">
                    <li v-if="todoText !== '' && searchArr.length === 0">暂无搜索数据</li>
                    <li
                            class="list-group-item-text"
                            v-for="(item, index) in searchArr"
                            :key="index"
                            @click="choice(item)"
                    >
                        {{ item }}
                    </li>
                </ul>
            </transition>
        </div>
        <div id="navigation">
            <div class="swiper-button-prev" slot="button-prev">
                {{ $t("lang.home.prev") }}
            </div>
            <div class="swiper-button-next" slot="button-next">
                {{ $t("lang.home.next") }}
            </div>
        </div>
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide :class="{ 'todoList-shorter': searchArr.length !== 0 }">
                <ul class="todoList">
                    <li v-for="(i, index) in todoList" :key="i.id" @click="mousedown(index)" :class="{ dragActive: dragActive === index }">
                        <div class="content">
                            <p class="text" :class="{ successText: i.completed === true, dragActive: dragActive === index }">{{ i.content }}</p>
                            <p class="timer" :class="{ successText: i.completed === true, dragActive: dragActive === index }">{{ $t("lang.home.timeStamp") }}{{ i.time }}</p>
                        </div>
                        <i v-if="dragActive !== index" @click="cgStatus(i.id)" class="cgStatusIcon iconfont icon-quedingx"></i>
                        <div v-else class="btnGroup">
                            <Button :height="24" @click="cgStatus(index)">{{$t("lang.home.button.finish")}}</Button>
                            <Button :height="24" @click="editShow">{{$t("lang.home.button.edit")}}</Button>
                            <Button :height="24" @click="editShow">{{$t("lang.home.button.copy")}}</Button>
                            <Button :height="24" theme="error" @click="editShow">{{$t("lang.home.button.DEL")}}</Button>
                        </div>
                    </li>
                </ul>
            </swiper-slide>
            <swiper-slide>
                <ul
                        class="todoList"
                        :class="{ 'todoList-shorter': searchArr.length !== 0 }"
                >
                    <li v-for="(i, index) in businessList" :key="i.id" @click="mousedown(index)" :class="{ dragActive: dragActive === index }">
                        <div class="content">
                            <p class="text" :class="{ successText: i.completed === true, dragActive: dragActive === index }">{{ i.content }}</p>
                            <p class="timer" :class="{ successText: i.completed === true, dragActive: dragActive === index }">{{ $t("lang.home.timeStamp") }}{{ i.time }}</p>
                        </div>
                        <i v-if="dragActive !== index" @click="cgStatus(i.id)" class="cgStatusIcon iconfont icon-quedingx"></i>
                        <div v-else class="btnGroup">
                            <Button :height="24" @click="cgStatus(index)">{{$t("lang.home.button.finish")}}</Button>
                            <Button :height="24" @click="editShow">{{$t("lang.home.button.edit")}}</Button>
                            <Button :height="24" @click="editShow">{{$t("lang.home.button.copy")}}</Button>
                            <Button :height="24" theme="error" @click="editShow">{{$t("lang.home.button.DEL")}}</Button>
                        </div>
                    </li>
                </ul>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>
import Header from '../../components/mobile/activeHeader'
export default {
  data () {
    return {
      todoText: '',
      todoList: [],
      businessList: [],
      searchArr: [],
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
      }
    }
  },
  components: {
    Header
  },
  created () {
    this.todoList = JSON.parse(localStorage.getItem('todoList'))
    this.businessList = JSON.parse(localStorage.getItem('businessList'))
  },
  methods: {
    mousedown (index) {
      if (this.dragActive === index) {
        this.dragActive = -1
      } else {
        this.dragActive = index
      }
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
      // this.dragClose()
    },
    editShow () {
      // this.dragClose()
    },
    delShow (id) {
      this.del = true
      this.choiceId = id
      // this.dragClose()
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
      // this.dragClose()
    }
  }
}
</script>

<style>
</style>
