<template>
    <!--      <div style="position: absolute;top: 0; left: 0; width: 100px;height: 100px;background: red; cursor: pointer" @mousedown="drag"></div>-->
    <ul ref="parentNode"
        @dragstart="onDragStart"
        @dragover="onDragOver"
        @dragend="onDragEnd">
        <li v-for="(i,index) in list" :key="index" :draggable='true'>{{i}}</li>
    </ul>
</template>

<script>
    export default {
        name: "byteDemo",
        data() {
            return {
                list: [
                    '常用语1',
                    '常用语2',
                    '常用语3',
                    '常用语4',
                    '常用语5',
                    '常用语6',
                    '常用语7',
                    '常用语8',
                    '常用语9',
                    '常用语10',
                    '常用语11',
                ],
                dragging:null,//被拖拽的对象
                target:null,//目标对象
            }
        },
        methods: {
            onDragStart(event){
                console.log("drag start")
                this.dragging=event.target;
            },
            onDragOver(event){
                console.log('drag move')
                this.target=event.target;
                if (this.target.nodeName === "LI" && this.target !== this.dragging) {
                    if(this._index(this.dragging)<this._index(this.target)){
                        this.target.parentNode.insertBefore(this.dragging,this.target.nextSibling);
                    }else{
                        this.target.parentNode.insertBefore(this.dragging,this.target);
                    }
                }
            },
            onDragEnd(event){
                console.log('drag end')
                let currentNodes=Array.from(this.$refs.parentNode.childNodes);

                let data=currentNodes.map((i,index)=>{
                    let item = this.list.find(c=>c==i.innerText);
                    return item
                });
                console.log(data)
            },
            _index(el){
                let domData=Array.from(this.$refs.parentNode.childNodes);
                return domData.findIndex(i=>i.innerText==el.innerText);
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