<template>
  <div class="reportCenter">
      <ul>
        <li v-for="(i, index) in menus" :key="index" @click="changeView(i)">{{ $t('lang.report')[i] }}</li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'Report',
  data() {
    return {
      menus: ['dailyReport', 'weekReport', 'monthReport', 'seasonReport', 'halfYearReport', 'yearReport']
    }
  },
  computed: {
    trans() {
      return this.$t('lang.report')
    }
  },
  methods: {
    changeView(url) {}
  }
}
</script>

<style scoped></style>
