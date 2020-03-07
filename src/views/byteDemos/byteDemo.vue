<template>
  <div>
    <!--      <div style="position: absolute;top: 0; left: 0; width: 100px;height: 100px;background: red; cursor: pointer" @mousedown="drag"></div>-->
    <ul
      @dragstart="onDragStart"
      @dragover="onDragOver"
      @dragend="onDragEnd"
      ref="listBody">
      <li
        v-for="(item,index) in list"
        :key="index"
        class="item"
        draggable="true"
      ><span>{{item.words}}</span></li>
    </ul>
    <!--        <textarea @focus="watchPaste" @blur="cancelPaste"></textarea>-->
    <!--        <div class="uploadImgPreview">-->
    <!--            <img v-for="(i,index) in imgList" :key="index" :src="i" alt=""/>-->
    <!--        </div>-->
  </div>
</template>

<script>
export default {
  name: 'byteDemo',
  data () {
    return {
      imgList: [],
      list: [
        { order: 1, words: '111' },
        { order: 2, words: '222' },
        { order: 3, words: '333' },
        { order: 4, words: '444' },
        { order: 5, words: '555' },
        { order: 6, words: '666' },
        { order: 7, words: '777' },
        { order: 8, words: '888' },
        { order: 9, words: '999' }
      ],
      dragging: null, // 被拖拽的对象
      target: null// 目标对象
    }
  },
  mounted () {
    // 为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
    document.body.ondrop = function (event) {
      event.preventDefault()
      event.stopPropagation()
    }
  },
  methods: {
    onDragStart (event) {
      this.draging = event.target
    },
    onDragOver (event) {
      this.target = event.target
      let targetTop = event.target.getBoundingClientRect().top
      let dragingTop = this.draging.getBoundingClientRect().top
      if (this.target.nodeName === 'LI' && this.target !== this.draging) {
        if (this.target) {
          if (this.target.animated) {
            return
          }
        }

        if (this._index(this.draging) < this._index(this.target)) {
          this.target.parentNode.insertBefore(this.draging, this.target.nextSibling)
        } else {
          this.target.parentNode.insertBefore(this.draging, this.target)
        }
        this._anim(targetTop, this.target)
        this._anim(dragingTop, this.draging)
      }
    },
    onDragEnd (event) {
      let currentNodes = Array.from(this.$refs.listBody.childNodes)
      let data = currentNodes.map((i, index) => {
        let item = this.list.find(c => c.words === i.childNodes[0].innerText)
        return {
          order: index + 1,
          words: item.words
        }
      })
      console.log(data)
    },
    _index (el) {
      let domData = Array.from(this.$refs.listBody.childNodes)
      console.log(el.childNodes[0].innerText)
      return domData.findIndex(i => i.childNodes[0].innerText === el.childNodes[0].innerText)
    },
    _anim (startPos, dom) {
      let offset = startPos - dom.getBoundingClientRect().top
      dom.style.transition = 'none'
      dom.style.transform = `translateY(${offset}px)`

      // 触发重绘
      dom.offsetWidth
      dom.style.transition = 'transform .3s'
      dom.style.transform = ``
      clearTimeout(dom.animated)

      dom.animated = setTimeout(() => {
        dom.style.transition = ''
        dom.style.transform = ``
        dom.animated = false
      }, 300)
    },
    watchPaste () {
      document.body.addEventListener('paste', this.handelPaste)
    },
    cancelPaste () {

    },
    handelPaste (e) {
      const { clipboardData } = e
      const { items, types } = clipboardData
      // console.log('ea', clipboardData, items, types)
      let item = items[0]
      for (let i = 0; i < types.length; i++) {
        if (types[i] === 'Files') {
          item = items[i]
          break
        }
      }
      if (item && item.kind === 'file' && item.type.match(/^image\//i)) {
        this.ceshi(item)
      }
    },
    ceshi (item) {
      const blob = item.getAsFile()
      const reader = new FileReader()
      reader.onload = e => {
        this.imgList.push(e.target.result)
        // const img = new Image()
        // img.src = e.target.result
        // console.log(img)
        // document.body.appendChild(img)
      }
      reader.readAsDataURL(blob)
    }
  }
}
</script>

<style lang="scss" scoped>
  ul{
    position: relative;
    background-color: #FFFFFF;
    overflow: auto;
    height: 200px;
    -webkit-overflow-scrolling: auto!important;
    li{
      height: 32px;
      line-height: 32px;
      transition: background-color 0.3s;
      cursor: pointer;
      position: relative;
      top: 0;
      -o-user-select: none;
      -moz-user-select: none; /*火狐 firefox*/
      -webkit-user-select: none; /*webkit浏览器*/
      -ms-user-select: none; /*IE10+*/
      -khtml-user-select :none; /*早期的浏览器*/
      user-select: none;
    }
    li:hover{
      background-color: lightblue;
    }
  }
  .uploadImgPreview{
    img{
      width: 50px;
      margin-right: 16px;
    }
    img:last-of-type{
      margin-right: 0;
    }
  }
  ul{
    list-style:none;
    /*padding-bottom:20px;*/
  }
  .item{
    cursor: pointer;
    line-height:24px;
    background-color:#9c9c9c;
    border:1px solid #d9d9d9;
    border-radius:4px;
    color:#fff;
    padding:10px;
  }
</style>
