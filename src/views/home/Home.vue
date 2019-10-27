<template>
  <div class="home">
    <Header
      :msg-header="$t('lang.titles.home')"
      user-icon="userIcon.jpg"
      user-name="Luna Lovegood"
      is-viper="true"
      user-language="English"
    ></Header>
    <div class="inputArea" :class="{inputAreaActive : todoText !== ''}">
      <button class="searchBtn" @click="addTodo">
        <i class="iconfont icon-search"></i>
      </button>
      <input
        type="text"
        class="searchInput"
        :placeholder="$t('lang.home.input')"
        v-model="todoText"
        @keyup="keyup($event)"
        @keydown="keydown($event)"
      />
      <button class="searchBtn" @click="addTodo">
        <i class="iconfont icon-add"></i>
      </button>
    </div>
    <ul class="searchAssociation">
      <li
        class="list-group-item-text"
        v-for="(item,index) in searchArr"
        :key="index"
        @click="choice(item)"
      >{{item}}</li>
    </ul>
    <div class="todoList">
      <ul>
        <li v-for="i in todoList" :key="i.id">{{i.name}}</li>
      </ul>
    </div>
    <div
      class="toast"
      :class="{showToast: toastLaunch === true , hideToast: toastLaunch === false , hide: toastLaunch === ''}"
    >
      <p v-show="addStatus === 'successAdd'">{{$t('lang.home.alert.addAlertSuccess')}}</p>
      <p v-show="addStatus === 'failAdd'">{{$t('lang.home.alert.addAlertFail')}}</p>
      <p v-show="addStatus === 'errorAdd'">{{$t('lang.home.alert.addAlertNetError')}}</p>
      <p
        v-show="addStatus === 'successAdd'"
        class="error desc"
      >{{$t('lang.home.alert.addAlertSuccess2')}}</p>
      <p v-show="addStatus === 'failAdd'" class="error desc">{{$t('lang.home.alert.addAlertFail2')}}</p>
      <p
        v-show="addStatus === 'errorAdd'"
        class="error desc"
      >{{$t('lang.home.alert.addAlertNetError2')}}</p>
    </div>
    <div
      class="alertModal"
      :class="{showAlert: addAlert === true , hideAlert: addAlert === false , hide: addAlert === ''}"
      @click="hideModal"
    >
      <div
        class="modalBody"
        :class="{showModal: addAlert === true , hideModal: addAlert === false , hide: addAlert === ''}"
        @click.stop
      >
        <div class="alertHeader">
          <p>{{$t('lang.firstAlert.attention')}}</p>
        </div>
        <div class="alertBody">
          <p class="error">{{$t('lang.home.alert.emptyAlert')}}</p>
        </div>
        <div class="alertFooter">
          <button class="primaryButton" v-waves @click="hideModal">{{$t('lang.home.button.OK')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/activeHeader";

export default {
  name: "home",
  data() {
    return {
      todoText: "",
      currentTime: "",
      uuid: "",
      addAlert: "",
      toastLaunch: "",
      addStatus: "",
      modal: "",
      searchArr: [],
      todoList: []
    };
  },
  components: {
    Header
  },
  created() {},
  methods: {
    uuidGet() {
      let s = [];
      let hexDigits =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i < 26; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x26), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01

      let timeStamp = new Date()
        .getTime()
        .toString()
        .substr(-7);
      s[8] = timeStamp;
      this.uuid = s.join("");
    },
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      // let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
      // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
      this.currentTime = month + "/" + date + "/" + year + "/" + hh + ":" + mm;
      // console.log(this.nowTime);
    },
    keyup(event) {
      if (event.keyCode === 38 || event.keyCode === 40 || event.keyCode === 13)
        return;
      if (this.todoText !== "") {
        let url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su";
        this.$http
          .jsonp(url, {
            params: {
              wd: this.todoText
            },
            jsonp: "cb"
          })
          .then(res => {
            if (res.data.s.length !== 0) {
              this.searchArr = res.data.s;
            } else {
              this.searchArr = [];
            }
          });
      } else {
        this.searchArr = [];
      }
    },
    choice(value) {
      window.open("https://cn.bing.com/search?q=" + value);
    },
    keydown(event) {
      //下键：40 上键：38
      if (event.keyCode === 38) {
        //按的上键
        this.listIndex--;
        if (this.listIndex < 0) {
          this.listIndex = this.arr.length - 1;
        }
        this.todoText = this.arr[this.listIndex];
      } else if (event.keyCode === 40) {
        //说明你按的是下键
        this.listIndex++;
        if (this.listIndex > this.arr.length - 1) {
          this.listIndex = 0;
        }
        this.todoText = this.arr[this.listIndex];
      } else if (event.keyCode === 13) {
        window.open("https://cn.bing.com/search?q=" + this.todoText);
      }
    },
    addTodo(e) {
      //非空验证
      if (this.todoText === "") {
        this.addAlert = !this.addAlert;
      } else {
        this.timeFormate(new Date());
        let tempObj = {};
        let localData = JSON.parse(localStorage.getItem("todoList"));
        //添加li
        this.todos.push({
          id: this.uuid,
          time: this.currentTime,
          content: e.target.value.trim(),
          completed: false
        });
        // console.log(this.todos)
        //设置储存条目内容
        tempObj.id = this.uuid;
        tempObj.time = this.currentTime;
        tempObj.content = e.target.value.trim();
        tempObj.completed = false;
        localData.push(tempObj);
        //定义textContent以方便删除
        this.textContent = localData;
        //存入localStorage
        localStorage.setItem("todoList", JSON.stringify(localData));
        //清空输入框
        this.todoText = "";
        //addStatus
        //成功 successAdd  //未登录 failAdd //未联网 errorAdd
      }
    },
    hideModal() {
      this.addAlert = false;
      let _this = this;
      setTimeout(function() {
        _this.addAlert = "";
      }, 500);
    },
    hideToast() {
      this.toastLaunch = false;
      let _this = this;
      setTimeout(function() {
        _this.toastLaunch = "";
      }, 500);
    }
  }
};
</script>
<!--谷歌搜索list模块-->
<!--https://www.google.com/complete/search?q=Luna&cp=4&client=psy-ab&xssi=t&gs_ri=gws-wiz&hl=zh-CN&authuser=0&psi=kpypXfa4L620mAXIoDc.1571396755338&ei=kpypXfa4L620mAXIoDc-->
<!--百度搜索List模块-->
<!--https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1442,21118,29567,29221,22158&wd=Luna&req=2&csor=4&cb=jQuery110201946216263738294_1571396837817&_=1571396837820-->
<!--bing搜索List模块-->
<!--https://cn.bing.com/AS/Suggestions?pt=page.home&mkt=zh-cn&ds=mobileweb&qry=luna&cp=0&cvid=4C94085CD28049A3AC1BBC34170774C3-->
