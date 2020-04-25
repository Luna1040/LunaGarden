<template>
  <div class="lunaTree">
    <div class="lunaTreeTitle">
      <img v-if="titleImg !== ''" :src="titleImg" alt="" /><i
        v-if="titleIcon !== ''"
        :class="titleIcon"
      ></i
      >{{ title }}
    </div>
    <p v-if="this.data.length === 0">{{ emptyText }}</p>
    <div v-else>
      <ul>
        <TreeItem
          v-for="(i, index) in stateData"
          :data="i"
          :index="index"
          :listName="i.title"
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
      deafult: "",
    },
    titleImg: {
      type: String,
      default: "",
    },
    emptyText: {
      type: String,
      default: "暂无数据",
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
