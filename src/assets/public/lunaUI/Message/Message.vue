<template>
  <transition>
    <div class="lunaMessage" ref="content">
      <div
        :class="{
          normalMessage: theme === 'normal',
          primaryMessage: theme === 'primary',
          errorMessage: theme === 'error',
          warningMessage: theme === 'warning',
          successMessage: theme === 'success',
          alertMessage: theme === 'alert'
        }"
      ></div>
    </div>
  </transition>
</template>

<script>
  import './Message.js'

export default {
  name: 'Message',
  props: {
    theme: {
      type: String,
      default: 'normal'
    }
  }
}
</script>

<style scoped></style>
