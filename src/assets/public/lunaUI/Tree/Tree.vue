<template>
  <div class="lunaTree" :style="[treeStyles]">
    <div class="lunaTreeTitle">
      <slot name="title">
        <img v-if="titleImg !== '' && !suffix" :src="titleImg" alt="" />
        <i v-if="titleIcon !== '' && !suffix" :class="titleIcon"></i>
        {{ title }}
        <img v-if="titleImg !== '' && suffix" :src="titleImg" alt="" />
        <i v-if="titleIcon !== '' && suffix" :class="titleIcon"></i>
      </slot>
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
          :select-change="selectChange"
        ></TreeItem>
      </ul>
    </div>
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
      // eslint-disable-next-line vue/require-valid-default-prop
      default: []
    },
    title: {
      type: String,
      default: ''
    },
    titleIcon: {
      type: String,
      default: ''
    },
    pre: {
      type: Boolean,
      default: true
    },
    suffix: {
      type: Boolean,
      default: false
    },
    titleImg: {
      type: String,
      default: ''
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    selectChange: {
      type: Boolean,
      default: true
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: 'auto'
    },
    height: {
      type: [Number, String],
      default: 'auto'
    },
    background: {
      type: [Number, String],
      default: 'inherit'
    },
    scrollable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      stateData: this.data
    }
  },
  computed: {
    treeStyles () {
      const styles = {}
      if (typeof this.width === 'string') {
        styles.width = this.width
      } else {
        styles.width = this.width + 'px'
      }
      if (typeof this.height === 'string') {
        styles.height = this.height
      } else {
        styles.height = this.height + 'px'
      }
      if (this.scrollable) {
        styles.overFlow = 'auto'
      }

      return styles
    }
  },
  methods: {}
}
</script>

<style scoped></style>
