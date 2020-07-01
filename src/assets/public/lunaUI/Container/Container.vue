<template>
  <div
    class="lunaContainer"
    :style="[
      containerPadding,
      containerWidth,
      containerHeight,
      containerScrollable,
      containerBackground,
      containerBorder,
      containerRadius,
      containerShadow,
      containerShadowStyle,
      containerImage,
      flexStyle,
    ]"
    :class="[
      className,
      {
        squareCorner: corner === 'square',
        smallCorner: corner === 'small',
        filletCorner: corner === 'fillet',
        largeCorner: corner === 'large',
        fullCorner: corner === 'full',
      },
      { '': theme === 'light', darkContainer: theme === 'dark' },
      {
        darkShadow: shadowTheme === 'dark',
        lightShadow: shadowTheme === 'light',
      },
      { flex: flex, block: !flex },
    ]"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Container',
  props: {
    shadow: {
      type: Boolean,
      default: true
    },
    shadowTheme: {
      type: String,
      default: 'dark'
    },
    shadowStyle: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'light'
    },
    radius: {
      type: Number,
      default: -1
    },
    corner: {
      type: String,
      default: 'large'
    },
    background: {
      type: [Number, String],
      default: '#FEFEFE'
    },
    border: {
      type: [Number, String],
      default: '1px solid #EFEFEF'
    },
    // 宽度高度相关小于等于100为百分比，大于100为px
    width: {
      // 可选auto
      type: [Number, String],
      default: 100
    },
    height: {
      type: [Number, String],
      default: 'auto'
    },
    padding: {
      type: Number,
      default: 16
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    className: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    flex: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: 'start'
    },
    justify: {
      type: String,
      default: 'flex-start'
    },
    align: {
      type: String,
      default: 'baseline'
    },
    styles: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    flexStyle () {
      return {
        flexDirection: this.direction,
        justifyContent: this.justify,
        alignItems: this.align
      }
    },
    containerBackground () {
      if (typeof this.background === 'string') {
        return { backgroundColor: this.background }
      } else {
        return { backgroundColor: '#' + this.background }
      }
    },
    containerImage () {
      return {
        backgroundImage: 'url("' + this.image + '")!important'
      }
    },
    containerBorder () {
      if (typeof this.border === 'string') {
        return { border: this.border }
      } else {
        return { border: this.border + 'px solid #EFEFEF' }
      }
    },
    containerShadowStyle () {
      if (this.shadowStyle !== '') {
        return { boxShadow: this.shadowStyle + '!important' }
      }
    },
    containerPadding () {
      return {
        padding: this.padding + 'px'
      }
    },
    containerWidth () {
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
    containerHeight () {
        if(typeof this.height === 'string') {
            return {
                height: this.height
            }
        } else {
            if (this.height <= 100) {
                return {
                    height: this.height + '%'
                }
            } else {
                return {
                    height: this.height + 'px'
                }
            }
        }
    },
    containerScrollable () {
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
    containerRadius () {
      if (this.radius !== -1) {
        return {
          borderRadius: this.radius + 'px!important'
        }
      } else {
        return {}
      }
    },
    containerShadow () {
      if (!this.shadow) {
        return {
          boxShadow: '0 0 0 rgba(0, 0, 0, 0)!important'
        }
      } else {
        return {}
      }
    }
  }
}
</script>

<style scoped></style>
