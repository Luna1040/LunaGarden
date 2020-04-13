<template>
<div class="body">
  <div class="bottom">
    <textarea placeholder="test" name="" id=""></textarea>
  </div>
</div>
</template>

<script>
export default {
  name: 'byteDiscuss'
}
</script>

<style scoped lang="scss">
.body{
  width: 100%;
  font-size: 16px;
  .bottom{
    width: 100%;
    height: 2.75em;
    background-color: lightblue;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
  }
  textarea{
    font-size: 32px;
  }
}
</style>
