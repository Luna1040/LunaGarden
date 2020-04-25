<template>
  <li>
    <span @click.stop="expandTreeItem">{{ stateData.title }}</span>
    <ul v-if="stateData.children" v-show="stateData.expand">
      <TreeItem
        v-for="(i, index) in stateData.children"
        :data="i"
        :index="index"
      ></TreeItem>
    </ul>
  </li>
</template>

<script>
import TreeItem from "./TreeItem.vue";
export default {
  name: "TreeItem",
  components: {
    TreeItem,
  },
  props: {
    data: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      stateData: this.data,
    };
  },
  methods: {
    expandTreeItem(index) {
      this.stateData.expand = !this.stateData.expand;
      console.log(this.stateData.expand);
    },
  },
};
</script>

<style scoped></style>
