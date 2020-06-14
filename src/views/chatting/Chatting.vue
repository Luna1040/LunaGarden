<template>
  <div class="lunaChatting">
    <Header
      :msg-header="$t('lang.titles.about')"
      user-icon="userIcon.jpg"
      user-name="Luna Lovegood"
      is-viper="true"
      user-language="English"
    ></Header>
    <ul ref="chatWindow" :class="{transHeight: imgList.length !== 0}">
      <li
        v-for="(i, index) in chatList"
        :key="index"
        :class="[
          { self: i.uid === userInfo.uid },
          { spaceReplace: !ifRepeatChara(index) },
        ]"
      >
        <img
          v-if="ifRepeatChara(index)"
          :src="i.userIcon"
          class="userIcon"
          alt=""
        />
        <div class="messageArea" :class="{self: i.uid === userInfo.uid}">
          <p v-if="ifRepeatChara(index)">{{ i.userName }}</p>
          <div class="contentArea">
            <div v-if="i.imgList.length !== 0" class="imgList">
              <img v-for="(x, index2) in i.imgList" :key="index2" :src="x" alt="" />
            </div>
            {{ i.content }}
          </div>
        </div>
      </li>
    </ul>
    <div class="footerInput" :class="{footerImgPreview: imgList.length !== 0}">
      <div v-if="imgList.length !== 0" class="previewImgList">
        <img v-for="(i, index) in imgList" :key="index" :src="i" alt="">
      </div>
      <div class="msgArea">
        <Input v-model="text" :width="400" placeholder="请输入消息"></Input>
        <Button theme="primary" @click="uploadImg">上传图片</Button>
        <Button theme="primary" @click="sendMessage">发送消息</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/pc/activeHeader.vue'
import { login } from '../../assets/js/url.js'

export default {
  name: 'chatting',
  data () {
    return {
      chatList: [
        {
          uid: 'kjliagsg83770449pezi4jnjj8vq4t8u',
          content: '这是卢娜酱发的消息呀！',
          imgList: [],
          userIcon: 'userIcon.jpg',
          userName: 'LunaLovegood'
        },
        {
          uid: 'kjliagsg83770449pe2i4jnjj8vq4t8u',
          content: '随便一个人吧！！',
          imgList: [],
          userIcon: 'userIcon.jpg',
          userName: '申佳'
        },
        {
          uid: 'kjliagsg83770449pezi4jnjj86q4t8u',
          content:
                            '不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？不会没有素言阿姨吧？',
          imgList: [],
          userIcon: 'userIcon.jpg',
          userName: '素言阿姨'
        },
        {
          uid: 'kjliagsg83770449pezi4jnjj86q4t8u',
          content: '重复的消息是不会重复展示头像和名称的哦！',
          imgList: [],
          userIcon: 'userIcon.jpg',
          userName: '素言阿姨'
        },
        {
          uid: 'kjliagsg83770449pe2i4jnjj8vq4t8u',
          content: '有一说一，确实不显示！',
          imgList: [],
          userIcon: 'userIcon.jpg',
          userName: '申佳'
        }
      ],
      userInfo: {},
      text: '',
      imgList: []
    }
  },
  components: {
    Header
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      if (localStorage.getItem('userInfo')) {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
      }
    },
    ifRepeatChara (index) {
      if (index !== 0) {
        return this.chatList[index].uid !== this.chatList[index - 1].uid
      } else {
        return true
      }
    },
    uploadImg () {
      this.imgList.push('userIcon.jpg')
      this.$Message.success({ content: '添加成功！' })
    },
    sendMessage () {
      const imgList = []
      if (this.imgList.length !== 0) {
        this.imgList.forEach(item => {
          imgList.push(item)
        })
      }
      const params = {
        uid: this.userInfo.uid,
        userName: this.userInfo.userName,
        userIcon: 'userIcon.jpg',
        imgList: imgList,
        content: this.text
      }
      if (imgList.length !== 0 || this.text !== '') {
        this.chatList.push(params)
        this.$nextTick(() => {
          this.$refs.chatWindow.scrollTop = this.$refs.chatWindow.scrollHeight
        })
        console.log(this.$refs.chatWindow.scrollHeight)
        // console.log(this.$refs.chatWindow);
        this.imgList = []
        this.text = ''
        // this.getData(login.loginConfirm, params).then((res) => {
        //   console.log(res)
        // })
      }
    }
  }
}
</script>

<style scoped></style>
