<template>
  <div
    class="lunaCard"
    :style="[cardPadding, cardWidth, cardHeight, cardMaxHeight, cardMaxWidth, cardBackground, cardBorder, cardRadius, cardShadow, cardImage, flexStyle]"
    :class="[className, {squareCorner: corner === 'square', smallCorner: corner === 'small', filletCorner: corner === 'fillet', largeCorner: corner === 'large', fullCorner: corner === 'full', roundCorner: corner === 'round'}, {lightCard: theme === 'light', darkCard: theme === 'dark'},{darkShadow: shadowStyle === 'dark', lightShadow: shadowStyle === 'light'},{flex: flex, block: !flex}]"
  >
    <div class="lunaCardTitle" v-if="showHead">
      <slot name="header">
        <i v-if="icon !== ''" :class="icon"></i>
        <span :style="cardFontSize">{{title}}</span>
      </slot>
    </div>
    <div class="lunaCardBody" :style="cardScrollable">
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    showHead: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    fontSize: {
      type: Number,
      default: 16
    },
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
      type: Number,
      default: 100
    },
    height: {
      type: [Number, String],
      default: 100
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
      default: 'column'
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
    cardFontSize() {
      return {
        fontSize: this.fontSize + 'px'
      }
    },
    flexStyle() {
      return {
        flexDirection: this.direction,
        justifyContent: this.justify,
        itemsAlign: this.align
      }
    },
    cardBackground() {
      return {
        backgroundColor: this.background
      }
    },
    cardImage() {
      return {
        backgroundImage: 'url("' + this.image + '")!important'
      }
    },
    cardBorder() {
      return {
        border: this.border
      }
    },
    cardPadding() {
      return {
        padding: this.padding + 'px'
      }
    },
    cardWidth() {
      if (this.border !== '0') {
        if (this.width <= 100) {
          return {
            width: 'calc(' + this.width + '% - ' + this.padding * 2 + 'px - 2px)'
          }
        } else {
          return {
            width: this.width - this.padding * 2 - 2 + 'px'
          }
        }
      } else {
        if (this.width <= 100) {
          return {
            width: 'calc(' + this.width + '% - ' + this.padding * 2 + 'px)'
          }
        } else {
          return {
            width: this.width - this.padding * 2 + 'px'
          }
        }
      }
    },
    cardMaxWidth() {
      if (this.border !== '0') {
        if (this.maxWidth <= 100) {
          return {
            maxWidth: 'calc(' + this.maxWidth + '% - ' + this.padding * 2 + 'px - 2px)'
          }
        } else {
          return {
            maxWidth: this.maxWidth - this.padding * 2 - 2 + 'px'
          }
        }
      } else {
        if (this.maxWidth <= 100) {
          return {
            maxWidth: 'calc(' + this.maxWidth + '% - ' + this.padding * 2 + 'px)'
          }
        } else {
          return {
            maxWidth: this.maxWidth - this.padding * 2 + 'px'
          }
        }
      }
    },
    cardHeight() {
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
    cardMaxHeight() {
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
    cardScrollable() {
      if (this.scrollable) {
        return {
          overflow: 'auto!important'
        }
      } else {
        return {
          overflow: 'hidden!important'
        }
      }
    },
    cardRadius() {
      if (this.radius !== -1) {
        return {
          borderRadius: this.radius + "px!important"
        };
      } else {
        return {};
      }
    },
    cardShadow() {
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
