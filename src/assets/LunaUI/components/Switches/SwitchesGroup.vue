<template>
  <div
    class="lunaSwitchGroup"
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
    :style="[switchGroupStyle]"
  >
    <div v-if="allIn" class="lunaSwitchItem" :style="spanCount">
      <template v-if="isAllIn || isHalfCheck">全部开启</template>
      <template v-if="!isAllIn">全部关闭</template>
      <Switches v-model="isAllIn" before-change @onBeforeChange="handelAllIn"></Switches>
    </div>
    <div v-for="(i, index) in switchesData" class="lunaSwitchItem" :style="spanCount">
      <template>{{ i.label }}</template>
      <Switches v-model="i.value" @onChange="cgSwitches(index, i.value, i.trueValue)" :trueValue="i.trueValue" :falseValue="i.falseValue" :trueLabel="i.trueLabel" :falseLabel="i.falseLabel" :trueIcon="i.trueIcon" :falseIcon="i.falseIcon" :loading="i.loading" :disabled="i.disabled" :before-change="i.beforeChange"></Switches>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckboxGroup',
  props: {
    switchesData: {
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
    switchesPropsStyle: {
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
    if (this.choiceArr.length !== 0) {
      this.choiceArr.forEach((item) => {
        this.switchesData.forEach((i, index) => {
          if (item.label === i.label && item.value === i.trueValue) {
            this.switchesData[index].value = item.value
          }
        })
      })
    }
  },
  computed: {
    switchGroupStyle() {
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
  watch: {
    choiceArr() {
      if (this.choiceArr.length !== 0) {
        this.choiceArr.forEach((item) => {
          this.switchesData.forEach((i, index) => {
            if (item === i.trueValue) {
              this.switchesData[index].value = item
            }
          })
        })
      }
    }
  },
  methods: {
    cgSwitches(index, value, trueValue) {
      console.log(value)
      if (value === trueValue) {
        this.choiceArr.push({ label: this.switchesData[index].label, value: trueValue })
      } else {
        this.choiceArr.forEach((item, i) => {
          if (item.label === this.switchesData[index].label) {
            this.choiceArr.splice(i, 1)
          }
        })
      }
      this.$emit('onChange', this.choiceArr)
    },
    handelAllIn() {
      this.choiceArr = []
      if (!this.isAllIn) {
        this.switchesData.forEach((item, index) => {
          this.choiceArr.push({ label: item.label, value: item.trueValue })
          this.switchesData[index].value = item.trueValue
        })
        this.isAllIn = true
      } else {
        this.switchesData.forEach((item, index) => {
          this.switchesData[index].value = false
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
