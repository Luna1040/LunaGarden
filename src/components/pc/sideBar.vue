<template>
  <transition name="slideBar">
    <aside v-if="value" id="sideMenu">
      <i class="iconfont icon-cancel" @click="hideSideMenu"></i>
      <ul>
        <li v-for="(i, index) in menuList" :key="index" @click="goLink(i.to)">
          {{ i.name }}
        </li>
      </ul>
    </aside>
  </transition>
</template>

<script>
export default {
  name: 'sideBar',
  props: {
    value: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      asideShow: 'hide',
      menuList: [
        {
          name: '首页',
          to: 'Home'
        },
        {
          name: '日记',
          to: 'Note'
        },
        {
          name: '团队看板',
          to: 'Legend'
        },
        {
          name: '项目进度',
          to: 'Legend'
        },
        {
          name: '测试团队',
          to: 'Legend'
        },
        {
          name: '前端团队',
          to: 'Legend'
        },
        {
          name: '后端团队',
          to: 'Legend'
        },
        {
          name: '运营团队',
          to: 'Legend'
        },
        {
          name: '填报中心',
          to: 'Legend'
        },
        // {
        //     name: '花神传说',
        //     to: 'Legend'
        // },
        // {
        //   name: '花神通讯',
        //   to: 'Chatting'
        // },
        // {
        //   name: '花神传说',
        //   to: 'Legend'
        // },
        {
          name: '关于',
          to: 'AboutUs'
        }
      ]
    }
  },
  methods: {
    goLink(url) {
      // this.$router.push(url)
      if (url === 'Legend' || url === 'Chatting' || url === 'Note') {
        this.$Message.error({ content: 'You have no limit to this page!' })
      } else {
        this.$router.push(url)
      }
    },
    hideSideMenu() {
      this.$emit('input', false)
    }
  }
}
</script>

<style scoped></style>
