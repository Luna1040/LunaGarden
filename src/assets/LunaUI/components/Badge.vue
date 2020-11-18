<template>
  <div
    class="lunaBadge"
    :style="[badgeWidth, badgeHeight, badgeLineHeight, badgeRadius, badgeBorder, badgeBackground]"
    :class="[className, {errorBadge: theme === 'error', successBadge: type === 'success',warningBadge: theme === 'warning',primaryBadge: theme === 'primary' || theme === 'normal',alertBadge: theme === 'alert'}, {dotBadge: type === 'normal', textBadge: type === 'text', starBadge: type === 'star'}, {smallBadge: size === 'small', normalBadge: size === 'normal', largeBadge: size === 'large'}]"
  >
    <span :style="[fontColor, fontSize]">
      111{{ value }}
      <span v-if="badgeMax">+</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    value: {
      type: String,
      default: ''
    },
    maxSize: {
      type: Number,
      default: -1
    },
    background: {
      type: String,
      default: '#FF4719'
    },
    color: {
      type: String,
      default: '#FFFFFF'
    },
    fontsize: {
      type: Number,
      default: 12
    },
    // 自定义宽度  作用于container
    width: {
      type: Number,
      default: -1
    },
    // 自定义高度  作用于body
    height: {
      type: Number,
      default: -1
    },
    border: {
      type: String,
      default: '1px solid #FFFFFF'
    },
    showBorder: {
      type: Boolean,
      default: true
    },
    radius: {
      type: Number,
      default: -1
    },
    right: {
      type: Number,
      default: -4
    },
    top: {
      type: Number,
      default: -4
    },
    className: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'normal'
    },
    type: {
      type: String,
      default: 'normal'
    },
    size: {
      type: String,
      default: 'normal'
    }
  },
  computed: {
    badgeWidth () {
      if (this.width !== -1) {
        return {
          width: this.width + 'px!important'
        }
      } else {
        return {}
      }
    },
    badgeHeight () {
      if (this.height !== -1) {
        return {
          height: this.height + 'px!important'
        }
      } else {
        return {}
      }
    },
    badgeLineHeight () {
      if (this.height !== -1) {
        return {
          lineHeight: this.height + 'px!important'
        }
      } else {
        return {}
      }
    },
    badgeBorder () {
      if (this.showBorder) {
        return {
          border: this.border
        }
      } else {
        return {}
      }
    },
    badgeBackground () {
      return {
        backgroundColor: this.background + '!important'
      }
    },
    badgeRadius () {
      if (this.radius !== -1) {
        return {
          borderRadius: this.radius + 'px!important'
        }
      } else {
        return {}
      }
    },
    badgeMax () {
      if (this.value > this.maxSize) {
        return true
      } else {
        return false
      }
    },
    fontColor () {
      return {
        color: this.color
      }
    },
    fontSize () {
      return {
        fontSize: this.fontSize + 'px'
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
