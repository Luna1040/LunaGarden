<template>
	<div class="lunaTreeItem">
		<span>{{ data.title }}</span>
		<div class="lunaTreeChild" v-if="data.children">
			<TreeItem
				v-for="(i, index) in data.children"
				:key="index"
				:data="i"
			></TreeItem>
		</div>
	</div>
</template>

<script>
import TreeItem from './TreeItem.vue'
export default {
  name: 'TreeItem',
  components: {
    TreeItem
  },
  props: {

        data: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style scoped>
</style>
