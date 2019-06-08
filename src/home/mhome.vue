<template>
    <div class="material">
        <header>Luna's Garden</header>
        <div class="header-spare"></div>
        <div class="material-bc"></div>
        <!--<SideBar v-on:metro="metro" v-on:glass="glass" v-on:material="material"/>-->
        <main>
            <section class="todo">
                <input type="text" class="add-input" placeholder="What are you going to do?" v-model="todoText" @keyup="keyup($event)" @keydown="keydown($event)">
                <ul class="list-group">
                    <li class="list-group-item list-group-item-text" v-for="(item,index) in arr" :key="index" :class="{'list-group-item-info':index==listIndex}" @click="click(index)">{{item}}</li>
                </ul>
                <button @click="addTodo" v-bind:value="todoText" class="make">Make A List</button>
            </section>
            <div class="links">
                <a href="http://bbs.colg.cn/forum-171-1.html">Colg</a>
                <a href="http://zhongguose.com">中国色</a>
                <a href="http://techbrood.com">Material Design</a>
                <a href="http://element-cn.eleme.io/#/zh-CN/component/cascader">Element-ui</a>
                <a href="http://kritsu.net/avatar">Avatar</a>
                <a href="http://bbs.exnpk.com">Ex-npk</a>
            </div>
        </main>

            <div class="material-items"><item
                    :todo="todo"
                    v-for="todo in filteredTodos"
                    :key = "todo.id"
                    @del="deleteTodo"
            /></div>

        <div class="bottom-spare"></div>
        <!--<tabs-->
        <!--:filter="filter"-->
        <!--:todos = "todos"-->
        <!--@toggle = "toggleFilter"-->
        <!--@clearAllCompleted = "clearAllCompleted"-->
        <!--/>-->
        <div class="footer-tabs">
            <span class="left">
            {{unFinishedTodoLength}} List
        </span>
            <div class="tabs">
                <span v-for="state in states" :key="state" :class="[state, filter === state ? 'actived' : '']" class="" @click="toggleFilter(state)" v-waves>{{state}}</span>
                <span class="clear" @click="clearAllCompleted" v-waves>Clear Completed</span>
            </div>
        </div>
        <footer>
            <button class="cr-btn"></button>
            <div class="link">
                <router-link to="./home" v-waves><figure>
                    <i class="iconfont icon-home"></i>
                    <figcaption>Home</figcaption>
                </figure></router-link>
                <router-link to="./pwKeeper" v-waves><figure>
                    <i class="iconfont icon-lock"></i>
                    <figcaption>PwKeeper</figcaption>
                </figure></router-link>
                <a href="http://www.卢娜.com/luna-ui.html" v-waves><figure>
                    <i class="iconfont icon-UI"></i>
                    <figcaption>Luna-UI</figcaption>
                </figure></a>
                <router-link to="./note" v-waves><figure>
                    <i class="iconfont icon-bijiicon-"></i>
                    <figcaption>Note</figcaption>
                </figure></router-link>
            </div>
        </footer>
    </div>
</template>

