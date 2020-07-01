<template>
  <div
    class="lunaRow"
    :style="[
      rowPadding,
      rowWidth,
      rowHeight,
      rowMaxHeight,
      rowScrollable,
      rowBackground,
      rowBorder,
    ]"
    :class="className"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Row',
  props: {
    background: {
      type: [Number, String],
      default: '#FEFEFE'
    },
    border: {
      type: [Number, String],
      default: '0px solid #EFEFEF'
    },
    // 宽度高度相关小于等于100为百分比，大于100为px
    width: {
      // 可选auto
      type: [Number, String],
      default: 100
    },
    height: {
      type: [Number, String],
      default: 32
    },
    padding: {
      type: [Number, String],
      default: 0
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    maxHeight: {
      type: [Number, String],
      default: 'none'
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    rowBackground () {
      return {
        backgroundColor: this.background
      }
    },
    rowBorder () {
      if (typeof this.border === 'string') {
        return {
          border: this.border
        }
      } else {
        return {
          border: this.border + 'px solid #FFFFFF'
        }
      }
    },
    rowPadding () {
      if (typeof this.padding === 'string') {
        return {
          padding: this.padding
        }
      } else {
        return {
          padding: this.padding + 'px'
        }
      }
    },
    rowWidth () {
      if (typeof this.width !== 'string') {
        if (this.width <= 100) {
          return {
            width: this.width + '%'
          }
        } else {
          return {
            width: this.width + 'px'
          }
        }
      } else {
        return {
          width: this.width
        }
      }
    },
    rowHeight () {
      if (typeof this.height !== 'string') {
        return {
          height: this.height + 'px'
        }
      } else {
        return {
          height: this.height
        }
      }
    },
    rowScrollable () {
      if (this.scrollable) {
        return {
          overflow: 'auto'
        }
      } else {
        return {
          overflow: 'hidden'
        }
      }
    },
    rowMaxHeight () {
      if (this.maxHeight !== 'none') {
        if (typeof this.maxHeight === 'string') {
          return {
            maxHeight: this.maxHeight
          }
        } else {
          return {
            maxHeight: this.maxHeight + 'px'
          }
        }
      }
    }
  }
}
</script>

<style scoped></style>
