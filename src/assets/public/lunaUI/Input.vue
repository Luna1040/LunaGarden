<template>
  <div
          class="lunaInput"
          :class="[className, {squareCorner: corner === 'square', smallCorner: corner === 'small', filletCorner: corner === 'fillet', largeCorner: corner === 'large', fullCorner: corner === 'full'}, {ghostInput: ghost},{disabled: disabled}, {lightInput: theme === 'light', darkInput: theme === 'dark'}]"
          :style="[inputWidth, inputRadius, inputHeight, inputBorder, inputBackground, boxShadowStyle]"
          @mouseenter="hoverEnter"
          @mouseleave="hoverOut"
          @focusin="focusEnter"
          @focusout="focusLeave"
  >
    <i v-if="pre" :class="[icon,{spin: spin}]" class="pre" @click="handelIcon"></i>
    <slot name="pre"></slot>
    <input
            :value="textValue"
            :style="[textColor, inputFontSize, inputWidthCount]"
            :type="type"
            :maxlength="maxlength"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            @input="cgValue"
            @keyup="handelKeyUp"
            @keyup.enter="handelEnter"
            @keydown="handelKeyDown"
            @keypress="handelKeyPress"
            @focus="handelFocus"
            @blur="handelBlur"
    />
    <!--        清空按钮-->
    <i v-if="clearable" class="iconfont icon-cancel" @click="clearText"></i>
    <transition name="">
      <i v-if="suffix" :class="[icon, {spin: spin}]" class="suffix" @click="handelIcon"></i>
    </transition>
    <slot name="suffix"></slot>
    <span v-if="showWordLimit">{{count}}/{{maxlength}}</span>
  </div>
</template>

<script>
  export default {
    name: "Input",
    props: {
      value: {
        type: [String, Number],
        default: ""
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      className: {
        type: String,
        default: ""
      },
      corner: {
        type: String,
        default: "large"
      },
      theme: {
        type: String,
        default: 'light'
      },
      readonly: {
        type: Boolean,
        default: false
      },
      //自定义宽度  作用于container
      width: {
        type: [Number, String],
        default: 150
      },
      //自定义高度  作用于body
      height: {
        type: Number,
        default: 32
      },
      radius: {
        type: Number,
        default: -1
      },
      background: {
        type: String,
        default: "#FFFFFF"
      },
      color: {
        type: String,
        default: "#4A4A4A"
      },
      borderColor: {
        type: String,
        default: ""
      },
      type: {
        type: String,
        default: "text"
      },
      ghost: {
        type: Boolean,
        default: false
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
      clearable: {
        type: Boolean,
        default: false
      },
      maxlength: {
        type: Number,
        default: 120
      },
      showWordLimit: {
        type: Boolean,
        default: false
      },
      fontSize: {
        type: String,
        default: '14px'
      },
      placeholder: {
        type: String,
        default: ''
      },
      spin: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      inputFontSize() {
        return {
          fontSize: this.fontSize
        }
      },
      inputWidth() {
        if (typeof this.width !== "string") {
          return {
            width: this.width + 'px'
          };
        } else {
          return {
            width: this.width
          };
        }
      },
      inputWidthCount() {
        if(this.showWordLimit) {
          if(this.suffix && this.pre){
            return {
              width: 'calc(100% - 62px)'
            }
          } else if(this.suffix || this.pre){
            return {
              width: 'calc(100% - 40px)'
            }
          } else {
            return {
              width: 'calc(100% - 32px)'
            }
          }
        } else {
          return {
            width: '100%'
          }
        }
      },
      inputRadius() {
        if (this.radius !== -1) {
          return {
            borderRadius: this.radius + "px!important"
          };
        } else {
          return {};
        }
      },
      inputHeight() {
        if (typeof this.height !== 'string') {
          return {
            height: this.height + "px"
          };
        } else {
          return {
            height: this.height
          }
        }
      },
      inputBackground() {
        return {
          backgroundColor: this.background
        };
      },
      inputBorder() {
        if (this.ghost && this.borderColor !== "") {
          return {
            border: "1px solid " + this.borderColor
          };
        } else {
          return {
            border: "1px solid " + this.borderColorStyle
          };
        }
      },
      textColor() {
        return {
          color: this.color
        };
      },
      boxShadowStyle() {
        return {
          boxShadow: this.boxShadow
        };
      },
      count() {
        return this.textValue.length;
      },
    },
    data() {
      return {
        boxShadow: "0 0 0 2px rgba(0,0,0, 0)",
        borderColorStyle: "#EEEEEE",
        textValue: this.value
      };
    },
    methods: {
      hoverEnter() {
        if (this.borderColor !== "") {
          this.borderColorStyle = this.borderColor;
        } else {
          this.borderColorStyle = this.background;
        }
      },
      hoverOut() {
        this.borderColorStyle = '#EEEEEE';
      },
      focusEnter() {
        if (this.borderColor !== "") {
          this.boxShadow =
                  "0 0 0 2px rgba(" + this.toRGB(this.borderColor) + ", 0.2)";
          this.borderColorStyle = this.borderColor;
        } else {
          this.boxShadow =
                  "0 0 0 2px rgba(" + this.toRGB(this.background) + ", 0.2)";
          this.borderColorStyle = this.background;
        }
      },
      focusLeave() {
        this.boxShadow = "0 0 0 2px rgba(0,0,0, 0)";
        this.borderColorStyle = '#EEEEEE';
      },
      clearText() {
        this.$emit("on-cancel", this.textValue);
        this.textValue = "";
        this.$emit("input", "");
      },
      cgValue(event) {
        this.$emit("input", event.target.value);
      },
      handelKeyUp(event) {
        this.$emit("on-keyup", event);
      },
      handelKeyDown(event) {
        this.$emit("on-keydown", event);
      },
      handelKeyPress(event) {
        this.$emit("on-keypress", event);
      },
      handelFocus(event) {
        this.$emit("on-focus", event);
      },
      handelBlur(event) {
        this.$emit("on-blur", event);
      },
      handelIcon() {
        this.$emit("on-blur", this.textValue);
      },
      handelEnter() {
        this.$emit("on-enter", this.textValue);
      },
      setTextValue(value) {
        if (value === this.textValue) return;
        this.textValue = value;
      },
    },
    watch: {
      value(val) {
        this.setTextValue(val);
      }
    },
  };
</script>

<style scoped lang="scss">
  .spin {
    transform: rotateZ(180deg);
  }
</style>