<script>
    import Item from './mtodoItem'
    // import Tabs from './todoTabs'
    // import SideBar from '../sideBar'
    import {load} from "../assets/public/js/firstLoad"
    import {Theme} from "../assets/public/js/loadTheme"

    let id = 0;
    export default {
        name: "home",
        data () {
            return{
                todos:[],
                todoText:'',
                states: ['all','active','completed'],
                filter:'all',
                wd: '',//关键词
                arr: [],//词组
                listIndex: -1,//初始索引
                theme:'material',//当前主题
            }
        },
        components : {
            Item,
        },
        created () {
            load();
            Theme();
            //判断移动端或者PC端
            let screenWidth = window.screen.width;
            if(screenWidth<768){
                this.$router.push("mhome")
            }else if (screenWidth>=768&&screenWidth<=1024) {
                this.$router.push("padhome")
            }else {
                this.$router.push("home")
            }
            var localData = JSON.parse(localStorage.getItem("todoList"));
            if(localData.length !== 0){
                this.todos=localData;
            }
            var localTheme = JSON.parse(localStorage.getItem("theme"));
            if(localTheme.length !== 0){
                this.theme=localTheme;
            }
            // console.log(this.theme);
        },
        computed : {
            filteredTodos(){
                if (this.filter === 'all') {
                    return this.todos
                }
                const completed = this.filter === 'completed';
                return this.todos.filter(todo => completed === todo.completed)
            },
            unFinishedTodoLength () {
                return this.todos.filter(todo => !todo.completed).length
            }
        },
        methods:{
            keyup (event) {
                if (event.keyCode == 38 || event.keyCode == 40 || event.keyCode == 13) return;
                var url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su"
                this.$http.jsonp(url, {
                    params: {
                        wd: this.todoText
                    },
                    jsonp: 'cb'
                }).then(res => {
                    this.arr = res.data.s;
                })
            },
            click(index){
                this.listIndex = index;
                this.todoText=this.arr[this.listIndex];
                window.open("https://cn.bing.com/search?q=" + this.todoText);
            },
            keydown(event) {
                //下键：40 上键：38
                if (event.keyCode == 38) {
                    //按的上键
                    this.listIndex--;
                    if (this.listIndex < 0) {
                        this.listIndex = this.arr.length - 1;
                    }
                    this.todoText = this.arr[this.listIndex];
                }
                else if (event.keyCode == 40) {
                    //说明你按的是下键
                    this.listIndex++;
                    if (this.listIndex > this.arr.length - 1) {
                        this.listIndex = 0;
                    }
                    this.todoText = this.arr[this.listIndex];
                } else if (event.keyCode == 13) {
                    window.open("https://cn.bing.com/search?q=" + this.todoText);
                }
            },
            addTodo (e) {
                var tempObj = {};
                var localData = JSON.parse(localStorage.getItem("todoList"));
                //非空验证
                if(this.todoText==""){
                    alert("Please type what you want.")
                } else{
                    //添加li
                    this.todos.push({
                        id : id++,
                        content: e.target.value.trim(),
                        completed:false,
                    });
                    // console.log(this.todos)
                    //设置储存条目内容
                    tempObj.id = id;
                    tempObj.content = e.target.value.trim();
                    tempObj.completed = false;
                    localData.push(tempObj);
                    //定义textContent以方便删除
                    this.textContent = localData;
                    //存入localStorage
                    localStorage.setItem("todoList" , JSON.stringify(localData))
                    //清空输入框
                    this.todoText = ""
                }
            },
            deleteTodo(id){
                this.todos.splice(this.todos.findIndex(todo => todo.id === id) , 1);
                //删除local对应的数据项
                //获取缓存数据
                var localData = JSON.parse(localStorage.getItem("todoList"));
                //删除缓存数据
                localData.splice(this.todos.findIndex,1);
                //保存缓存数据
                localStorage.setItem("todoList",JSON.stringify(localData));
            },
            toggleFilter(state){
                this.filter = state;
                // console.log(this.todos);
                localStorage.setItem("todoList",JSON.stringify(this.todos));
            },
            clearAllCompleted() {
                this.todos = this.todos.filter(todo => !todo.completed)
            },
            metro(){
                this.theme="metro";
                localStorage.setItem("theme",JSON.stringify(this.theme));
                this.$message({
                    type: 'success',
                    message: 'Your new theme : Metro Design has been updated,if nothing happen,please refresh your browser'
                });
                // location.reload()
            },
            glass(){
                this.theme="glass";
                localStorage.setItem("theme",JSON.stringify(this.theme));
                this.$message({
                    type: 'success',
                    message: 'Your new theme : Mordern Glass has been updated,if nothing happen,please refresh your browser'
                });
                // location.reload()
            },
            material(){
                this.theme="material";
                localStorage.setItem("theme",JSON.stringify(this.theme));
                this.$message({
                    type: 'success',
                    message: 'Your new theme : Material Design has been updated,if nothing happen,please refresh your browser'
                });
                // location.reload()
            },
        }
    }
