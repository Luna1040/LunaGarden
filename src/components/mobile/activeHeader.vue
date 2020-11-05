<template>
  <!--  H5常见标签header-->
  <header class="header" :class="{ collapse: isCollapse }">
    <!--    折叠标签后  共四个div分组-->
    <!--    用户区域-->
    <div class="userArea">
      <!--      @click即v-on:click的简写  语法糖-->
      <div class="userIcon" @click="showSettings">
        <!--        用户头像图片-->
        <img src="images/userIcons/userIcon.jpg" alt="" />
      </div>
    </div>
    <!--    Luna Garden的标题区域，分上面的写死标题Luna Garden与下方随页面更改的标题-->
    <div class="title">
      <p>Luna Garden</p>
      <!--      Vue常见的语法插值方式  在data或props中定义一个变量后，利用{{ xxx }}书写变量名，之后只要数据发生变化即会自动更改-->
      <h2>{{ msgHeader }}</h2>
    </div>
    <!--    H5常见标签nav  通常用作header下方的-->
    <transition name="modalAnimation">
      <nav v-show="!isCollapse" class="menuGroup">
        <!--      H5常见标签figure  通常结构为figure>img>figcaption，标准结构为上图下文字，在此处我使用i标签的字体图标代替了img标签-->
        <!--      这里利用v-for循环生成了菜单列表，:key即是v-bind:key的简写，语法糖，v-for必须声明每个遍历生成节点的key值才可正常进行一些工作，所以无论如何必须同时使用-->
        <!--        这里的:class是v-bind:class的缩写，语法糖。:class可以利用函数判断进行自动赋值，这里的函数意思为：当activeID等于这个menuItem的id时，为它增加一个叫做menuItemActive的class类名-->
        <figure v-for="i in menuList" :key="i.id" class="menuItem" :class="{ menuItemActive: activeID === i.id }" @click="choiceMenu(i.id, i.link)">
          <!--        这里的:class并没有书写函数表达式，意思为遍历数组内容时，用icon属性填充至class内-->
          <i class="iconfont" :class="i.icon"></i>
          <!--        -->
          <!--        这里是i-18n的表达式，通常是{{ $t('lang.menus.xx') }}这样书写，以调用对象下的值，但我们需要动态赋值xx时，可以利用[xx]进行赋值，与上述的写法是一样的效果-->
          <figcaption>{{ $t('lang.menus')[i.title] }}</figcaption>
        </figure>
      </nav>
    </transition>
    <div class="guide">
      <div class="btnGroup">
        <!--        这里的:class表达式，意为：当全局变量$i18n.locale不为'zh-CN'这个字符串时，为这个英文的图标添加名为languageActive的class，实现选中的高亮效果(注：因为目前只有中英双语，那么只能用中文做判断)-->
        <div :class="{ languageActive: $i18n.locale !== 'zh-CN' }" @click="setLang('en-US')">
          <img src="../../assets/icons/language-english.svg" alt />
        </div>
        <!--        这里的:class意为：等于'zh-CN'这个字符串时，与上方的:class是同一组-->
        <div :class="{ languageActive: $i18n.locale === 'zh-CN' }" @click="setLang('zh-CN')">
          <img src="../../assets/icons/language-chinese.svg" alt />
        </div>
      </div>
      <!--      这里是LunaUI中的Button组件，其中的属性均是自定义的属性，需要注意的是，当你需要往属性中填充数字类型，布尔类型值，或者函数的时候，需要在属性前加入:，即v-bind:属性名-->
      <Button color="#eb7290" icon="iconfont icon-guide" :icon-size="22" pre :width="130" :height="44" corner="full" @click="toAbout">
        <!--        由于LunaUI的Button组件内使用了插槽，所以可以在这个标签内包含自定义的信息，会将预设的组件内容改为自定义的内容-->
        <span>{{ $t('lang.titles.Guide') }}</span>
      </Button>
    </div>
  </header>
</template>

<script>
// Vue-cli中的script标签内，必须抛出一个默认函数，即export default函数
export default {
  // 该Vue组件的name
  name: 'app',
  // 这个header是一个子组件，用props来接收父组件传递来的值
  props: {
    // 动态变换的header信息
    msgHeader: {
      type: String,
      required: true
    },
    // 在app.vue中获取的用户信息
    // 由于是一个对象，所以默认值需要用箭头函数+return空对象实现
    userInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 在app.vue中获取的菜单数组
    // 由于是一个数组，所以默认值需要用箭头函数+return空数组实现
    menuList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 判断是否折叠header
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  // Vue中，此组件内可以动态更新的变量都会存储在data中，data必须return一个对象，之后才可在js中利用this.xx访问该变量，在template中利用xx访问该变量
  data() {
    return {
      navigator: {
        // 不加引号就是布尔类型
        onLine: true
      },
      imgSrc: '',
      langSlideDown: '',
      // 不加引号就是数字类型
      activeID: 1
    }
  },
  // 页面初始化完成后，立刻执行的函数，可以放在created内或mounted内，但mounted中一般存放钩子函数
  created() {
    // 这里的emit是向父组件传值，告诉父组件触发了这个事件，父组件可以利用函数@xx(即你定义的函数名)接收并进行接下来的处理
    this.$emit('cgLang', this.$t('lang'))
  },
  mounted() {
    this.navigator.onLine = window.navigator.onLine
    // 一个js的计时器，每过一秒都会获取浏览器的联网状态并更新数据至data下挂载的this.navigator对象中的online键下
    setInterval(this.getNavigator, 1000)
    // this.getData(publicApi.imgCode, {}).then(res => {
    //   this.imgSrc = res.data
    // })
  },
  // 这是vue的过滤器，通过接收一个值，来返回你想让用户看到的值
  filters: {
    languageTrans(value) {
      if (value === 'zh-CN') {
        value = '中文'
      } else {
        value = 'English'
      }
      return value
    }
  },
  // 这是Vue组件销毁前会执行的动作
  beforeDestroy() {
    if (this.timer) {
      // 如果定时器还在运行 直接关闭
      clearInterval(this.timer) // 关闭
    }
  },
  // 这里存放了在该组件中所有自定义的函数
  methods: {
    showSettings() {},
    // 设置语言，括号内为接收到的参数
    setLang(value) {
      this.$i18n.locale = value
    },
    getNavigator() {
      this.navigator.onLine = window.navigator.onLine
    },
    toAbout() {
      // 利用this.$router.push('/xx')实现路由跳转
      this.$router.push('/AboutUs')
    },
    choiceMenu(id, link) {
      this.activeID = id
      this.$router.push(link)
    }
  }
}
</script>

<style></style>
