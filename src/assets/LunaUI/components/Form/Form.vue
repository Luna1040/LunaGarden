<template>
  <div
    class="lunaForm"
    :style="[formStyles]"
    :class="[
      className,
      {
        darkShadow: shadow && shadowTheme === 'dark',
        lightShadow: shadow && shadowTheme === 'light'
      },
      { scrollable: scrollable },
      {
        squareCorner: corner === 'square',
        smallCorner: corner === 'small',
        filletCorner: corner === 'fillet',
        largeCorner: corner === 'large',
        fullCorner: corner === 'full'
      },
      { lightForm: theme === 'light', darkForm: theme === 'dark' },
      { formColumn: direction === 'column', formRow: direction === 'row' }
    ]"
  >
    <FormItem
      v-for="(i, index) in formData"
      :key="index"
      class="lunaFormItem"
      :item-data="i"
      :label-width-count="labelWidthCount"
      :label-color-count="labelColorCount"
      :class="{
        leftLabel: labelPosition === 'left',
        topLabel: labelPosition === 'top'
      }"
      :corner="corner"
    ></FormItem>
    <div
      class="lunaFormItem"
      :label-width-count="labelWidthCount"
      :label-color-count="labelColorCount"
      :class="{
        rightLabel: labelPosition === 'left',
        topLabel: labelPosition === 'top'
      }"
      :corner="corner"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { noChara, noChinese, noChineseChara, noEnglish, noEnglishChara, noNumber, email, phone, IDNumber, urlLink } from '../../js/Luna-Validater'

