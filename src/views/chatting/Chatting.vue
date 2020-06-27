<template>
	<div class="lunaChatting">
		<main>
			<ul class="stories">
				<li
					v-for="(i, index) in storiesList"
					:key="index"
					@click="jumpTo(i.link)"
				>
					<img :src="i.src" alt="" />
					<img src="lace.svg" alt="" />
					<p>{{ i.title }}</p>
				</li>
			</ul>
			<ul ref="chatWindow" class="mainChat">
				<li
					v-for="(i, index) in chatList"
					:key="index"
					:class="[
						{ self: i.uid === userInfo.uid },
						{ spaceReplace: !ifRepeatChara(index) },
					]"
				>
					<div v-if="ifRepeatChara(index)" class="userIcon">
						<img :src="i.userIcon" alt="" />
					</div>
					<div class="messageArea" :class="{ self: i.uid === userInfo.uid }">
						<p v-if="ifRepeatChara(index)">{{ i.userName }}</p>
						<div class="contentArea">
							<div v-if="i.imgList.length !== 0" class="imgList">
								<img
									v-for="(x, index2) in i.imgList"
									:key="index2"
									:src="x"
									alt=""
								/>
							</div>
							{{ i.content }}
						</div>
					</div>
				</li>
			</ul>
			<div class="sendingArea">
				<div class="notice">
					<p>公告</p>
					<ul>
						<li class="upset">[置顶]花神传征文</li>
						<li class="upset">[置顶]特战队服装选择</li>
						<li class="upset">[置顶]医疗队队员服装选择</li>
						<li>[更新提示]花神传520特典-Part2已更新中部！</li>
						<li>[更新提示]花神传现有特工写真集已更新！</li>
						<li>[更新提示]花神传520特典Part2已更新上部！</li>
					</ul>
					<div class="typeArea">
						<div
							v-if="imgList.length !== 0"
							class="blurBc previewGroup"
							@mouseleave="showDelIcon(-1)"
						>
							<div v-for="(i, index) in imgList" :key="index">
								<i
									v-show="delIconShowIndex === index"
									class="iconfont icon-cancel"
									@click="delImg(index)"
								></i>
								<img :src="i" alt="" @mouseenter="showDelIcon(index)" />
							</div>
						</div>
						<div class="blurBc">
							<textarea v-model="text"></textarea>
						</div>
						<div class="btnGroup">
							<Button theme="primary" @click="uploadImg">上传图片</Button>
							<Button theme="primary" @click="sendMessage">发送消息</Button>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
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
      imgList: [],
      delIconShowIndex: -1,
      storiesList: [
        {
          src: 'chatting/1.AgentInTrouble.jpg',
          title: '第一章：特工有难',
          link: 'https://www.pixiv.net/artworks/79396282',
        },
        {
          src: 'chatting/2.PoliceDetail.jpg',
          title: '背景故事：警备队介绍',
          link: 'https://www.pixiv.net/artworks/79407664'
        },
        {
          src: 'chatting/3.SavePlan.jpg',
          title: '第二章：营救计划',
          link: 'https://www.pixiv.net/artworks/79439304'
        },
        {
          src: 'chatting/4.dangerous.jpg',
          title: '第三章：地牢之危',
          link: 'https://www.pixiv.net/artworks/79458243'
        },
        {
          src: 'chatting/4.dangerous2.jpg',
          title: '第三章：地牢之危【外传】',
          link: 'https://www.pixiv.net/artworks/79458275'
        },
        {
          src: 'chatting/5.GodOfFlower.jpg',
          title: '第四章：花神现身',
          link: 'https://www.pixiv.net/artworks/79520451'
        },
        {
          src: 'chatting/6.IntoBase.jpg',
          title: '第五章：全面进攻',
          link: 'https://www.pixiv.net/artworks/80201805'
        },
        {
          src: 'chatting/7.SaveSuc.jpg',
          title: '第六章：营救成功',
          link: 'https://www.pixiv.net/artworks/81521942'
        },
        {
          src: 'chatting/8.Toilet.jpg',
          title: '第七章：厕所踩头',
          link: 'https://www.pixiv.net/artworks/81776964'
        },
        {
          src: 'chatting/9.School.jpg',
          title: '第八章：校园之变',
          link: 'https://www.pixiv.net/artworks/82079514'
        },
        {
          src: 'chatting/10.DeathOfGod.jpg',
          title: '第九章：花神之死',
          link: 'https://www.pixiv.net/artworks/82322297'
        },
        {
          src: 'chatting/11.DarkFire.jpg',
          title: '第十章：黑暗之火',
          link: 'https://www.pixiv.net/artworks/82440690'
        },
      ]
    }
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
        this.imgList.forEach((item) => {
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
    },
    delImg (index) {
      this.imgList.splice(index, 1)
    },
    showDelIcon (index) {
      this.delIconShowIndex = index
    },
    jumpTo (url) {
      window.open(url)
    }
  }
}
</script>

<style scoped></style>
