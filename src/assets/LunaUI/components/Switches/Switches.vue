<template>
  <div
    class="lunaSwitch"
    :class="[
      {
        darkSwitchShadow: shadowTheme === 'dark',
        lightSwitchShadow: shadowTheme === 'light'
      },
      {
        squareCorner: corner === 'square',
        smallCorner: corner === 'small',
        filletCorner: corner === 'fillet',
        largeCorner: corner === 'large',
        fullCorner: corner === 'full'
      },
      {
        disabled: disabled || loading
      },
      {
        switchBoxOn: status
      }
    ]"
    :style="styles"
    @click="cgStatus"
  >
    <div v-show="status" class="trueSetPlace" :style="iconCount">
      <slot name="trueSlot">
        <i v-if="trueFontIcon !== ''" :style="iconCount" :class="trueFontIcon"></i>
        <img v-if="trueImageIcon !== ''" :src="trueImageIcon" alt="" />
        {{ trueLabel }}
      </slot>
    </div>
    <div
      class="switchBtn"
      :class="[
        {
          squareCorner: corner === 'square',
          smallCorner: corner === 'small',
          filletCorner: corner === 'fillet',
          largeCorner: corner === 'large',
          fullCorner: corner === 'full'
        },
        { switchOn: status },
        { switchMoving: moving },
        { switchKeyModern: switchKeyTheme === 'modern', switchKeyDot: switchKeyTheme === 'dot' }
      ]"
      :style="[switchKeyColorCount, switchRadiusCount]"
    >
      <div
        v-if="switchKeyTheme === 'modern'"
        :class="{
          squareCorner: corner === 'square',
          smallCorner: corner === 'small',
          filletCorner: corner === 'fillet',
          largeCorner: corner === 'large',
          fullCorner: corner === 'full'
        }"
        :style="switchRadiusCount"
      ></div>
      <div v-if="loading" class="lunaLoadingDot"></div>
    </div>
    <div v-show="!status" class="falseSetPlace" :style="iconCount">
      <slot name="falseSlot">
        <i v-if="falseFontIcon !== ''" :style="iconCount" :class="falseFontIcon"></i>
        <img v-if="falseImageIcon !== ''" :src="falseImageIcon" alt="" />
        {{ falseLabel }}
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Switches',
  props: {
    value: {
      type: [Number, String, Boolean],
      default: false
    },
    trueLabel: {
      type: String,
      String: ''
    },
    falseLabel: {
      type: String,
      String: ''
    },
    trueValue: {
      type: [Number, String, Boolean],
      default: true
    },
    falseValue: {
      type: [Number, String, Boolean],
      default: false
    },
    trueIcon: {
      type: String,
      default: ''
    },
    falseIcon: {
      type: String,
      default: ''
    },
    trueColor: {
      type: [Number, String],
      default: 'none'
    },
    falseColor: {
      type: [Number, String],
      default: 'none'
    },
    fontSize: {
      type: [Number, String],
      default: 12
    },
    fontColor: {
      type: [Number, String],
      default: 'none'
    },
    beforeChange: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    switchKeyTheme: {
      type: String,
      default: 'modern'
    },
    switchKeyColor: {
      type: [Number, String],
      default: ''
    },
    corner: {
      type: String,
      default: 'large'
    },
    radius: {
      type: [Number, String],
      default: -1
    },
    border: {
      type: Boolean,
      default: false
    },
    borderStyle: {
      type: String,
      default: '1px solid #EEEEEE'
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
      default: 'none'
    }
  },
  data() {
    return {
      trueFontIcon: '',
      trueImageIcon: '',
      falseFontIcon: '',
      falseImageIcon: '',
      colorCounter: {},
      status: false,
      moving: false
    }
  },
  watch: {
    value() {
      this.status = this.value === this.trueValue
    }
  },
  computed: {
    styles() {
      const styles = {}
      if (this.status) {
        if (this.trueColor !== 'none') {
          if (typeof this.trueColor === 'string') {
            styles.backgroundColor = this.trueColor
          } else {
            styles.backgroundColor = '#' + this.trueColor
          }
        }
      } else {
        if (this.falseColor !== 'none') {
          if (typeof this.falseColor === 'string') {
            styles.backgroundColor = this.falseColor
          } else {
            styles.backgroundColor = '#' + this.falseColor
          }
        }
      }
      if (!this.border) {
        styles.border = 'none'
      } else {
        if (typeof this.borderStyle === 'string') {
          styles.border = this.borderStyle
        } else {
          styles.border = this.borderStyle + 'px solid #EEEEEE'
        }
      }
      if (this.shadowStyle !== 'none') {
        styles.boxShadow = this.shadowStyle
      }
      return styles
    },
    iconCount() {
      const styles = {}
      if (typeof this.fontSize === 'string') {
        styles.fontSize = this.fontSize
      } else {
        styles.fontSize = this.fontSize + 'px'
      }
      if (this.fontColor !== 'none') {
        if (typeof this.fontColor === 'string') {
          styles.color = this.fontColor
        } else {
          styles.color = this.fontColor + 'px'
        }
      }
      return styles
    },
    switchKeyColorCount() {
      if (this.switchKeyColor !== '') {
        if (typeof this.switchKeyColor === 'string') {
          return { backgroundColor: this.switchKeyColor }
        } else {
          if (typeof this.switchKeyColor === 'string') {
            return { backgroundColor: '#' + this.switchKeyColor }
          }
        }
      }
      return {}
    },
    switchRadiusCount() {
      if (this.radius !== -1) {
        if (typeof this.radius === 'string') {
          return { borderRadius: this.radius }
        } else {
          return { borderRadius: this.radius + 'px' }
        }
      }
      return {}
    }
  },
  mounted() {
    this.status = this.value === this.trueValue
    if (this.trueIcon !== '') {
      this.checkIcon(this.trueIcon, 'trueIcon')
    }
    if (this.falseIcon !== '') {
      this.checkIcon(this.falseIcon, 'falseIcon')
    }
  },
  methods: {
    cgStatus() {
      if (!this.disabled && !this.loading) {
        if (this.beforeChange) {
          this.$emit('onBeforeChange', this.status, this.falseValue, this.trueValue)
        } else {
          this.status = !this.status
          this.moving = true
          setTimeout(() => {
            this.moving = false
          }, 150)
          if (this.status === true) {
            this.$emit('input', this.trueValue)
            this.$emit('onChange', this.trueValue)
          } else {
            this.$emit('input', this.falseValue)
            this.$emit('onChange', this.falseValue)
          }
        }
      }
    },
    checkIcon(icon, type) {
      // 为了避免转义反斜杠出问题，这里将对其进行转换
      const re = /(\\+)/g
      const filename = icon.replace(re, '#')
      // 对路径字符串进行剪切截取
      const fileArray = filename.split('#')
      // 获取数组中最后一个，即文件名
      const fileName = fileArray[fileArray.length - 1]
      // 再对文件名进行截取，以取得后缀名
      const suffixName = fileName.split('.')
      // 获取截取的最后一个字符串，即为后缀名
      const last = suffixName[suffixName.length - 1]
      // 添加需要判断的后缀名类型
      const tp = 'jpg,svg,png,JPG,SVG,PNG'
      // 返回符合条件的后缀名在字符串中的位置
      const rs = tp.indexOf(last)
      // 如果返回的结果大于或等于0
      if (rs >= 0) {
        if (type === 'falseIcon') {
          this.falseImageIcon = this.falseIcon
        } else {
          this.trueImageIcon = this.trueIcon
        }
      } else {
        if (type === 'falseIcon') {
          this.falseFontIcon = this.falseIcon
        } else {
          this.trueFontIcon = this.trueIcon
        }
      }
    }
  }
}
</script>

<style scoped></style>
