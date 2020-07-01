<template>
  <div
    class="lunaCard"
    :style="[
      cardPadding,
      cardWidth,
      cardHeight,
      cardBackground,
      cardBorder,
      cardRadius,
      cardShadow,
      cardImage,
      flexStyle,
    ]"
    :class="[
      className,
      {
        squareCorner: corner === 'square',
        smallCorner: corner === 'small',
        filletCorner: corner === 'fillet',
        largeCorner: corner === 'large',
        fullCorner: corner === 'full',
        roundCorner: corner === 'round',
      },
      { lightCard: theme === 'light', darkCard: theme === 'dark' },
      {
        darkShadow: shadowTheme === 'dark',
        lightShadow: shadowTheme === 'light',
      },
    ]"
  >
    <div v-if="showHead" class="lunaCardTitle">
      <slot name="header">
        <i v-if="icon !== ''" :class="fontIcon"></i>
        <img v-if="icon !== ''" :src="imageIcon" alt="" />
        <span :style="cardFontSize">{{ title }}</span>
      </slot>
    </div>
    <div
      class="lunaCardBody"
      :style="cardScrollable"
      :class="{ flex: flex, block: !flex }"
    >
      <slot></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    showHead: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    iconColor: {
      type: [Number, String],
      default: 'none'
    },
    iconSize: {
      type: [Number, String],
      default: 'none'
    },
    fontSize: {
      type: Number,
      default: 16
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
    radius: {
      type: Number,
      default: -1
    },
    corner: {
      type: String,
      default: 'large'
    },
    background: {
      type: [Number, String],
      default: '#FEFEFE'
    },
    border: {
      type: [Number, String],
      default: '1px solid #EFEFEF'
    },
    // 宽度高度相关小于等于100为百分比，大于100为px
    width: {
      // 可选auto
      type: [Number, String],
      default: 100
    },
    maxWidth: {
      type: Number,
      default: 100
    },
    height: {
      type: [Number, String],
      default: 'auto'
    },
    padding: {
      type: [Number, String],
      default: 0
    },
    maxHeight: {
      type: [Number, String],
      default: 'auto'
    },
    scrollable: {
      type: Boolean,
      default: true
    },
    className: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    flex: {
      type: Boolean,
      default: true
    },
    direction: {
      type: String,
      default: 'column'
    },
    justify: {
      type: String,
      default: 'start'
    },
    align: {
      type: String,
      default: 'baseline'
    }
  },
  data () {
    return {
      fontIcon: '',
      imageIcon: ''
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
  computed: {
    cardFontSize () {
      if (typeof this.fontSize === 'string') {
        return { fontSize: this.fontSize }
      } else {
        return { fontSize: this.fontSize + 'px' }
      }
    },
    flexStyle () {
      return {
        flexDirection: this.direction,
        justifyContent: this.justify,
        itemsAlign: this.align
      }
    },
    cardBackground () {
      if (typeof this.background === 'string') {
        return { backgroundColor: this.background }
      } else {
        return { backgroundColor: '#' + this.background }
      }
    },
    cardImage () {
      return {
        backgroundImage: 'url("' + this.image + '")!important'
      }
    },
    cardBorder () {
      if (typeof this.border === 'string') {
        return { border: this.border }
      } else {
        return { border: this.border + 'px solid #EFEFEF' }
      }
    },
    cardPadding () {
      if (typeof this.padding === 'string') {
        return {
          padding: this.padding
        }
      } else {
        return {
          padding: this.padding + 'px'
        }
      }
    },
    cardWidth () {
      if (this.border !== '0') {
        if (this.width <= 100) {
          return {
            width:
              'calc(' + this.width + '% - ' + this.padding * 2 + 'px - 2px)'
          }
        } else {
          return {
            width: this.width - this.padding * 2 - 2 + 'px'
          }
        }
      } else {
        if (this.width <= 100) {
          return {
            width: 'calc(' + this.width + '% - ' + this.padding * 2 + 'px)'
          }
        } else {
          return {
            width: this.width - this.padding * 2 + 'px'
          }
        }
      }
    },
    containerShadowStyle () {
      if (this.shadowStyle !== '') {
        return { boxShadow: this.shadowStyle + '!important' }
      }
    },
    cardHeight () {
      if (this.border !== '0') {
        if (this.height <= 100) {
          return {
            height:
              'calc(' + this.height + '% - ' + this.padding * 2 + 'px - 2px)'
          }
        } else {
          return {
            height: this.height - this.padding * 2 - 2 + 'px'
          }
        }
      } else {
        if (this.height <= 100) {
          return {
            height: 'calc(' + this.height + '% - ' + this.padding * 2 + 'px)'
          }
        } else {
          return {
            height: this.height - this.padding * 2 + 'px'
          }
        }
      }
    },
    cardScrollable () {
      if (this.scrollable) {
        return {
          overflow: 'auto!important'
        }
      } else {
        return {
          overflow: 'hidden!important'
        }
      }
    },
    cardRadius () {
      if (this.radius !== -1) {
        return {
          borderRadius: this.radius + 'px!important'
        }
      } else {
        return {}
      }
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
    },
    cardShadow () {
      if (!this.shadow) {
        return {
          boxShadow: '0 0 0 rgba(0, 0, 0, 0)!important'
        }
      } else {
        return {}
      }
    }
  }
}
</script>

<style scoped></style>
