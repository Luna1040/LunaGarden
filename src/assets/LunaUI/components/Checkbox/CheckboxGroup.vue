<template>
  <div
    class="lunaCheckboxGroup"
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
    :style="[checkboxGroupStyle]"
  >
    <Checkbox v-if="allIn" v-model="isAllIn" :style="spanCount" before-checked :half-check="isHalfCheck" :corner="checkboxPropsStyle.corner" :radius="checkboxPropsStyle.radius" :checked-with-light="checkboxPropsStyle.checkedWithLight" :icon="checkboxPropsStyle.icon" :icon-font-size="checkboxPropsStyle.iconFontSize" :icon-font-color="checkboxPropsStyle.iconFontColor" :border="checkboxPropsStyle.border" :border-corner="checkboxPropsStyle.borderCorner" :border-radius="checkboxPropsStyle.borderRadius" :border-style="checkboxPropsStyle.borderStyle" :padding="checkboxPropsStyle.padding" @onBeforeChange="handelAllIn">全选</Checkbox>
    <Checkbox v-for="(i, index) in checkboxData" :key="index" v-model="i.value" :style="spanCount" :true-value="i.trueValue" :disabled="i.disabled" :corner="checkboxPropsStyle.corner" :radius="checkboxPropsStyle.radius" :checked-with-light="checkboxPropsStyle.checkedWithLight" :icon="checkboxPropsStyle.icon" :icon-font-size="checkboxPropsStyle.iconFontSize" :icon-font-color="checkboxPropsStyle.iconFontColor" :border="checkboxPropsStyle.border" :border-corner="checkboxPropsStyle.borderCorner" :border-radius="checkboxPropsStyle.borderRadius" :border-style="checkboxPropsStyle.borderStyle" :padding="checkboxPropsStyle.padding" @onChange="handelChange(i.beforeChecked, index, i.value, i.trueValue)">
      <template v-if="i.label">
        {{ i.label }}
      </template>
      <template v-else>
        {{ i.value }}
      </template>
    </Checkbox>
  </div>
</template>

<script>
export default {
  name: 'CheckboxGroup',
  props: {
    checkboxData: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    checkboxPropsStyle: {
        type: Object,
        default: () => {
            return {}
        }
    },
    allIn: {
      type: Boolean,
      default: false
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
      isAllIn: false,
      isHalfCheck: false,
      choiceArr: []
    }
  },
  mounted() {
    this.choiceArr = this.value
    if(this.choiceArr.length !== 0) {
      this.choiceArr.forEach(item => {
        this.checkboxData.forEach((i, index) => {
          if(item === i.trueValue) {
            this.checkboxData[index].value = item
          }
        })
      })
    }
  },
  computed: {
    checkboxGroupStyle() {
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
        let find = false
        for (let i = 0; i < this.choiceArr.length; i++) {
          if (this.choiceArr[i] === trueValue) {
            this.choiceArr.splice(i, 1)
            find = true
          }
        }
        if (!find) {
          this.choiceArr.push(value)
        }
        this.$emit('input', this.choiceArr)

        this.$emit('onChange', this.choiceArr)
      } else {
        this.$emit('onBeforeChange', index, value, trueValue, this.choiceArr)
      }
      if (this.choiceArr.length > 0) {
        this.isHalfCheck = true
        this.isAllIn = false
        if (this.choiceArr.length === this.checkboxData.length) {
          this.isAllIn = true
          this.isHalfCheck = false
        }
      } else if (this.choiceArr.length === 0) {
        this.isAllIn = false
        this.isHalfCheck = false
      }
    },
    handelAllIn() {
      this.choiceArr = []
      if (!this.isAllIn) {
        this.checkboxData.forEach((item, index) => {
          this.choiceArr.push(item.trueValue)
          this.checkboxData[index].value = item.trueValue
        })
        this.isAllIn = true
      } else {
        this.checkboxData.forEach((item, index) => {
          this.checkboxData[index].value = ''
        })
        this.isAllIn = false
        this.isHalfCheck = false
      }
      this.$emit('input', this.choiceArr)
      this.$emit('onChange', this.choiceArr)
    }
  }
}
</script>

<style scoped></style>
