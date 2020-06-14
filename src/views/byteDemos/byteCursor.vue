<template>
</template>

<script>
export default {
  name: 'ByteCursor',
  data: function () {
    return {
      test: ''
    }
  },
  methods: {
    click () {
      let value = '爱上空间回复噶速度快捷回复噶快圣诞节好烦噶ASD'
      this.$refs['input'].value = value
      this.test = value
      this.$refs['input'].focus()
    }
  }
}
</script>

<style scoped>

</style>
