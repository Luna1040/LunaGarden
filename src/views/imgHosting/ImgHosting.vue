<template>
  <div class="imgHosting">
    <button v-ripple class="fluidButton" :title="$t('lang.todoPanel.PST')">
      <i class="font_family icon-LunaPlus"></i>
    </button>
    <div class="viewArea">
      <div v-for="i in imgList" :key="i.id" class="imgPreview">
        <img ref="imgPreview" :src="i.src" alt="" :class="countViewerFormat(i.src)" />
        <div class="mask">
          <Button type="text" theme="primary" color="#FFFFFF!important" @click="handlePreview(i.src)">预览图片</Button>
          |
          <Button type="text" theme="primary" color="#FFFFFF!important" @click="handleCopy(i.src)">复制链接</Button>
        </div>
      </div>
    </div>
    <input ref="copyInput" v-model="previewSrc" style="opacity: 0;" type="text" />
    <transition name="modalAnimation">
      <div v-if="showPreview" class="previewArea" @click="hidePreview">
        <div class="tools" @click.prevent @click.stop></div>
        <img ref="pre" :src="previewSrc" :class="countViewerFormat(previewSrc)" alt="" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ImgHosting',
  data() {
    return {
      imgList: [],
      previewSrc: '',
      showPreview: false,
      scale: 1,
      time: false
    }
  },
  created() {
    this.imgList = [
      {
        id: '1',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '2',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '3',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '4',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '5',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '6',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '7',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '8',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '9',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '10',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '11',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '12',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '13',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '14',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '15',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '16',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '17',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '18',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '19',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '20',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '21',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '22',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '23',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '24',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '25',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '26',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '27',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '28',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '29',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
      {
        id: '30',
        src: 'https://lunagarden.net/res/Luna1607329889664.jpg'
      },
    ]
  },
  watch: {
    showPreview() {
      if (this.showPreview) {
        setInterval(() => {
          this.time = true
        }, 200)
        window.body.onmousewheel = (ev) => {
          if (this.time) {
            if (ev.wheelDeltaY < 0) {
              this.Shrink()
              this.time = false
              return
            }
            this.Amplification()
            this.time = false
          }
        }
      }
    }
  },
  methods: {
    countViewerFormat(src) {
      const a = new Image()
      a.src = src
      const width = a.width
      const height = a.height
      if (width < height || width === height) {
        return 'widthFormat'
      } else {
        return 'heightFormat'
      }
    },
    handleCopy(src) {
      this.previewSrc = src
      this.$nextTick(() => {
        this.$refs.copyInput.select()
        document.execCommand('copy')
        this.$Message.success({content: '复制成功！'})
      })
    },
    handlePreview(src) {
      this.previewSrc = src
      this.showPreview = true
    },
    hidePreview() {
      this.showPreview = false
      this.previewSrc = ''
      this.scale = 1
    },
    Shrink() {
      if (this.scale !== 0) {
        this.scale = this.scale - 0.1
        this.$refs.pre.style.transform = 'scale(' + this.scale + ')'
      }
    },
    Amplification() {
      this.scale = this.scale + 0.1
      this.$refs.pre.style.transform = 'scale(' + this.scale + ')'
    }
  }
}
</script>

<style scoped></style>
