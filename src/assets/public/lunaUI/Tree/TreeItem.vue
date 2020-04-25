<template>
  <li class="lunaTreeItem">
    <div class="lunaItemInner">
      <div
        v-if="stateData.children && stateData.children.length !== 0"
        :class="{ arrowActive: stateData.expand === true }"
        class="arrowIcon"
        @click.stop="expandTreeItem"
      >
        <i class="iconfont icon-youjiantou"></i>
      </div>
      <div class="lunaTreeCell" @click.stop="expandTreeItem">
        <template>{{ stateData.title }}</template>
      </div>
    </div>
    <transition name="expand">
      <ul v-if="stateData.children" v-show="stateData.expand">
        <TreeItem
          v-for="(i, index) in stateData.children"
          :key="index"
          :data="i"
          :index="index"
        ></TreeItem>
      </ul>
    </transition>
  </li>
</template>

<script>
import TreeItem from "./TreeItem.vue";
import Render from "./render";
import { findComponentUpward } from "../util/components.js";
export default {
  name: "TreeItem",
  components: {
    TreeItem,
    Render,
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
  computed: {
    isParentRender() {
      const Tree = findComponentUpward(this, "Tree");
      return Tree && Tree.render;
    },
    parentRender() {
      const Tree = findComponentUpward(this, "Tree");
      if (Tree && Tree.render) {
        return Tree.render;
      } else {
        return null;
      }
    },
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
