<template>
  <div class="lunaMessage">
    <transition-group name="messageAnimation">
      <div v-for="item in notices" :key="item.name">
        <div :class="item.theme" class="messageBody">
          <i v-if="item.icon" :class="item.icon"></i>
          <span v-if="typeof item === 'object'">{{ item.content }}</span>
          <span v-else>{{ item }}</span>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
let seed = 0

function getUuid () {
  return 'alert_' + seed++
}

export default {
  data () {
    return {
      notices: []
    }
  },
  methods: {
    add (notice) {
      const name = getUuid()

      const _notice = Object.assign(
        {
          name: name
        },
        notice
      )

      this.notices.push(_notice)

      // 定时移除，单位：秒
      const duration = notice.duration
      if (duration !== 0) {
        setTimeout(() => {
          this.remove(name)
        }, duration * 1000)
      }
    },
    remove (name) {
      const notices = this.notices

      for (let i = 0; i < notices.length; i++) {
        if (notices[i].name === name) {
          this.notices.splice(i, 1)
          break
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
