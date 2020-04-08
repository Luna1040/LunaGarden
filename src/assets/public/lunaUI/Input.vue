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
        fullCorner: corner === 'full'
      },
      { ghostInput: ghost },
      { disabled: disabled },
      { lightInput: theme === 'light', darkInput: theme === 'dark' }
    ]"
    :style="[inputStyle]"
    @mouseenter="hoverEnter"
    @mouseleave="hoverOut"
    @focusin="focusEnter"
    @focusout="focusLeave"
  >
    <i
      v-if="pre"
      :class="[icon, { spin: spin }]"
      class="pre"
      @click="handelIcon"
    ></i>
    <slot name="pre"></slot>
    <input
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
    <transition name="">
      <i
        v-if="suffix"
        :class="[icon, { spin: spin }]"
        class="suffix"
        @click="handelIcon"
      ></i>
    </transition>
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
      type: String,
      default: '#4A4A4A'
    },
    background: {
      type: String,
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
      type: Number,
      default: -1
    },
    borderColor: {
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
      default: 120
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
      let style = {
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
      if (typeof this.backgroundColor !== 'string') {
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
            width: 'calc(100% - 62px)'
          }
        } else if (this.suffix || this.pre) {
          return {
            width: 'calc(100% - 40px)'
          }
        } else {
          return {
            width: 'calc(100% - 32px)'
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
    }
  },
  data () {
    return {
      boxShadow: '0 0 0 2px rgba(0,0,0, 0)',
      borderColorStyle: '#EEEEEE',
      textValue: this.value
    }
  },
  methods: {
    hoverEnter () {
      if (this.borderColor !== '') {
        this.borderColorStyle = this.borderColor
      } else {
        this.borderColorStyle = this.background
      }
    },
    hoverOut () {
      this.borderColorStyle = '#EEEEEE'
    },
    focusEnter () {
      if (this.borderColor !== '') {
        this.boxShadow =
                        '0 0 0 2px rgba(' + this.toRGB(this.borderColor) + ', 0.2)'
        this.borderColorStyle = this.borderColor
      } else {
        this.boxShadow =
                        '0 0 0 2px rgba(' + this.toRGB(this.background) + ', 0.2)'
        this.borderColorStyle = this.background
      }
    },
    focusLeave () {
      this.boxShadow = '0 0 0 2px rgba(0,0,0, 0)'
      this.borderColorStyle = '#EEEEEE'
    },
    clearText () {
      this.$emit('on-cancel', this.textValue)
      this.textValue = ''
      this.$emit('input', '')
    },
    cgValue (event) {
      this.$emit('input', event.target.value)
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
      let params = {
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
