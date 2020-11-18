<template>
  <div
    class="lunaPage"
    :style="[styles]"
    :class="[
      { squareCorner: corner === 'square', smallCorner: corner === 'small', filletCorner: corner === 'fillet', largeCorner: corner === 'large', fullCorner: corner === 'full', roundCorner: corner === 'round' },
      { lightPage: theme === 'light', darkPage: theme === 'dark' }
    ]"
  >
    <span v-if="counter" class="pageCounter">共{{ limit }}条</span>
    <slot name="pre"></slot>
    <Button class="lunaPageCell pagination" :disabled="prevDisable" :width="cellStyles.width" :background="cellStyles.background" :radius="cellStyles.borderRadius" :height="cellStyles.width" :corner="cellStyles.cellCorner" :theme="theme" @click="prev">
      <i class="iconfont icon-fanhui"></i>
    </Button>
    <Button v-for="i in limitCount" :key="i" class="lunaPageCell" :width="cellStyles.width" :background="cellStyles.background" :radius="cellStyles.borderRadius" :height="cellStyles.width" :corner="cellStyles.cellCorner" :theme="theme" :class="[{ pageCellActive: i === choiceIndex }]" @click="handelClick(i)">{{ i }}</Button>
    <Button class="lunaPageCell pagination" :disabled="nextDisable" :width="cellStyles.width" :background="cellStyles.background" :radius="cellStyles.borderRadius" :height="cellStyles.width" :corner="cellStyles.cellCorner" :theme="theme" @click="next">
      <i class="iconfont icon-youjiantou"></i>
    </Button>
    <div class="pageSizer">
      <!--            <Select></Select>-->
    </div>
    <div class="pageElevator">
      <span>前往第</span>
      <Input v-if="elevator" :value="1" :width="40" :height="24" border-color="#cfcfcf" font-size="12px" :theme="theme"></Input>
      <span>页</span>
    </div>
    <slot name="suffix"></slot>
  </div>
</template>

<script>
export default {
  name: 'Page',
  props: {
    limit: {
      type: Number,
      default: 0
    },
    width: {
      type: [Number, String],
      default: 100
    },
    background: {
      type: [Number, String],
      default: 'none'
    },
    theme: {
      type: String,
      default: 'light'
    },
    cellWidth: {
      type: [Number, String],
      default: 24
    },
    cellBackgroundColor: {
      type: [Number, String],
      default: '#FFFFFF'
    },
    radius: {
      type: Number,
      default: -1
    },
    cellRadius: {
      type: Number,
      default: -1
    },
    corner: {
      type: String,
      default: 'large'
    },
    cellCorner: {
      type: String,
      default: 'round'
    },
    elevator: {
      type: Boolean,
      default: false
    },
    counter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      choiceIndex: -1,
      prevDisable: false,
      nextDisable: false
    }
  },
  computed: {
    limitCount() {
      const count = []
      for (let i = 0; i < this.limit; i++) {
        count.push(i + 1)
      }
      return count
    },
    styles() {
      const styleList = {}
      if (typeof this.width !== 'string') {
        if (this.width <= 100) {
          styleList.width = this.width + '%'
        } else {
          styleList.width = this.width + 'px'
        }
      } else {
        styleList.width = this.width
      }
      if (this.background !== 'none') {
        if (typeof this.background === 'string') {
          styleList.backgroundColor = this.background
        } else {
          styleList.backgroundColor = '#' + this.background
        }
      }
      if (this.radius !== -1) {
        styleList.borderRadius = this.radius + 'px'
      }

      return styleList
    },
    cellStyles() {
      const styleList = {}
      if (typeof this.cellWidth !== 'string') {
        styleList.width = this.cellWidth + 'px'
      } else {
        styleList.width = this.cellWidth
      }
      if (this.cellBackgroundColor !== 'none') {
        if (typeof this.cellBackgroundColor === 'string') {
          styleList.background = this.cellBackgroundColor
        } else {
          styleList.background = '#' + this.cellBackgroundColor
        }
      }
      if (this.cellRadius !== -1) {
        styleList.borderRadius = this.cellRadius + 'px'
      }
      styleList.cellCorner = this.cellCorner

      return styleList
    }
  },
  methods: {
    handelClick(value) {
      this.choiceIndex = value
      this.examineIndex()
      this.$emit('on-click', value)
    },
    prev() {
      this.choiceIndex--
      this.handelClick(this.choiceIndex)
    },
    next() {
      this.choiceIndex++
      this.handelClick(this.choiceIndex)
    },
    examineIndex() {
      if (this.choiceIndex === 1) {
        this.prevDisable = true
        this.nextDisable = false
      } else if (this.choiceIndex === this.limit) {
        this.nextDisable = true
        this.prevDisable = false
      } else {
        this.nextDisable = false
        this.prevDisable = false
      }
    }
  },
  mounted() {
    if (this.page !== 0) {
      this.choiceIndex = 1
      this.examineIndex()
    }
  }
}
</script>

<style scoped></style>
