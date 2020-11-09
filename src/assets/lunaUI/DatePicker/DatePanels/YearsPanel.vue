<template>
  <div class="lunaDatePickerPanelYear">
    <div v-for="i in years" :key="i" class="lunaYearCell" :class="{lunaActiveYear: value === i}" @click="choiceYear(i)">
      {{ i }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'YearsPanel',
    props: {
      value: {
        type: Number,
        default: 0
      },
      type: {
        type: String,
        default: 'start'
      }
    },
    data() {
      return{
        years: []
      }
    },
    created() {
      this.years = []
      if(this.value && this.value !== 0){
        this.years.push(this.value - 2)
        this.years.push(this.value - 1)
        this.years.push(this.value)
        this.years.push(this.value + 1)
        this.years.push(this.value + 2)
      }
    },
    watch: {
      value() {
        this.years = []
        if(this.value && this.value !== 0){
          this.years.push(this.value - 2)
          this.years.push(this.value - 1)
          this.years.push(this.value)
          this.years.push(this.value + 1)
          this.years.push(this.value + 2)
        }
      }
    },
    methods: {
      choiceYear(i) {
        this.$emit('input', i)
        this.$emit('onChange', this.type, i)
      }
    }
  }
</script>

<style scoped>

</style>
