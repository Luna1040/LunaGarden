<template>
	<div class="lunaTree">
		<div class="lunaTreeTitle">
			<img v-if="titleImg !== ''" :src="titleImg" alt="" />
			<i v-if="titleIcon !== ''" :class="titleIcon"></i>{{ title }}
		</div>
		<p v-if="data.length === 0">{{ emptyText }}</p>
		<div v-else>
			<ul>
				<TreeItem
					v-for="(i, index) in stateData"
					:key="index"
					:data="i"
					:index="index"
					:list-name="i.title"
					:selectChange="selectChange"
				></TreeItem>
			</ul>
		</div>
	</div>
</template>

<script>
import TreeItem from "./TreeItem.vue";

export default {
  name: "Tree",
  components: {
    TreeItem,
  },
  props: {
    data: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      default: "",
    },
    titleIcon: {
      type: String,
      default: "",
    },
    titleImg: {
      type: String,
      default: "",
    },
    emptyText: {
      type: String,
      default: "暂无数据",
    },
    selectChange: {
      type: Boolean,
      default: true
    },
    showCheckbox: {
      type: Boolean,
      deafault: false,
    },
  },
  data() {
    return {
      stateData: this.data,
    };
  },
  methods: {},
};
</script>

<style scoped></style>
