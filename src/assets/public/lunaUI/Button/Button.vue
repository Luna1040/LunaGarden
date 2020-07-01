<template>
  <button
    v-ripple
    class="lunaButton"
    :style="[styles, buttonStyles]"
    :class="[
      className,
      {
        errorButton: theme === 'error',
        successButton: theme === 'success',
        warningButton: theme === 'warning',
        primaryButton: theme === 'primary',
        alertButton: theme === 'alert',
        lightButton: theme === 'light',
        darkButton: theme === 'dark',
      },
      {
        darkShadow: shadowTheme === 'dark',
        lightShadow: shadowTheme === 'light',
      },
      {
        squareCorner: corner === 'square',
        smallCorner: corner === 'small',
        filletCorner: corner === 'fillet',
        largeCorner: corner === 'large',
        fullCorner: corner === 'full',
        roundCorner: corner === 'round',
      },
      {
        '': type === 'normal',
        textButton: type === 'text',
        ghostButton: type === 'ghost',
      },
    ]"
    :disabled="disabled"
    @click="click()"
  >
    <i
      v-if="pre && fontIcon !== ''"
      :style="[iconFontSize, iconFontColor]"
      :class="fontIcon"
      class="pre"
    ></i>
    <img
      v-if="pre && imageIcon !== ''"
      :src="imageIcon"
      class="buttonImg pre"
    />
    <slot></slot>
    <i
      v-if="suffix && fontIcon !== ''"
      :style="[iconFontSize, iconColor]"
      :class="fontIcon"
      class="suffix"
    ></i>
    <img
      v-if="suffix && imageIcon !== ''"
      :src="imageIcon"
      class="buttonImg suffix"
    />
    <div v-if="badge" class="lunaBadge">
      <span v-if="badgeType === 'number'">{{ badgeCount }}</span>
    </div>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    width: {
      type: [Number, String],
      default: 'auto'
    },
    height: {
      type: [Number, String],
      default: 32
    },
    color: {
      type: [Number, String],
      default: 'none'
    },
    background: {
      type: [String, Number],
      default: 'none'
    },
    fontSize: {
      type: [Number, String],
      default: '12px'
    },
    border: {
      type: [Number, String],
      default: '1px solid #FFF'
    },
    shadow: {
      type: Boolean,
      default: true
    },
    shadowTheme: {
      type: String,
      default: 'dark'
    },
    shadowStyle: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'light'
    },
    className: {
      type: String,
      default: ''
    },
    styles: {
      type: Object,
      default () {
        return {}
      }
    },
    padding: {
      type: [String, Number],
      default: '0 16px'
    },
    margin: {
      type: [String, Number],
      default: ''
    },
    radius: {
      type: [Number, String],
      default: -1
    },
    corner: {
      type: String,
      default: 'large'
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'normal'
    },
    badge: {
      type: Boolean,
      default: false
    },
    badgeType: {
      type: String,
      default: 'dot'
    },
    badgeCount: {
      type: Number,
      default: 0
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
    long: {
      type: Boolean,
      default: false
    },
    iconColor: {
      type: [Number, String],
      default: 'none'
    },
    iconSize: {
      type: [Number, String],
      default: 'none'
    }
  },
  data () {
    return {
      fontIcon: '',
      imageIcon: ''
    }
  },
  computed: {
    buttonStyles () {
      const styles = {}
      if (this.background !== 'none') {
        if (typeof this.background === 'string') {
          styles.background = this.background
        } else {
          styles.background = '#' + this.background
        }
      }
      if (typeof this.border === 'string') {
        styles.border = this.border
      } else {
        styles.border = '1px solid #' + this.border
      }
      if (this.corner === 'round') {
        if (typeof this.width === 'string' && this.width !== 'auto') {
          styles.minWidth = this.width
          styles.width = this.width
        } else {
          styles.minWidth = this.width + 'px'
          styles.width = this.width + 'px'
        }
      } else {
        if (typeof this.width === 'string') {
          styles.width = this.width
        } else {
          styles.width = this.width + 'px'
        }
      }
      if (typeof this.height === 'string') {
        styles.height = this.height
        styles.lineHeight = this.height
      } else {
        styles.height = this.height + 'px'
        styles.lineHeight = this.height + 'px'
      }
      if (typeof this.padding === 'string') {
        styles.padding = this.padding
      } else {
        styles.padding = '0 ' + this.padding + 'px'
      }
      if (this.margin !== '') {
        if (typeof this.margin === 'string') {
          styles.margin = this.margin
        } else {
          styles.margin = '0 ' + this.margin + 'px'
        }
      }
      if (this.shadowStyle !== '') {
        styles.boxShadow = this.shadowStyle + '!important'
      }
      if (this.radius !== -1) {
        if (typeof this.radius === 'string') {
          styles.borderRadius = this.radius
        } else {
          styles.borderRadius = this.radius + 'px'
        }
      }
      if (this.color !== 'none') {
        if (typeof this.color === 'string') {
          styles.color = this.color
        } else {
          styles.color = '#' + this.color
        }
      }
      if (typeof this.fontSize === 'string') {
        styles.fontSize = this.fontSize
      } else {
        styles.fontSize = this.fontSize + 'px'
      }
      if (this.long) {
        styles.width = '100%'
      }
      return styles
    },
    iconFontSize () {
      if (this.iconSize !== 'none') {
        if (typeof this.iconSize === 'string') {
          return { fontSize: this.iconSize }
        } else {
          return { fontSize: this.iconSize + 'px' }
        }
      } else {
        if (typeof this.fontSize === 'string') {
          return { fontSize: this.fontsize }
        } else {
          return { fontSize: this.fontSize + 'px' }
        }
      }
    },
    iconFontColor () {
      if (this.iconColor !== '') {
        if (this.iconColor !== 'none') {
          if (typeof this.iconColor === 'string') {
            return { color: this.iconColor }
          } else {
            return { color: '#' + this.iconColor }
          }
        }
      } else {
        if (this.color !== 'none') {
          if (typeof this.color === 'string') {
            return { color: this.color }
          } else {
            return { color: '#' + this.color }
          }
        }
      }
    }
  },
  mounted () {
    const icon = this.icon
    // 为了避免转义反斜杠出问题，这里将对其进行转换
    const re = /(\\+)/g
    const filename = icon.replace(re, '#')
    // 对路径字符串进行剪切截取
    const fileArray = filename.split('#')
    // 获取数组中最后一个，即文件名
    const fileName = fileArray[fileArray.length - 1]
    // 再对文件名进行截取，以取得后缀名
    const suffixName = fileName.split('.')
    // 获取截取的最后一个字符串，即为后缀名
    const last = suffixName[suffixName.length - 1]
    // 添加需要判断的后缀名类型
    const tp = 'jpg,svg,png,JPG,SVG,PNG'
    // 返回符合条件的后缀名在字符串中的位置
    const rs = tp.indexOf(last)
    // 如果返回的结果大于或等于0
    if (rs >= 0) {
      this.imageIcon = this.icon
    } else {
      this.fontIcon = this.icon
    }
  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped></style>
