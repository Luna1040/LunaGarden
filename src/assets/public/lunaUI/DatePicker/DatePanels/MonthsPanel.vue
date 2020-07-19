<template>
  <div class="lunaDatePickerPanelMonth">
    <div v-for="i in months" :key="i" class="lunaMonthCell" :class="{lunaActiveMonth: value === i}" @click="choiceMonth(i)">
      {{ i }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'MonthsPanel',
  props: {
    value: {
      type: Number,
      default: 1
    },
    type: {
      type: String,
      default: 'start'
    }
  },
  data() {
    return {
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }
  },
  methods: {
    choiceMonth(i) {
      this.$emit('input', i)
      this.$emit('onChange', this.type, i)
    }
  }
}
</script>

<style scoped></style>
