<template>
  <button
          class="lunaButton"
          :style="[styles, buttonWidth, buttonHeight, buttonFontSize, buttonRadius, buttonShadow, buttonBackground, buttonColor, buttonBorder]"
          :class="[className, {errorButton: theme === 'error', successButton: theme === 'success',warningButton: theme === 'warning',primaryButton: theme === 'primary',alertButton: theme === 'alert', '': theme === 'normal'}, {darkShadow: shadowStyle === 'dark', lightShadow: shadowStyle === 'light'}, {squareCorner: corner === 'square', smallCorner: corner === 'small', filletCorner: corner === 'fillet', largeCorner: corner === 'large', fullCorner: corner === 'full', roundCorner: corner === 'round'}, {'': type === 'Normal', 'textButton': type === 'text', 'ghostButton': type === 'ghost'}]"
          :disabled="disabled"
          @click="click()"
          v-ripple
  >
    <i :style="buttonColor" :class="icon" class="pre" v-if="pre"></i>
    <slot :style="buttonColor"></slot>
    <i :style="buttonColor" :class="icon" class="suffix" v-if="suffix"></i>
    <div v-if="badge" class="lunaBadge"></div>
  </button>
</template>

<script>

  export default {
    name: "Button",
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      color: {
        type: String,
        default: 'none'
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
      disabled: {
        type: Boolean,
        default: false
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
        default: 'none'
      }
    },
    computed: {
      buttonBorder() {
        return {
          border: this.border
        }
      },
      buttonWidth() {
        if(this.corner === 'round') {
          if (typeof this.width === "string") {
            return {
              minWidth: this.width,
              width: this.width
            }
          } else {
            return {
              minWidth: this.width + 'px',
              width: this.width + "px"
            }
          }
        } else {
          if (typeof this.width === "string") {
            return {
              width: 'calc(' + this.width + ' + 30px)'
            }
          } else {
            return {
              width: this.width + 30 + "px"
            }
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
        if(this.background !== 'none') {
          return {
            backgroundColor: this.background + "!important"
          };
        }
      },
      buttonColor() {
        if(this.color !== 'none') {
          return {
            color: this.color
          }
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
