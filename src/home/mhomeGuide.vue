<template>
    <div class="container">
        <div class="guide-intro" :class="{ seen: isHide }">
            <h2>Now you are on the Guide Mode.</h2>
            <p>In this Mode,You can hover your MOUSE on any part you want to know how it works.</p>
            <p>It's easy to use,and all the modules are ready to be use for you.</p>
            <p>No more talking,let's check it all then.I'm sure you'll like it.</p>
            <button @click="disable">Try it now!</button>
        </div>
        <!--IndexPage  Include links&entry of all modules-->
        <header>Luna's Home</header>
        <!--<button class="material" @click="changeTheme" @mouseover="themeGuide">Don't like this Design style?</button>-->
        <router-link class="guide" to="./home">Back to Home</router-link>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">Useful Tools</span>
                </template>
                <el-menu-item-group>
                    <span slot="title">分组一</span>
                    <el-menu-item index="1-1"><router-link to="./guide">How it works?</router-link></el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                    <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                    <span slot="title">选项4</span>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
                <router-link to="./pwKeeper"><i class="el-icon-tickets"></i></router-link>
                <span slot="title">Try Password Keeper(Beta)</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-menu" @click="changeTheme" @mouseover="themeGuide"></i>
                <span slot="title">Don't like this Design style?</span>
            </el-menu-item>
        </el-menu>
        <!--<iframe frameborder="0" src="https://kritsu.net/es" width="800px" height="500px" style="border: 1px solid #fff;"></iframe>-->
        <main>
            <section class="todo">
                <input type="text" class="add-input" placeholder="What are you going to do?" v-model="todoText" @keyup="keyup($event)" @keydown="keydown($event)" @mouseover="inputGuide">
                <ul class="list-group">
                    <li class="list-group-item list-group-item-text" v-for="(item,index) in arr" :key="index" :class="{'list-group-item-info':index==listIndex}" @click="click(index)">{{item}}</li>
                </ul>
                <button @click="addTodo" v-bind:value="todoText" class="make" @mouseover="listGuide">Make A List</button>
            </section>
            <item
                    :todo="todo"
                    v-for="todo in filteredTodos"
                    :key = "todo.id"
                    @del="deleteTodo"
            />
        </main>
        <tabs
                :filter="filter"
                :todos = "todos"
                @toggle = "toggleFilter"
                @clearAllCompleted = "clearAllCompleted"
        />
    </div>
</template>

