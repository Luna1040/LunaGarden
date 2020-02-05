<template>
  <div
    class="lunaContainer"
    :style="[containerPadding, containerWidth, containerHeight, containerMaxHeight, containerMaxWidth, containerScrollable, containerBackground, containerBorder, containerRadius, containerShadow, containerImage, flexStyle]"
    :class="[className, {squareCorner: corner === 'square', smallCorner: corner === 'small', filletCorner: corner === 'fillet', largeCorner: corner === 'large', fullCorner: corner === 'full', roundCorner: corner === 'round'}, {'': theme === 'light', 'darkContainer': theme === 'dark'},{darkShadow: shadowStyle === 'dark', lightShadow: shadowStyle === 'light'},{flex: flex, block: !flex}]"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Container",
  props: {
    shadow: {
      type: Boolean,
      default: true
    },
    shadowStyle: {
      type: String,
      default: 'dark'
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
      type: [Number, String],
      default: 100
    },
    height: {
      type: [Number, String],
      default: 100
    },
    maxHeight: {
      type: [Number, String],
      default: 'auto',
    },
    padding: {
      type: Number,
      default: 16
    },
    scrollable: {
      type: Boolean,
      default: false
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
      default: 'start'
    },
    align: {
      type: String,
      default: 'baseline'
    }
  },
  computed: {
    flexStyle() {
      return {
        flexDirection: this.direction,
        justifyContent: this.justify,
        alignItems: this.align
      }
    },
    containerBackground() {
      return {
        backgroundColor: this.background
      }
    },
    containerImage() {
      return {
        backgroundImage: 'url("' + this.image + '")!important'
      }
    },
    containerBorder() {
      return {
        border: this.border
      }
    },
    containerPadding() {
      return {
        padding: this.padding + 'px'
      }
    },
    containerWidth() {
      if(typeof this.width !== 'string') {
        if(this.width <= 100) {
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
    containerMaxWidth() {
      if(typeof this.maxWidth !== 'string') {
        if(this.maxWidth <= 100) {
          return {
            maxWidth: this.maxWidth + '%'
          }
        } else {
          return {
            maxWidth: this.maxWidth + 'px'
          }
        }
      } else {
        return {
          maxWidth: this.maxWidth
        }
      }
    },
    containerHeight() {
      if (this.border !== '0') {
        if (this.height <= 100) {
          return {
            height: 'calc(' + this.height + '% - ' + this.padding * 2 + 'px - 2px)'
          }
        } else {
          return {
            height: this.height - this.padding * 2 - 2 + 'px'
          }
        }
      } else {
        if (this.height <= 100) {
          return {
            height: 'calc(' + this.height + '% - ' + this.padding * 2 + 'px)'
          }
        } else {
          return {
            height: this.height - this.padding * 2 + 'px'
          }
        }
      }
    },
    containerMaxHeight() {
      if (this.border !== '0') {
        if (this.maxHeight < 100) {
          return {
            maxHeight: 'calc(' + this.maxHeight + '% -' + this.padding * 2 - 2 + 'px)'
          }
        } else {
          return {
            maxHeight: this.maxHeight - this.padding * 2 - 2 + 'px'
          }
        }
      } else {
        if (this.maxHeight < 100) {
          return {
            maxHeight: 'calc(' + this.maxHeight + '% -' + this.padding * 2 + 'px)'
          }
        } else {
          return {
            maxHeight: this.maxHeight - this.padding * 2 + 'px'
          }
        }
      }
    },
    containerScrollable() {
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
    containerRadius() {
      if (this.radius !== -1) {
        return {
          borderRadius: this.radius + "px!important"
        };
      } else {
        return {};
      }
    },
    containerShadow() {
      if (!this.shadow) {
        return {
          boxShadow: "0 0 0 rgba(0, 0, 0, 0)!important"
        };
      } else {
        return {};
      }
    },
  },
}
</script>

<style scoped>
</style>
