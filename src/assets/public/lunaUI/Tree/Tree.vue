<template>
  <div class="lunaTree" :style="[treeStyles]">
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
      deafault: false
    },
    width: {
      type: [Number, String],
      default: 300
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
        styles.overFlow = auto
      }

      return styles
    }
  },
  methods: {}
}
</script>

<style scoped></style>
