<template>
  <div
    class="lunaButton"
    :style="[styles, buttonWidth, buttonRadius, buttonShadow, buttonBackground]"
    :class="[className, {errorButton: theme === 'error', successButton: theme === 'success',warningButton: theme === 'warning',primaryButton: theme === 'primary',alertButton: theme === 'alert', '': theme === 'normal'}, {darkShadow: shadowStyle === 'dark', lightShadow: shadowStyle === 'light'}, {squareCorner: corner === 'square', smallCorner: corner === 'small', filletCorner: corner === 'fillet', largeCorner: corner === 'large', fullCorner: corner === 'full', roundCorner: corner === 'round'}, {'': type === 'Normal', 'textButton': type === 'text', 'ghostButton': type === 'ghost'}]"
  >
    <i :class="icon" class="pre" v-if="pre"></i>
    <slot></slot>
    <i :class="icon" class="suffix" v-if="suffix"></i>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    theme: {
      type: String,
      default: "Normal"
    },
    type: {
        type: String,
        default: 'Normal'
    },
    className: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    },
    pre: {
      type: Boolean,
      default: false
    },
    suffix: {
      type: Boolean,
      default: false
    },
    //自定义样式
    styles: {
      type: Object,
      default() {
        return {};
      }
    },
    corner: {
      type: String,
      default: "large"
    },
    shadow: {
      type: Boolean,
      default: true
    },
    shadowStyle: {
      type: String,
      default: "dark"
    },
    radius: {
      type: Number,
      default: -1
    },
  },
  computed: {
    buttonWidth() {
      if (this.width !== "auto") {
        return {
          width: this.width + "px"
        };
      } else {
        return {
          width: this.width
        };
      }
    },
    buttonRadius() {
      if (this.radius !== -1) {
        return {
          borderRadius: this.radius + "px!important"
        };
      } else {
        return {};
      }
    },
    buttonShadow() {
      if (!this.shadow) {
        return {
          boxShadow: "0 0 0 rgba(0, 0, 0, 0)!important"
        };
      } else {
        return {};
      }
    },
    buttonBackground() {
      return {
        backgroundColor: this.background + "!important"
      };
    }
  }
};
</script>

<style scoped>
</style>
