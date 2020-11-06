<template>
  <div v-if="value" class="lunaGardenLoading">
    <div class="face" />
    <div class="face" />
  </div>
</template>

<script>
export default {
  name: 'loading.vue',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
