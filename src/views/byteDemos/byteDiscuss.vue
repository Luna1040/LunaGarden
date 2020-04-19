<template>
<div class="body">
  <div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'byteDiscuss'
}
</script>

<style scoped lang="scss">
  .body>div{
    width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    >div:first-of-type{
      width: 22%;
      height: 500px;
      background: #9a6e3a;
    }
    >div:nth-of-type(2) {
      width: 45%;
      height: 500px;
      background: hotpink;
    }
    >div:last-of-type{
      width: 33%;
      height: 500px;
      background-color: springgreen;
    }
  }
</style>
