<template>
    <div>
    <!--      <div style="position: absolute;top: 0; left: 0; width: 100px;height: 100px;background: red; cursor: pointer" @mousedown="drag"></div>-->
    <ul ref="parentNode"
        @dragstart="onDragStart"
        @dragover="onDragOver"
        @dragend="onDragEnd">
        <li v-for="(i,index) in list" :key="index" :draggable='true'>
            <span>{{index + 1}}.{{i.value}}</span>
        </li>
    </ul>
    </div>
</template>

<script>
export default {
  name: 'byteDemo',
  data () {
    return {
      list: [
        { id: '1', value: '111' },
        { id: '2', value: '222' },
        { id: '3', value: '333' },
        { id: '4', value: '444' },
        { id: '5', value: '555' },
        { id: '6', value: '666' },
        { id: '7', value: '777' },
        { id: '8', value: '888' },
        { id: '9', value: '999' }
      ],
      dragging: null, // 被拖拽的对象
      target: null// 目标对象
    }
  },
  methods: {
    onDragStart (event) {
      this.dragging = event.target.childNodes[0]
    },
    onDragOver (event) {
        console.log(event.target.childNodes[0])
        this.target = event.target.childNodes[0]
      if (this.target.nodeName === 'SPAN' && this.target !== this.dragging) {
        if (this._index(this.dragging) < this._index(this.target)) {
          this.target.parentNode.parentNode.insertBefore(this.dragging, this.target.parentNode.nextSibling.childNodes[0])
        } else {
          this.target.parentNode.parentNode.insertBefore(this.dragging.parentNode, this.target.parentNode)
        }
      }
    },
    onDragEnd (event) {
      let currentNodes = Array.from(this.$refs.parentNode.childNodes)
      let data = []
      currentNodes.forEach((item, index) => {
        this.list.forEach((i, index2) => {
          if (i.value === item.innerText) {
            data.push(i)
            // this.list[index]
          }
        })
      })
      console.log(data)
    },
    _index (el) {
      let domData = Array.from(this.$refs.parentNode.childNodes[0])
      return domData.findIndex(i => i.innerText === el.innerText)
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
</style>
