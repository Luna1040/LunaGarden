<template>
  <div class="lunaList">
    <ListItem v-for="(i, index) in list" :key="index"></ListItem>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
