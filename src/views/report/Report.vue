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
      userInfo: {}
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
  created() {
    this.lang = this.t
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
  },
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
  methods: {
    changeView(url) {
      this.choiceView = url
    }
  }
}
</script>

<style scoped></style>
