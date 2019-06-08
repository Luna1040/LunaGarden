<template>
    <div :class="theme">
        <header>Password Keeper Ver 1.0</header>
        <div class="material-bc"></div>
        <SideBar v-on:metro="metro" v-on:glass="glass" v-on:material="material"/>
        <Search/>
        <el-table
                :data="tableData"
                style="width: 920px;margin: 0 auto"
                height="550">
            <template slot="empty">
                <h2>No data</h2>
            </template>
            <el-table-column
                    label="Web link/App/Exe"
                    width="220"
                    prop="web">
            </el-table-column>
            <el-table-column
                    label="User name"
                    width="130"
                    prop="name">
            </el-table-column>
            <el-table-column
                    label="Password"
                    width="170"
                    prop="password">
            </el-table-column>
            <el-table-column
                    label="Email"
                    width="250"
                    prop="Email">
            </el-table-column>
            <el-table-column label="option" width="150">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)"
                            v-waves>Edit</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                            v-waves>Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <button class="createPsw" @click="createHide = !createHide" v-waves>Create</button>
        <div class="createDiv" :class="{createHide : createHide}">
            <h2>Create New Info</h2>
            <h4>Attention!DO NOT USE this at public Browser.</h4>
            <h4>The password keeper won't update your data to the Internet.Also you must use it at the same browser which you type all your password,or it may not work as well as wish.</h4>
            <input type="text" placeholder="Web link/App/Exe" v-model="weblink">
            <input type="text" placeholder="Type your username" v-model="name">
            <input type="text" placeholder="Type your password" v-model="psw">
            <input type="email" placeholder="Type your E-mail(unnecessary)" v-model="email">
            <p class="small">This input just for you may be use to change your password.</p>
            <button class="confirm" @click="confirm" v-waves>Confirm</button>
            <button class="cancel" @click="cancel" v-waves>Cancel</button>
        </div>
    </div>
</template>

<script>
    import SideBar from '../sideBar'
    import Search from './search'
    import { load }  from "../assets/public/js/firstLoad"
    import { Theme } from  "../assets/public/js/loadTheme"

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
            }
        },
        components : {
            SideBar,
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
                let pswList = localStorage.getItem("pswList") || "[]"
                this.tableData = JSON.parse(pswList)
            },
            handleEdit(index, row) {
                this.$prompt('Please type your new password', 'Attention', {
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                }).then(({ value }) => {
                    row.password=value;
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
                // console.log(this.tableData.index);
                this.tableData.splice(index , 1);
                var localData = JSON.parse(localStorage.getItem("pswList"));
                // //删除缓存数据
                localData.splice(index,1);
                // //保存缓存数据
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
                    this.createHide=true;
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
                this.createHide=true;
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
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0
        }
        header{
            width: 100%;
            text-align: center;
            height: 54px;
            line-height: 54px;
            color: rgb(235, 114, 144);
            font-size: 24px;
            position: relative;
            z-index: 999;
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
            position: relative;
            z-index: 5;
            border: 0;
            color: #fff;
            font-size: 20px;
            padding: .5rem 4rem;
            background-color: rgb(235, 114, 144);
            border-radius: 5px;
            margin-top: 2rem;
            box-shadow: 0 2px 10px rgba(33,33,33,0.4);
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
            z-index:10;
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
</style>
<style lang="scss">
    .glass {
        .el-table, .el-table__expanded-cell, .el-table th, .el-table tr {
            background-color: rgba(0, 0, 0, 0);
            color: #fff;
        }
        .el-table--enable-row-hover .el-table__body tr:hover > td {
            background-color: rgba(255, 255, 255, 0.2);
        }
        .el-table__empty-text{
            h2{
                color: #fff;
            }
        }
    }
    .metro {
        .el-table, .el-table__expanded-cell, .el-table th, .el-table tr {
            background-color: rgba(0, 0, 0, 0);
            color: #fff;
        }
        .el-table--enable-row-hover .el-table__body tr:hover > td {
            background-color: rgba(255, 255, 255, 0.2);
        }
        .el-button--mini{
            border-radius: 0;
            background-color: #fff;
            border: 0;
            color: #333;
        }
        .el-button--danger{
            background-color: palevioletred;
            color: #fff;
        }
        .el-table__empty-text{
            h2{
                color: #fff;
            }
        }
    }
    .material {
        .cell{
            /*position: relative;*/
        }
        .el-table{
            box-shadow: 0 2px 10px rgba(33,33,33,0.3);
        }
        .el-table, .el-table__expanded-cell, .el-table th, .el-table tr {
            border-radius: 5px;
            background-color: #fff;
            color: #333;
        }
        .el-table--enable-row-hover .el-table__body tr:hover > td {
            background-color: rgba(255, 255, 255, 0.2);
        }
        .el-button--mini{
            border-radius: 4px;
            background-color: rgba(0,0,0,0);
            border: 0;
            color: #333;
            background-color: #eee;
            box-shadow: 0 2px 10px rgba(33,33,33,0.3);
            /*position: absolute;*/
            /*top: 20%;*/
            /*left: 5px;*/
        }
        .el-button--danger{
            background-color: palevioletred;
            color: #fff;
            box-shadow: 0 2px 10px rgba(33,33,33,0.3);
            /*position: absolute;*/
            /*left: 55px;*/
        }
        .el-table__empty-text{
            h2{
                color: rgb(235, 114, 144);
            }
        }
    }
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
                background-color: #fff;
                color: #333;
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
        .el-menu-item.is-active{
            color: rgb(235, 114, 144);
        }
        .el-menu-item:hover{
            background-color:#FFDBF1;
        }
    }
</style>