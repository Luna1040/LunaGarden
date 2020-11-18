<template>
  <div
    class="lunaRadioGroup"
    :class="[
      {
        lightGroup: theme === 'light',
        darkGroup: theme === 'dark'
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
    :style="[radioGroupStyle]"
  >
    <Radio v-for="(i, index) in radioData" :key="index" v-model="i.value" :style="spanCount" :true-value="i.trueValue" :disabled="i.disabled" :corner="radioPropsStyle.corner" :radius="radioPropsStyle.radius" :checked-with-light="radioPropsStyle.checkedWithLight" :icon="radioPropsStyle.icon" :icon-font-size="radioPropsStyle.iconFontSize" :icon-font-color="radioPropsStyle.iconFontColor" :border="radioPropsStyle.border" :border-corner="radioPropsStyle.borderCorner" :border-radius="radioPropsStyle.borderRadius" :border-style="radioPropsStyle.borderStyle" :padding="radioPropsStyle.padding" @onChange="handelChange(i.beforeChecked, index, i.value, i.trueValue)">
      <template v-if="i.label">
        {{ i.label }}
      </template>
      <template v-else>
        {{ i.value }}
      </template>
    </Radio>
  </div>
</template>

<script>
export default {
  name: 'RadioGroup',
  props: {
    radioData: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    radioPropsStyle: {
      type: Object,
      default: () => {
        return {}
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
    return {
      choiceValue: false
    }
  },
  mounted() {
    this.choiceValue = this.value
    this.radioData.forEach((item, index) => {
      if (this.choiceValue === item.trueValue) {
        this.radioData[index].value = this.choiceValue
      }
    })
  },
  computed: {
    radioGroupStyle() {
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
    handelChange(before, index, value, trueValue) {
      if (!before) {
        this.choiceValue = value
        for (let i = 0; i < this.radioData.length; i++) {
          if (i === index) {
            this.radioData[i].value = this.choiceValue
          } else {
            this.radioData[i].value = false
          }
        }
        this.$emit('input', this.choiceValue)

        this.$emit('onChange', this.choiceValue)
      } else {
        this.$emit('onBeforeChange', index, value, trueValue, this.choiceValue)
      }
    }
  }
}
</script>

<style scoped></style>
