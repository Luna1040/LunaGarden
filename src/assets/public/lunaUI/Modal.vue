<template>
  <transition name="modalAnimation">
    <div v-if="showModal" class="lunaModal" :class="{ zIndexHide: !showModal }" :style="wrapStyles">
      <transition name="maskAnimation">
        <div
          v-show="showModal"
          v-if="showMask"
          class="modalMask"
          :class="[
            {
              darkMask: maskStyle === 'dark',
              lightMask: maskStyle === 'light'
            }
          ]"
          @click="handleMask()"
        ></div>
      </transition>
      <div
        class="modalContainer"
        :style="[styles, modalWidth, modalRadius, modalShadow, modalBackground, modalColor]"
        :class="[
          className,
          {
            errorModal: type === 'error',
            successModal: type === 'success',
            warningModal: type === 'warning',
            primaryModal: type === 'primary',
            alertModal: type === 'alert',
            '': type === 'normal'
          },
          {
            darkShadow: shadowStyle === 'dark',
            lightShadow: shadowStyle === 'light'
          },
          {
            squareCorner: corner === 'square',
            smallCorner: corner === 'small',
            filletCorner: corner === 'fillet',
            largeCorner: corner === 'large',
            fullCorner: corner === 'full'
          },
          { lightModal: theme === 'light', darkModal: theme === 'dark' }
        ]"
      >
        <div v-if="showHead" class="modalHeader">
          <slot name="header">
            <i v-if="icon !== ''" class="titleIcon" :class="icon" :style="[iconColorCount, iconFontSizeCount]"></i>
            <p :style="titleColorCount">{{ title }}</p>
          </slot>
          <i class="iconfont icon-cancel closeIcon" @click="close"></i>
        </div>
        <div class="modalBody" :style="[modalHeight, modalMaxHeight, modalScrollable, modalBodyCount]">
          <slot></slot>
        </div>
        <div v-if="footerShow" class="modalFooter">
          <slot name="footer">
            <button v-ripple class="normalButton" @click="close">
              {{ $t('lang.home.button.cancel') }}
            </button>
            <button v-ripple class="primaryButton" @click="confirm">
              {{ $t('lang.home.button.confirm') }}
            </button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    // 弹窗的开关
    value: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    iconColor: {
      type: [Number, String],
      default: ''
    },
    iconFontSize: {
      type: [Number, String],
      default: 16
    },
    // 是否显示遮罩层
    showMask: {
      type: Boolean,
      default: true
    },
    // 是否允许遮罩层关闭
    maskClosable: {
      type: Boolean,
      default: true
    },
    // title文字
    title: {
      type: [Number, String]
    },
    // 是否显示右上角关闭按钮图标  关闭后 Esc 按键也将屏蔽
    closeable: {
      type: Boolean,
      default: true
    },
    // 自定义类名
    className: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'light'
    },
    type: {
      type: String,
      default: 'normal'
    },
    // 自定义样式
    styles: {
      type: Object,
      default() {
        return {}
      }
    },
    // 自定义z-index
    zIndex: {
      type: Number,
      default: 250
    },
    // 是否显示底部栏
    footerShow: {
      type: Boolean,
      default: true
    },
    // 是否可以滚动body区域
    scrollable: {
      type: Boolean,
      default: false
    },
    // 自定义宽度  作用于container
    width: {
      type: [Number, String],
      default: 600
    },
    // 自定义高度  作用于body
    height: {
      type: [Number, String],
      default: 'auto'
    },
    // 自定义最大高度  作用于body
    maxHeight: {
      type: [Number, String],
      default: 'auto'
    },
    radius: {
      type: Number,
      default: -1
    },
    maskStyle: {
      type: String,
      default: 'dark'
    },
    shadow: {
      type: Boolean,
      default: true
    },
    shadowStyle: {
      type: String,
      default: 'light'
    },
    corner: {
      type: String,
      default: 'large'
    },
    color: {
      type: [Number, String],
      default: ''
    },
    titleColor: {
      type: [Number, String],
      default: ''
    },
    background: {
      type: [Number, String],
      default: 'none'
    }
  },
  data() {
    return {
      showModal: this.value,
      showHead: true,
      colorTheme: this.type
    }
  },
  methods: {
    // 点击右上角和默认关闭按钮时触发函数  外部调用@on-cancel()
    close() {
      this.showModal = false
      this.$emit('input', false)
      this.$emit('on-cancel')
    },
    confirm() {
      this.$emit('on-ok')
      this.close()
    },
    // 点击遮罩层触发事件
    handleMask() {
      if (this.closeable && this.showMask) {
        this.close()
      }
    },
    // 默认的底部按钮取消事件
    cancel() {
      this.close()
    }
  },
  mounted() {
    if (this.$slots.header === undefined && !this.title) {
      this.showHead = false
    }
  },
  computed: {
    modalBodyCount() {
      if (!this.showHead) {
        return { paddingTop: '48px' }
      }
      return {}
    },
    wrapStyles() {
      return {
        zIndex: this.zIndex
      }
    },
    modalWidth() {
      if (typeof this.width !== 'string') {
        if (this.width <= 100) {
          return {
            width: this.width + '%'
          }
        } else {
          return {
            width: this.width + 'px'
          }
        }
      } else {
        return {
          width: this.width
        }
      }
    },
    modalRadius() {
      if (this.radius !== -1) {
        return {
          borderRadius: this.radius + 'px!important'
        }
      } else {
        return {}
      }
    },
    modalColor() {
      if (this.color !== '') {
        if (typeof this.color === 'string') {
          return { color: this.color + '!important' }
        } else {
          return { color: '#' + this.color + '!important' }
        }
      }
      return {}
    },
    modalShadow() {
      if (!this.shadow) {
        return {
          boxShadow: '0 0 0 rgba(0, 0, 0, 0)!important'
        }
      } else {
        return {}
      }
    },
    modalHeight() {
      if (this.height !== 'auto') {
        return {
          height: this.height + 'px'
        }
      } else {
        return {
          height: this.height
        }
      }
    },
    modalMaxHeight() {
      if (this.maxHeight !== 'auto') {
        return {
          maxHeight: this.maxHeight + 'px'
        }
      } else {
        return {
          maxHeight: this.maxHeight
        }
      }
    },
    modalScrollable() {
      if (this.scrollable && this.maxHeight !== 'auto') {
        return {
          overflow: 'auto'
        }
      } else {
        return {
          overflow: 'hidden'
        }
      }
    },
    modalBackground() {
      if (this.background !== 'none') {
        if (typeof this.background === 'string') {
          return {
            backgroundColor: this.background + '!important'
          }
        } else {
          return {
            backgroundColor: '#' + this.background + '!important'
          }
        }
      }
      return {}
    },
    iconColorCount() {
      if (this.iconColor !== '') {
        if (typeof this.iconColor === 'string') {
          return { color: this.iconColor }
        } else {
          return { color: '#' + this.iconColor }
        }
      }
      return {}
    },
    iconFontSizeCount() {
      if (typeof this.iconFontSize === 'string') {
        return { fontSize: this.iconFontSize }
      } else {
        return { fontSize: this.iconFontSize + 'px' }
      }
    },
    titleColorCount() {
      if (this.titleColor !== '') {
        if (typeof this.titleColor === 'string') {
          return {
            color: this.titleColor + '!important'
          }
        } else {
          return {
            color: '#' + this.titleColor + '!important'
          }
        }
      }
      return {}
    }
  },
  watch: {
    value(val) {
      this.showModal = val
    }
  }
}
</script>

<style lang="scss" scoped></style>
