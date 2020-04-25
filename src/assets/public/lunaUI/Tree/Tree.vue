<template>
	<div class="lunaTree">
		<div class="lunaTreeTitle">{{ title }}</div>
		<TreeItem v-for="(i, index) in data" :key="index" :data="i"></TreeItem>
	</div>
</template>

<script>
import TreeItem from './TreeItem.vue'

export default {
  name: 'Tree',
  components: {
    TreeItem
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  }
}
</script>

<style scoped>
</style>
