<template>
    <div class="material">
        <header>Password Keeper Ver 1.0</header>
        <div class="header-spare"></div>
        <div class="material-bc"></div>
        <!--<SideBar v-on:metro="metro" v-on:glass="glass" v-on:material="material"/>-->
        <Search/>
        <main>
            <div class="card" v-for="(i,index) in tableData" :key="index">
                <div>
                    <button @click="handleEdit(index)" class="edit" v-waves>Edit</button>
                    <button @click="handleDelete(index)" class="delete" v-waves>Delete</button>
                </div>
                <p>Weblink/App/Exe</p>
                <p>{{i.web}}</p>
                <p>User name</p>
                <p>{{i.name}}</p>
                <p>Password</p>
                <p>{{i.password}}</p>
                <p>Email</p>
                <p>{{i.Email}}</p>
            </div>
        </main>
        <transition name="el-fade-in">
        <div class="createDiv" v-show="show">
            <h2>Create New Card</h2>
            <h4>Attention!DO NOT USE this at public Browser.</h4>
            <h4>The password keeper won't update your data to the Internet.So you must use it at the same browser which you type all your password,or it may not work as well as wish.</h4>
            <input type="text" placeholder="Web link/App/Exe" v-model="weblink">
            <input type="text" placeholder="Type your username" v-model="name">
            <input type="text" placeholder="Type your password" v-model="psw">
            <input type="email" placeholder="Type your E-mail(unnecessary)" v-model="email">
            <p class="small">This input just for you may be use to change your password.</p>
            <button class="confirm" @click="confirm" v-waves>Confirm</button>
            <button class="cancel"  @click="cancel" v-waves>Cancel</button>
        </div>
        </transition>
        <footer>
            <button class="cr-btn"  @click="show = !show"><i class="iconfont icon-plus"></i></button>
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
    // import SideBar from '../sideBar'
    import { load }  from "../assets/public/js/firstLoad"
    import { Theme } from  "../assets/public/js/loadTheme"
    import Search from './search'

    export default {
        name: "privateModules",
        data(){
            return{
                userName:'',//如果已注册，此条数据为绑定用户名显示数据
                notRegisted:true,
                isRegisted:false,
                notLoged:false,//判断是否登录  未登录跳转登录页面
                createHide:true,
                tableData: [],
                weblink:'',
                name:'',
                psw:'',
                email:'',
                theme:'material',
                show:false
            }
        },
        components : {
            // SideBar,
            Search
        },
        created(){
            // var userInfo = JSON.parse(localStorage.getItem("userInfo"));
            // if(userInfo.length !== 0){
            //     this.MD5Pw=userInfo[0].pw;
            //     this.userName=userInfo[0].uid;
            //     this.isRegisted = true
            // }
            // let psw = JSON.parse(localStorage.getItem("pswList"));
            // if(psw.length !== 0){
            //     this.tableData=psw
            // }
            // if(this.notLoged == true){
            //     this.$router.push("login")
            // }
            load();
            Theme();
            let screenWidth = window.screen.width;
            if(screenWidth<768){
                this.$router.push("mpwKeeper")
            }else {
                this.$router.push("pwKeeper")
            }
            this.refresh();
            var localTheme = JSON.parse(localStorage.getItem("theme"));
            if(localTheme.length !== 0){
                this.theme=localTheme;
            }
        },
        methods:{
            //刷新
            refresh() {
                let pswList = localStorage.getItem("pswList") || "[]";
                this.tableData = JSON.parse(pswList)
            },
            handleEdit(index) {
                this.$prompt('Please type your new password', 'Attention', {
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                }).then(({ value }) => {
                    this.tableData[index].password=value;
                    localStorage.setItem("pswList",JSON.stringify(this.tableData));
                    this.$message({
                        type: 'success',
                        message: 'Your new password is updated : ' + value
                    });
                }).catch(() => {
                    this.$message({
                        type: 'warning',
                        message: 'Canceled this updating'
                    });
                });
            },
            handleDelete(index) {
                this.tableData.splice(index , 1);
                var localData = JSON.parse(localStorage.getItem("pswList"));
                //删除缓存数据
                localData.splice(index,1);
                //保存缓存数据
                localStorage.setItem("pswList",JSON.stringify(localData));
            },
            confirm(){
                if(this.psw!=="" && this.weblink!=="" && this.name!==""){
                    this.tableData.push({
                        password:this.psw,
                        name: this.name,
                        web: this.weblink,
                        Email: this.email,
                    });
                    this.psw="";
                    this.name="";
                    this.weblink="";
                    this.email="";
                    this.show = !this.show
                } else {
                    alert("Please check all of the empty input expect E-mail!")
                }
                localStorage.setItem("pswList",JSON.stringify(this.tableData))
            },
            cancel(){
                this.psw="";
                this.name="";
                this.weblink="";
                this.email="";
                this.show = !this.show
            },
            metro(){
                this.theme="metro";
                localStorage.setItem("theme",JSON.stringify(this.theme));
                this.$message({
                    type: 'success',
                    message: 'Your new theme : Metro Design has been updated,if nothing happen,please refresh your browser'
                });
            },
            glass(){
                this.theme="glass";
                localStorage.setItem("theme",JSON.stringify(this.theme));
                this.$message({
                    type: 'success',
                    message: 'Your new theme : Mordern Glass has been updated,if nothing happen,please refresh your browser'
                });
            },
            material(){
                this.theme="material";
                localStorage.setItem("theme",JSON.stringify(this.theme));
                this.$message({
                    type: 'success',
                    message: 'Your new theme : Material Design has been updated,if nothing happen,please refresh your browser'
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    .header-spare {
        height: 3rem;
    }
    .glass{
        text-align: center;
        header{
            width: 100%;
            text-align: center;
            height: 54px;
            line-height: 54px;
            color: #fff;
            font-size: 24px;
        }
        h2,h4{
            color: #333;
        }
        h2{
            padding-bottom: 1rem;
        }
        h4{
            width: 50%;
            margin: 0 auto;
            color: rgba(33,33,33,0.5);
        }
        .createPsw{
            border: 0;
            color: #fff;
            font-size: 20px;
            padding: .5rem 4rem;
            background-color: hsla(0,0%,100%,.5);
            border-radius: 5px;
            margin-top: 2rem;
        }
        .createHide{
            display: none;
        }
        .el-table::-webkit-scrollbar-thumb{
            background-color: red;
        }
        .createDiv{
            position: fixed;
            top: 15vh;
            left: 20%;
            background-color: rgba(255,255,255,0.9);
            width: 60%;
            border-radius: 10px;
            padding: 1rem 0;
            .small{
                font-size: 12px;
                color: rgba(33,33,33,0.5);
            }
            input{
                width: 60%;
                border: 0;
                border-bottom: 1px solid #333;
                background-color: rgba(0,0,0,0);
                font-size: 1.5rem;
                transition: 0.3s;
                text-align: center;
                outline: 0;
                color: #333;
                margin-top: 1rem;
                padding: 0.5rem 0;
            }
            input:focus{
                width: 80%;
            }
            ::placeholder{
                color: rgba(33,33,33,0.5);
            }
            .close{
                background-color: rgba(0,0,0,0);
                color: #333;
                font-weight: bold;
                border: 1px solid #333;
                border-radius: 3px;
                padding: 0 0.25rem;
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
            }
            .confirm{
                background-color:rgba(0,216,255,0.5);
                padding: 0.15rem 1rem;
                border-radius: 5px;
                font-size: 20px;
                color: #fff;
                border: 0;
                margin: 0 2rem;
                margin-top: 2rem;
            }
            .cancel{
                background-color: rgba(241,78,50,0.5);
                padding: 0.15rem 1rem;
                border-radius: 5px;
                font-size: 20px;
                color: #fff;
                border: 0;
                margin: 0 2rem;
                margin-top: 2rem;
            }
        }
    }
    //
    //Metro
    //
    .metro{
        text-align: center;
        header{
            width: 100%;
            text-align: center;
            height: 54px;
            line-height: 54px;
            color: #fff;
            font-size: 24px;
        }
        h2,h4{
            color: #333;
        }
        h2{
            padding-bottom: 1rem;
        }
        h4{
            width: 50%;
            margin: 0 auto;
            color: rgba(33,33,33,0.5);
        }
        .createPsw{
            border: 0;
            color: rgb(235, 114, 144);
            font-size: 20px;
            padding: .5rem 4rem;
            background-color: hsla(0,0%,100%,1);
            /*border-radius: 5px;*/
            margin-top: 2rem;
        }
        .createHide{
            display: none;
        }
        .el-table::-webkit-scrollbar-thumb{
            background-color: red;
        }
        .createDiv{
            position: fixed;
            top: 15vh;
            left: 20%;
            background-color: rgba(255,255,255,0.9);
            width: 60%;
            border-radius: 10px;
            padding: 1rem 0;
            .small{
                font-size: 12px;
                color: rgba(33,33,33,0.5);
            }
            input{
                width: 60%;
                border: 0;
                border-bottom: 1px solid #333;
                background-color: rgba(0,0,0,0);
                font-size: 1.5rem;
                transition: 0.3s;
                text-align: center;
                outline: 0;
                color: #333;
                margin-top: 1rem;
                padding: 0.5rem 0;
            }
            input:focus{
                width: 80%;
            }
            ::placeholder{
                color: rgba(33,33,33,0.5);
            }
            .close{
                background-color: rgba(0,0,0,0);
                color: #333;
                font-weight: bold;
                border: 1px solid #333;
                border-radius: 3px;
                padding: 0 0.25rem;
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
            }
            .confirm{
                background-color:rgba(0,216,255,0.5);
                padding: 0.15rem 1rem;
                border-radius: 5px;
                font-size: 20px;
                color: #fff;
                border: 0;
                margin: 0 2rem;
                margin-top: 2rem;
            }
            .cancel{
                background-color: rgba(241,78,50,0.5);
                padding: 0.15rem 1rem;
                border-radius: 5px;
                font-size: 20px;
                color: #fff;
                border: 0;
                margin: 0 2rem;
                margin-top: 2rem;
            }
        }
    }
    //
    //Material
    //
    .material {
        text-align: center;
        .material-bc {
            background-color: #ede3e7;
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 0
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
        h2,h4{
            color: #333;
        }
        h2{
            padding-bottom: 1rem;
            font-size: 20px;
        }
        h4{
            width: 90%;
            margin: 0 auto;
            color: rgba(33,33,33,0.5);
            font-size: 12px;
        }
        main{
            width: calc(100% - 24px);
            margin: 0 12px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            position: relative;
            z-index: 1;
            >div{
                background-color: #fff;
                border-radius: 4px;
                width: 45%;
                margin-top: 24px;
                font-size: 12px;
                padding: 8px 5px;
                box-shadow: 0 2px 10px rgba(33,33,33,0.5);
                >div{
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    button{
                        font-size: 12px;
                        border: 0;
                        padding: 2px 10px;
                        border-radius: 3px;
                    }
                    .delete{
                        border: 1px solid rgb(235, 114, 144);
                        background-color: rgba(0,0,0,0);
                        color: rgb(235, 114, 144);
                    }
                    .edit{
                        background-color: rgb(235, 114, 144);
                        color: #fff;
                    }
                }
                p{
                    overflow: scroll;
                    line-height: 20px;
                }
                p:nth-child(5),p:nth-child(7){
                    font-weight: bold;
                    color: #eb7290;
                }
            }
        }
        .createHide{
            display: none;
        }
        .el-table::-webkit-scrollbar-thumb{
            background-color: red;
        }
        .createDiv{
            position: fixed;
            top: 4rem;
            left: 2.5%;
            background-color: rgba(255,255,255,1);
            width: 95%;
            /*height: 70%;*/
            /*overflow: scroll;*/
            border-radius: 5px;
            padding: 1rem 0;
            z-index:10;
            box-shadow: 0 2px 10px rgba(33,33,33,0.5);
            .small{
                font-size: 12px;
                color: rgba(33,33,33,0.5);
            }
            input{
                width: 70%;
                border: 0;
                border-bottom: 1px solid #333;
                background-color: rgba(0,0,0,0);
                font-size: 16px;
                transition: 0.3s;
                text-align: center;
                outline: 0;
                color: #333;
                margin-top: 1rem;
                padding: 0.5rem 0;
            }
            input:focus{
                width: 80%;
            }
            ::placeholder{
                color: rgba(33,33,33,0.5);
            }
            .confirm{
                background-color:rgb(235, 114, 144);
                padding: 0.15rem 1rem;
                border-radius: 5px;
                font-size: 20px;
                color: #fff;
                border: 0;
                margin: 0 2rem;
                margin-top: 2rem;
            }
            .cancel{
                background-color: rgba(241,78,50,0);
                border: 1px solid rgb(235, 114, 144);
                padding: 0.15rem 1rem;
                border-radius: 5px;
                font-size: 20px;
                color: rgb(235, 114, 144);
                margin: 0 2rem;
                margin-top: 2rem;
            }
        }
        footer{
            width: 100%;
            height: 60px;
            line-height: 60px;
            /* background-color: #fff; */
            background:radial-gradient(75px at top,transparent 50%,rgb(235, 114, 144) 51%);
            background-position-y: -10px;
            animation: leftMove 0.5s ease-out forwards;
            @keyframes leftMove
            {
                0%   {background-position-x: 0;}
                40%  {background-position-x: 90px;}
                /*95%  {background-position-x: 133px;}*/
                100% {background-position-x: 110px;}
            }
            @media screen and (max-device-width: 375px){
                @keyframes leftMove
                {
                    0%   {background-position-x: 0;}
                    40%  {background-position-x: 85px;}
                    100% {background-position-x: 100px;}
                }
            }
            position: fixed;
            z-index: 999;
            bottom: -10px;
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
                            line-height: 25px;
                            height:25px;
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
                text-align: center;
                line-height: 60px;
                border-radius: 100px;
                position: fixed;
                bottom: 30px;
                left: calc(50% - 30px);
                box-shadow: 0 2px 5px rgba(33,33,33,0.5);
                border: 0;
                padding: 0;
                margin: 0;
                animation: leftMove2 0.5s ease-out forwards;
                @keyframes leftMove2
                {
                    0%   {left:calc(50% - 30px)}
                    40%  {left: calc(50% + 60px);}
                    /*95%  {background-position-x: 133px;}*/
                    100% {left: calc(50% + 80px);}
                }
                @media screen and (max-device-width: 375px){
                    @keyframes leftMove2
                    {
                        0%   {left:calc(50% - 30px)}
                        40%  {left: calc(50% + 55px);}
                        100% {left: calc(50% + 70px);}
                    }
                }
                i{
                    font-size: 40px;
                }
            }
        }
    }
</style>
