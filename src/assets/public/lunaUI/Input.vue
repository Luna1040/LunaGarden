<template>
  <div
    class="lunaInput"
    :class="[
      className,
      {
        squareCorner: corner === 'square',
        smallCorner: corner === 'small',
        filletCorner: corner === 'fillet',
        largeCorner: corner === 'large',
        fullCorner: corner === 'full',
      },
      { ghostInput: ghost },
      { disabled: disabled },
      { lightInput: theme === 'light', darkInput: theme === 'dark' },
      { focusing: focusing },
    ]"
    :style="[inputStyle]"
    @focusin="focusEnter"
    @focusout="focusLeave"
  >
    <i
      v-if="pre"
      :style="[iconFontSize, iconFontColor]"
      :class="[fontIcon, { spin: spin }]"
      class="pre"
      @click="handelIcon"
    ></i>
    <slot name="pre"></slot>
    <input
      ref="input"
      :class="{
        squareCorner: corner === 'square',
        smallCorner: corner === 'small',
        filletCorner: corner === 'fillet',
        largeCorner: corner === 'large',
        fullCorner: corner === 'full',
      }"
      :value="textValue"
      :style="[textColor, inputFontSize, inputWidthCount]"
      :type="type"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      @input="cgValue"
      @keyup="handelKeyUp"
      @keyup.enter="handelEnter"
      @keydown="handelKeyDown"
      @keypress="handelKeyPress"
      @focus="handelFocus"
      @blur="handelBlur"
    />
    <!--        清空按钮-->
    <i v-if="clearable" class="iconfont icon-cancel" @click="clearText"></i>
    <i
      v-if="suffix"
      :style="[iconFontSize, iconFontColor]"
      :class="[fontIcon, { spin: spin }]"
      class="suffix"
      @click="handelIcon"
    ></i>
    <slot name="suffix"></slot>
    <span v-if="showWordLimit">{{ count }}/{{ maxlength }}</span>
  </div>
</template>

<script>
import {
  email,
  IDNumber,
  noChara,
  noChinese,
  noChineseChara,
  noEnglish,
  noEnglishChara,
  noNumber,
  phone,
  urlLink
} from './js/validate'