<script>
    var todoList,dataObj;
    if (localStorage.getItem("todoList")) {
        dataObj = JSON.parse(localStorage.getItem("todoList"));
    } else {
        dataObj = [];
        todoList = localStorage.setItem("todoList", JSON.stringify(dataObj));
    }

    import Item from './todoItem'
    import Tabs from './todoTabs'

    let id = 0;

    export default {
        name: "mguide",
        data () {
            return{
                todos:[],
                todoText:'',
                filter:'all',
                wd: '',//关键词
                arr: [],//词组
                listIndex: -1,//初始索引
                theme:'glass',//当前主题
                isHide:false,
                isCollapse: true//侧栏状态
            }
        },
        components : {
            Item,
            Tabs,
        },
        created () {
            var localData = JSON.parse(localStorage.getItem("todoList"));
            if(localData.length !== 0){
                this.todos=localData;
            }
        },
        computed : {
            filteredTodos(){
                if (this.filter === 'all') {
                    return this.todos
                }
                const completed = this.filter === 'completed'
                return this.todos.filter(todo => completed === todo.completed)
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
                    alert("请先填写您的待办事项")
                } else{
                    //添加li
                    this.todos.push({
                        id : id++,
                        content: e.target.value.trim(),
                        completed:false,
                    });
                    //设置储存条目内容
                    tempObj.id = id;
                    tempObj.content = e.target.value.trim();
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
                this.filter = state
            },
            clearAllCompleted() {
                this.todos = this.todos.filter(todo => !todo.completed)
            },
            changeTheme(){
                alert("Please Wait The New Theme")
            },
            disable(){
                this.isHide=true
            },
            themeGuide(){
                this.$alert('This is a button for change your display theme,you can use it to change theme from already completed themes.', 'Guide', {
                    confirmButtonText: 'Got it!',
                    dangerouslyUseHTMLString: true
                });
            },
            inputGuide(){
                this.$alert('This is a input either can provide you search or make a plan list.<br/>*If you type some letters,it will give you a list from the search engine.<br/>*You can click what you like or just press the [enter] key to search what you type in.<br/>*If you click the button on the right,you can add a new plan for the plan list.', 'Guide', {
                    confirmButtonText: 'Got it!',
                    dangerouslyUseHTMLString: true
                });
            },
            listGuide(){
                this.$alert('Here is a button to create a plan list with what you type in the input and click this button.<br/>After you maked a plan,you can find it under the input.<br>*Click the green check mark to mark it as a Completed event.<br/>*Click the red fork,you can <b>Permanently delete</b> the plan you choice.Be careful.<br/>*Use the bottom buttons to control the display mode you like,the count on the left will show you how many plans you already made.', 'Guide', {
                    confirmButtonText: 'Got it!',
                    dangerouslyUseHTMLString: true
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    .seen{
        display: none;
    }
.guide-intro{
    width: 100%;
    height: 100vh;
    background-color: rgba(33,33,33,0.5);
    color: #fff;
    text-align: center;
    line-height: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    h2{
        padding-top: 15%;
    }
    h2,p{
        width: 85%;
        margin: 0 auto;
    }
    button{
        background-color: rgba(255,255,255,0.5);
        border: 0;
        padding: 0 1rem;
        height: 2rem;
        line-height: 2rem;
        color: #fff;
        font-size: 20px;
        border-radius: 10px;
        outline: 0;
        transition: 0.3s;
        cursor: pointer;
    }
    button:hover{
        background-color: lightpink;
    }
}
    //home.vue
    h1,h2,h3,h4,p{
        color: #fff;
    }
    a{
        text-decoration: none;
    }
    a:visited{
        color: #333;
    }
    header{
        width: 100%;
        text-align: center;
        height: 54px;
        line-height: 54px;
        color: #fff;
        font-size: 24px;
    }
    .el-menu--collapse{
        position: fixed;
        z-index: 999;
        top: 54px;
        left: 0;
        height: calc(100vh - 54px - 3rem);
        background-color: rgba(255,255,255,0);
        el-menu-item-group__title {
            span {
                color: #333;
            }
        }
    }
.make{
    background-color: #fff;
    color: #EB7290;
    font-size: 24px;
    border: 0;
    padding: 0 1rem;
    height: 3rem;
    line-height: 3rem;
    border-radius: 1rem;
    position: absolute;
    right: calc(10% - 1rem);
    top: 0rem;
}
.header-spare{
    height: 3rem;
}
main{
    width: 100%;
    height: auto;
    position: relative;
    .todo{
        text-align: center;

        >input{
            width: 80%;
            border: 0;
            border-radius: 1rem;
            padding: 0 1rem;
            background: rgba(255,255,255,0.5);
            height: 3rem;
            line-height: 3rem;
            font-size: 24px;
            z-index: 2;
            outline: 0;
            color: #fff;
            transition: all 0.5s;
        }
        >input:hover{
            background-color: rgba(255,255,255,0.2);
        }
        ::-ms-input-placeholder{
            color: #fff;
        }
        ::-webkit-input-placeholder{
            color: #fff;
        }
    }
}
.list-group{
    li{
        background-color: rgba(235,114,144,0.7);
        border-bottom: 1px solid #eee;
        color: #fff;
        font-size: 22px;
        width: 80%;
        padding: 0 1rem;
        margin: 0 auto;
        list-style: none;
    }
    li:first-of-type{
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
    }
    li:last-of-type{
        border-bottom-left-radius: 1rem;
        border-bottom-right-radius: 1rem;
        border-bottom: 0;
    }
}
.material{
    position: fixed;
    top: 0.5rem;
    right: 0;
    border-radius: 10px;
    color: #fff;
    background-color: lightblue;
    border: 0;
    height: 2rem;
    line-height: 2rem;
    padding: 0 1rem;
    outline: 0;
    z-index: 5;
    transition: 0.3s;
    cursor: pointer;
}
.material:hover{
    background-color: lightpink;
}
.guide{
    position: fixed;
    top: 0.5rem;
    left: 0;
    border-radius: 10px;
    color: #fff;
    background-color: lightblue;
    border: 0;
    height: 2rem;
    line-height: 2rem;
    padding: 0 1rem;
    outline: 0;
    z-index: 5;
    transition: 0.3s;
    cursor: pointer;
    text-decoration: none;
}
.guide:hover{
    background-color: lightpink;
}
@media (max-width:768px) {
    footer{
        height: 4rem;
    }
    main{
        .todo{
            input{
                font-size: 16px;
            }
        }
    }
    .make{
        font-size: 16px;
        padding: 0 0.5rem;
    }

}
@media (max-width:376px) {

}
</style>