<template>
  <div
    class="lunaButtonGroup"
    :class="[
      {
        light: theme === 'light',
        dark: theme === 'dark'
      },
      {
        darkShadow: shadowTheme === 'dark',
        lightShadow: shadowTheme === 'light'
      },
      {
        squareCorner: corner === 'square',
        smallCorner: corner === 'small',
        filletCorner: corner === 'fillet',
        largeCorner: corner === 'large',
        fullCorner: corner === 'full'
      },
      {
        flex: flex,
        block: !flex
      }
    ]"
    :style="[btnGroupStyle]"
  >
    <Button v-for="(i, index) in btnGroup" :key="index" :style="spanCount" :styles="i.styles" :theme="i.theme" :width="i.width" :height="i.height" :color="i.color" :background="i.background" :font-size="i.fontSize" :border="i.border" :shadow="i.shadow" :shadow-theme="i.shadowTheme" :shadow-style="i.shadowStyle" :class-name="i.className" :padding="i.padding" :margin="i.margin" :corner="i.corner" :radius="i.radius" :loading="i.loading" :disabled="i.disabled" :type="i.type" :icon="i.icon" :icon-color="i.iconColor" :icon-size="i.iconSize" :pre="i.pre" :suffix="i.suffix" :long="i.long" :to="i.to" @click="emit(i.methods, index)">{{ i.name }}</Button>
  </div>
</template>

<script>
export default {
  name: 'ButtonGroup',
  props: {
    btnGroup: {
      type: Array,
      default: () => {
        return []
      }
    },
    flex: {
      type: Boolean,
      default: true
    },
    align: {
      type: String,
      default: 'center'
    },
    justify: {
      type: String,
      default: 'flex-start'
    },
    width: {
      type: [Number, String],
      default: 100
    },
    padding: {
      type: [Number, String],
      default: 16
    },
    span: {
      type: [Number, String],
      default: 16
    },
    background: {
      type: [Number, String],
      default: 'none'
    },
    theme: {
      type: String,
      default: 'light'
    },
    border: {
      type: [Number, String],
      default: '1px solid #FFFFFF'
    },
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
    radius: {
      type: [Number, String],
      default: -1
    },
    corner: {
      type: String,
      default: 'large'
    }
  },
  data() {
    return {}
  },
  computed: {
    btnGroupStyle() {
      const styles = {}
      if (!this.shadow) {
        styles.boxShadow = 'none'
      }
      if (this.shadowStyle !== '') {
        styles.boxShadow = this.shadowStyle
      }
      if (this.background !== 'none') {
        if (typeof this.background === 'string') {
          styles.background = this.background
        } else {
          styles.background = '#' + this.background
        }
      }
      if (typeof this.border === 'string') {
        styles.border = this.border
      } else {
        styles.border = '1px solid #' + this.border
      }
      if (typeof this.width === 'string') {
        styles.width = this.width
      } else {
        if (this.width <= 100) {
          styles.width = this.width + '%'
        } else {
          styles.width = this.width + 'px'
        }
      }
      if (this.flex) {
        styles.itemsAlign = this.align
        styles.justifyContent = this.justify
      }
      if (typeof this.padding === 'string') {
        styles.padding = this.padding
      } else {
        styles.padding = this.padding + 'px'
      }
      if (this.shadowStyle !== '') {
        styles.boxShadow = this.shadowStyle + '!important'
      }
      if (this.radius !== -1) {
        if (typeof this.radius === 'string') {
          styles.borderRadius = this.radius
        } else {
          styles.borderRadius = this.radius + 'px'
        }
      }
      return styles
    },
    spanCount() {
      const styles = {}
      if (typeof this.span === 'string') {
        if (this.flex) {
          if (this.justify === 'flex-start' || this.justify === 'center') {
            styles.marginRight = this.span
          } else if (this.justify === 'flex-end') {
            styles.marginLeft = this.span
          }
        } else {
          styles.marginBottom = this.span
        }
      } else {
        if (this.flex) {
          if (this.justify === 'flex-start' || this.justify === 'center') {
            styles.marginRight = this.span + 'px'
          } else if (this.justify === 'flex-end') {
            styles.marginLeft = this.span + 'px'
          }
        } else {
          styles.marginBottom = this.span + 'px'
        }
      }
      return styles
    }
  },
  methods: {
    emit(methods, index) {
      this.$emit(methods, index)
    }
  }
}
</script>

<style scoped></style>