export default {
  name: 'Form',
  props: {
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
    theme: {
      type: String,
      default: 'light'
    },
    radius: {
      type: [Number, String],
      default: -1
    },
    corner: {
      type: String,
      default: 'large'
    },
    background: {
      type: [Number, String],
      default: 'none'
    },
    border: {
      type: [Number, String],
      default: '1px solid #EFEFEF'
    },
    // 宽度高度相关小于等于100为百分比，大于100为px
    width: {
      // 可选auto
      type: [Number, String],
      default: 100
    },
    height: {
      type: [Number, String],
      default: 'auto'
    },
    maxHeight: {
      type: [Number, String],
      default: 'auto'
    },
    padding: {
      type: [Number, String],
      default: 16
    },
    scrollable: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    },
    direction: {
      type: String,
      default: 'column'
    },
    labelPosition: {
      type: String,
      default: 'left'
    },
    labelWidth: {
      type: [Number, String],
      default: 120
    },
    labelColor: {
      type: [Number, String],
      default: 'none'
    },
    form: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    formStyles() {
      const styleList = {}
      if (this.shadowStyle !== '') {
        styleList.boxShadow = this.shadowStyle + '!important'
      }
      if (typeof this.padding === 'string') {
        styleList.padding = this.padding
      } else {
        styleList.padding = this.padding + 'px'
      }
      if (typeof this.border === 'string') {
        styleList.border = this.border
      } else {
        styleList.border = this.border + 'px solid #EFEFEF'
      }
      if (this.background !== 'none') {
        if (typeof this.background === 'string') {
          styleList.backgroundColor = this.background + '!important'
        } else {
          styleList.backgroundColor = '#' + this.background + '!important'
        }
      }

      if (typeof this.width !== 'string') {
        if (this.width <= 100) {
          styleList.width = this.width + '%'
        } else {
          styleList.width = this.width + 'px'
        }
      } else {
        styleList.width = this.width
      }

      if (typeof this.height !== 'string') {
        if (this.height <= 100) {
          styleList.height = this.height + '%'
        } else {
          styleList.height = this.height + 'px'
        }
      } else {
        styleList.height = this.height
      }

      if (this.maxHeight !== 'auto') {
        if (typeof this.maxHeight !== 'string') {
          if (this.height <= 100) {
            styleList.height = this.height + '%'
          } else {
            styleList.height = this.height + 'px'
          }
        } else {
          styleList.height = this.height
        }
      }

      if (this.radius !== -1) {
        if (typeof this.radius === 'string') {
          styleList.borderRadius = this.radius
        } else {
          styleList.borderRadius = this.radius + 'px'
        }
      }

      return styleList
    },
    labelWidthCount() {
      if (typeof this.labelWidth === 'string') {
        return { width: this.labelWidth }
      } else {
        return { width: this.labelWidth + 'px' }
      }
    },
    labelColorCount() {
      if (this.labelColor !== 'none') {
        if (typeof this.labelColor === 'string') {
          return { color: this.labelColor }
        } else {
          return { color: '#' + this.labelColor }
        }
      }
      return {}
    }
  },
  data() {
    return {
      formData: []
    }
  },
  created() {
    this.formData = this.form
    this.$forceUpdate()
  },
  watch: {
    form() {
      this.formData = this.form
      this.$forceUpdate()
    }
  },
  methods: {
    createContent(h) {
      return h('div', this.$slots.default)
    },
    examine(data) {
      for (let i = 0; i < this.formData.length; i++) {
        if (this.formData[i].validate) {
          const str = data[this.formData[i].validate]
          const valid = this.formData[i].validateMethods

          this.formData[i].errStatus = false
          this.formData[i].errText = ''
          if (this.formData[i].required) {
            if (str === '') {
              this.formData[i].errStatus = true
              this.formData[i].errText = this.formData[i].emptyWarning
            }
          }
          if (!this.formData[i].errStatus && valid) {
            for (let ins = 0; ins < valid.length; ins++) {
              if (!this.formData[i].errStatus && valid[ins].type === 'length') {
                if (str.length < valid[ins].min) {
                  this.formData[i].errStatus = true
                  this.formData[i].errText = valid[ins].minErrText
                } else if (str.length > valid[ins].max) {
                  this.formData[i].errStatus = true
                  this.formData[i].errText = valid[ins].maxErrText
                }
              }
              if (!this.formData[i].errStatus && valid[ins].type === 'noChara') {
                if (!noChara(str)) {
                  this.formData[i].errStatus = true
                  this.formData[i].errText = valid[ins].errText
                }
              }
              if (!this.formData[i].errStatus && valid[ins].type === 'noChinese') {
                if (!noChinese(str)) {
                  this.formData[i].errStatus = true
                  this.formData[i].errText = valid[ins].errText
                }
              }
              if (!this.formData[i].errStatus && valid[ins].type === 'noChineseChara') {
                if (!noChineseChara(str)) {
                  this.formData[i].errStatus = true
                  this.formData[i].errText = valid[ins].errText
                }
              }
              if (!this.formData[i].errStatus && valid[ins].type === 'noEnglish') {
                if (!noEnglish(str)) {
                  this.formData[i].errStatus = true
                  this.formData[i].errText = valid[ins].errText
                }
              }
              if (!this.formData[i].errStatus && valid[ins].type === 'noEnglishChara') {
                if (!noEnglishChara(str)) {
                  this.formData[i].errStatus = true
                  this.formData[i].errText = valid[ins].errText
                }
              }
              if (!this.formData[i].errStatus && valid[ins].type === 'noNumber') {
                if (!noNumber(str)) {
                  this.formData[i].errStatus = true
                  this.formData[i].errText = valid[ins].errText
                }
              }
              if (!this.formData[i].errStatus && valid[ins].type === 'email') {
                if (!email(str)) {
                  this.formData[i].errStatus = true
                  this.formData[i].errText = valid[ins].errText
                }
              }
              if (!this.formData[i].errStatus && valid[ins].type === 'phone') {
                if (!phone(str)) {
                  this.formData[i].errStatus = true
                  this.formData[i].errText = valid[ins].errText
                }
              }
              if (!this.formData[i].errStatus && valid[ins].type === 'IDNumber') {
                if (!IDNumber(str)) {
                  this.formData[i].errStatus = true
                  this.formData[i].errText = valid[ins].errText
                }
              }
              if (!this.formData[i].errStatus && valid[ins].type === 'urlLink') {
                if (!urlLink(str)) {
                  this.formData[i].errStatus = true
                  this.formData[i].errText = valid[ins].errText
                }
              }
            }
          }
        }
      }
      for (let i = 0; i < this.formData.length; i++) {
        if (this.formData[i].errStatus === true) {
          return this.formData[i].errStatus
        }
      }
      return false
    }
  }
}
</script>

<style scoped></style>
