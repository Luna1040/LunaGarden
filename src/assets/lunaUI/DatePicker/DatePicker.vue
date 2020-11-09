<template>
  <div v-click-outside="hidePanel" class="lunaDatePicker">
    <Input v-model="pickedDate" :width="200" icon="iconfont icon-mdatepicker" pre :theme="theme" :corner="corner" @click.native="onFocus"></Input>
    <transition name="slideDown">
      <div
        v-show="showPanel"
        class="lunaDatePickerPanel"
        :class="[
          {
            squareCorner: corner === 'square',
            smallCorner: corner === 'small',
            filletCorner: corner === 'fillet',
            largeCorner: corner === 'large',
            fullCorner: corner === 'full'
          },
          { rangeContainer: range }
        ]"
      >
        <template v-if="!range">
          <NormalDateHeader :year="panelStartYear" :month="panelStartMonth" :show-year-arrow="showStartYearSelect" :show-month-arrow="showStartMonthSelect" type="start" @cgYear="cgYear" @cgMonth="cgMonth" @prevMonth="prevMonth" @nextMonth="nextMonth" @prevYear="prevYear" @nextYear="nextYear" @prevFiveYear="prevFiveYear" @nextFiveYear="nextFiveYear"></NormalDateHeader>
          <transition name="datePickerTransFade">
            <YearsPanel v-if="showYearSelect" v-model="panelStartYear" type="start" @onChange="yearSelectChanged"></YearsPanel>
            <MonthsPanel v-else-if="showMonthSelect" v-model="panelStartMonth" type="start" @onChange="monthSelectChanged"></MonthsPanel>
            <DaysPanel v-else v-model="startDay" :year="panelStartYear" :month="panelStartMonth" type="start" :current-month="currentMonth" :current-year="currentYear" :today="today" @onChange="daySelectChanged" @choiceAnotherCycle="choiceAnotherCycle"></DaysPanel>
          </transition>
        </template>
        <template v-if="range && !async">
          <NormalDateHeader :range="range" :year="panelStartYear" :month="panelStartMonth" :show-year-arrow="showStartYearSelect" :show-month-arrow="showStartMonthSelect" type="start" @cgYear="cgYear" @cgMonth="cgMonth" @prevMonth="prevMonth" @nextMonth="nextMonth" @prevYear="prevYear" @nextYear="nextYear" @prevFiveYear="prevFiveYear" @nextFiveYear="nextFiveYear"></NormalDateHeader>
          <div class="rangeBody">
            <div class="startDate">
              <transition name="datePickerTransFade">
                <YearsPanel v-if="showStartYearSelect" v-model="panelStartYear" type="start" @onChange="yearSelectChanged"></YearsPanel>
                <MonthsPanel v-else-if="showStartMonthSelect" v-model="panelStartMonth" type="start" @onChange="monthSelectChanged"></MonthsPanel>
                <DaysPanel v-else v-model="startDay" :range="range" :year="panelStartYear" :month="panelStartMonth" type="start" :current-month="currentMonth" :current-year="currentYear" :today="today" :end-day="endDay" :end-month="endMonth" :end-year="endYear" :start-day="startDay" :start-month="startMonth" :start-year="startYear" @onChange="daySelectChanged" @choiceAnotherCycle="choiceAnotherCycle"></DaysPanel>
              </transition>
            </div>
            <div class="endDate">
              <transition name="datePickerTransFade">
                <YearsPanel v-if="showEndYearSelect" v-model="panelEndYear" type="end" @onChange="yearSelectChanged"></YearsPanel>
                <MonthsPanel v-else-if="showEndMonthSelect" v-model="panelEndMonth" type="end" @onChange="monthSelectChanged"></MonthsPanel>
                <DaysPanel v-else v-model="endDay" :range="range" :year="panelEndYear" :month="panelEndMonth" type="end" :current-month="currentMonth" :current-year="currentYear" :today="today" :end-day="endDay" :end-month="endMonth" :end-year="endYear" :start-day="startDay" :start-month="startMonth" :start-year="startYear" @onChange="daySelectChanged" @choiceAnotherCycle="choiceAnotherCycle"></DaysPanel>
              </transition>
            </div>
          </div>
        </template>
        <template v-if="range && async">
          <RangeDateHeader></RangeDateHeader>
          <div class="startDate">
            <YearsPanel v-model="startYear"></YearsPanel>
            <MonthsPanel v-model="startMonth"></MonthsPanel>
            <DaysPanel v-model="startDay"></DaysPanel>
          </div>
          <div class="enbDate">
            <YearsPanel v-model="endYear"></YearsPanel>
            <MonthsPanel v-model="endMonth"></MonthsPanel>
            <DaysPanel v-model="endDay"></DaysPanel>
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
import DaysPanel from './DatePanels/DaysPanel'
import MonthsPanel from './DatePanels/MonthsPanel'
import YearsPanel from './DatePanels/YearsPanel'
import NormalDateHeader from './DateHeader/NormalDateHeader/NormalDateHeader'
import RangeDateHeader from './DateHeader/RangeDateHeader/RangeDateHeader'
export default {
  name: 'DatePicker',
  props: {
    value: {
      type: [String, Array],
      default: ''
    },
    theme: {
      type: String,
      default: 'light'
    },
    range: {
      type: Boolean,
      default: false
    },
    async: {
      type: Boolean,
      default: false
    },
    corner: {
      type: String,
      default: 'large'
    }
  },
  data() {
    return {
      pickedDate: '',
      showPanel: false,
      showYearSelect: false,
      showMonthSelect: false,
      showStartYearSelect: false,
      showStartMonthSelect: false,
      showEndYearSelect: false,
      showEndMonthSelect: false,
      startYear: 0,
      endYear: 0,
      panelStartYear: 0,
      panelEndYear: 0,
      startMonth: 0,
      endMonth: 0,
      panelStartMonth: 0,
      panelEndMonth: 0,
      startDay: 0,
      endDay: 0,
      currentYear: 0,
      currentMonth: 0,
      today: 0,
      selectedDayType: ''
    }
  },
  components: {
    DaysPanel,
    MonthsPanel,
    YearsPanel,
    NormalDateHeader,
    RangeDateHeader
  },
  created() {
    const d = new Date()
    this.currentYear = d.getFullYear()
    this.currentMonth = d.getMonth() + 1
    this.today = d.getDate()
    if (!this.range) {
      if (this.value === '' || !this.value) {
        this.panelStartYear = d.getFullYear()
        this.panelStartMonth = d.getMonth() + 1
      } else {
        this.startYear = parseInt(this.value.split('-')[0])
        this.startMonth = parseInt(this.value.split('-')[1])
        this.startDay = parseInt(this.value.split('-')[2])
        this.panelStartYear = parseInt(this.value.split('-')[0])
        this.panelStartMonth = parseInt(this.value.split('-')[1])
      }
    } else if (this.range && !this.async) {
      if (this.value.length === 0 || !this.value) {
        this.panelStartYear = d.getFullYear()
        this.panelStartMonth = d.getMonth() + 1
        if (this.panelStartMonth !== 12) {
          this.panelEndYear = this.panelStartYear
          this.panelEndMonth = this.panelStartMonth + 1
        } else {
          this.panelEndYear = this.panelStartYear + 1
          this.panelStartMonth = 1
        }
      } else {
        let start = this.value[0]
        let end = this.value[1]
        this.startYear = parseInt(start.split('-')[0])
        this.startMonth = parseInt(start.split('-')[1])
        this.startDay = parseInt(start.split('-')[2])
        this.panelStartYear = parseInt(start.split('-')[0])
        this.panelStartMonth = parseInt(start.split('-')[1])
        if (this.panelStartMonth !== 12) {
          this.panelEndYear = this.panelStartYear
          this.panelEndMonth = this.panelStartMonth + 1
        } else {
          this.panelEndYear = this.panelStartYear + 1
          this.panelStartMonth = 1
        }
        this.endYear = parseInt(end.split('-')[0])
        this.endMonth = parseInt(end.split('-')[1])
        this.endDay = parseInt(end.split('-')[2])
      }
    } else if (this.range && this.async) {
    }
  },
  mounted() {
    if (typeof this.value === 'string') {
      this.pickedDate = this.value
    } else {
      this.pickedDate = this.value.join(',')
    }
  },
  watch: {
    value() {
      if (typeof this.value === 'string') {
        this.pickedDate = this.value
      } else {
        this.pickedDate = this.value.join(',')
      }
    }
  },
  computed: {
    countEndHeader() {
      const obj = {}
      if (this.range) {
        if (this.startMonth !== 12) {
          obj.year = this.startYear
          obj.month = this.startMonth + 1
        } else {
          obj.year = this.startYear + 1
          obj.month = 1
        }
      }
      return obj
    }
  },
  methods: {
    onFocus() {
      this.showPanel = !this.showPanel
      if (!this.showPanel) {
        this.showStartYearSelect = false
        this.showStartMonthSelect = false
      }
    },
    hidePanel() {
      this.selectedDayType = ''
      this.showPanel = false
      this.showYearSelect = false
      this.showMonthSelect = false
      this.showStartYearSelect = false
      this.showStartMonthSelect = false
      this.showEndYearSelect = false
      this.showEndMonthSelect = false
    },
    cgYear(type, value) {
      if(!this.range) {
          this.showYearSelect = true
          this.showMonthSelect = false
      } else {
        if (type === 'start') {
          this.showStartYearSelect = true
          this.showStartMonthSelect = false
        } else {
          this.showEndYearSelect = true
          this.showEndMonthSelect = false
        }
      }
    },
    cgMonth(type, value) {
      if (type === 'start') {
        this.showStartYearSelect = false
        this.showStartMonthSelect = true
      } else {
        this.showEndYearSelect = false
        this.showEndMonthSelect = true
      }
    },
    prevMonth(type, value) {
      if (!this.range) {
        if (value === 1) {
          this.panelStartMonth = 12
          this.panelStartYear = this.panelStartYear - 1
        } else {
          this.panelStartMonth = value - 1
        }
      } else if (this.range && !this.async) {
        if (value === 1) {
          this.panelStartMonth = 12
          this.panelStartYear = this.panelStartYear - 1
          this.panelEndMonth = 1
          this.panelEndYear = this.panelStartYear + 1
        } else {
          this.panelStartMonth = value - 1
          if (this.panelStartMonth !== 12) {
            this.panelEndMonth = this.panelStartMonth + 1
            this.panelEndYear = this.panelStartYear
          } else {
            this.panelEndMonth = 1
            this.panelEndYear = this.panelStartYear + 1
          }
        }
      } else if (this.range && this.async) {
        if (type === 'start') {
          if (value === 1) {
            this.panelStartMonth = 12
            this.panelStartYear = this.panelStartYear - 1
          } else {
            this.panelStartMonth = value - 1
          }
        } else {
          if (value === 1) {
            this.panelEndMonth = 12
            this.panelEndYear = this.panelEndYear - 1
          } else {
            this.panelEndMonth = value - 1
          }
        }
      }
    },
    nextMonth(type, value) {
      if (!this.range) {
        if (value === 12) {
          this.panelStartMonth = 1
          this.panelStartYear = this.panelStartYear + 1
        } else {
          this.panelStartMonth = value + 1
        }
      } else if (this.range && !this.async) {
        if (value === 12) {
          this.panelStartMonth = 1
          this.panelStartYear = this.panelStartYear + 1
          this.panelEndMonth = 2
          this.panelEndYear = this.panelStartYear + 1
        } else {
          this.panelStartMonth = value + 1
          if (this.panelStartMonth !== 12) {
            this.panelEndMonth = this.panelStartMonth + 1
            this.panelEndYear = this.panelStartYear
          } else {
            this.panelEndMonth = 1
            this.panelEndYear = this.panelStartYear + 1
          }
        }
      } else if (this.range && this.async) {
        if (type === 'start') {
          if (value === 1) {
            this.panelStartMonth = 12
            this.panelStartYear = this.panelStartYear - 1
          } else {
            this.panelStartMonth = value - 1
          }
        } else {
          if (value === 1) {
            this.panelEndMonth = 12
            this.panelEndYear = this.panelEndYear - 1
          } else {
            this.panelEndMonth = value - 1
          }
        }
      }
    },
    prevYear(type, value) {
      if(!this.range) {
        this.panelStartYear = this.panelStartYear - 1
      } else {
        if(!this.async) {
          this.panelStartYear = this.panelStartYear - 1
          this.panelEndYear = this.panelEndYear - 1
        }
      }
    },
    nextYear(type, value) {
      if(!this.range) {
        this.panelStartYear = this.panelStartYear + 1
      } else {
        if(!this.async) {
          this.panelStartYear = this.panelStartYear + 1
          this.panelEndYear = this.panelEndYear + 1
        }
      }
    },
    prevFiveYear(type, value) {
      if (type === 'start') {
        this.panelStartYear = value - 5
      } else {
        this.panelEndYear = value - 5
      }
    },
    nextFiveYear(type, value) {
      if (type === 'start') {
        this.panelStartYear = value + 5
      } else {
        this.panelEndYear = value + 5
      }
    },
    choiceAnotherCycle(type, month, year) {
      if (type === 'start') {
        this.panelStartMonth = month
        this.startMonth = month
        this.panelStartYear = year
        this.startYear = year
      } else {
        this.panelEndMonth = month
        this.endMonth = month
        this.panelEndYear = year
        this.endYear = year
      }
    },
    yearSelectChanged(type, value) {
      if (this.range && this.async) {
        if (type === 'start') {
          this.showStartYearSelect = false
          this.showStartMonthSelect = true
        } else {
          this.panelStartYear = value
          this.showEndYearSelect = false
          this.showEndMonthSelect = true
        }
      } else {
        this.showYearSelect = false
        this.showMonthSelect = false
      }
    },
    monthSelectChanged(type, value) {
      if (type === 'start') {
        this.showStartMonthSelect = false
        if(this.panelStartMonth !== 12) {
          this.panelEndMonth = this.panelStartMonth + 1
          
        } else {
          this.panelEndMonth = 1
          this.panelEndYear = this.panelEndYear + 1
        }
      } else {
        if (value === 1) {
          this.panelStartYear--
          this.panelStartMonth = 12
        } else {
          this.panelStartMonth = value - 1
        }
        this.showEndMonthSelect = false
      }
    },
    daySelectChanged(type, value, twice) {
      if (!this.range) {
        this.pickedDate = value
        this.$emit('input', value)
        this.showPanel = false
      } else {
        if (this.async) {
        } else {
          let temp = this.pickedDate.split(',')
          if (this.selectedDayType === '') {
            this.selectedDayType = type
            temp[0] = value
            this.pickedDate = temp.join(',')
            let arr = value.split('-')
            this.startYear = parseInt(arr[0])
            this.startMonth = parseInt(arr[1])
            this.startDay = parseInt(arr[2])
          } else {
            if (type === this.selectedDayType) {
              temp[1] = value
              this.pickedDate = temp.join(',')
              let arr = value.split('-')
              this.endYear = parseInt(arr[0])
              this.endMonth = parseInt(arr[1])
              this.endDay = parseInt(arr[2])
            } else {
              if (type === 'start') {
                this.selectedDayType = type
                temp[0] = value
                this.pickedDate = temp.join(',')
                let arr = value.split('-')
                this.startYear = parseInt(arr[0])
                this.startMonth = parseInt(arr[1])
                this.startDay = parseInt(arr[2])
              } else {
                temp[1] = value
                this.pickedDate = temp.join(',')
                let arr = value.split('-')
                this.endYear = parseInt(arr[0])
                this.endMonth = parseInt(arr[1])
                this.endDay = parseInt(arr[2])
              }
            }
            this.selectedDayType = ''
            this.showPanel = false
          }
          this.$emit('input', temp)
        }
      }
    }
  }
}
</script>

<style scoped></style>
