<template>
  <div
    class="lunaCol"
    :class="[className, classes, {block: !flex, flex: flex}]"
    :style="[colPadding, colHeight, colBackground, colBorder, colColor, colFontSize]"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Col',
  props: {
    background: {
      type: [Number, String],
      default: '#FFFFFF'
    },
    border: {
      type: [Number, String],
      default: '0px solid #FFFFFF'
    },
    color: {
      type: [Number, String],
      default: '#4A4A4A'
    },
    height: {
      type: [Number, String],
      default: 32
    },
    padding: {
      type: [Number, String],
      default: 8
    },
    flex: {
      type: Boolean,
      default: false
    },
    span: {
      type: Number,
      default: 0
    },
    order: {
      type: Number,
      default: 0
    },
    offset: {
      type: Number,
      default: 0
    },
    push: {
      type: Number,
      default: 0
    },
    pull: {
      type: Number,
      default: 0
    },
    className: {
      type: String,
      default: ''
    },
    fontsize: {
      type: [Number, String],
      default: 16
    },
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object],
    xxl: [Number, Object]
  },
  computed: {
    classes () {
      const classList = [
        'lunaCol',
        {
          [`lunaCol-span-${this.span}`]: this.span,
          [`lunaCol-order-${this.order}`]: this.order,
          [`lunaCol-offset-${this.offset}`]: this.offset,
          [`lunaCol-push-${this.push}`]: this.push,
          [`lunaCol-pull-${this.pull}`]: this.pull
        }
      ];

      ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach(size => {
        if (typeof this[size] === 'number') {
          classList.push(`lunaCol-span-${size}-${this[size]}`)
        } else if (typeof this[size] === 'object') {
          const props = this[size]
          Object.keys(props).forEach(prop => {
            classList.push(
              prop !== 'span'
                ? `lunaCol-${size}-${prop}-${props[prop]}`
                : `lunaCol-span-${size}-${props[prop]}`
            )
          })
        }
      })

      return classList
    },
    colBackground () {
      if (typeof this.background === 'string') {
        return { backgroundColor: this.background }
      } else {
        return { backgroundColor: '#' + this.background }
      }
    },
    colColor () {
      if (typeof this.color === 'string') {
        return { color: this.color }
      } else {
        return { color: '#' + this.color }
      }
    },
    colBorder () {
      if (typeof this.border === 'string') {
        return { border: this.border }
      } else {
        return { border: this.border + 'px solid #FFFFFF' }
      }
    },
    colFontSize () {
      if (typeof this.fontsize === 'string') {
        return { fontSize: this.fontsize }
      } else {
        return { fontSize: this.fontsize + 'px' }
      }
    },
    colPadding () {
      if (typeof this.padding === 'string') {
        return { padding: this.padding }
      } else {
        return { padding: this.padding + 'px' }
      }
    },
    colHeight () {
      if (typeof this.height === 'string') {
        return {
          height: this.height,
          lineHeight: parseInt(this.height.split('px')[0]) - this.padding * 2 + 'px'
        }
      } else {
        return {
          height: this.height + 'px',
          lineHeight: this.height - this.padding * 2 + 'px'
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
