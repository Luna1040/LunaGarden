<template>
    <div class="lunaInput" :class="[{squareCorner: corner === 'square', smallCorner: corner === 'small', filletCorner: corner === 'fillet', largeCorner: corner === 'large', fullCorner: corner === 'full'}, {ghostInput: ghost}]" :style="[inputWidth, inputRadius, inputHeight, inputBorder, inputBackground, boxShadowStyle]" @mouseenter="hoverEnter" @mouseleave="hoverOut" @focusin="focusEnter" @focusout="focusLeave">
        <i v-if="pre" :class="icon" @click="handelIcon"></i>
        <slot name="pre"></slot>
        <input v-model="textValue" :style="[textColor]" :type="type" :maxlength="maxlength" @input="cgValue" @keyup="handelKeyUp" @keyup.enter="handelEnter" @keydown="handelKeyDown" @keypress="handelKeyPress" @focus="handelFocus" @blur="handelBlur"/>
        <!--        清空按钮-->
        <i v-if="clearable" class="iconfont icon-cancel" @click="clearText"></i>
        <i v-if="suffix" @click="handelIcon" :class="icon"></i>
        <slot name="suffix"></slot>
        <span v-if="showWordLimit">{{count}}/{{maxlength}}</span>
    </div>
</template>

<script>
    export default {
        name: "Input.vue",
        props: {
            value: {
                type: String,
                default: ''
            },
            corner: {
                type: String,
                default: 'large'
            },
            //自定义宽度  作用于container
            width: {
                type: [Number, String],
                default: 150,
            },
            //自定义高度  作用于body
            height: {
                type: Number,
                default: 32,
            },
            radius: {
                type: Number,
                default: -1
            },
            background: {
                type: String,
                default: '#FFFFFF'
            },
            color: {
                type: String,
                default: '#4A4A4A'
            },
            borderColor: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'text'
            },
            ghost: {
                type: Boolean,
                default: false
            },
            icon: {
                type: String,
                default: ''
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
        },
        computed: {
            inputWidth () {
                if(this.width !== 'auto') {
                    return {
                        width: this.width + 'px'
                    }
                } else {
                    return {
                        width: this.width
                    }
                }
            },
            inputRadius() {
                if(this.radius !== -1) {
                    return {
                        borderRadius: this.radius + 'px!important'
                    }
                } else {
                    return {}
                }
            },
            inputHeight() {
                return {
                    height: this.height + 'px'
                }
            },
            inputBackground() {
                return {
                    backgroundColor: this.background
                }
            },
            inputBorder() {
                if(this.ghost) {
                    return {
                        border: '1px solid ' + this.borderColor,
                    }
                } else {
                    return {
                        border: '1px solid ' + this.borderColorStyle,
                    }
                }
            },
            textColor() {
                return {
                    color: this.color,
                }
            },
            boxShadowStyle() {
                return {
                    boxShadow: this.boxShadow
                }
            },
            count() {
                return this.textValue.length
            }
        },
        data() {
            return {
                boxShadow: '0 0 0 2px rgba(0,0,0, 0)',
                borderColorStyle: '#EEEEEE',
                textValue: this.value
            }
        },
        methods: {
            hoverEnter() {
                if(this.borderColor !== '') {
                    this.borderColorStyle = this.borderColor
                } else {
                    this.borderColorStyle = this.background
                }
            },
            hoverOut() {
                this.borderColorStyle = '#EEEEEE'
            },
            focusEnter() {
                if(this.borderColor !== '') {
                    this.boxShadow = '0 0 0 2px rgba(' + this.toRGB(this.borderColor) + ', 0.2)'
                    this.borderColorStyle = this.borderColor
                } else {
                    this.boxShadow = '0 0 0 2px rgba(' + this.toRGB(this.background) + ', 0.2)'
                    this.borderColorStyle = this.background
                }
            },
            focusLeave() {
                this.boxShadow = '0 0 0 2px rgba(0,0,0, 0)';
                this.borderColorStyle = '#EEEEEE'
            },
            clearText() {
                this.$emit('on-cancel', this.textValue)
                this.textValue = '';
                this.$emit('input', '');
            },
            cgValue() {
                this.$emit('on-change', this.textValue)
            },
            handelKeyUp(event) {
                this.$emit('on-keyup', event)
            },
            handelKeyDown(event) {
                this.$emit('on-keydown', event)
            },
            handelKeyPress(event) {
                this.$emit('on-keypress', event)
            },
            handelFocus(event) {
                this.$emit('on-focus', event)
            },
            handelBlur(event) {
                this.$emit('on-blur', event)
            },
            handelIcon() {
                this.$emit('on-blur', this.textValue)
            },
            handelEnter() {
                this.$emit('on-enter', this.textValue)
            }
        },
    }
</script>

<style scoped>

</style>
