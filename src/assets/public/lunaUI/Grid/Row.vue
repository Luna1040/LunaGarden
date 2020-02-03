<template>
  <div
    class="lunaRow"
    :style="[rowPadding, rowWidth, rowHeight, rowMaxHeight, rowMaxWidth, rowScrollable, rowBackground, rowBorder]"
    :class="className"
  >
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: "Row",
  props: {
    background: {
      type: String,
      default: '#FEFEFE'
    },
    border: {
      type: String,
      default: '1px solid #EFEFEF'
    },
    //宽度高度相关小于等于100为百分比，大于100为px
    width: {
      //可选auto
      type: [Number, String],
      default: 100
    },
    maxWidth: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 32
    },
    padding: {
      type: Number,
      default: 0
    },
    maxHeight: {
      type: [Number, String],
      default: 'auto',
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    rowBackground() {
      return {
        backgroundColor: this.background
      }
    },
    rowBorder() {
      return {
        border: this.border
      }
    },
    rowPadding() {
      return {
        padding: this.padding + 'px'
      }
    },
    rowWidth() {
      if (this.width <= 100) {
        return {
          width: 'calc(' + this.width + '% - ' + this.padding * 2 + 'px - 2px)'
        }
      } else {
        return {
          width: this.width - this.padding * 2 - 2 + 'px'
        }
      }
    },
    rowMaxWidth() {
      if (this.maxWidth <= 100) {
        return {
          maxWidth: 'calc(' + this.width + '% - ' + this.padding * 2 + 'px - 2px)'
        }
      } else {
        return {
          maxWidth: this.maxWidth - this.padding * 2 - 2 + 'px'
        }
      }
    },
    rowHeight() {
      return {
        height: this.height - this.padding * 2 - 2 + 'px'
      }
    },
    rowMaxHeight() {
      if (this.maxHeight < 100) {
        return {
          maxHeight: 'calc(' + this.maxHeight + '%-' + this.padding * 2 - 2 + 'px)'
        }
      } else {
        return {
          maxHeight: this.maxHeight - this.padding * 2 - 2 + 'px'
        }
      }
    },
    rowScrollable() {
      if (this.scrollable) {
        return {
          overFlow: 'auto'
        }
      } else {
        return {
          overFlow: 'hidden'
        }
      }
    },
  },
}
</script>

<style scoped>
</style>
