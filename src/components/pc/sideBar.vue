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
  data () {
    return {
      asideShow: 'hide',
      menuList: [
        {
          name: '首页',
          to: 'Home'
        },
        {
          name: '关于',
          to: 'AboutUs'
        },
        {
          name: '日记',
          to: 'Note'
        },
        {
          name: '花神通讯',
          to: 'Chatting'
        },
        {
          name: '花神传说',
          to: 'Legend'
        }
      ]
    }
  },
  methods: {
    goLink (url) {
      this.$router.push(url)
    },
    hideSideMenu () {
      this.$emit('input', false)
    }
  }
}

</script>

<style scoped>
</style>