export default {
  name: 'Input',
  props: {
    // 自定义宽度  作用于container
    width: {
      type: [Number, String],
      default: 180
    },
    // 自定义高度  作用于body
    height: {
      type: [Number, String],
      default: 32
    },
    color: {
      type: [String, Number],
      default: '#4A4A4A'
    },
    background: {
      type: [String, Number],
      default: '#FFFFFF'
    },
    fontSize: {
      type: [String, Number],
      default: '14px'
    },
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    },
    corner: {
      type: String,
      default: 'large'
    },
    theme: {
      type: String,
      default: 'light'
    },
    readonly: {
      type: Boolean,
      default: false
    },
    radius: {
      type: [Number, String],
      default: -1
    },
    borderColor: {
      type: String,
      default: ''
    },
    boxShadow: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    ghost: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    iconColor: {
      type: [Number, String],
      default: 'none'
    },
    iconSize: {
      type: [Number, String],
      default: 'none'
    },
    pre: {
      type: Boolean,
      default: false
    },
    suffix: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: Number,
      default: 500
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    spin: {
      type: Boolean,
      default: false
    },
    validateOnChange: {
      type: Boolean,
      default: false
    },
    validateMethods: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    inputStyle () {
      const style = {
        boxShadow: this.boxShadow
      }
      if (typeof this.width !== 'string') {
        style.width = this.width + 'px'
      } else {
        style.width = this.width
      }
      if (this.radius !== -1) {
        if (typeof this.radius !== 'string') {
          style.borderRadius = this.radius + 'px!important'
        } else {
          style.borderRadius = this.radius + '!important'
        }
      }
      if (typeof this.height !== 'string') {
        style.height = this.height + 'px'
      } else {
        style.height = this.height
      }
      if (typeof this.background !== 'string') {
        style.backgroundColor = '#' + this.background
      } else {
        style.backgroundColor = this.background
      }
      if (this.ghost && this.borderColor !== '') {
        style.border = '1px solid ' + this.borderColor
      } else {
        style.border = '1px solid ' + this.borderColorStyle
      }
      return style
    },
    inputFontSize () {
      if (typeof this.fontSize === 'string') {
        return { fontSize: this.fontSize }
      } else {
        return { fontSize: this.fontSize + 'px' }
      }
    },
    inputWidthCount () {
      if (this.showWordLimit) {
        if (this.suffix && this.pre) {
          return {
            width: 'calc(100% - 64px)'
          }
        } else if (this.suffix || this.pre) {
          return {
            width: 'calc(100% - 64px)'
          }
        } else {
          return {
            width: 'calc(100% - 50px)'
          }
        }
      } else {
        return {
          width: '100%'
        }
      }
    },
    textColor () {
      if (typeof this.color !== 'string') {
        return { color: '#' + this.color }
      } else {
        return { color: this.color }
      }
    },
    count () {
      return this.textValue.length
    },
    iconFontSize () {
      if (this.iconSize !== 'none') {
        if (typeof this.iconSize === 'string') {
          return { fontSize: this.iconSize }
        } else {
          return { fontSize: this.iconSize + 'px' }
        }
      } else {
        if (typeof this.fontSize === 'string') {
          return { fontSize: this.fontsize }
        } else {
          return { fontSize: this.fontSize + 'px' }
        }
      }
    },
    iconFontColor () {
      if (this.iconColor !== '') {
        if (this.iconColor !== 'none') {
          if (typeof this.iconColor === 'string') {
            return { color: this.iconColor }
          } else {
            return { color: '#' + this.iconColor }
          }
        }
      } else {
        if (this.color !== 'none') {
          if (typeof this.color === 'string') {
            return { color: this.color }
          } else {
            return { color: '#' + this.color }
          }
        }
      }
    }
  },
  data () {
    return {
      // boxShadow: '0 0 0 2px rgba(0,0,0, 0)',
      borderColorStyle: '#EEEEEE',
      focusing: false,
      textValue: this.value,
      fontIcon: '',
      imageIcon: ''
    }
  },
  mounted () {
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
  methods: {
    getFocus () {
      this.$refs.input.focus()
    },
    focusEnter () {
      this.focusing = true
    },
    focusLeave () {
      this.focusing = false
    },
    clearText () {
      this.$emit('on-cancel', this.textValue)
      this.textValue = ''
      this.$emit('input', '')
    },
    cgValue (event) {
      this.$emit('input', event.target.value)
      this.$emit('on-change', event.target.value)
      if (this.validateOnChange) {
        this.$emit('onValidate', this.examine(event.target.value))
      }
    },
    handelKeyUp (event) {
      this.$emit('on-keyup', event)
    },
    handelKeyDown (event) {
      this.$emit('on-keydown', event)
    },
    handelKeyPress (event) {
      this.$emit('on-keypress', event)
    },
    handelFocus (event) {
      this.$emit('on-focus', event)
    },
    handelBlur (event) {
      this.$emit('on-blur', event)
      if (!this.validateOnChange) {
        this.$emit('onBlurValidate', this.examine(event.target.value))
      }
    },
    handelIcon () {
      this.$emit('on-blur', this.textValue)
    },
    handelEnter () {
      this.$emit('on-enter', this.textValue)
    },
    examine (str) {
      const valid = this.validateMethods
      const params = {
        errStatus: false,
        errText: ''
      }
      for (let ins = 0; ins < valid.length; ins++) {
        if (!params.errStatus && valid[ins].type === 'length') {
          if (str.length < valid[ins].min) {
            params.errStatus = true
            params.errText = valid[ins].minErrText
          } else if (str.length > valid[ins].max) {
            params.errStatus = true
            params.errText = valid[ins].maxErrText
          }
        }
        if (!params.errStatus && valid[ins].type === 'noChara') {
          if (!noChara(str)) {
            params.errStatus = true
            params.errText = valid[ins].errText
          }
        }
        if (!params.errStatus && valid[ins].type === 'noChinese') {
          if (!noChinese(str)) {
            params.errStatus = true
            params.errText = valid[ins].errText
          }
        }
        if (!params.errStatus && valid[ins].type === 'noChineseChara') {
          if (!noChineseChara(str)) {
            params.errStatus = true
            params.errText = valid[ins].errText
          }
        }
        if (!params.errStatus && valid[ins].type === 'noEnglish') {
          if (!noEnglish(str)) {
            params.errStatus = true
            params.errText = valid[ins].errText
          }
        }
        if (!params.errStatus && valid[ins].type === 'noEnglishChara') {
          if (!noEnglishChara(str)) {
            params.errStatus = true
            params.errText = valid[ins].errText
          }
        }
        if (!params.errStatus && valid[ins].type === 'noNumber') {
          if (!noNumber(str)) {
            params.errStatus = true
            params.errText = valid[ins].errText
          }
        }
        if (!params.errStatus && valid[ins].type === 'email') {
          if (!email(str)) {
            params.errStatus = true
            params.errText = valid[ins].errText
          }
        }
        if (!params.errStatus && valid[ins].type === 'phone') {
          if (!phone(str)) {
            params.errStatus = true
            params.errText = valid[ins].errText
          }
        }
        if (!params.errStatus && valid[ins].type === 'IDNumber') {
          if (!IDNumber(str)) {
            params.errStatus = true
            params.errText = valid[ins].errText
          }
        }
        if (!params.errStatus && valid[ins].type === 'urlLink') {
          if (!urlLink(str)) {
            params.errStatus = true
            params.errText = valid[ins].errText
          }
        }
      }

      return params
    }
  },
  watch: {
    value (val) {
      if (val === this.textValue) {
        return val
      } else {
        this.textValue = val
      }
    }
  }
}
</script>

<style scoped lang="scss">
.spin {
  transform: rotateZ(180deg);
}
</style>
