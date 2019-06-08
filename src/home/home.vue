<template>
    <div :class="theme">
        <header>Luna's Garden</header>
        <div class="header-spare"></div>
        <div class="material-bc"></div>
        <SideBar v-on:metro="metro" v-on:glass="glass" v-on:material="material"/>
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
            <div class="material-items"><item
                    :todo="todo"
                    :nowTime = "todo.nowTime"
                    v-for="todo in filteredTodos"
                    :key = "todo.id"
                    @del="deleteTodo"
            /></div>
        </main>
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
                <span v-for="state in states" :key="state" :class="[state, filter === state ? 'actived' : '']" @click="toggleFilter(state)" v-waves>{{state}}</span>
                <span class="clear" @click="clearAllCompleted" v-waves>Clear Completed</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Item from './todoItem'
    // import Tabs from './todoTabs'
    import SideBar from '../sideBar'
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
                nowTime:"",
            }
        },
        components : {
            Item,
            // Tabs,
            SideBar,
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
                // console.log(this.todos);
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
            timeFormate(timeStamp) {
                let year = new Date(timeStamp).getFullYear();
                let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
                let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
                let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
                let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
                // let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
                // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
                this.nowTime = month + "/" + date +"/"+year + "/" +hh+":"+mm ;
                // console.log(this.nowTime);
            },
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
                this.timeFormate(new Date());
                var tempObj = {};
                var localData = JSON.parse(localStorage.getItem("todoList"));

                //非空验证
                if(this.todoText==""){
                    alert("Please type what you want.")
                } else{
                    //添加li
                    this.todos.push({
                        id : id++,
                        nowTime:this.nowTime,
                        content: e.target.value.trim(),
                        completed:false,
                    });
                    // console.log(this.todos)
                    //设置储存条目内容
                    tempObj.id = id;
                    tempObj.nowTime = this.nowTime;
                    tempObj.content = e.target.value.trim();
                    tempObj.completed = false;
                    localData.push(tempObj);
                    //定义textContent以方便删除
                    this.textContent = localData;
                    //存入localStorage
                    localStorage.setItem("todoList" , JSON.stringify(localData));
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
        text-align: center;
        padding: 20px 0 0 0;
        a{
            color: #eb7290;
            margin: 0 20px;
        }
        a:visited{
            color: #eb7290!important;
        }
    }
    .bottom-spare{
        height: 3rem;
        width: 100%;
    }
    .todo-item:last-of-type{
        margin-bottom: 0;
    }
    .glass {
        h1, h2, h3, h4, p {
            color: #fff;
        }
        a {
            text-decoration: none;
        }
        a:visited {
            color: #333;
        }
        header {
            width: 100%;
            text-align: center;
            height: 54px;
            line-height: 54px;
            color: #fff;
            font-size: 24px;
            position: fixed;
            z-index: 999;
        }
        .make {
            background-color: rgba(255,255,255,0.7);
            color: #EB7290;
            font-size: 24px;
            border: 0;
            padding: 0 1rem;
            height: 3rem;
            line-height: 3rem;
            border-radius: 1rem;
            position: absolute;
            right: calc(10% - 1rem);
            top: 0;
            cursor: pointer;
            transition:0.3s;
        }
        .make:hover{
            background-color: rgba(255, 255, 255, 1);
        }
        .header-spare {
            height: 3rem;
        }
        main {
            width: 100%;
            height: auto;
            position: relative;
            .todo {
                text-align: center;
                > input {
                    width: 80%;
                    border: 0;
                    border-radius: 1rem;
                    padding: 0 1rem;
                    background: rgba(255, 255, 255, 0.5);
                    height: 3rem;
                    line-height: 3rem;
                    font-size: 24px;
                    z-index: 1;
                    outline: 0;
                    color: #fff;
                    transition: all 0.3s;
                }
                > input:hover {
                    background-color: rgba(255, 255, 255, 0.2);
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
            li:first-of-type {
                border-top-left-radius: 1rem;
                border-top-right-radius: 1rem;
            }
            li:last-of-type {
                border-bottom-left-radius: 1rem;
                border-bottom-right-radius: 1rem;
                border-bottom: 0;
            }
        }
        .footer-tabs{
            transition: 0.5s;
            font-weight: 400;
            display: flex;
            justify-content: space-between;
            background-color: rgba(255, 255, 255, 0.3);
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
            width: 80%;
            color: #fff;
            padding: 0 10%;
            position: fixed;
            bottom: 0;
            height: 3rem;
            line-height: 3rem;
            .left, .tabs {
                padding: 0 10px;
                box-sizing: border-box;
            }
            .left {
                text-align: left;
                font-size: 20px;
            }

            .tabs {
                /*width:200px;*/
                display: flex;
                justify-content: space-between;
                > span {
                    -webkit-transition: 0.5s;
                    -moz-transition: 0.5s;
                    -ms-transition: 0.5s;
                    -o-transition: 0.5s;
                    transition: 0.5s;
                    font-size: 20px;
                    margin: auto 0.5rem;
                    height: 1.5rem;
                    line-height: 1.5rem;
                    border-radius: 10px;
                    display: inline-block;
                    padding: 0.2rem 10px;
                    cursor: pointer;
                    background-color: #fff;
                    color: #EB7290;
                    &.actived {
                        background-color: #EB7290;
                        color: #fff;
                    }
                }
                > .clear {
                    cursor: pointer;
                    background-color: #A40000;
                    color: #fff;
                }
            }
        }
        @media (max-width: 768px) {
            .glass {
                width: 100%;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .left {
                    padding-right: 0;
                }
                .tabs {
                    padding: 0;
                }
                .tabs > span {
                    margin: 0 0.25rem;
                    padding: 0.2rem 0.2rem;
                    font-size: 16px;
                }
            }
        }
        @media (max-width: 376px) {

        }
    }
    //
    //Metro Design
    //
    .metro{
        h1, h2, h3, h4, p {
            color: #fff;
        }
        a {
            text-decoration: none;
        }
        a:visited {
            color: #333;
        }
        header {
            width: 100%;
            text-align: center;
            height: 54px;
            line-height: 54px;
            color: #fff;
            font-size: 24px;
            position: fixed;
            z-index: 999;
        }
        .make {
            background-color: #fff;
            color: #EB7290;
            font-size: 24px;
            border: 0;
            padding: 0 1rem;
            height: 3rem;
            line-height: 3rem;
            /*border-radius: 1rem;*/
            position: absolute;
            right: calc(10% - 1rem);
            top: 0;
            cursor: pointer;
            width: 19.7%;
            transition:0.5s
        }
        .make:hover{
            background-color: rgba(255, 255, 255, 0.8);
        }
        .header-spare {
            height: 3rem;
        }
        main {
            width: 100%;
            height: auto;
            position: relative;
            .todo {
                text-align: center;
                > input {
                    width: 60%;
                    position: relative;
                    left: -10%;
                    border: 0;
                    /*border-radius: 1rem;*/
                    padding: 0 1rem;
                    background: rgba(255, 255, 255,1);
                    height: 3rem;
                    line-height: 3rem;
                    font-size: 24px;
                    z-index: 1;
                    outline: 0;
                    color: #636363;
                    transition: all 0.5s;
                }
                > input:hover {
                    background-color: rgba(255, 255, 255, 0.8);
                }
                ::-ms-input-placeholder {
                    color: #999999;
                }
                ::-webkit-input-placeholder {
                    color: #999999;
                }
            }
        }
        .list-group {
            li {
                background-color: rgba(209,60,116, 1);
                border-bottom: 1px solid #eee;
                color: #fff;
                font-size: 22px;
                width: 80%;
                padding: 0.2rem 1rem;
                margin: 0 auto;
                list-style: none;
                transition:0.3s;
                cursor: pointer;
            }
            li:hover{
                font-size: 30px;
                background-color: rgba(235,114,144,1);
                /*border-left: 3px solid #fff;*/
            }
            li:first-of-type {
                /*border-top-left-radius: 1rem;*/
                /*border-top-right-radius: 1rem;*/
            }
            li:last-of-type {
                /*border-bottom-left-radius: 1rem;*/
                /*border-bottom-right-radius: 1rem;*/
                border-bottom: 0;
            }
        }
        .footer-tabs {
            transition: 0.5s;
            font-weight: 400;
            display: flex;
            justify-content: space-between;
            background-color: rgba(255, 255, 255, 0.3);
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
            width: 80%;
            color: #fff;
            padding: 0 10%;
            position: fixed;
            bottom: 0;
            height: 3rem;
            line-height: 3rem;

            .left, .tabs {
                padding: 0 10px;
                box-sizing: border-box;
            }
            .left {
                text-align: left;
                font-size: 20px;
            }
            .tabs {
                /*width:200px;*/
                display: flex;
                justify-content: space-between;
                > span {
                    -webkit-transition: 0.8s;
                    -moz-transition: 0.8s;
                    -ms-transition: 0.8s;
                    -o-transition: 0.8s;
                    transition: 0.8s;
                    font-size: 20px;
                    margin: auto 0.5rem;
                    height: 1.5rem;
                    line-height: 1.5rem;
                    /*border-radius: 10px;*/
                    display: inline-block;
                    padding: 0.2rem 10px;
                    cursor: pointer;
                    background-color: #fff;
                    color: #EB7290;
                    &.actived {
                        background-color: #EB7290;
                        color: #fff;
                    }
                }
                > .clear {
                    cursor: pointer;
                    background-color: #A40000;
                    color: #fff;
                }
            }
        }
        @media (max-width: 768px) {
            .metro {
                width: 100%;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .left {
                    padding-right: 0;
                }
                .tabs {
                    padding: 0;
                }
                .tabs > span {
                    margin: 0 0.25rem;
                    padding: 0.2rem 0.2rem;
                    font-size: 16px;
                }
            }
        }
        @media (max-width: 376px) {

        }
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
            height: 54px;
            line-height: 54px;
            color: rgb(235, 114, 144);
            font-size: 24px;
            /*background-color: #fff;*/
            position: fixed;
            z-index: 999;
        }
        .make {
            background-color: #EB7290;
            color: #fff;
            font-size: 24px;
            border: 0;
            padding: 0 1rem;
            height: 3rem;
            line-height: 3rem;
            border-radius: 5px;
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
            border-bottom-right-radius: 0;
            position: absolute;
            right: calc(10% - 1rem);
            top: 0;
            cursor: pointer;
            transition:0.3s;
        }
        .make:hover{
            background-color: #CC607A;
        }
        .header-spare {
            height: 3rem;
        }
        main {
            /*width: calc(100% - 130px);*/
            /*margin-left: 65px;*/
            width: 100%;
            height: auto;
            position: relative;
            /*box-shadow: 2px 2px 10px rgba(33,33,33,0.3);*/
            .todo {
                text-align: center;
                > input {
                    width: 80%;
                    border-radius: 5px;
                    border-bottom-right-radius: 0;
                    border-bottom-left-radius: 0;
                    padding: 0 1rem;
                    border: 0;
                    background: #fff;
                    height: 3rem;
                    line-height: 3rem;
                    font-size: 24px;
                    z-index: 1;
                    outline: 0;
                    color: #333;
                    transition: background-color 0.3s;
                    box-shadow: 2px 2px 10px rgba(33,33,33,0.3);
                }
                > input:hover {
                    background-color: rgba(255,255,255,0.5);
                    box-shadow: 2px 2px 4px rgba(33,33,33,0.3);
                }
                ::-ms-input-placeholder {
                    color: #333;
                }
                ::-webkit-input-placeholder {
                    color: #999;
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
            font-weight: 400;
            display: flex;
            justify-content: space-between;
            background-color: rgb(235, 114, 144);
            -webkit-font-smoothing: antialiased;
            font-smoothing: antialiased;
            width: 80%;
            color: #fff;
            padding: 0 10%;
            position: fixed;
            bottom: 0;
            height: 3rem;
            line-height: 3rem;
            .left, .tabs {
                padding: 0 10px;
                box-sizing: border-box;
            }
            .left {
                text-align: left;
                font-size: 20px;
            }
            .tabs {
                /*width:200px;*/
                display: flex;
                justify-content: space-between;
                > span {
                    -webkit-transition: 0.5s;
                    -moz-transition: 0.5s;
                    -ms-transition: 0.5s;
                    -o-transition: 0.5s;
                    transition: 0.5s;
                    font-size: 20px;
                    margin: auto 0.5rem;
                    height: 1.5rem;
                    line-height: 1.5rem;
                    border-radius: 4px;
                    display: inline-block;
                    padding: 0.2rem 10px;
                    cursor: pointer;
                    background-color: rgba(33,33,33,0.2);
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
                }
            }
        }
        .material-bc{
            background-color: #ede3e7;
            width: 100%;
            height: 100%;
            position: absolute;
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
        .ripple {
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgb(235, 114, 144);
            transform: scale(0);
            position: absolute;
            opacity: 1;
        }
        .rippleEffect {
            animation: rippleDrop 1s linear;
        }
        @keyframes rippleDrop {
            100% {
                transform: scale(5);
                opacity: 0;
            }
        }
    }
</style>
<style lang="scss">
    .glass{
        .el-menu--collapse{
            position: fixed;
            z-index: 999;
            top: 54px;
            left: 0;
            height: calc(100% - 54px - 3rem);
            background-color: rgba(255,255,255,0);
            .el-menu-item-group__title {
                span {
                    color: #333;
                }
            }
        }
        .el-submenu__title i,.el-menu-item i{
            color: #fff;
        }
        .el-menu--vertical{
            .el-menu{
                background-color: #444;
                color: #fff;
            }
        }
        .el-menu-item-group__title,.el-submenu__title{
            color: #cecece;
        }
        .el-menu-item{
            color: #fff;
            text-decoration: none;
        }
        .el-menu-item:hover{
            background-color: #636363;
        }
        .el-submenu__title:hover{
            background-color: #636363;
        }
    }
    .metro{
        .el-menu--collapse{
            position: fixed;
            z-index: 999;
            top: 54px;
            left: 0;
            height: calc(100% - 54px - 3rem);
            background-color: rgba(255,255,255,0);
            .el-menu-item-group__title {
                span {
                    color: #333;
                }
            }
        }
        .el-submenu__title i,.el-menu-item i{
            color: #fff;
        }
        .el-menu--vertical{
            .el-menu{
                background-color: #444;
                color: #fff;
            }
        }
        .el-menu-item-group__title,.el-submenu__title{
            color: #cecece;
        }
        .el-menu-item{
            color: #fff;
            text-decoration: none;
        }
        .el-menu-item:hover{
            background-color: #636363;
        }
        .el-submenu__title:hover{
            background-color: #636363;
        }
    }
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
