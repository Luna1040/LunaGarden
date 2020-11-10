<template>
  <div class="lunaDatePickerPanelNormalHeader">
    <i v-if="!showYearArrow && !showMonthArrow" class="iconfont icon-double-arrow-left" @click="prevYear"></i>
    <i v-if="!showYearArrow && !showMonthArrow" class="iconfont icon-fanhui" @click="prevMonth"></i>
    <i v-else-if="showMonthArrow" class="iconfont icon-fanhui" @click="prevYear"></i>
    <i v-else-if="showYearArrow" class="iconfont icon-fanhui" @click="prevFiveYear"></i>
    <div class="dateItemGroup">
      <div class="cgItemBtn" @click="cgYear('start')">{{ year }}年</div>
      <div class="cgItemBtn" @click="cgMonth('start')">{{ month }}月</div>
    </div>
    <div v-if="range" class="dateItemGroup">
      <div class="cgItemBtn" @click="cgYear('end')">{{ rangeEnd.year }}年</div>
      <div class="cgItemBtn" @click="cgMonth('end')">{{ rangeEnd.month }}月</div>
    </div>
    <i v-if="!showYearArrow && !showMonthArrow" class="iconfont icon-youjiantou" @click="nextMonth"></i>
    <i v-if="!showYearArrow && !showMonthArrow" class="iconfont icon-yincangxiangqing" @click="nextYear"></i>
    <i v-else-if="showMonthArrow" class="iconfont icon-youjiantou" @click="nextYear"></i>
    <i v-else-if="showYearArrow" class="iconfont icon-youjiantou" @click="nextFiveYear"></i>
  </div>
</template>

<script>
import controlBtn from '../controlBtn'
export default {
  name: 'NormalDateHeader',
  props: {
    year: {
      type: Number,
      default: 0
    },
    month: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: 'start'
    },
    showYearArrow: {
      type: Boolean,
      default: false
    },
    showMonthArrow: {
      type: Boolean,
      default: false
    },
    range: {
      type: Boolean,
      default: false
    }
  },
  components: {
    controlBtn
  },
  computed: {
    rangeEnd() {
      let obj = {}
      if (this.month === 12) {
        obj.month = 1
        obj.year = this.year + 1
      } else {
        obj.month = this.month + 1
        obj.year = this.year
      }
      return obj
    }
  },
  methods: {
    cgYear(type) {
      this.$emit('cgYear', type, this.year)
    },
    cgMonth(type) {
      this.$emit('cgMonth', type, this.month)
    },
    prevYear() {
      this.$emit('prevYear', this.type, this.year)
    },
    prevMonth() {
      this.$emit('prevMonth', this.type, this.month)
    },
    nextYear() {
      this.$emit('nextYear', this.type, this.year)
    },
    nextMonth() {
      this.$emit('nextMonth', this.type, this.month)
    },
    prevFiveYear() {
      this.$emit('prevFiveYear', this.type, this.year)
    },
    nextFiveYear() {
      this.$emit('nextFiveYear', this.type, this.year)
    }
  }
}
</script>

<style scoped></style>
