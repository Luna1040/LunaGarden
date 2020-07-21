<template>
  <div class="reportCenter">
    <ul>
      <li v-for="(i, index) in menus" :key="index" :class="{ active: choiceView === i }" @click="changeView(i)">{{ $t('lang.report')[i] }}</li>
    </ul>
    <transition name="slideDown">
      <DailyReport v-if="choiceView === 'dailyReport'" :lang="lang.daily" :user-info="userInfo"></DailyReport>
      <WeekReport v-else-if="choiceView === 'weekReport'" :lang="lang.week" :user-info="userInfo"></WeekReport>
      <MonthReport v-else-if="choiceView === 'monthReport'" :lang="lang.month" :user-info="userInfo"></MonthReport>
      <SeasonReport v-else-if="choiceView === 'seasonReport'" :lang="lang.season" :user-info="userInfo"></SeasonReport>
      <HalfYearReport v-else-if="choiceView === 'halfYearReport'" :lang="lang.halfYear" :user-info="userInfo"></HalfYearReport>
      <YearReport v-else :lang="lang.year"></YearReport>
    </transition>
  </div>
</template>

<script>
import DailyReport from './DailyReport'
import WeekReport from './WeekReport'
import MonthReport from './MonthReport'
import SeasonReport from './SeasonReport'
import HalfYearReport from './HalfYearReport'
import YearReport from './YearReport'
export default {
  name: 'Report',
  data() {
    return {
      menus: ['dailyReport', 'weekReport', 'monthReport', 'seasonReport', 'halfYearReport', 'yearReport'],
      choiceView: 'dailyReport',
      lang: {},
      userInfo: {},
      contractForm: {
        file: [],
        cost: [
          { before_area: null, pay_type: 0, cost_type: 1, cost: '200', cost_unit: 0, begin_date: '2020-07-12', end_date: '2020-10-11', room_position_arr: [], seat_position_arr: [{ id: 2171, name: '测试工位1', status: 0, status_choice: '未租', seat_room: '101', floor: '1', building: 'ds测试1栋' }], room_position: [], seat_position: [2171] },
          { before_area: null, pay_type: 0, cost_type: 0, cost: '100', begin_date: '2020-07-12', cost_unit: 0, end_date: '2020-10-11', room_position_arr: [], seat_position_arr: [{ id: 2171, name: '测试工位1', status: 0, status_choice: '未租', seat_room: '101', floor: '1', building: 'ds测试1栋' }], room_position: [], seat_position: [2171] }
        ],
        arr: [
          { charging_subject: 2, start_date: '2020-07-01', end_date: '2020-07-31', receivable_amount: '200', receivable_amounts: '200', customer_settled_id: 150, remark: '200元' },
          { charging_subject: 1, start_date: '2020-07-01', end_date: '2020-07-31', receivable_amount: '100.00', receivable_amounts: '100.00', customer_settled_id: 150, remark: '100元' },
          { charging_subject: 0, start_date: '2020-07-01', end_date: '2020-07-31', receivable_amount: 300, receivable_amounts: 300, customer_settled_id: 150, remark: '(单价：100) × (月数：3) ' }
        ],
        park: 14,
        customer_settled: 150,
        contract_no: 'HT20200721002',
        operator: 4,
        end_date: '2020-07-31',
        begin_date: '2020-07-01',
        deposit_period: 3,
        payment_period: 3,
        rentTable: [{ before_area: null, pay_type: 0, cost_type: 0, cost: '100', begin_date: '2020-07-01', cost_unit: 0, end_date: '2020-07-31', room_position_arr: [], seat_position_arr: [{ id: 2171, name: '测试工位1', status: 0, status_choice: '未租', seat_room: '101', floor: '1', building: 'ds测试1栋' }], room_position: [], seat_position: [2171] }],
        property: [{ before_area: null, pay_type: 0, cost_type: 1, cost: '200', cost_unit: 0, begin_date: '2020-07-01', end_date: '2020-07-31', room_position_arr: [], seat_position_arr: [{ id: 2171, name: '测试工位1', status: 0, status_choice: '未租', seat_room: '101', floor: '1', building: 'ds测试1栋' }], room_position: [], seat_position: [2171] }],
        room_position: [],
        unit: '元'
      },
      contractParameter: { form: { is_method: 0, date_unit: 0, stage_method: 1, decimal_number: 2, date_number: 3, deadline_number: 10 } }
    }
  },
  components: {
    DailyReport,
    WeekReport,
    MonthReport,
    SeasonReport,
    HalfYearReport,
    YearReport
  },
  // created() {
  //   this.lang = this.t
  //   this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  // },
  watch: {
    t() {
      this.lang = this.t
    }
  },
  computed: {
    t() {
      return this.$t('lang.report')
    }
  },
  // methods: {
  //   changeView(url) {
  //     this.choiceView = url
  //   }
  // },
  created() {
    // console.log('contractForm',this.contractForm.arr[0].receivable_amount)
    // this.getData()
    // 返回用arr
    this.contractForm.arr = []
    // 首先判断是自然月还是合同月， 之后遍历传入的data
    if (!this.contractParameter.form || !this.contractParameter.form.stage_method) {
      // 合同月
      this.contractForm.cost.forEach((item, index) => {
        // push进入arr用
        const obj = {
          charging_subject: 0,
          start_date: item.begin_date,
          end_date: item.end_date,
          receivable_amount: 0,
          receivable_amounts: 0,
          customer_settled_id: this.contractForm.customer_settled,
          remark: ''
        }
        // 开始年份的月份天数
        const beginMonths = [
          {
            key: 1,
            value: 31
          },
          {
            key: 2,
            value: 28
          },
          {
            key: 3,
            value: 31
          },
          {
            key: 4,
            value: 30
          },
          {
            key: 5,
            value: 31
          },
          {
            key: 6,
            value: 30
          },
          {
            key: 7,
            value: 31
          },
          {
            key: 8,
            value: 31
          },
          {
            key: 9,
            value: 30
          },
          {
            key: 10,
            value: 31
          },
          {
            key: 11,
            value: 30
          },
          {
            key: 12,
            value: 31
          }
        ]
        // 结束年份的月份天数
        const endMonths = [
          {
            key: 1,
            value: 31
          },
          {
            key: 2,
            value: 28
          },
          {
            key: 3,
            value: 31
          },
          {
            key: 4,
            value: 30
          },
          {
            key: 5,
            value: 31
          },
          {
            key: 6,
            value: 30
          },
          {
            key: 7,
            value: 31
          },
          {
            key: 8,
            value: 31
          },
          {
            key: 9,
            value: 30
          },
          {
            key: 10,
            value: 31
          },
          {
            key: 11,
            value: 30
          },
          {
            key: 12,
            value: 31
          }
        ]
        let size = 0
        if (item.after_area || item.before_area) {
          size = item.after_area ? item.after_area : item.before_area
        }
        // 开始日期
        const beginDate = {
          year: (item.start_date || '').split('-')[0],
          month: (item.start_date || '').split('-')[1],
          day: (item.start_date || '').split('-')[2]
        }
        // 结束日期
        const endDate = {
          year: (item.end_date || '').split('-')[0],
          month: (item.end_date || '').split('-')[1],
          day: (item.end_date || '').split('-')[2]
        }

        // 相差的具体天数
        // const diffDays = (Date.parse(item.start_date) - Date.parse(item.end_date)) / 1000 / 60 / 60 / 24 + 1
        // 判断开始年份是否为闰年
        const beginResult = (beginDate.year % 4 === 0 && beginDate.year % 100 !== 0) || beginDate.year % 400 === 0
        switch (beginResult) {
          case true:
            // 开始年份的2月value值修改为29
            beginMonths[1].value = 29
        }
        // 判断结束年份是否为闰年
        const endResult = (endDate.year % 4 === 0 && endDate.year % 100 !== 0) || endDate.year % 400 === 0
        switch (endResult) {
          case true:
            // 结束年份的2月value值修改为29
            endMonths[1].value = 29
        }
        // 月份数量差异
        const diffMonth = this.getMonthDayDiff(item.begin_date, item.end_date)
        //
        // 时间差异类型
        //
        let timeline = 0
        if (diffMonth[0] < 1) {
          //
          // 不满一个周期N，且不满一个月
          //
          timeline = 0
        } else if (diffMonth[0] < this.contractForm.payment_period && diffMonth[1] === 0) {
          //
          // 不满一个周期N，但是满整数月
          //
          timeline = 1
        } else if (diffMonth[0] < this.contractForm.payment_period && diffMonth[0] > 0 && diffMonth[1] > 0) {
          //
          // 不满一个周期，但满整数月，且余出不满一个月
          //
          timeline = 2
        } else if (parseInt(diffMonth[0] / this.contractForm.payment_period) > 0 && diffMonth[0] % this.contractForm.payment_period === 0 && diffMonth[1] === 0) {
          //
          // 刚好满一个周期或多个周期
          //
          timeline = 3
        } else if (parseInt(diffMonth[0] / this.contractForm.payment_period) > 0 && diffMonth[0] % this.contractForm.payment_period < 1 && diffMonth[1] > 0) {
          //
          // 满一个周期或多个周期，且余出不满一个月
          //
          timeline = 4
        } else if (parseInt(diffMonth[0] / this.contractForm.payment_period) > 0 && diffMonth[0] % this.contractForm.payment_period > 0 && diffMonth[1] === 0) {
          //
          // 满一个周期或多个周期,且余出不满一个周期，但是满整数月
          //
          timeline = 5
        } else if (parseInt(diffMonth[0] / this.contractForm.payment_period) > 0 && diffMonth[0] % this.contractForm.payment_period > 0 && diffMonth[1] > 0) {
          //
          // 满一个周期或多个周期,且余出不满一个周期，也不满整数月，而是整数月多几天
          //
          timeline = 6
        }
        //
        // 计费方式
        //
        if (item.cost_type === 0) {
          //
          // 租金
          //
          if (item.pay_type === 1) {
            // 免租期
            obj.receivable_amount = Number(0).toFixed(2)
            obj.receivable_amounts = Number(0).toFixed(2)
            obj.remark = '免租'
            this.contractForm.arr.push(obj)
          } else {
            // 预付期
            // switch (this.contractForm.unit) {
            switch (item.cost_unit) {
              case 0:
                obj.receivable_amount = Number(item.cost).toFixed(2)
                obj.receivable_amounts = Number(item.cost).toFixed(2)
                obj.remark = item.cost + '元'
                this.contractForm.arr.push(obj)
                break

              case 1:
                this.payByDay(timeline, item.cost, item.begin_date, item.end_date).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 1))
                })
                break

              case 2:
                this.payByMonth(timeline, item.cost, item.begin_date, item.end_date).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 1))
                })
                break

              case 3:
                this.payBySeason(timeline, item.cost, item.begin_date, item.end_date).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 1))
                })
                break

              case 4:
                this.paySizeByDay(timeline, item.cost, item.begin_date, item.end_date, size).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 1))
                })
                break

              case 5:
                this.paySizeByMonth(timeline, item.cost, item.begin_date, item.end_date, size).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 1))
                })
                break

              case 6:
                this.paySizeBySeason(timeline, item.cost, item.begin_date, item.end_date, size).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 1))
                })
                break
            }
          }
          obj.charging_subject = 1
          //
          // 有押金的话，额外补充此条
          //
          if (this.contractForm.deposit_period) {
            let receivable_amount = item.cost * this.contractForm.deposit_period
            let remark = '(单价：' + item.cost + ') ' + '× (月数：' + this.contractForm.deposit_period + ') '
            if (item.cost_unit === 4 || item.cost_unit === 5 || item.cost_unit === 6) {
              receivable_amount = item.cost * this.contractForm.deposit_period * size
              remark = '(单价：' + item.cost + ') ' + '× (月数：' + this.contractForm.deposit_period + ') ' + '× (面积：' + size + ')'
            }
            this.contractForm.arr.push({
              charging_subject: 0,
              start_date: item.begin_date,
              end_date: item.end_date,
              receivable_amount: receivable_amount,
              receivable_amounts: receivable_amount,
              customer_settled_id: this.contractForm.customer_settled,
              remark: remark
            })
          }
        } else if (item.cost_type === 1) {
          //
          // 物业费
          //
          if (item.pay_type === 1) {
            // 免租期
            obj.receivable_amount = 0
            obj.receivable_amounts = 0
            obj.remark = '免租'
            this.contractForm.arr.push(obj)
          } else {
            // 预付期
            switch (item.cost_unit) {
              case 0:
                obj.receivable_amount = item.cost
                obj.receivable_amounts = item.cost
                obj.remark = item.cost + '元'
                this.contractForm.arr.push(obj)
                break

              case 1:
                this.payByDay(timeline, item.cost, item.begin_date, item.end_date).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 2))
                })
                break

              case 2:
                this.payByMonth(timeline, item.cost, item.begin_date, item.end_date).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 2))
                })
                break

              case 3:
                this.payBySeason(timeline, item.cost, item.begin_date, item.end_date).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 2))
                })
                break

              case 4:
                this.paySizeByDay(timeline, item.cost, item.begin_date, item.end_date, size).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 2))
                })
                break

              case 5:
                this.paySizeByMonth(timeline, item.cost, item.begin_date, item.end_date, size).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 2))
                })
                break

              case 6:
                this.paySizeBySeason(timeline, item.cost, item.begin_date, item.end_date, size).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 2))
                })
                break
            }
          }
          obj.charging_subject = 2
        }
      })
    } else {
      // 自然月
      this.contractForm.cost.forEach((item, index) => {
        // push进入arr用
        const obj = {
          charging_subject: 0,
          start_date: item.begin_date,
          end_date: item.end_date,
          receivable_amount: 0,
          receivable_amounts: 0,
          customer_settled_id: this.contractForm.customer_settled,
          remark: ''
        }
        // 开始年份的月份天数
        const beginMonths = [
          {
            key: 1,
            value: 31
          },
          {
            key: 2,
            value: 28
          },
          {
            key: 3,
            value: 31
          },
          {
            key: 4,
            value: 30
          },
          {
            key: 5,
            value: 31
          },
          {
            key: 6,
            value: 30
          },
          {
            key: 7,
            value: 31
          },
          {
            key: 8,
            value: 31
          },
          {
            key: 9,
            value: 30
          },
          {
            key: 10,
            value: 31
          },
          {
            key: 11,
            value: 30
          },
          {
            key: 12,
            value: 31
          }
        ]
        // 结束年份的月份天数
        const endMonths = [
          {
            key: 1,
            value: 31
          },
          {
            key: 2,
            value: 28
          },
          {
            key: 3,
            value: 31
          },
          {
            key: 4,
            value: 30
          },
          {
            key: 5,
            value: 31
          },
          {
            key: 6,
            value: 30
          },
          {
            key: 7,
            value: 31
          },
          {
            key: 8,
            value: 31
          },
          {
            key: 9,
            value: 30
          },
          {
            key: 10,
            value: 31
          },
          {
            key: 11,
            value: 30
          },
          {
            key: 12,
            value: 31
          }
        ]
        let size = 0
        if (item.after_area || item.before_area) {
          size = item.after_area ? item.after_area : item.before_area
        }
        // 开始日期
        const beginDate = {
          year: (item.begin_date || '').split('-')[0],
          month: (item.begin_date || '').split('-')[1],
          day: (item.begin_date || '').split('-')[2]
        }
        // 结束日期
        const endDate = {
          year: (item.end_date || '').split('-')[0],
          month: (item.end_date || '').split('-')[1],
          day: (item.end_date || '').split('-')[2]
        }

        // 相差的具体天数
        // const diffDays = (Date.parse(item.start_date) - Date.parse(item.end_date)) / 1000 / 60 / 60 / 24 + 1
        // 判断开始年份是否为闰年
        const beginResult = (beginDate.year % 4 === 0 && beginDate.year % 100 !== 0) || beginDate.year % 400 === 0
        switch (beginResult) {
          case true:
            // 开始年份的2月value值修改为29
            beginMonths[1].value = 29
        }
        // 判断结束年份是否为闰年
        const endResult = (endDate.year % 4 === 0 && endDate.year % 100 !== 0) || endDate.year % 400 === 0
        switch (endResult) {
          case true:
            // 结束年份的2月value值修改为29
            endMonths[1].value = 29
        }
        // 月份数量差异
        const diffMonth = this.getNatureMonthDayDiff(item.begin_date, item.end_date, beginMonths[beginDate.month - 1].value, endMonths[endDate.month - 1].value)
        //
        // 时间差异类型
        //
        const timeline = 0

        // 首先判断是否为1号起始，否则均视为非满月情况
        console.log(beginDate.day)
        if (parseInt(beginDate.day) !== 1) {
          console.log('非1号起始')
          if (diffMonth[0] < 1) {
            //
            // 不满一个周期N，且不满一个月
            //
            //sss
            console.log('不满整周期且不满一月')
          } else if (diffMonth[0] < this.contractForm.payment_period && diffMonth[0] >= 1) {
            console.log('前后均不满整周期且不满一月，但有不满周期且满月情况')
          } else if (diffMonth[0] < this.contractForm.payment_period && diffMonth[0] >= 1 && endDate.day === endMonths[endDate.month - 1].value) {
            console.log('不满整周期但满整月且余出N天')
          } else if (diffMonth[0] % this.contractForm.payment_period) {
            console.log('满整周期且余出N天')
          } else if (diffMonth[0] % this.contractForm.payment_period < 1 && diffMonth[0] / this.contractForm.payment_period > 0) {
            console.log('满整周期且余出N天')
          } else if (diffMonth[0] % this.contractForm.payment_period > 0 && diffMonth[0] / this.contractForm.payment_period > 0) {
            console.log('满整周期且是整数月多N天')
          }
          // 非1号起始
        } else {
          console.log('1号起始')
          // 1号起始
          if (diffMonth[0] < 1) {
            console.log('不满一月')
          } else if (diffMonth[0] < this.contractForm.payment_period && diffMonth[1] === 0) {
            // 小于一月且
            console.log('不满一个周期的整月')
          }
        }

        //
        // 计费方式
        //
        if (item.cost_type === 0) {
          //
          // 租金
          //
          if (item.pay_type === 1) {
            // 免租期
            obj.receivable_amount = Number(0).toFixed(2)
            obj.receivable_amounts = Number(0).toFixed(2)
            obj.remark = '免租'
            this.contractForm.arr.push(obj)
          } else {
            // 预付期
            // switch (this.contractForm.unit) {
            switch (item.cost_unit) {
              case 0:
                obj.receivable_amount = Number(item.cost).toFixed(2)
                obj.receivable_amounts = Number(item.cost).toFixed(2)
                obj.remark = item.cost + '元'
                this.contractForm.arr.push(obj)
                break

              case 1:
                this.payByDay(timeline, item.cost, item.begin_date, item.end_date).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 1))
                })
                break

              case 2:
                this.payByMonth(timeline, item.cost, item.begin_date, item.end_date).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 1))
                })
                break

              case 3:
                this.payBySeason(timeline, item.cost, item.begin_date, item.end_date).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 1))
                })
                break

              case 4:
                this.paySizeByDay(timeline, item.cost, item.begin_date, item.end_date, size).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 1))
                })
                break

              case 5:
                this.paySizeByMonth(timeline, item.cost, item.begin_date, item.end_date, size).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 1))
                })
                break

              case 6:
                this.paySizeBySeason(timeline, item.cost, item.begin_date, item.end_date, size).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 1))
                })
                break
            }
          }
          obj.charging_subject = 1
          //
          // 有押金的话，额外补充此条
          //
          if (this.contractForm.deposit_period) {
            let receivable_amount = item.cost * this.contractForm.deposit_period
            let remark = '(单价：' + item.cost + ') ' + '× (月数：' + this.contractForm.deposit_period + ') '
            if (item.cost_unit === 4 || item.cost_unit === 5 || item.cost_unit === 6) {
              receivable_amount = item.cost * this.contractForm.deposit_period * size
              remark = '(单价：' + item.cost + ') ' + '× (月数：' + this.contractForm.deposit_period + ') ' + '× (面积：' + size + ')'
            }
            this.contractForm.arr.push({
              charging_subject: 0,
              start_date: item.begin_date,
              end_date: item.end_date,
              receivable_amount: receivable_amount,
              receivable_amounts: receivable_amount,
              customer_settled_id: this.contractForm.customer_settled,
              remark: remark
            })
          }
        } else if (item.cost_type === 1) {
          //
          // 物业费
          //
          if (item.pay_type === 1) {
            // 免租期
            obj.receivable_amount = 0
            obj.receivable_amounts = 0
            obj.remark = '免租'
            this.contractForm.arr.push(obj)
          } else {
            // 预付期
            switch (item.cost_unit) {
              case 0:
                obj.receivable_amount = item.cost
                obj.receivable_amounts = item.cost
                obj.remark = item.cost + '元'
                this.contractForm.arr.push(obj)
                break

              case 1:
                this.payByDay(timeline, item.cost, item.begin_date, item.end_date).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 2))
                })
                break

              case 2:
                this.payByMonth(timeline, item.cost, item.begin_date, item.end_date).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 2))
                })
                break

              case 3:
                this.payBySeason(timeline, item.cost, item.begin_date, item.end_date).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 2))
                })
                break

              case 4:
                this.paySizeByDay(timeline, item.cost, item.begin_date, item.end_date, size).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 2))
                })
                break

              case 5:
                this.paySizeByMonth(timeline, item.cost, item.begin_date, item.end_date, size).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 2))
                })
                break

              case 6:
                this.paySizeBySeason(timeline, item.cost, item.begin_date, item.end_date, size).forEach(item => {
                  this.contractForm.arr.push(this.stashInf(item, 2))
                })
                break
            }
          }
          obj.charging_subject = 2
        }
      })
    }
  },
  methods: {
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      const contractParameter = this.contractParameter.form ? this.contractParameter.form : this.contractParameter
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          // sums[index] = Number(sums[index]).toFixed(this.contractParameter.decimal_number || this.contractParameter.form.decimal_number)
          sums[index] = contractParameter.is_method === 1 ? this.getToFloor(sums[index], contractParameter.decimal_number) : Number(sums[index]).toFixed(contractParameter.decimal_number)
        } else {
          sums[index] = ''
        }
      })
      return sums
    },
    // 【元/天】的时间计算方式
    payByDay(timeLineType, amt, begin, end) {
      const arr = []
      // arr内参数
      let obj = {
        amt: 0,
        remark: '',
        tempBegin: '',
        tempEnd: ''
      }
      let tempBegin = begin
      let cycleTime = 0
      const M = this.getMonthDayDiff(begin, end)[0]
      const n = this.contractForm.payment_period
      const counts = parseInt(M / n)
      const moveM = M % this.contractForm.payment_period
      const day = this.DateDiff(begin, end)
      const getComDate = this.getNewDate(begin, M)
      const surplus_day = this.DateDiff(getComDate, end)
      switch (timeLineType) {
        // 不满一个周期N且不满一个月
        case 0:
          obj.amt = amt * day
          obj.remark = '(单价：' + amt + ') ' + '× (天数：' + day + ')'
          obj.tempBegin = begin
          obj.tempEnd = end
          arr.push(obj)
          break

        // 不满一个周期N，但是满整数月
        case 1:
          obj.amt = amt * ((365 / 12) * day)
          obj.remark = '(单价：' + amt + ' × ' + '((365 ÷ 12)' + ' × ' + day + ')) '
          obj.tempBegin = begin
          obj.tempEnd = end
          arr.push(obj)
          break

        // 不满一个周期N，但是满整数月，且余出不满一个月
        case 2:
          obj.amt = amt * ((365 / 12) * M) + amt * surplus_day
          obj.remark = '(单价：' + amt + ' × ' + '((365 ÷ 12)' + ' × ' + M + ')) ' + '+ (单价：' + amt + ') ' + '× (天数：' + surplus_day + ')'
          obj.tempBegin = begin
          obj.tempEnd = end
          arr.push(obj)
          break

        // 刚好一个周期N或多个周期N
        case 3:
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            obj.amt = amt * ((365 / 12) * n)
            obj.remark = '(单价：' + amt + ' × ' + '((365 ÷ 12)' + ' × ' + n + ')) '
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            if (cycleTime + 1 !== counts) {
              obj.tempEnd = this.fullCycleEndTimeSplit(obj.tempBegin.split('-'), end.split('-'), n, counts, cycleTime).join('-')
            } else {
              obj.tempEnd = end
            }
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          break

        // 满一个周期N或多个周期N且余出不满一个月
        case 4:
          // 合同月
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            obj.amt = amt * ((365 / 12) * n)
            obj.remark = '(单价：' + amt + ' × ' + '((365 ÷ 12)' + ' × ' + n + ')) '
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            obj.tempEnd = this.fullCycleEndTimeWithOverflowDays(obj.tempBegin.split('-'), n, counts, cycleTime).join('-')
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          arr.push({
            amt: amt * surplus_day,
            remark: '(单价：' + amt + ') ' + '× (天数：' + surplus_day + ')',
            tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
            tempEnd: end
          })
          break

        // 满一个周期N或多个周期N且余出不满一个周期N，但是满整数月
        case 5:
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            obj.amt = amt * ((365 / 12) * n)
            obj.remark = '(单价：' + amt + ' × ' + '((365 ÷ 12)' + ' × ' + n + ')) '
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            obj.tempEnd = this.fullCycleEndTimeWithOverflowDays(obj.tempBegin.split('-'), n, counts, cycleTime).join('-')
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          arr.push({
            amt: amt * ((365 / 12) * moveM),
            remark: '(单价：' + amt + ' × ' + '((365 ÷ 12)' + ' × ' + moveM + '))',
            tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
            tempEnd: end
          })
          break

        // 满一个周期N或多个周期N且余出不满一个周期N，也不满整数月，而是整数月多几天
        case 6:
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            obj.amt = amt * ((365 / 12) * n)
            obj.remark = '(单价：' + amt + ' × ' + '((365 ÷ 12)' + ' × ' + n + ')) '
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            obj.tempEnd = this.fullCycleEndTimeWithOverflowDays(obj.tempBegin.split('-'), n, counts, cycleTime).join('-')
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          arr.push({
            amt: amt * ((365 / 12) * moveM) + amt * surplus_day,
            remark: '(单价：' + amt + ' × ' + '((365 ÷ 12)' + ' × ' + moveM + '))' + ' + (单价：' + amt + ') ' + '× (天数：' + surplus_day + ')',
            tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
            tempEnd: end
          })
          // // 整数月
          // arr.push({
          //   amt: amt * ((365 / 12) * moveM),
          //   remark: '(单价：' + amt + ' × ' + '((365 ÷ 12)' + ' × ' + moveM + '))',
          //   tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
          //   tempEnd: this.fullCycleBeginTimeWithOverflowMonths(begin.split('-'), arr[arr.length - 1].tempEnd.split('-'), moveM).join('-')
          // })
          // // 整数月外多出的天数
          // arr.push({
          //   amt: amt * this.DateDiff(getComDate, end),
          //   remark: '(单价：' + amt + ') ' + '× (天数：' + this.DateDiff(getComDate, end) + ')',
          //   tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
          //   tempEnd: end
          // })
          break
      }
      return arr
    },

    // 【元/月】的时间计算方式
    payByMonth(timeLineType, amt, begin, end) {
      const arr = []
      // arr内参数
      let obj = {
        amt: 0,
        remark: '',
        tempBegin: '',
        tempEnd: ''
      }
      let tempBegin = begin
      let cycleTime = 0
      const M = this.getMonthDayDiff(begin, end)[0]
      const n = this.contractForm.payment_period
      const counts = parseInt(M / n)
      const moveM = M % this.contractForm.payment_period
      const day = this.DateDiff(begin, end)
      const getComDate = this.getNewDate(begin, M)
      const surplus_day = this.DateDiff(getComDate, end)
      const monthDay = this.getActDay(begin.split('-'))
      switch (timeLineType) {
        // 不满一个周期N且不满一个月
        case 0:
          if (begin.split('-')[1] === end.split('-')[1]) {
            obj.amt = (amt / monthDay) * day
            obj.remark = '（单价：' + amt + '÷' + monthDay + '）' + ' × （天数：' + day + '）'
          } else {
            obj.amt = (amt / (365 / 12)) * day
            obj.remark = '（单价：' + amt + ' ÷ ' + '（365 ÷ 12）' + '）' + ' × （天数：' + day + '）'
          }
          obj.tempBegin = begin
          obj.tempEnd = end
          arr.push(obj)
          break

        // 不满一个周期N，但是满整数月
        case 1:
          obj.amt = amt * moveM
          obj.remark = '（单价：' + amt + '× （月数：' + moveM + '））'
          obj.tempBegin = begin
          obj.tempEnd = end
          arr.push(obj)
          break

        // 不满一个周期N，但是满整数月，且余出不满一个月
        case 2:
          if (getComDate[1] === end.split('-')[1]) {
            obj.amt = amt * M + (amt / monthDay) * surplus_day
            obj.remark = '（单价：' + amt + '）' + '× （月数：' + M + '）' + ' + （单价：' + amt + ' ÷ ' + monthDay + '）' + '× （天数：' + surplus_day + '）'
          } else {
            obj.amt = amt * M + (amt / (365 / 12)) * surplus_day
            obj.remark = '（单价：' + amt + '）' + '× （月数：' + M + '）' + ' + （单价：' + amt + ' ÷ ' + '365 ÷ 12' + '）' + '× （天数：' + surplus_day + '）'
          }
          obj.tempBegin = begin
          obj.tempEnd = end
          arr.push(obj)
          break

        // 刚好一个周期N或多个周期N
        case 3:
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            obj.amt = amt * n
            obj.remark = '（单价：' + amt + ' × ' + n + '）'
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            if (cycleTime + 1 !== counts) {
              obj.tempEnd = this.fullCycleEndTimeSplit(obj.tempBegin.split('-'), end.split('-'), n, counts, cycleTime).join('-')
            } else {
              obj.tempEnd = end
            }
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          break

        // 满一个周期N或多个周期N且余出不满一个月
        case 4:
          // 合同月
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            obj.amt = amt * n
            obj.remark = '（单价：' + amt + ' × ' + n + '）'
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            obj.tempEnd = this.fullCycleEndTimeWithOverflowDays(obj.tempBegin.split('-'), n, counts, cycleTime).join('-')
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          if (arr[arr.length - 1].tempEnd.split('-')[1] === end.split('-')[1]) {
            arr.push({
              amt: (amt / monthDay) * surplus_day,
              remark: '（单价：' + amt + '÷' + monthDay + '）' + '× （天数：' + surplus_day + '）',
              tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
              tempEnd: end
            })
          } else {
            arr.push({
              amt: (amt / (365 / 12)) * surplus_day,
              remark: '（单价：' + amt + '÷ （365 ÷ 12）' + '）' + '× （天数：' + surplus_day + '）',
              tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
              tempEnd: end
            })
          }
          break

        // 满一个周期N或多个周期N且余出不满一个周期N，但是满整数月
        case 5:
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            obj.amt = amt * n
            obj.remark = '(单价：' + amt + ' × ' + n + ')) '
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            obj.tempEnd = this.fullCycleEndTimeWithOverflowDays(obj.tempBegin.split('-'), n, counts, cycleTime).join('-')
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          arr.push({
            amt: amt * moveM,
            remark: '(单价：' + amt + ' × ' + moveM + ')',
            tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
            tempEnd: end
          })
          break

        // 满一个周期N或多个周期N且余出不满一个周期N，也不满整数月，而是整数月多几天
        case 6:
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            obj.amt = amt * n
            obj.remark = '(单价：' + amt + ' × ' + n + ')) '
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            obj.tempEnd = this.fullCycleEndTimeWithOverflowDays(obj.tempBegin.split('-'), n, counts, cycleTime).join('-')
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          if (getComDate.split('-')[1] === end.split('-')[1]) {
            arr.push({
              amt: amt * moveM + (amt / monthDay) * surplus_day,
              remark: '(单价：' + amt + ' × ' + moveM + '）' + '+（单价：' + amt + '÷' + monthDay + '）' + '× （天数：' + surplus_day + '）',
              tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
              tempEnd: end
            })
          } else {
            arr.push({
              amt: amt * moveM + (amt / (365 / 12)) * surplus_day,
              remark: '(单价：' + amt + ' × ' + moveM + '）' + '+（单价：' + amt + '÷ （365 ÷ 12）' + '）' + '× （天数：' + surplus_day + '）',
              tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
              tempEnd: end
            })
          }
          break
      }
      return arr
    },

    // 【元/季度】的时间计算方式
    payBySeason(timeLineType, amt, begin, end) {
      const arr = []
      // arr内参数
      let obj = {
        amt: 0,
        remark: '',
        tempBegin: '',
        tempEnd: ''
      }
      let tempBegin = begin
      let cycleTime = 0
      const M = this.getMonthDayDiff(begin, end)[0]
      const n = this.contractForm.payment_period
      const counts = parseInt(M / n)
      const moveM = M % this.contractForm.payment_period
      const day = this.DateDiff(begin, end)
      const getComDate = this.getNewDate(begin, M)
      const surplus_day = this.DateDiff(getComDate, end)
      // const monthDay = this.getActDay(begin.split('-'))
      const daysQuter = this.getDaysQuter(end) // 当前合同截止日期所在季度对应的天数
      const gets = parseInt(n / 3)
      switch (timeLineType) {
        // 不满一个周期N且不满一个月
        case 0:
          if (begin.split('-')[1] === end.split('-')[1]) {
            obj.amt = (amt / daysQuter) * day
            obj.remark = '（单价：' + amt + '÷' + daysQuter + '）' + ' × （天数：' + day + '）'
          } else {
            obj.amt = (amt / (365 / 4)) * day
            obj.remark = '（单价：' + amt + ' ÷ ' + '（365 ÷ 4）' + '）' + ' × （天数：' + day + '）'
          }
          obj.tempBegin = begin
          obj.tempEnd = end
          arr.push(obj)
          break

        // 不满一个周期N，但是满整数月
        case 1:
          obj.amt = (amt / 3) * moveM
          obj.remark = '（单价：' + amt + ' ÷ 3' + ' × ' + moveM + '）'
          obj.tempBegin = begin
          obj.tempEnd = end
          arr.push(obj)
          break

        // 不满一个周期N，但是满整数月，且余出不满一个月
        case 2:
          if (getComDate.split('-')[1] === end.split('-')[1]) {
            obj.amt = (amt / 3) * M + (amt / daysQuter) * surplus_day
            obj.remark = '（单价：' + amt + ' ÷ 3' + ' × ' + M + '）' + '+ （单价：' + amt + ' ÷ ' + daysQuter + '）' + '×（天数：' + surplus_day + '）'
          } else {
            obj.amt = (amt / 3) * M + (amt / (365 / 4)) * surplus_day
            obj.remark = '（单价：' + amt + ' ÷ 3' + ' × ' + M + '）' + ' + （单价：' + amt + ' ÷ ' + '365 ÷ 4' + '）' + '× （天数：' + surplus_day + '）'
          }
          obj.tempBegin = begin
          obj.tempEnd = end
          arr.push(obj)
          break

        // 刚好一个周期N或多个周期N
        case 3:
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            if (n < 3) {
              obj.amt = (amt / 3) * n
              obj.remark = '（单价：' + amt + ' ÷ 3' + ' × ' + n + '）'
            } else {
              obj.amt = amt * gets
              obj.remark = '（单价：' + amt + '）' + '×（季数：' + gets + '）'
            }
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            if (cycleTime + 1 !== counts) {
              obj.tempEnd = this.fullCycleEndTimeSplit(obj.tempBegin.split('-'), end.split('-'), n, counts, cycleTime).join('-')
            } else {
              obj.tempEnd = end
            }
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          break

        // 满一个周期N或多个周期N且余出不满一个月
        case 4:
          // 合同月
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            if (n < 3) {
              obj.amt = (amt / 3) * n
              obj.remark = '（单价：' + amt + ' ÷ 3' + ' × ' + n + '）'
            } else {
              obj.amt = amt * gets
              obj.remark = '（单价：' + amt + '）' + '×（季数：' + gets + '）'
            }
            // obj.amt = amt * n
            // obj.remark = '（单价：' + amt + ' × ' + n + '）'
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            obj.tempEnd = this.fullCycleEndTimeWithOverflowDays(obj.tempBegin.split('-'), n, counts, cycleTime).join('-')
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          if (arr[arr.length - 1].tempEnd.split('-')[1] === end.split('-')[1]) {
            arr.push({
              amt: (amt / daysQuter) * surplus_day,
              remark: '（单价：' + amt + '÷' + daysQuter + '）' + '× （天数：' + surplus_day + '）',
              tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
              tempEnd: end
            })
          } else {
            arr.push({
              amt: (amt / (365 / 4)) * surplus_day,
              remark: '（单价：' + amt + '÷ （365 ÷ 4）' + '）' + '× （天数：' + surplus_day + '）',
              tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
              tempEnd: end
            })
          }
          break

        // 满一个周期N或多个周期N且余出不满一个周期N，但是满整数月
        case 5:
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            if (n < 3) {
              obj.amt = (amt / 3) * n
              obj.remark = '（单价：' + amt + ' ÷ 3' + ' × ' + n + '）'
            } else {
              obj.amt = amt * gets
              obj.remark = '（单价：' + amt + '）' + '×（季数：' + gets + '）'
            }
            // obj.amt = amt * ((365 / 12) * n)
            // obj.remark = '(单价：' + amt + ' × ' + '((365 ÷ 12)' + ' × ' + n + ')) '
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            obj.tempEnd = this.fullCycleEndTimeWithOverflowDays(obj.tempBegin.split('-'), n, counts, cycleTime).join('-')
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          arr.push({
            amt: (amt / 3) * moveM,
            remark: '(单价：' + amt + ' ÷ 3' + ' × ' + moveM + ')',
            tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
            tempEnd: end
          })
          break

        // 满一个周期N或多个周期N且余出不满一个周期N，也不满整数月，而是整数月多几天
        case 6:
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            if (n < 3) {
              obj.amt = (amt / 3) * n
              obj.remark = '（单价：' + amt + ' ÷ 3' + ' × ' + n + '）'
            } else {
              obj.amt = amt * gets
              obj.remark = '（单价：' + amt + '）' + '×（季数：' + gets + '）'
            }
            // obj.amt = amt * ((365 / 12) * n)
            // obj.remark = '(单价：' + amt + ' × ' + '((365 ÷ 12)' + ' × ' + n + ')) '
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            obj.tempEnd = this.fullCycleEndTimeWithOverflowDays(obj.tempBegin.split('-'), n, counts, cycleTime).join('-')
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          if (getComDate.split('-')[1] === end.split('-')[1]) {
            arr.push({
              amt: (amt / 3) * moveM + (amt / daysQuter) * surplus_day,
              remark: '（单价：' + amt + ' ÷ 3' + ' × ' + moveM + '）' + '（单价：' + amt + ' ÷ ' + daysQuter + '）' + '×（天数：' + surplus_day + '）',
              tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
              tempEnd: end
            })
          } else {
            arr.push({
              amt: (amt / 3) * moveM + (amt / (365 / 4)) * surplus_day,
              remark: '（单价：' + amt + ' ÷ 3' + ' × ' + moveM + '）' + '（单价：' + amt + ' ÷ ' + '(365 ÷  4)' + '）' + '×（天数：' + surplus_day + '）',
              tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
              tempEnd: end
            })
          }
          break
      }
      return arr
    },

    // 【元/天/m²】的时间计算方式
    paySizeByDay(timeLineType, amt, begin, end, size) {
      const arr = []
      // arr内参数
      let obj = {
        amt: 0,
        remark: '',
        tempBegin: '',
        tempEnd: ''
      }
      let tempBegin = begin
      let cycleTime = 0
      const M = this.getMonthDayDiff(begin, end)[0]
      const n = this.contractForm.payment_period
      const counts = parseInt(M / n)
      const moveM = M % this.contractForm.payment_period
      const day = this.DateDiff(begin, end)
      const getComDate = this.getNewDate(begin, M)
      const surplus_day = this.DateDiff(getComDate, end)
      switch (timeLineType) {
        // 不满一个周期N且不满一个月
        case 0:
          obj.amt = amt * size * day
          obj.remark = '(单价：' + amt + ') ' + '× (面积：' + size + ') ' + '× (天数：' + day + ')'
          obj.tempBegin = begin
          obj.tempEnd = end
          arr.push(obj)
          break

        // 不满一个周期N，但是满整数月
        case 1:
          obj.amt = amt * ((365 / 12) * day) * size
          obj.remark = '(单价：' + amt + ' × ' + '((365 ÷ 12)' + ' × ' + day + ')) ' + '× (面积：' + size + ')'
          obj.tempBegin = begin
          obj.tempEnd = end
          arr.push(obj)
          break

        // 不满一个周期N，但是满整数月，且余出不满一个月
        case 2:
          obj.amt = amt * ((365 / 12) * M) * size + amt * surplus_day * size
          obj.remark = '(单价：' + amt + ' × ' + '((365 ÷ 12)' + ' × ' + M + ')) ' + '× (面积：' + size + ')' + '+ (单价：' + amt + ') ' + '× (面积：' + size + ') ' + '× (天数：' + surplus_day + ')'
          obj.tempBegin = begin
          obj.tempEnd = end
          arr.push(obj)
          break

        // 刚好一个周期N或多个周期N
        case 3:
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            obj.amt = amt * ((365 / 12) * n) * size
            obj.remark = '(单价：' + amt + ' × ' + '((365 ÷ 12)' + ' × ' + n + ')) ' + '× (面积：' + size + ') '
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            if (cycleTime + 1 !== counts) {
              obj.tempEnd = this.fullCycleEndTimeSplit(obj.tempBegin.split('-'), end.split('-'), n, counts, cycleTime).join('-')
            } else {
              obj.tempEnd = end
            }
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          break

        // 满一个周期N或多个周期N且余出不满一个月
        case 4:
          // 合同月
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            obj.amt = amt * ((365 / 12) * n) * size
            obj.remark = '(单价：' + amt + ' × ' + '((365 ÷ 12)' + ' × ' + n + ')) ' + '× (面积：' + size + ') '
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            obj.tempEnd = this.fullCycleEndTimeWithOverflowDays(obj.tempBegin.split('-'), n, counts, cycleTime).join('-')
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          arr.push({
            amt: amt * surplus_day * size,
            remark: '(单价：' + amt + ') ' + '× (天数：' + surplus_day + ')' + '× (面积：' + size + ') ',
            tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
            tempEnd: end
          })
          break

        // 满一个周期N或多个周期N且余出不满一个周期N，但是满整数月
        case 5:
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            obj.amt = amt * ((365 / 12) * n) * size
            obj.remark = '(单价：' + amt + ' × ' + '((365 ÷ 12)' + ' × ' + n + ')) ' + '× (面积：' + size + ') '
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            obj.tempEnd = this.fullCycleEndTimeWithOverflowDays(obj.tempBegin.split('-'), n, counts, cycleTime).join('-')
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          arr.push({
            amt: amt * ((365 / 12) * moveM) * size,
            remark: '(单价：' + amt + ' × ' + '((365 ÷ 12)' + ' × ' + moveM + '))' + '× (面积：' + size + ') ',
            tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
            tempEnd: end
          })
          break

        // 满一个周期N或多个周期N且余出不满一个周期N，也不满整数月，而是整数月多几天
        case 6:
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            obj.amt = amt * ((365 / 12) * n) * size
            obj.remark = '(单价：' + amt + ' × ' + '((365 ÷ 12)' + ' × ' + n + ')) ' + '× (面积：' + size + ') '
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            obj.tempEnd = this.fullCycleEndTimeWithOverflowDays(obj.tempBegin.split('-'), n, counts, cycleTime).join('-')
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          arr.push({
            amt: amt * ((365 / 12) * moveM) * size + amt * surplus_day * size,
            remark: '(单价：' + amt + ' × ' + '((365 ÷ 12)' + ' × ' + moveM + '))' + '× (面积：' + size + ') ' + '+ (单价：' + amt + ') ' + '× (天数：' + surplus_day + ')' + '× (面积：' + size + ') ',
            tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
            tempEnd: end
          })
          // // 整数月
          // arr.push({
          //   amt: amt * ((365 / 12) * moveM) * size,
          //   remark: '(单价：' + amt + ' × ' + '((365 ÷ 12)' + ' × ' + moveM + '))' + '× (面积：' + size + ') ',
          //   tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
          //   tempEnd: this.fullCycleBeginTimeWithOverflowMonths(begin.split('-'), arr[arr.length - 1].tempEnd.split('-'), moveM).join('-')
          // })
          // // 整数月外多出的天数
          // arr.push({
          //   amt: amt * this.DateDiff(getComDate, end) * size,
          //   remark: '(单价：' + amt + ') ' + '× (天数：' + this.DateDiff(getComDate, end) + ')' + '× (面积：' + size + ') ',
          //   tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
          //   tempEnd: end
          // })
          break
      }
      return arr
    },

    // 【元/月/m²】的时间计算方式
    paySizeByMonth(timeLineType, amt, begin, end, size) {
      const arr = []
      // arr内参数
      let obj = {
        amt: 0,
        remark: '',
        tempBegin: '',
        tempEnd: ''
      }
      let tempBegin = begin
      let cycleTime = 0
      const M = this.getMonthDayDiff(begin, end)[0]
      const n = this.contractForm.payment_period
      const counts = parseInt(M / n)
      const moveM = M % this.contractForm.payment_period
      const day = this.DateDiff(begin, end)
      const getComDate = this.getNewDate(begin, M)
      const surplus_day = this.DateDiff(getComDate, end)
      const monthDay = this.getActDay(begin.split('-'))
      switch (timeLineType) {
        // 不满一个周期N且不满一个月
        case 0:
          if (begin.split('-')[1] === end.split('-')[1]) {
            obj.amt = (amt / monthDay) * day * size
            obj.remark = '（单价：' + amt + ' ÷ ' + monthDay + '）' + ' × （天数：' + day + '）' + '× (面积：' + size + ') '
          } else {
            obj.amt = (amt / (365 / 12)) * day * size
            obj.remark = '（单价：' + amt + ' ÷ ' + '（365 ÷ 12）' + '）' + ' × （天数：' + day + '）' + '× (面积：' + size + ') '
          }
          obj.tempBegin = begin
          obj.tempEnd = end
          arr.push(obj)
          break

        // 不满一个周期N，但是满整数月
        case 1:
          obj.amt = amt * moveM * size
          obj.remark = '（单价：' + amt + '× （月数：' + moveM + '））' + '× (面积：' + size + ') '
          obj.tempBegin = begin
          obj.tempEnd = end
          arr.push(obj)
          break

        // 不满一个周期N，但是满整数月，且余出不满一个月
        case 2:
          if (getComDate[1] === end.split('-')[1]) {
            obj.amt = amt * M * size + (amt / monthDay) * surplus_day * size
            obj.remark = '（单价：' + amt + '）' + '× （月数：' + M + '）' + '× (面积：' + size + ') ' + ' + （单价：' + amt + ' ÷ ' + monthDay + '）' + '× （天数：' + surplus_day + '）' + '× (面积：' + size + ') '
          } else {
            obj.amt = amt * M * size + (amt / (365 / 12)) * surplus_day * size
            obj.remark = '（单价：' + amt + '）' + '× （月数：' + M + '）' + '× (面积：' + size + ') ' + ' + （单价：' + amt + ' ÷ ' + '365 ÷ 12' + '）' + '× （天数：' + surplus_day + '）' + '× (面积：' + size + ') '
          }
          obj.tempBegin = begin
          obj.tempEnd = end
          arr.push(obj)
          break

        // 刚好一个周期N或多个周期N
        case 3:
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            obj.amt = amt * n * size
            obj.remark = '（单价：' + amt + ' × ' + n + '）' + '× (面积：' + size + ') '
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            if (cycleTime + 1 !== counts) {
              obj.tempEnd = this.fullCycleEndTimeSplit(obj.tempBegin.split('-'), end.split('-'), n, counts, cycleTime).join('-')
            } else {
              obj.tempEnd = end
            }
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          break

        // 满一个周期N或多个周期N且余出不满一个月
        case 4:
          // 合同月
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            obj.amt = amt * n * size
            obj.remark = '（单价：' + amt + ' × ' + n + '）' + '× (面积：' + size + ') '
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            obj.tempEnd = this.fullCycleEndTimeWithOverflowDays(obj.tempBegin.split('-'), n, counts, cycleTime).join('-')
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          if (arr[arr.length - 1].tempEnd.split('-')[1] === end.split('-')[1]) {
            arr.push({
              amt: (amt / monthDay) * surplus_day * size,
              remark: '（单价：' + amt + '÷' + monthDay + '）' + '× （天数：' + surplus_day + '）' + '× (面积：' + size + ') ',
              tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
              tempEnd: end
            })
          } else {
            arr.push({
              amt: (amt / (365 / 12)) * surplus_day * size,
              remark: '（单价：' + amt + '÷ （365 ÷ 12）' + '）' + '× （天数：' + surplus_day + '）' + '× (面积：' + size + ') ',
              tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
              tempEnd: end
            })
          }
          break

        // 满一个周期N或多个周期N且余出不满一个周期N，但是满整数月
        case 5:
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            obj.amt = amt * n * size
            obj.remark = '(单价：' + amt + ' × ' + n + ') ' + '× (面积：' + size + ') '
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            obj.tempEnd = this.fullCycleEndTimeWithOverflowDays(obj.tempBegin.split('-'), n, counts, cycleTime).join('-')
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          arr.push({
            amt: amt * moveM * size,
            remark: '(单价：' + amt + ' × ' + moveM + ')' + '× (面积：' + size + ') ',
            tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
            tempEnd: end
          })
          break

        // 满一个周期N或多个周期N且余出不满一个周期N，也不满整数月，而是整数月多几天
        case 6:
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            obj.amt = amt * n * size
            obj.remark = '(单价：' + amt + ' × ' + n + ')) ' + '× (面积：' + size + ') '
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            obj.tempEnd = this.fullCycleEndTimeWithOverflowDays(obj.tempBegin.split('-'), n, counts, cycleTime).join('-')
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          if (getComDate.split('-')[1] === end.split('-')[1]) {
            arr.push({
              amt: amt * moveM * size + (amt / monthDay) * surplus_day * size,
              remark: '(单价：' + amt + ' × ' + moveM + ') ' + '× (面积：' + size + '）' + '+（单价：' + amt + ' ÷ ' + monthDay + '）' + '×（天数：' + surplus_day + '）' + '× (面积：' + size + ') ',
              tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
              tempEnd: end
            })
          } else {
            arr.push({
              amt: amt * moveM * size + (amt / (365 / 12)) * surplus_day * size,
              remark: '(单价：' + amt + ' × ' + moveM + ') ' + '× (面积：' + size + '）' + '+（单价：' + amt + ' ÷ (365 ÷ 12)' + '）' + '×（天数：' + surplus_day + '）' + '× (面积：' + size + ') ',
              tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
              tempEnd: end
            })
          }
          break
      }
      return arr
    },

    // 【元/季度/m²】的时间计算方式
    paySizeBySeason(timeLineType, amt, begin, end, size) {
      const arr = []
      // arr内参数
      let obj = {
        amt: 0,
        remark: '',
        tempBegin: '',
        tempEnd: ''
      }
      let tempBegin = begin
      let cycleTime = 0
      const M = this.getMonthDayDiff(begin, end)[0]
      const n = this.contractForm.payment_period
      const counts = parseInt(M / n)
      const moveM = M % this.contractForm.payment_period
      const day = this.DateDiff(begin, end)
      const getComDate = this.getNewDate(begin, M)
      const surplus_day = this.DateDiff(getComDate, end)
      // const monthDay = this.getActDay(begin.split('-'))
      const daysQuter = this.getDaysQuter(end) // 当前合同截止日期所在季度对应的天数
      const gets = parseInt(n / 3)
      switch (timeLineType) {
        // 不满一个周期N且不满一个月
        case 0:
          if (begin.split('-')[1] === end.split('-')[1]) {
            obj.amt = (amt / daysQuter) * day * size
            obj.remark = '（单价：' + amt + '÷' + daysQuter + '）' + '× （天数：' + day + '）' + '×（面积：' + size + '）'
          } else {
            obj.amt = (amt / (365 / 4)) * day * size
            obj.remark = '（单价：' + amt + ' ÷ ' + '（365 ÷ 4）' + '）' + ' × （天数：' + day + '）' + '×（面积：' + size + '）'
          }
          obj.tempBegin = begin
          obj.tempEnd = end
          arr.push(obj)
          break

        // 不满一个周期N，但是满整数月
        case 1:
          obj.amt = (amt / 3) * moveM * size
          obj.remark = '（单价：' + amt + ' ÷ 3' + ' × ' + moveM + '）' + '×（面积：' + size + '）'
          obj.tempBegin = begin
          obj.tempEnd = end
          arr.push(obj)
          break

        // 不满一个周期N，但是满整数月，且余出不满一个月
        case 2:
          if (getComDate.split('-')[1] === end.split('-')[1]) {
            obj.amt = (amt / 3) * M * size + (amt / daysQuter) * surplus_day * size
            obj.remark = '（单价：' + amt + ' ÷ 3' + ' × ' + M + '）' + '×（面积：' + size + '）' + '+ （单价：' + amt + ' ÷ ' + daysQuter + '）' + '×（天数：' + surplus_day + '）' + '×（面积：' + size + '）'
          } else {
            obj.amt = (amt / 3) * M * size + (amt / (365 / 4)) * surplus_day * size
            obj.remark = '（单价：' + amt + ' ÷ 3' + ' × ' + M + '）' + '×（面积：' + size + '）' + ' + （单价：' + amt + ' ÷ ' + '365 ÷ 4' + '）' + '× （天数：' + surplus_day + '）' + '×（面积：' + size + '）'
          }
          obj.tempBegin = begin
          obj.tempEnd = end
          arr.push(obj)
          break

        // 刚好一个周期N或多个周期N
        case 3:
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            if (n < 3) {
              obj.amt = (amt / 3) * n * size
              obj.remark = '（单价：' + amt + ' ÷ 3' + ' × ' + n + '）' + '×（面积：' + size + '）'
            } else {
              obj.amt = amt * gets * size
              obj.remark = '（单价：' + amt + '）' + '×（季数：' + gets + '）' + '×（面积：' + size + '）'
            }
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            if (cycleTime + 1 !== counts) {
              obj.tempEnd = this.fullCycleEndTimeSplit(obj.tempBegin.split('-'), end.split('-'), n, counts, cycleTime).join('-')
            } else {
              obj.tempEnd = end
            }
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          break

        // 满一个周期N或多个周期N且余出不满一个月
        case 4:
          // 合同月
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            if (n < 3) {
              obj.amt = (amt / 3) * n * size
              obj.remark = '（单价：' + amt + ' ÷ 3' + ' × ' + n + '）' + '×（面积：' + size + '）'
            } else {
              obj.amt = amt * gets * size
              obj.remark = '（单价：' + amt + '）' + '×（季数：' + gets + '）' + '×（面积：' + size + '）'
            }
            // obj.amt = amt * n
            // obj.remark = '（单价：' + amt + ' × ' + n + '）'
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            obj.tempEnd = this.fullCycleEndTimeWithOverflowDays(obj.tempBegin.split('-'), n, counts, cycleTime).join('-')
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          if (arr[arr.length - 1].tempEnd.split('-')[1] === end.split('-')[1]) {
            arr.push({
              amt: (amt / daysQuter) * surplus_day * size,
              remark: '（单价：' + amt + '÷' + daysQuter + '）' + '× （天数：' + surplus_day + '）' + '×（面积：' + size + '）',
              tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
              tempEnd: end
            })
          } else {
            arr.push({
              amt: (amt / (365 / 4)) * surplus_day * size,
              remark: '（单价：' + amt + '÷ （365 ÷ 4）' + '）' + '× （天数：' + surplus_day + '）' + '×（面积：' + size + '）',
              tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
              tempEnd: end
            })
          }
          break

        // 满一个周期N或多个周期N且余出不满一个周期N，但是满整数月
        case 5:
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            if (n < 3) {
              obj.amt = (amt / 3) * n * size
              obj.remark = '（单价：' + amt + ' ÷ 3' + ' × ' + n + '）' + '×（面积：' + size + '）'
            } else {
              obj.amt = amt * gets * size
              obj.remark = '（单价：' + amt + '）' + '×（季数：' + gets + '）' + '×（面积：' + size + '）'
            }
            // obj.amt = amt * ((365 / 12) * n)
            // obj.remark = '(单价：' + amt + ' × ' + '((365 ÷ 12)' + ' × ' + n + ')) '
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            obj.tempEnd = this.fullCycleEndTimeWithOverflowDays(obj.tempBegin.split('-'), n, counts, cycleTime).join('-')
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          arr.push({
            amt: (amt / 3) * moveM * size,
            remark: '(单价：' + amt + ' ÷ 3' + ' × ' + moveM + ') ' + '×（面积：' + size + '）',
            tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
            tempEnd: end
          })
          break

        // 满一个周期N或多个周期N且余出不满一个周期N，也不满整数月，而是整数月多几天
        case 6:
          for (let i = 1; i <= counts; i++) {
            obj = {
              amt: 0,
              remark: '',
              tempBegin: '',
              tempEnd: ''
            }
            if (n < 3) {
              obj.amt = (amt / 3) * n
              obj.remark = '（单价：' + amt + ' ÷ 3' + ' × ' + n + '）'
            } else {
              obj.amt = amt * gets
              obj.remark = '（单价：' + amt + '）' + '×（季数：' + gets + '）'
            }
            // obj.amt = amt * ((365 / 12) * n)
            // obj.remark = '(单价：' + amt + ' × ' + '((365 ÷ 12)' + ' × ' + n + ')) '
            if (cycleTime !== 0) {
              obj.tempBegin = this.fullCycleBeginTimeSplit(begin.split('-'), tempBegin.split('-'), n).join('-')
            } else {
              obj.tempBegin = tempBegin
            }
            obj.tempEnd = this.fullCycleEndTimeWithOverflowDays(obj.tempBegin.split('-'), n, counts, cycleTime).join('-')
            arr.push(obj)
            tempBegin = obj.tempBegin
            cycleTime++
          }
          if (getComDate.split('-')[1] === end.split('-')[1]) {
            arr.push({
              amt: (amt / 3) * moveM * size + (amt / daysQuter) * surplus_day * size,
              remark: '（单价：' + amt + ' ÷ 3' + ' × ' + moveM + '）' + '×（面积：' + size + '）' + '（单价：' + amt + ' ÷ ' + daysQuter + '）' + '×（天数：' + surplus_day + '）' + '×（面积：' + size + '）',
              tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
              tempEnd: end
            })
          } else {
            arr.push({
              amt: (amt / 3) * moveM * size + (amt / (365 / 4)) * surplus_day * size,
              remark: '（单价：' + amt + ' ÷ 3' + ' × ' + moveM + '）' + '×（面积：' + size + '）' + '（单价：' + amt + ' ÷ ' + '(365 ÷  4)' + '）' + '×（天数：' + surplus_day + '）' + '×（面积：' + size + '）',
              tempBegin: this.formatBeginDate(arr[arr.length - 1].tempEnd.split('-')).join('-'),
              tempEnd: end
            })
          }
          break
      }
      return arr
    },
    getData() {
      getCostUnit()
        .then(res => {
          this.costUnit = res.data
        })
        .catch(err => {
          console.log(err)
        })
      getPayType()
        .then(res => {
          this.payType = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleContract() {
      // 合同提交并审核按钮
      if (this.contractParameter.form) {
        this.contractForm.contract_parameter = this.contractParameter.form
      }
      this.contractForm.status = 0 // 创建状态为0
      this.contractForm.arr.forEach(item => {
        delete item.receivable_amounts
        const contractParameter = this.contractParameter.form ? this.contractParameter.form : this.contractParameter
        if (contractParameter.is_method === 1) {
          item.receivable_amount = this.getToFloor(item.receivable_amount, contractParameter.decimal_number)
          return item.receivable_amount
        } else {
          item.receivable_amount = Number(item.receivable_amount).toFixed(contractParameter.decimal_number)
          return item.receivable_amount
        }
      })
      console.log('物业位置物业位置物业位置11111')
      console.log(this.contractForm.arr)
      this.createContract()
      // this.$emit('closeContract')
      console.log('物业位置物业位置物业位置')
      // console.log(this.contractForm)
    },
    stagingVerify() {
      // 合同暂存按钮
      this.stagingVisible = true
    },
    stagingContract(formName) {
      // 合同暂存确认按钮
      if (this.contractParameter.form) {
        this.contractForm.contract_parameter = this.contractParameter.form
      }
      this.contractForm.status = 1 // 暂存状态为1
      this.createStagingContract(this.contractForm)
    },
    goBack() {
      this.$emit('changeActiveName', { activeName: 'second', contractPreview: false, payCycle: true })
    },
    editCost() {
      this.editCosts = 1
      // this.contractForm.arr.s = this.contractForm.arr.receivable_amount
      this.contractForm.arr.forEach(item => {
        console.log('hah', item)
        // this.contractForm.arr.s = Object.assign(this.contractForm.arr.s, item)
        // console.log(this.contractForm.arr.s)
      })
    },
    edited() {
      this.editCosts = 0
      this.idx = true
    },
    getMonthDayDiff(startDate, endDate) {
      // 合同开始日期，截止日期相差多少月多少天
      const flag = [1, 3, 5, 7, 8, 10, 12, 4, 6, 9, 11, 2]
      const start = new Date(startDate)
      const end = new Date(endDate)
      let year = end.getFullYear() - start.getFullYear()
      let month = end.getMonth() - start.getMonth()
      let day = end.getDate() - start.getDate() + 1
      const newDate = this.getNewDay(endDate, +1) // 截止日期后一天
      const newDateDay = new Date(newDate).getDate()
      if (start.getDate() === 1 && newDateDay === 1) {
        if (month < 0) {
          year--
          month = end.getMonth() + (12 - start.getMonth()) + 1
        } else {
          month = end.getMonth() - start.getMonth() + 1
        }
        day = newDateDay - start.getDate()
      }
      if (month < 0) {
        year--
        month = end.getMonth() + (12 - start.getMonth())
      }
      if (day < 0) {
        month--
        const index = flag.findIndex(temp => {
          return temp === start.getMonth() + 1
        })
        let monthLength
        if (index <= 6) {
          monthLength = 31
        } else if (index > 6 && index <= 10) {
          monthLength = 30
        } else {
          monthLength = 28
        }
        day = end.getDate() + (monthLength - start.getDate()) + 1
      }
      const monthCount = 12 * year + month
      const dayCount = day
      return [monthCount, dayCount]
    },
    getNatureMonthDayDiff(startDate, endDate, smd, emd) {
      // 合同开始日期，截止日期相差多少月多少天
      const flag = [1, 3, 5, 7, 8, 10, 12, 4, 6, 9, 11, 2]
      let year = endDate.year - startDate.year
      let month = endDate.month - startDate.month
      let endDays = 0
      let startDays = 0
      if (endDate.day !== emd) {
        // 结束日期有余
        endDays = endDate.day
      }
      if (year === 0 && month === 0 && startDays === 1 && endDays === emd) {
        // 同月且一号起始且满月
      } else {
        startDays = smd - startDate.day
      }
      const monthCount = 12 * year + month
      return [monthCount, dayCount]
    },
    DateDiff(sDate1, sDate2) {
      const startDate = Date.parse(sDate1)
      const endDate = Date.parse(sDate2)
      const iDays = parseInt(Math.abs(endDate - startDate) / 1000 / 60 / 60 / 24) // 把相差的毫秒数转换为天数
      return iDays + 1
    },
    getNewDate(date, monthNum) {
      // 获取某年某月的后几个月
      var dateArr = date.split('-')
      var year = dateArr[0] // 获取当前日期的年份
      var month = dateArr[1] // 获取当前日期的月份
      var day = dateArr[2] // 获取当前日期的日
      // const days = new Date(year, month, 0).getDate() // 获取当前日期中的月的天数
      // days = days.getDate() // 获取当前日期中的月的天数
      var year2 = year
      var month2 = parseInt(month) + parseInt(monthNum)
      if (month2 > 12) {
        year2 = parseInt(year2) + parseInt(parseInt(month2) / 12 === 0 ? 1 : parseInt(month2) / 12)
        month2 = parseInt(month2) % 12
      }
      var day2 = day
      var days2 = new Date(year2, month2, 0)
      days2 = days2.getDate()
      if (day2 > days2) {
        day2 = days2 - 1
      }
      if (month2 < 10) {
        month2 = '0' + month2
      }
      if (day2 < 10) {
        day2 = '0' + day2
      }
      var t2 = year2 + '-' + month2 + '-' + day2
      return t2
    },
    getNewDay(newDateTemp, days) {
      // 指定日期之前之后几天日期
      // 转换为MM-DD-YYYY格式
      var nDate = new Date(newDateTemp)
      if (days === +1) {
        this.millSeconds = Math.abs(nDate) + Math.abs(days) * 24 * 60 * 60 * 1000
      } else if (days === -1) {
        this.millSeconds = Math.abs(nDate) - Math.abs(days) * 24 * 60 * 60 * 1000
      }
      var rDate = new Date(this.millSeconds)
      var year = rDate.getFullYear()
      var month = rDate.getMonth() + 1
      if (month < 10) month = '0' + month
      var date = rDate.getDate()
      if (date < 10) date = '0' + date
      return year + '-' + month + '-' + date
    },
    fullCycleBeginTimeSplit(begin, tempBegin, n) {
      if (parseInt(tempBegin[1]) + n > 12) {
        tempBegin[1] = parseInt(tempBegin[1]) + n - 12
        tempBegin[0] = parseInt(tempBegin[0]) + 1
      } else {
        tempBegin[1] = parseInt(tempBegin[1]) + n
      }
      const actDay = this.getActDay(tempBegin)
      if (begin[2] <= actDay) {
        tempBegin[2] = begin[2]
      } else {
        tempBegin[2] = actDay - (this.getActDay(begin) - begin[2])
      }
      tempBegin[1] = this.formatDays(tempBegin[1])
      tempBegin[2] = this.formatDays(tempBegin[2])
      return tempBegin
    },
    fullCycleEndTimeSplit(tempBegin, tempEnd, n, counts, cycleTime) {
      if (parseInt(tempEnd[1]) - n * (counts - cycleTime - 1) < 1) {
        tempEnd[1] = parseInt(tempEnd[1]) - n * (counts - cycleTime - 1) + 12
        tempEnd[0] = parseInt(tempEnd[0]) - 1
      } else {
        tempEnd[1] = parseInt(tempEnd[1]) - n * (counts - cycleTime - 1)
      }
      const actDay = this.getActDay(tempEnd)
      if (parseInt(tempBegin[2]) === 1) {
        tempEnd[2] = actDay
      } else {
        if (tempBegin[2] - 1 >= actDay) {
          tempEnd[2] = actDay - 1
        } else {
          tempEnd[2] = tempBegin[2] - 1
        }
      }
      tempEnd[1] = this.formatDays(tempEnd[1])
      tempEnd[2] = this.formatDays(tempEnd[2])
      return tempEnd
    },
    fullCycleEndTimeWithOverflowDays(tempBegin, n, counts, cycleTime) {
      const tempEnd = tempBegin
      if (parseInt(tempEnd[1]) + n > 12) {
        tempEnd[1] = parseInt(tempEnd[1]) + n - 12
        tempEnd[0] = parseInt(tempEnd[0]) + 1
      } else {
        tempEnd[1] = parseInt(tempEnd[1]) + n
      }
      const actDay = this.getActDay(tempEnd)
      // 如果开始的日期小于或等于当前月份天数
      if (tempEnd[2] <= actDay) {
        // 如果日为1号
        if (tempEnd[2] - 1 === 0) {
          // 如果月为1月
          if (tempEnd[1] - 1 === 0) {
            // 年份-1 月份修改为12月
            tempEnd[0] = tempEnd[0] - 1
            tempEnd[1] = 12
          } else {
            // 月份-1
            tempEnd[1] = tempEnd[1] - 1
          }
          // 天数修改为上一月的最后日期
          tempEnd[2] = this.getActDay(tempEnd)
        } else {
          // 如果不是1号，则直接用开始日期-1
          tempEnd[2] = tempEnd[2] - 1
        }
      } else {
        // 如果开始日期大于当前月份天数
        // 将日期改为当前月的最后日期
        tempEnd[2] = actDay
      }
      tempEnd[1] = this.formatDays(tempEnd[1])
      tempEnd[2] = this.formatDays(tempEnd[2])
      return tempEnd
    },
    fullCycleBeginTimeWithOverflowMonths(begin, tempEnd, n) {
      if (parseInt(tempEnd[1]) + n > 12) {
        tempEnd[1] = parseInt(tempEnd[1]) + n - 12
        tempEnd[0] = parseInt(tempEnd[0]) + 1
      } else {
        tempEnd[1] = parseInt(tempEnd[1]) + n
      }
      const actDay = this.getActDay(tempEnd)
      if (parseInt(begin[2]) === 1) {
        tempEnd[2] = actDay
      } else {
        if (begin[2] - 1 >= actDay) {
          tempEnd[2] = actDay - 1
        } else {
          tempEnd[2] = parseInt(tempEnd[2]) - 1
        }
      }
      tempEnd[1] = this.formatDays(tempEnd[1])
      tempEnd[2] = this.formatDays(tempEnd[2])
      return tempEnd
    },
    formatDays(val) {
      if (parseInt(val) < 10) {
        return '0' + parseInt(val)
      } else {
        return val
      }
    },
    getActDay(temp) {
      if (parseInt(temp[1]) !== 2) {
        if ((temp[1] / 2).toString().indexOf('.') === -1 && temp[1] < 8) {
          return '30'
        } else if ((temp[1] / 2).toString().indexOf('.') === -1 && temp[1] >= 8) {
          return '31'
        } else if ((temp[1] / 2).toString().indexOf('.') !== -1 && temp[1] <= 7) {
          return '31'
        } else if ((temp[1] / 2).toString().indexOf('.') !== -1 && temp[1] > 7) {
          return '30'
        }
      } else {
        // 判断结束年份是否为闰年
        const endResult = (temp[0] % 4 === 0 && temp[0] % 100 !== 0) || temp[0] % 400 === 0
        switch (endResult) {
          case true:
            // 结束年份的2月value值修改为29
            return '29'
          case false:
            return '28'
        }
      }
    },
    getDaysQuter(end) {
      // 所在季度的天数
      if (end.split('-')[1] < 7) {
        if (end.split('-')[1] < 4) {
          console.log('12')
          if ((end.split('-')[0] % 4 === 0 && end.split('-')[0] % 100 !== 0) || end.split('-')[0] % 400 === 0) {
            // 闰年
            return '91'
          } else {
            // 平年
            return '90'
          }
        } else {
          return '91'
        }
      } else {
        return '92'
      }
    },
    stashInf(item, capId) {
      return {
        charging_subject: capId,
        start_date: item.tempBegin,
        end_date: item.tempEnd,
        receivable_amount: item.amt,
        receivable_amounts: item.amt,
        customer_settled_id: this.contractForm.customer_settled,
        remark: item.remark
      }
    },
    getOverflowDate(begin) {
      const actDay = this.getActDay(begin)
      if (parseInt(begin[2]) + 1 > actDay) {
        if (parseInt(begin[1]) + 1 > 12) {
          begin[2] = 1
          begin[1] = 1
          begin[0] = parseInt(begin[0]) + 1
        } else {
          begin[2] = 1
          begin[1] = parseInt(begin[1]) + 1
        }
      } else {
        begin[2] = parseInt(begin[2]) + 1
      }
      return begin
    },
    formatBeginDate(arr) {
      this.getOverflowDate(arr)
      arr[1] = this.formatDays(arr[1])
      arr[2] = this.formatDays(arr[2])
      return arr
    },
    getSeasonDay(begin, end) {},
    createStagingContract(form) {
      this.contractForm.cost.forEach(item => {
        delete item.room_position_arr
        delete item.seat_position_arr
      })
      this.contractForm.arr.forEach(item => {
        delete item.receivable_amounts
        item.receivable_amount = Number(item.receivable_amount).toFixed(2)
        return item.receivable_amount
      })
      createContract(this.contractForm)
        .then(res => {
          console.log(res)
          this.stagingVisible = false
          this.$emit('closeContract')
          this.$message({
            message: '合同暂存成功',
            type: 'success'
          })
        })
        .catch(err => {
          console.log(err)
          if (err.data.customer_settled) {
            this.$message({
              message: '客户名称必填',
              type: 'error'
            })
          } else if (err.data.contract_parameter) {
            this.$message({
              message: '合同设置参数必填',
              type: 'error'
            })
          }
        })
    }, // 新建合同之后，暂存状态保存为待审核状态
    createContract() {
      this.contractForm.cost.forEach(item => {
        delete item.room_position_arr
        delete item.seat_position_arr
      })
      // this.contractForm.contract_parameter = this.contractParameter.form
      createContract(this.contractForm)
        .then(res => {
          console.log(res)
          this.$message({
            message: '合同创建成功',
            type: 'success'
          })
          this.$emit('closeContract')
        })
        .catch(err => {
          console.log(err)
          if (err.data.customer_settled) {
            this.$message({
              message: '客户名称必填',
              type: 'error'
            })
          } else if (err.data.contract_parameter) {
            this.$message({
              message: '合同参数必填',
              type: 'error'
            })
          }
        })
    },
    getToFloor(number, num) {
      // 去尾法
      if (num < 0) {
        return this
      }
      const nnum = parseFloat(number)
      const str = nnum.toString()
      const arr = str.split('.')
      const strZ = arr[0] // arr[0] 整数部分，arr[1] 小数部分
      let strX = '' // 小数点与小数部分
      if (arr.length > 1) {
        // 有小数
        if (num > 0) {
          if (arr[1].length >= num) {
            // 小数长，保留位短
            strX = arr[1].substr(0, num)
          } else {
            // 小数短，保留位长
            const zeroArr = []
            for (let i = 0; i < num - arr[1].length; i++) {
              zeroArr.push(0)
            }
            strX = arr[1].toString() + zeroArr.join('')
          }
          strX = '.' + strX
        }
      } else {
        // 无小数
        if (num > 0) {
          const zeroArr = []
          for (let i = 0; i < num; i++) {
            zeroArr.push(0)
          }
          strX = '.' + zeroArr.join('')
        }
      }
      const result = strZ + '' + strX
      return result
    }
  }
}
</script>

<style scoped></style>
