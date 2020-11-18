<template>
  <div
    class="lunaCheckbox"
    :style="styles"
    :class="[
      { disabled: disabled },
      { checked: checked },
      {
        squareCorner: borderCorner === 'square',
        smallCorner: borderCorner === 'small',
        filletCorner: borderCorner === 'fillet',
        largeCorner: borderCorner === 'large',
        fullCorner: borderCorner === 'full'
      }
    ]"
    @click="handelCheck"
  >
    <div
      class="emptyCheckbox"
      :style="boxStyle"
      :class="[
        { checked: checked && !checkedWithLight, checkedWithLight: checked && checkedWithLight },
        {
          squareCorner: corner === 'square',
          smallCorner: corner === 'small',
          filletCorner: corner === 'fillet',
          largeCorner: corner === 'large',
          fullCorner: corner === 'full',
          roundCorner: corner === 'round'
        }
      ]"
    >
      <transition name="scaleCheckboxIcon">
        <i v-if="checked" class="iconfont icon-check"></i>
        <i v-if="halfCheck" class="iconfont icon-minus"></i>
      </transition>
    </div>
    <i v-if="fontIcon !== ''" :style="[iconFontSizeCount, iconFontColorCount]" :class="fontIcon"></i>
    <img v-if="imageIcon !== ''" :src="imageIcon" class="buttonImg" />
    <template>
      <slot></slot>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    value: {
      type: [Number, String, Boolean],
      default: false
    },
    trueValue: {
      type: [Number, String, Boolean],
      default: true
    },
    falseValue: {
      type: [Number, String, Boolean],
      default: false
    },
    beforeChecked: {
      type: Boolean,
      default: false
    },
    corner: {
      type: String,
      default: 'small'
    },
    radius: {
      type: [Number, String],
      default: -1
    },
    checkedWithLight: {
      type: Boolean,
      default: true
    },
    icon: {
      type: String,
      default: ''
    },
    iconFontSize: {
      type: String,
      default: ''
    },
    iconFontColor: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    borderCorner: {
      type: String,
      default: 'small'
    },
    borderRadius: {
      type: [Number, String],
      default: -1
    },
    borderStyle: {
      type: [Number, String],
      default: '1px solid #DCDEE2'
    },
    padding: {
      type: [Number, String],
      default: '4px 10px'
    },
    halfCheck: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checked: false,
      imageIcon: '',
      fontIcon: '',
      currentValue: ''
    }
  },
  mounted() {
    this.currentValue = this.value
    this.checked = this.value === this.trueValue
    const icon = this.icon
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
      this.imageIcon = this.icon
    } else {
      this.fontIcon = this.icon
    }
  },
  watch: {
    value() {
      this.currentValue = this.value
      this.checked = this.currentValue === this.trueValue
    }
  },
  computed: {
    styles() {
      const styles = {}
      if (this.border) {
        if (typeof this.padding === 'string') {
          styles.padding = this.padding
        } else {
          styles.padding = this.padding + 'px'
        }
        if (typeof this.borderStyle === 'string') {
          styles.border = this.borderStyle
        } else {
          styles.border = this.borderStyle + 'px solid #DCDEE2'
        }
        if (this.borderRadius !== -1)
          if (typeof this.borderRadius === 'string') {
            styles.radius = this.borderRadius + '!important'
          } else {
            styles.radius = this.borderRadius + 'px!important'
          }
      }
      return styles
    },
    boxStyle() {
      const styles = {}
      if (this.radius !== -1) {
        if (typeof this.radius === 'string') {
          styles.radius = this.radius + '!important'
        } else {
          styles.radius = this.radius + 'px!important'
        }
      }
      return styles
    },
    iconFontColorCount() {
      if (this.fontIcon !== '') {
        if (typeof this.iconFontColor === 'string') {
          return { color: this.iconFontColor }
        } else {
          return { color: '#' + this.iconFontColor }
        }
      }
    },
    iconFontSizeCount() {
      if (this.fontIcon !== '') {
        if (typeof this.iconFontSize === 'string') {
          return { fontSize: this.iconFontSize }
        } else {
          return { fontSize: this.iconFontSize + 'px' }
        }
      }
    }
  },
  methods: {
    handelCheck() {
      if (!this.disabled) {
        if (this.beforeChecked) {
          this.$emit('onBeforeChange', this.falseValue, this.trueValue)
          return
        }
        if (this.checked) {
          this.currentValue = this.falseValue
        } else {
          this.currentValue = this.trueValue
        }
        this.checked = !this.checked
        this.$emit('input', this.currentValue)
        this.$emit('onChange', this.currentValue)
      }
    }
  }
}
</script>

<style scoped></style>
