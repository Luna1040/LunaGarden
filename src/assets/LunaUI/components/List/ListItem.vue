<template>
  <div class="lunaListItem" @click="to(item.link)">
    <i v-if="icon !== ''" :class="icon"></i>
    <img v-else :src="item.icon" alt="">
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      icon: ''
    }
  },
  methods: {
    to(link) {
      if(link) {
        this.$router.push(link)
      }
    }
  }
}
</script>

<style scoped>

</style>
