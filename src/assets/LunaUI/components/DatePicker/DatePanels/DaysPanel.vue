<template>
  <div class="lunaDatePickerPanelDay">
    <div class="lunaDatePickerPanelWeekList">
      <div v-for="i in weekList" :key="i" class="lunaWeekCell">{{ i }}</div>
    </div>
    <div class="lunaDatePickerPanelDayList">
      <div v-for="i in lastMonth" :key="i + 'last'" class="lunaDayCellOtherMonth" @click="turnToLastMonth(i)">
        {{ i }}
        <div v-if="i === today && countPrevMonthToday" class="todayDot"></div>
      </div>
      <div
        v-for="i in countDays"
        :key="i"
        class="lunaDayCell"
        :class="[
          { lunaActiveDay: (startDay === i && startMonth === month && startYear === year) || (endDay === i && endMonth === month && endYear === year) },
          {
            lunaDayRangeActive:
              (range &&
                //同年同月情况下
                month === startMonth &&
                month === endMonth &&
                startMonth === endMonth &&
                i > startDay &&
                i < endDay &&
                year === startYear &&
                year === endYear &&
                startYear === endYear) ||
              //同年跨月的开始日期面板
              (range && i > startDay && month === startMonth && year === startYear && startMonth !== endMonth) ||
              //同年跨月的结束日期面板
              (range && i < endDay && month === endMonth && year === endYear && startMonth !== endMonth) ||
              //同年情况下跨多个月的日期面板
              (range && startMonth !== endMonth && month !== startMonth && month !== endMonth && month > startMonth && month < endMonth && year === endYear && year === startYear && endYear === startYear) ||
              //非同年，所有额外年份的填充
              (range && startYear !== endYear && year > startYear && year < endYear) ||
              (range && startMonth !== endMonth && month !== startMonth && month > startMonth && endYear !== startYear && year < endYear) ||
              (range && startMonth !== endMonth && month !== endMonth && month < endMonth && endYear !== startYear && year > startYear)
          }
        ]"
        @click="choiceDay(i)"
      >
        {{ i }}
        <div v-if="i === today && month === currentMonth && year === currentYear" class="todayDot"></div>
      </div>
      <div v-for="i in nextMonth" :key="i + 'next'" class="lunaDayCellOtherMonth" @click="turnToNextMonth(i)">
        {{ i }}
        <div v-if="i === today && countNextMonthToday" class="todayDot"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DaysPanel',
  props: {
    value: {
      type: Number,
      default: 32
    },
    type: {
      type: String,
      default: 'start'
    },
    year: {
      type: Number,
      default: 0
    },
    month: {
      type: Number,
      default: 1
    },
    day: {
      type: Number,
      default: 32
    },
    range: {
      type: Boolean,
      default: false
    },
    async: {
      type: Boolean,
      default: false
    },
    endMonth: {
      type: Number,
      default: -1
    },
    endYear: {
      type: Number,
      default: -1
    },
    endDay: {
      type: Number,
      default: -1
    },
    startMonth: {
      type: Number,
      default: -1
    },
    startYear: {
      type: Number,
      default: -1
    },
    startDay: {
      type: Number,
      default: -1
    },
    today: {
      type: Number,
      default: 1
    },
    currentMonth: {
      type: Number,
      default: 1
    },
    currentYear: {
      type: Number,
      default: 1
    },
    selectTwiceProp: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      weekList: ['日', '一', '二', '三', '四', '五', '六'],
      selectedDay: 32,
      selectedMonth: -1,
      selectedYear: -1,
      selectTwice: false
    }
  },
  computed: {
    countDays() {
      const arr = []
      let day = this.getMonthDay(this.month, this.year)
      for (let i = 0; i < day; i++) {
        arr.push(i + 1)
      }
      return arr
    },
    lastMonth() {
      const arr = []
      let lastDay = 30
      if (this.month !== 1) {
        lastDay = this.getMonthDay(this.month - 1, this.year)
      } else {
        lastDay = this.getMonthDay(12, this.year - 1)
      }
      let temp = this.getWeek(this.year + '-' + this.month + '-' + 1)
      if (temp !== '7') {
        for (let i = 0; i < temp; i++) {
          arr.unshift(lastDay - i)
        }
      }
      return arr
    },
    nextMonth() {
      const arr = []
      let temp = this.getWeek(this.year + '-' + this.month + '-' + this.getMonthDay(this.month, this.year))
      if (temp !== '7') {
        for (let i = 0; i < 6 - temp; i++) {
          arr.push(1 + i)
        }
      } else {
        for (let i = 0; i < 6; i++) {
          arr.push(1 + i)
        }
      }
      return arr
    },
    countNextMonthToday() {
      if (this.month !== 12) {
        return this.month === this.currentMonth && this.year === this.currentYear
      } else {
        return this.month === 1 && this.year === this.currentYear + 1
      }
    },
    countPrevMonthToday() {
      if (this.month !== 1) {
        return this.month === this.currentMonth && this.year === this.currentYear
      } else {
        return this.month === 12 && this.year === this.currentYear - 1
      }
    }
  },
  created() {
    if (this.value && this.value !== 32) {
      this.selectedDay = this.value
      this.selectedMonth = this.month
      this.selectedYear = this.year
    }
  },
  watch: {
    value() {
      if (this.value && this.value !== 32) {
        this.selectedDay = this.value
        this.selectedMonth = this.month
        this.selectedYear = this.year
      }
    },
    selectTwiceProp() {
      this.selectTwice = this.selectTwiceProp
    }
  },
  methods: {
    choiceDay(val) {
      this.selectedMonth = this.month
      this.selectedYear = this.year
      this.selectedDay = val
      let month = this.month
      if (this.month < 10) {
        month = '0' + this.selectedMonth
      }
      let value = val
      if (val < 10) {
        value = '0' + val
      }
      if (!this.range) {
        this.$emit('input', val)
        this.$emit('onChange', this.type, this.year + '-' + month + '-' + value)
      } else if (!this.async) {
        this.$emit('onChange', this.type, this.year + '-' + month + '-' + value)
      }
    },
    turnToLastMonth(val) {
      if (this.month === 1) {
        this.selectedMonth = 12
        this.selectedYear = this.year - 1
      } else {
        this.selectedMonth = this.month - 1
        this.selectedYear = this.year
      }
      let month = this.selectedMonth
      if (this.month < 10) {
        month = '0' + this.selectedMonth
      }
      let value = val
      if (val < 10) {
        value = '0' + val
      }
      this.$emit('input', val)
      this.$emit('choiceAnotherCycle', this.type, this.selectedMonth, this.selectedYear)
      this.$emit('onChange', this.type, this.selectedYear + '-' + month + '-' + value)
    },
    turnToNextMonth(val) {
      if (this.month === 12) {
        this.selectedMonth = 1
        this.selectedYear = this.year + 1
      } else {
        this.selectedMonth = this.month + 1
        this.selectedYear = this.year
      }
      let month = this.selectedMonth
      if (this.month < 10) {
        month = '0' + this.selectedMonth
      }
      let value = val
      if (val < 10) {
        value = '0' + val
      }
      this.$emit('input', val)
      this.$emit('choiceAnotherCycle', this.type, this.selectedMonth, this.selectedYear)
      this.$emit('onChange', this.type, this.selectedYear + '-' + month + '-' + value)
    },
    getWeek(dateString) {
      let dateArray = dateString.split('-')
      let date = new Date(dateArray[0], parseInt(dateArray[1]) - 1, dateArray[2])
      return '7123456'.charAt(date.getDay())
    },
    getMonthDay(month, year) {
      if (month === 2) {
        const endResult = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
        switch (endResult) {
          case true:
            // 2月天数为29
            return 29
          case false:
            return 28
        }
      } else {
        if (month < 8) {
          if (month % 2 === 0) {
            return 30
          } else {
            return 31
          }
        } else {
          if (month % 2 === 0) {
            return 31
          } else {
            return 30
          }
        }
      }
    }
  }
}
</script>

<style scoped></style>
