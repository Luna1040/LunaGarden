<template>
  <div>
    <div class="normalBc" :class="width177"></div>
  </div>
</template>

<script>
export default {
  name: 'start',
  data() {
    return {
      width177: 0
    }
  },
  created() {
    if (window.innerWidth / window.innerHeight >= 1.777) {
      this.width177 = 177
    } else if (window.innerWidth / window.innerHeight < 1) {
      this.width177 = 0
    } else {
      this.width177 = 16
    }
  },
}
</script>

<style scoped lang="scss">
.normalBc{
  width: 100vw;
  height: 100vh;
  background: url("https://github.com/Luna1040/projectImages/blob/master/images/background/bc1.jpg") no-repeat;
  background-size: cover;
}
</style>
