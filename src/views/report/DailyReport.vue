<template>
  <div class="reportView daily">
    <div class="dailyContainer">
      <Card flex :width="550">
        <div slot="header" class="lunaCardTitle" :class="{ urgent: formData.urgent === 1, important: formData.urgent === 2, warning: formData.urgent === 3, normal: formData.urgent === 4, notNecessary: formData.urgent === 5 }">
<!--          <div class="cardAvatar">-->
<!--            <img :src="userInfo.userIcon" alt="" />-->
<!--          </div>-->
          <div>{{ urgentStatus(formData.urgent) }}</div>
        </div>
        <Form ref="form" style="margin: 0 auto;" background="rgba(0,0,0,0)" border="0" :shadow="false" :form="form" :theme="theme" :width="640" label-position="top" :label-width="150"></Form>
      </Card>
      <Card v-for="(i, index) in listData" flex :width="550">
        <div slot="header" class="lunaCardTitle" :class="{ urgent: i.urgent === 1, important: i.urgent === 2, warning: i.urgent === 3, normal: i.urgent === 4, notNecessary: i.urgent === 5 }">
          <div class="cardAvatar">
            <img :src="userInfo.userIcon" alt="" />
          </div>
          {{ urgentStatus(i.urgent) }}
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DailyReport',
  props: {
    lang: {
      type: Object,
      default: () => {
        return {}
      }
    },
    userInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      theme: 'light',
      formData: {
        content: '',
        process: '',
        urgent: 1,
        index: ''
      },
      listData: [],
      form: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {},
    urgentStatus(val) {
      switch (val) {
        case 1:
          return 'Urgent'
        case 2:
          return 'Important'
        case 3:
          return 'Warning'
        case 4:
          return 'Normal'
        case 5:
          return 'Not Necessary'
      }
    }
  }
}
</script>

<style scoped></style>
