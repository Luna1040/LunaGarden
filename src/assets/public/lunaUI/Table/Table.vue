<template>
  <table
    class="lunaTable"
    cellspacing="0"
    :style="[tableStyles, baseBorder]"
    :class="[{lightTable: theme === 'light', darkTable: theme === 'dark'}, {headerFixed: headerFixed}, {lightShadow: shadowStyle === 'light', darkShadow: shadowStyle === 'dark'},{squareCorner: corner === 'square', smallCorner: corner === 'small', filletCorner: corner === 'fillet', largeCorner: corner === 'large', fullCorner: corner === 'full'},{stripeRow: stripe}]"
  >
    <thead :style="[headerStyles]">
      <tr>
        <th v-for="col in columns" :style="[baseBorder, {width: col.width + 'px'}]">{{ col.title }}</th>
      </tr>
    </thead>
    <tbody :style="[bodyMaxHeight]">
      <tr v-if="data.length === 0">
        <td v-if="data.length === 0" :colspan="columns.length">
          <slot name="empty">{{emptyText}}</slot>
        </td>
      </tr>
      <tr
        v-else
        v-for="(row, rowIndex) in data"
        :class="[{currentRow: rowIndex === choiceIndex, hoverRow: rowIndex === hoverIndex}]"
        :style="{hoverBorder: choiceIndex === rowIndex}"
        @click="choiceRow(row, rowIndex)"
        @mouseenter="hoverEnter(rowIndex)"
        @mouseleave="hoverOut()"
      >
        <td
          v-for="col in columns"
          :style="[baseBorder, {width: col.width + 'px'}, {textAlign: col.align}]"
        >
          <template v-if="'render' in col">
            <Render :row="row" :column="col" :index="rowIndex" :render="col.render"></Render>
          </template>
          <template v-else-if="col.type === 'index'">{{ rowIndex + 1 }}</template>
          <template v-else>{{ row[col.key] }}</template>
        </td>
      </tr>
    </tbody>
    <div v-if="loading" class="lunaLoading">
      <div class="face">
        <div class="circle"></div>
      </div>
      <div class="face">
        <div class="circle"></div>
      </div>
    </div>
  </table>
</template>

<script>
import Render from './tableRender.js';

export default {
  name: "Table",
  components: { Render },
  render(h) {
    return h("div", [
      this.createContent(h)
    ])
  },
  props: {
    data: {
      type: Array,
      default: []
    },
    columns: {
      type: Array,
      default: []
    },
    maxHeight: {
      type: [String, Number],
      default: 430
    },
    headerFixed: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false,
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    theme: {
      type: String,
      default: 'light'
    },
    border: {
      type: Boolean,
      default: false,
    },
    borderStyle: {
      type: String,
      default: '#F5F5F5'
    },
    background: {
      type: String,
      default: 'none'
    },
    color: {
      type: String,
      default: 'none'
    },
    headerBackground: {
      type: String,
      default: 'none'
    },
    headerColor: {
      type: String,
      default: 'none'
    },
    shadow: {
      type: Boolean,
      default: false
    },
    shadowStyle: {
      type: String,
      default: 'dark'
    },
    radius: {
      type: Number,
      default: -1
    },
    corner: {
      type: String,
      default: 'large'
    },
    width: {
      type: [String, Number],
      default: 100
    },
    stripe: {
      type: Boolean,
      default: false
    },
    highlightRow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      hoverRowBorder: '',
      hoverRow: this.borderStyle,
      currentRow: this.borderStyle,
      choiceIndex: -1,
      hoverIndex: -1
    }
  },
  computed: {
    bodyMaxHeight() {
      if (typeof this.maxHeight !== 'string') {
        if (this.maxHeight <= 100) {
          return {
            maxHeight: this.maxHeight + '%'
          }
        } else {
          return {
            maxHeight: this.maxHeight + 'px'
          }
        }
      } else {
        return {
          maxHeight: this.maxHeight
        }
      }
    },
    tableStyles() {
      let styleList = {};
      if (this.background !== 'none') {
        styleList.backgroundColor = this.background + '!important'
      }
      if (this.color !== 'none') {
        styleList.color = this.color + '!important'
      }
      if (this.shadow === false) {
        styleList.boxShadow = 'none'
      }
      if (typeof this.width === 'string') {
        styleList.width = this.width
      } else {
        if (this.width <= 100) {
          styleList.width = this.width + '%'
        } else {
          styleList.width = this.width + 'px'
        }
      }
      if (this.radius !== -1) {
        styleList.borderRadius = this.radius + 'px'
      }
      return styleList
    },
    headerStyles() {
      let styleList = {}
      if (this.headerBackground !== 'none') {
        styleList.backgroundColor = this.headerBackground + '!important'
      }
      if (this.headerColor !== 'none') {
        styleList.color = this.headerColor + '!important'
      }
      return styleList
    },
    baseBorder() {
      if (this.border) {
        return {
          border: '1px solid ' + this.borderStyle
        }
      }
    },
  },
  methods: {
    createContent(h) {
      return h('div', this.$slots.default)
    },
    choiceRow(params, index) {
      if (this.highlightRow) {
        this.choiceIndex = index;
        this.$emit('on-row-click', params)
      }
    },
    hoverEnter(index) {
      this.hoverIndex = index
    },
    hoverOut() {
      this.hoverIndex = -1
    },
  }
}
</script>

<style scoped>
</style>
