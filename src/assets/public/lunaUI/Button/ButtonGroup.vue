<template>
  <div class="lunaButtonGroup">
    <Button v-for="i in btnGroup">{{ i.name }}</Button>
  </div>
</template>

<script>
export default {
  name: 'ButtonGroup',
  props: {
    btnGroup: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped></style>
