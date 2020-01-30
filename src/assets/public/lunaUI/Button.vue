<template>
  <div
          class="lunaButton"
          :style="[styles, buttonWidth, buttonHeight, buttonFontSize, buttonRadius, buttonShadow, buttonBackground, buttonColor, buttonBorder]"
          :class="[className, {errorButton: theme === 'error', successButton: theme === 'success',warningButton: theme === 'warning',primaryButton: theme === 'primary',alertButton: theme === 'alert', '': theme === 'normal'}, {darkShadow: shadowStyle === 'dark', lightShadow: shadowStyle === 'light'}, {squareCorner: corner === 'square', smallCorner: corner === 'small', filletCorner: corner === 'fillet', largeCorner: corner === 'large', fullCorner: corner === 'full', roundCorner: corner === 'round'}, {'': type === 'Normal', 'textButton': type === 'text', 'ghostButton': type === 'ghost'}]"
          @click="click()"
          v-ripple
  >
    <i :style="buttonColor" :class="icon" class="pre" v-if="pre"></i>
    <slot :style="buttonColor"></slot>
    <i :style="buttonColor" :class="icon" class="suffix" v-if="suffix"></i>
    <div v-if="badge" class="lunaBadge"></div>
  </div>
</template>

<script>

  export default {
    name: "Button",
    props: {
      color: {
        type: String,
        default: '#4A4A4A'
      },
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
      border: {
        type: String,
        default: '1px solid #FFF'
      },
      radius: {
        type: Number,
        default: -1
      },
      badge: {
        type: Boolean,
        default: false
      },
      width: {
        type: [Number, String],
        default: 'auto'
      },
      height: {
        type: [Number, String],
        default: 30
      },
      fontSize: {
        type: [Number, String],
        default: '12px'
      },
      background: {
        type: String,
        default: '#FFF'
      }
    },
    computed: {
      buttonBorder() {
        return {
          border: this.border
        }
      },
      buttonWidth() {
        if (typeof this.width === "string") {
          return {
            width: this.width
          }
        } else {
          return {
            width: this.width + "px"
          }
        }
      },
      buttonHeight() {
        if(typeof this.height === "string") {
          return {
            height: this.height,
            lineHeight: this.height
          }
        } else {
          return {
            height: this.height + 'px',
            lineHeight: this.height + 'px'
          }
        }
      },
      buttonFontSize() {
        if(typeof this.fontSize === 'string') {
          return {
            fontSize: this.fontSize
          }
        } else {
          return {
            fontSize: this.fontSize + 'px'
          }
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
      },
      buttonColor() {
        return {
          color: this.color
        }
      }
    },
    methods: {
      click() {
        this.$emit('click')
      }
    }
  };
</script>

<style scoped>
</style>
