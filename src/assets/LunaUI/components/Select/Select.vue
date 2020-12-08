<template>
  <div
    v-click-outside="hideList"
    class="lunaSelect"
    :style="[selectStyles]"
    :class="[
      className,
      {
        squareCorner: corner === 'square',
        smallCorner: corner === 'small',
        filletCorner: corner === 'fillet',
        largeCorner: corner === 'large',
        fullCorner: corner === 'full'
      },
      { lightSelect: theme === 'light', darkSelect: theme === 'dark' }
    ]"
    @click="handelClick"
    @keydown.esc="handleKeydown"
    @keydown.enter="handleKeydown"
    @keydown.up.prevent="handleKeydown"
    @keydown.down.prevent="handleKeydown"
    @keydown.tab="handleKeydown"
    @keydown.delete="handleKeydown"
  >
    <Input ref="input" v-model="initValue" :placeholder="placeholder" :readonly="!filterable" :disabled="disabled" :width="inputStyles.width" :corner="corner" icon="font_family icon-LunaDown" suffix :spin="showList" :background="background" :theme="theme" @input="changeText"></Input>
    <transition name="slideDown">
      <div
        v-if="showList"
        class="optionScrollBarHidden"
        :class="{
          squareCorner: corner === 'square',
          smallCorner: corner === 'small',
          filletCorner: corner === 'fillet',
          largeCorner: corner === 'large',
          fullCorner: corner === 'full'
        }"
        :style="[optionStyles]"
      >
        <div>
          <Option v-for="(i, index) in filterData" :key="index" :value="i[keyValue]" :label="i[keyLabel]" :class="{ optionActive: index === choiceIndex, optionWrap: wrap }" @optionSelect="optionSelect"></Option>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: {
    value: {
      type: [String, Array, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    selectData: {
      type: Array,
      default: () => {
        return []
      }
    },
    keyValue: {
      type: String,
      default: ''
    },
    keyLabel: {
      type: String,
      default: ''
    },
    filterable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    returnLabel: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: 180
    },
    className: {
      type: String,
      default: ''
    },
    corner: {
      type: String,
      default: 'large'
    },
    radius: {
      type: Number,
      default: -1
    },
    background: {
      type: [Number, String],
      default: '#FFFFFF'
    },
    optionBackground: {
      type: [Number, String],
      default: 'none'
    },
    color: {
      type: [Number, String],
      default: 'none'
    },
    optionColor: {
      type: [Number, String],
      default: 'none'
    },
    shadow: {
      type: Boolean,
      default: true
    },
    shadowTheme: {
      type: String,
      default: 'dark'
    },
    theme: {
      type: String,
      default: 'light'
    },
    wrap: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      showList: false,
      initValue: '',
      filterData: [],
      choiceIndex: -1,
      chose: false
    }
  },
  created() {
    if (this.value !== '') {
      for (let i = 0; i < this.selectData.length; i++) {
        if (this.selectData[i][this.keyValue] === this.value) {
          this.initValue = this.selectData[i][this.keyLabel]
          this.choiceIndex = i
          this.$emit('input', this.selectData[i][this.keyValue])
          if (!this.returnLabel) {
            this.$emit('on-change', this.selectData[i][this.keyValue])
          } else {
            this.$emit('on-change', this.selectData[i])
          }
          this.chose = true
          break
        }
      }
    } else {
      this.initValue = this.value
      this.filterData = this.selectData
    }
  },
  computed: {
    selectStyles() {
      const styleList = {}
      if (typeof this.width !== 'string') {
        styleList.width = this.width + 'px'
      } else {
        styleList.width = this.width
      }

      return styleList
    },
    inputStyles() {
      const styleList = {}
      if (typeof this.width !== 'string') {
        styleList.width = this.width + 'px'
      } else {
        styleList.width = this.width
      }
      if (this.color !== 'none') {
        if (typeof this.color === 'string') {
          styleList.color = this.color
        } else {
          styleList.color = '#' + this.color
        }
      }
      if (typeof this.background === 'string') {
        styleList.backgroundColor = this.background + '!important'
      } else {
        styleList.backgroundColor = '#' + this.background + '!important'
      }
      return styleList
    },
    optionStyles() {
      const styleList = {}
      if (this.optionBackground !== 'none') {
        if (typeof this.optionBackground === 'string') {
          styleList.backgroundColor = this.optionBackground + '!important'
        } else {
          styleList.backgroundColor = '#' + this.optionBackground + '!important'
        }
      }
      if (this.optionColor !== 'none') {
        if (typeof this.optionColor === 'string') {
          styleList.optionColor = this.optionColor + '!important'
        } else {
          styleList.optionColor = '#' + this.optionColor + '!important'
        }
      }
      return styleList
    }
  },
  watch: {
    initValue() {
      const newData = []
      if (this.initValue !== '') {
        this.selectData.forEach((item) => {
          if (item[this.keyLabel].indexOf(this.initValue) !== -1) {
            newData.push(item)
          }
        })
        this.filterData = newData
      } else {
        this.filterData = this.selectData
        this.choiceIndex = -1
      }
    },
    value() {
      if (this.value !== '') {
        for (let i = 0; i < this.selectData.length; i++) {
          if (this.selectData[i][this.keyValue] === this.value) {
            this.initValue = this.selectData[i][this.keyLabel]
            this.choiceIndex = i
            this.$emit('input', this.selectData[i][this.keyValue])
            if (!this.returnLabel) {
              this.$emit('on-change', this.selectData[i][this.keyValue])
            } else {
              this.$emit('on-change', this.selectData[i])
            }
            this.chose = true
            break
          }
        }
      } else {
        this.initValue = this.value
        this.filterData = this.selectData
      }
    }
  },
  methods: {
    changeText(value) {
      this.initValue = value
      this.chose = false
    },
    handelClick() {
      if (!this.showList) {
        this.filterData = this.selectData
      }
      if (this.value !== '') {
        for (let i = 0; i < this.selectData.length; i++) {
          if (this.selectData[i][this.keyValue] === this.value) {
            this.initValue = this.selectData[i][this.keyLabel]
            this.choiceIndex = i
            break
          }
        }
      }
      this.showList = !this.showList
      if (this.showList) {
        this.$refs.input.getFocus()
      }
      this.$emit('on-click')
    },
    optionSelect(obj) {
        this.showList = false
      this.choiceIndex = 0
      this.$emit('input', obj.value)
      this.initValue = obj.label
      this.chose = true
      if (!this.returnLabel) {
        this.$emit('on-change', obj.value)
      } else {
        this.$emit('on-change', obj)
      }
    },
    handleKeydown(e) {
      const key = e.key || e.code
      if (key === 'Backspace') {
        return
      }

      if (this.showList) {
        e.preventDefault()
        if (key === 'Tab') {
          e.stopPropagation()
        }

        // Esc slide-up
        if (key === 'Escape') {
          e.stopPropagation()
          this.hideList()
        }
        // next
        if (key === 'ArrowUp') {
          this.navigateOptions(-1)
        }
        // prev
        if (key === 'ArrowDown') {
          this.navigateOptions(1)
        }
        // enter
        if (key === 'Enter') {
          const choiceItem = {
            value: this.filterData[this.choiceIndex][this.keyValue],
            label: this.filterData[this.choiceIndex][this.keyLabel]
          }
          this.optionSelect(choiceItem)
          this.choiceIndex = 0
        }
      }
    },
    navigateOptions(direction) {
      if (this.filterData.length !== 0) {
        if (this.choiceIndex === -1) {
          if (direction === 1) {
            this.choiceIndex = 0
          } else {
            this.choiceIndex = this.filterData.length - 1
          }
        } else {
          if (this.choiceIndex === 0 && direction === -1) {
            this.choiceIndex = this.filterData.length - 1
          } else if (this.choiceIndex === this.filterData.length - 1 && direction === 1) {
            this.choiceIndex = 0
          } else {
            this.choiceIndex = this.choiceIndex + direction
          }
        }
      }
    },
    hideList() {
      if (!this.chose) {
        this.$emit('input', '')
        this.initValue = ''
      }
      this.showList = false
    }
  }
}
</script>

<style scoped lang="scss">
.offMiddle {
  transform: scaleY(0);
}
</style>
