<template>
    <div :class="['todo-item',todo.completed ? 'completed' : '' , theme]">
    <input type="checkbox" class="toggle" v-model="todo.completed">
        <label>CreatedTime:{{todo.nowTime}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Content:{{todo.content}}</label>
        <img src="../assets/images/close.png" class="destory" @click="deleteTodo"/>
    </div>
</template>

<script>
    export default {
        name: "item",
        data () {
            return{
                theme:'metro',
            }
        },
        props:{
            todo:{
                type:Object,
                required:true
            },
        },
        methods:{
            deleteTodo(){
                this.$emit('del' , this.todo.id)
            },
        }
    }
</script>

<style scoped lang="scss">
    .glass{
    .todo-item {
        cursor: pointer;
        position: relative;
        background-color: rgba(235,114,144,0.5);
        height: 2.5rem;
        line-height: 2.5rem;
        color: #fff;
        outline: 0;
        /*border-bottom: 1px solid rgba(0, 0, 0, 0.06);*/
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 24px;
        transition: all 0.5s;
        width: 80%;
        border-radius: 1rem;
        padding: 0 1rem;
        margin: 0.25rem auto;
        label {
            white-space: pre-line;
            word-break: break-all;
            -webkit-transition: color 0.4s;
            -moz-transition: color 0.4s;
            -ms-transition: color 0.4s;
            -o-transition: color 0.4s;
            transition: color 0.4s;
        }
        &.completed {
            label {
                color: deepskyblue;
                text-decoration: line-through;
                font-weight: bold;
            }
        }
    }
    .todo-item:hover{
        background-color: rgba(235,114,144,0.8);
    }
    .toggle{
        width: 2rem;
        height: 2rem;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: 0;
        background: url("../assets/images/check.png") center center no-repeat;
        background-size: contain;
        filter: brightness(1);
        -webkit-transition: 0.5s;
        -moz-transition: 0.5s;
        -ms-transition: 0.5s;
        -o-transition: 0.5s;
        transition: 0.5s;
    }
    .toggle:hover{
        filter: brightness(1);
    }
    .destory {
        outline: none;
        cursor: pointer;
        border-width: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 2rem;
        height: 2rem;
        filter: brightness(1);
        -webkit-transition: 0.5s;
        -moz-transition: 0.5s;
        -ms-transition: 0.5s;
        -o-transition: 0.5s;
        transition: 0.5s;
    }
    .destory:hover{
        filter: brightness(1);
    }
    }
    //
    //Metro
    //
    .metro{
        .todo-item {
            cursor: pointer;
            position: relative;
            background-color: rgba(235,114,144,1);
            height: 2.5rem;
            line-height: 2.5rem;
            color: #fff;
            outline: 0;
            /*border-bottom: 1px solid rgba(0, 0, 0, 0.06);*/
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 24px;
            transition: all 0.5s;
            width: 80%;
            /*border-radius: 1rem;*/
            padding: 0 1rem;
            margin: 0.25rem auto;
            label {
                white-space: pre-line;
                word-break: break-all;
                -webkit-transition: color 0.4s;
                -moz-transition: color 0.4s;
                -ms-transition: color 0.4s;
                -o-transition: color 0.4s;
                transition: color 0.4s;
            }
            &.completed {
                label {
                    color: deepskyblue;
                    text-decoration: line-through;
                    font-weight: bold;
                }
            }
        }
        .todo-item:hover{
            background-color: rgba(209,60,116,1);
        }
        .toggle{
            width: 2rem;
            height: 2rem;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            outline: 0;
            background: url("../assets/images/check.png") center center no-repeat;
            background-size: contain;
            -webkit-transition: 0.3s;
            -moz-transition: 0.3s;
            -ms-transition: 0.3s;
            -o-transition: 0.3s;
            transition: 0.3s;
        }
        .toggle:hover{
            transform: scale(1.2);
            filter:brightness(1.2);
        }
        .destory {
            outline: none;
            cursor: pointer;
            border-width: 0;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            width: 2rem;
            height: 2rem;
            -webkit-transition: 0.3s;
            -moz-transition: 0.3s;
            -ms-transition: 0.3s;
            -o-transition: 0.3s;
            transition: 0.3s;
        }
        .destory:hover{
            transform: scale(1.2) rotate(45deg);
        }
    }
    //
    //Material
    //
    .material{
        .todo-item {
            cursor: pointer;
            position: relative;
            background-color: #fff;
            height: 2.5rem;
            line-height: 2.5rem;
            color: rgb(235, 114, 144);
            outline: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 24px;
            width: 100%;
            padding: 0.25rem 1rem;
            /*margin: 0 auto;*/
            /*box-shadow: 2px 2px 10px rgba(33,33,33,0.3);*/
            label {
                white-space: pre-line;
                word-break: break-all;
                transition:0.3s;
            }
            &.completed {
                label {
                    color: deepskyblue;
                    text-decoration: line-through;
                    font-weight: bold;
                }
            }
        }
        .todo-item:before {
            content: "";
            position: absolute;
            /**** from left to right style ****/
        }
        .todo-item:after {
            content: "";
            position: absolute;
            -webkit-transition: 0.3s;
            transition: 0.3s;
            z-index: -1;
            background: transparent;
        }
        .todo-item:hover{
            color: #fff;
            z-index: 999;
        }
        .todo-item:hover:after {
            background: rgb(235, 114, 144);
            /*width: 100%;*/
            width: 100%;
        }
        .todo-item:after {
            top: 0;
            left: 0;
            width: 0;
            height: 100%;
        }
        .toggle{
            width: 2rem;
            height: 2rem;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            outline: 0;
            background: url("../assets/images/check.png") center center no-repeat;
            background-size: contain;
            filter: brightness(1);
            -webkit-transition: 0.5s;
            -moz-transition: 0.5s;
            -ms-transition: 0.5s;
            -o-transition: 0.5s;
            transition: 0.5s;
        }
        .toggle:hover{
            filter: brightness(1);
        }
        .destory {
            outline: none;
            cursor: pointer;
            border-width: 0;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            width: 2rem;
            height: 2rem;
            filter: brightness(1);
            -webkit-transition: 0.5s;
            -moz-transition: 0.5s;
            -ms-transition: 0.5s;
            -o-transition: 0.5s;
            transition: 0.5s;
        }
        .destory:hover{
            filter: brightness(1);
        }
    }
</style>