</script>

<style scoped lang="scss">
    .links{
        width: 100%;
        padding: 10px 0 0 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        >a{
            color: #fff!important;
            margin: 0 10px;
        }
        >a:visited{
            color: #fff!important;
        }
    }
    .bottom-spare{
        height: 3rem;
        width: 100%;
    }
    .todo-item:last-of-type{
        margin-bottom: 0;
    }
    //
    //Material
    //
    .material{
        h1, h2, h3, h4, p {
            color: rgb(235, 114, 144);
        }
        a {
            text-decoration: none;
        }
        a:visited {
            color: rgb(235, 114, 144);
        }
        header {
            width: 100%;
            text-align: center;
            height: 3rem;
            line-height: 3rem;
            color: #fff;
            font-size: 24px;
            background-color: rgb(235, 114, 144);
            position: fixed;
            z-index: 999;
        }
        .make {
            background-color: #fff;
            color: #EB7290;
            font-size: 18px;
            border: 0;
            padding: 0 1rem;
            height: 2rem;
            line-height: 2rem;
            border-radius: 5px;
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
            position: absolute;
            right: calc(10% - 1rem);
            top: 1rem;
            cursor: pointer;
            transition:0.3s;
            z-index: 6;
        }
        .make:hover{
            background-color: rgb(255,255,255);
        }
        .header-spare {
            height: 3rem;
        }
        main {
            width: 100%;
            height: auto;
            position: relative;
            background-color: rgb(235, 114, 144);
            padding: 1rem 0;
            /*box-shadow: 2px 2px 10px rgba(33,33,33,0.3);*/
            .todo {
                text-align: center;
                > input {
                    width: 80%;
                    border-radius: 5px;
                    padding: 0 0.5rem;
                    border: 0;
                    background: rgba(255,255,255,0.5);
                    height: 2rem;
                    line-height: 2rem;
                    font-size: 18px;
                    z-index: 5;
                    outline: 0;
                    color: #fff;
                    transition: all 0.3s;
                    box-shadow: 2px 2px 10px rgba(33,33,33,0.3);
                    position: relative;
                }
                > input:hover {
                    background-color: rgba(255,255,255,0.3);
                    box-shadow: 2px 2px 4px rgba(33,33,33,0.5);
                }
                ::-ms-input-placeholder {
                    color: #fff;
                }
                ::-webkit-input-placeholder {
                    color: #fff;
                }
            }
        }
        .list-group {
            li {
                background-color: rgba(235, 114, 144, 0.7);
                border-bottom: 1px solid #eee;
                color: #fff;
                font-size: 22px;
                width: 80%;
                padding: 0 1rem;
                margin: 0 auto;
                list-style: none;
            }
            li:last-of-type {
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                border-bottom: 0;
            }
        }
        .footer-tabs {
            transition: 0.5s;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: rgb(235, 114, 144);
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
            width: 100%;
            /*margin: 0 calc(10% - 12px);*/
            color: #fff;
            position: fixed;
            bottom: 57px;
            height: 3rem;
            line-height: 3rem;
            z-index: 999;
            .left, .tabs {
                /*padding: 0 10px;*/
                box-sizing: border-box;
            }
            .left {
                width: 10%;
                text-align: center;
                font-size: 12px;
                margin-left: 12px;
            }
            .tabs {
                display: flex;
                justify-content: space-around;
                align-items: center;
                margin-right: 12px;
                > span {
                    transition: 0.5s;
                    font-size: 12px;
                    margin: auto 0.2rem;
                    height: 1.5rem;
                    line-height: 1.5rem;
                    border-radius: 4px;
                    display: inline-block;
                    padding: 4px 10px;
                    cursor: pointer;
                    background-color: rgba(33,33,33,0.2);
                    box-shadow: 2px 2px 10px rgba(33,33,33,0);
                    color: #fff;
                    &.actived {
                        background-color: rgba(255,255,255,0.4);
                        box-shadow: 2px 2px 10px rgba(33,33,33,0.3);
                        color: #fff;
                    }
                }
                > .clear {
                    cursor: pointer;
                    background-color: #A40000;
                    color: #fff;
                    padding: 4px 5px;
                }
            }
        }
        .material-bc{
            background-color: #ede3e7;
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 0
        }
        .material-items{
            width: 80%;
            position: relative;
            margin: 0 auto;
            margin-top: 1rem;
            box-shadow: 2px 2px 10px rgba(33,33,33,0.3);
            padding-right: 2rem;
            overflow: hidden;
            border-radius: 5px;
        }
        footer{
            width: 100%;
            height: 60px;
            line-height: 60px;
            /* background-color: #fff; */
            background:radial-gradient(75px at top,transparent 50%,rgb(235, 114, 144) 51%);
            background-position-y: -10px;
            position: fixed;
            z-index: 998;
            bottom: -10px;
            animation: leftMove 0.5s ease-out forwards;
            @keyframes leftMove
            {
                0%   {background-position-x: 110px;}
                40%  {background-position-x: 20px;}
                /*95%  {background-position-x: 133px;}*/
                100% {background-position-x: 0;}
            }
            @media screen and (max-device-width: 375px){
                @keyframes leftMove
                {
                    0%   {background-position-x: 100px;}
                    40%  {background-position-x: 15px;}
                    100% {background-position-x: 0;}
                }
            }
            .link{
                width: 90%;
                margin: 0 auto;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                a:visited{
                    color: #fff;
                }
                a{
                    color: #fff;
            figure{
                /*height: 60px;*/
                /*line-height: 60px;*/
                width: 44px;
                height: 44px;
                display: flex;
                align-items: center;
                flex-direction: column;
                color: #fff;
                i{
                    font-size: 25px;
                    height: 25px;
                    line-height: 25px;
                }
                figcaption{
                    line-height: 1rem;
                    font-size: 10px;
                }
            }
            }
            }
            button {
                background: rgb(235, 114, 144);
                /*background-color: rgba(255,255,255,0.5);*/
                color: #fff;
                width: 60px;
                height: 60px;
                font-size: 50px;
                text-align: center;
                line-height: 60px;
                border-radius: 100px;
                position: fixed;
                bottom: 30px;
                left: calc(50% - 30px);
                box-shadow: 0 2px 10px rgba(33,33,33,0.5);
                border: 0;
                padding: 0;
                margin: 0;
                animation: leftMove2 0.5s ease-out forwards;
                @keyframes leftMove2
                {
                    0%   {left:calc(50% + 80px)}
                    40%  {left: calc(50% - 10px);}
                    /*95%  {background-position-x: 133px;}*/
                    100% {left: calc(50% - 30px);}
                }
                @media screen and (max-device-width: 375px){
                    @keyframes leftMove2
                    {
                        0%   {left:calc(50% + 75px)}
                        40%  {left: calc(50% - 15px);}
                        100% {left: calc(50% - 30px);}
                    }
                }
            }
        }
    }
</style>
<style lang="scss">
    .material {
        .el-menu--collapse {
            position: fixed;
            z-index: 999;
            top: 54px;
            left: 0;
            height: calc(100% - 54px - 3rem);
            background-color: rgba(255, 255, 255, 0);
            .el-menu-item-group__title {
                span {
                    color: #333;
                }
            }
        }
        .el-submenu__title i, .el-menu-item i {
            color: rgb(235, 114, 144);
        }
        .el-menu--vertical {
            .el-menu {
                background-color: #fff!important;
                color: #333!important;
            }
        }
        .el-menu-item-group__title, .el-submenu__title {
            color: #cecece;
        }
        .el-menu-item {
            color: #333;
            text-decoration: none;
        }
        .el-menu-item:hover {
            background-color: #fff;
        }
        .el-submenu__title:hover {
            background-color: #fff;
        }
    }
</style>
