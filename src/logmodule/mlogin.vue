<template>
    <div class="login" :class="{log : isRegisted}">
        <!--初始为false  不显示登录框-->
        <h2>Login</h2>
        <h4>There's a created account for this browser,type your password to check out your saved password</h4>
        <h1 class="username">Account:{{userName}}</h1>
        <input type="password" v-model="loginPw" placeholder="Type your password here"><br>
        <button @click="login">Login</button>
    </div>
</template>

<script>
    import { load }  from "../assets/public/js/firstLoad"
    import { Theme } from  "../assets/public/js/loadTheme"
    import crypto from  "crypto"

    export default {
        name: "mlogin",
        data(){
            return{
                userName:'',//如果已注册，此条数据为绑定用户名显示数据
                MD5Pw:'',//仅登录时判断是否一致使用
                loginPw:'',//登录时密码框输入内容
                isRegisted:true,//已注册  若未注册跳转注册页面
            }
        },
        created(){
            load();
            Theme();
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            if(userInfo.length !== 0){
                this.MD5Pw=userInfo[0].pw;
                this.userName=userInfo[0].uid;
            } else {
                this.isRegisted = false
            }
            // 未注册跳转
            if (this.isRegisted === false){
                this.$router.push("regist")
            }
        },
        methods:{
            login(){
                let md5 = crypto.createHash("md5");
                md5.update(this.loginPw);
                this.loginPw = md5.digest('hex');
                if(this.loginPw === this.MD5Pw){
                    alert("Login success!");
                    this.$router.push("pwKeeper")
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    .login{
        width: 50%;
        height: 50vh;
        margin: 0 auto;
        margin-top: 25vh;
        text-align: center;
        h1,h2{
            color: #fff;
        }
        h4{
            width: 50%;
            margin: 0 auto;
            color: rgba(255,255,255,0.5);
        }
        input{
            width: 60%;
            border: 0;
            border-bottom: 1px solid #fff;
            background-color: rgba(0,0,0,0);
            font-size: 1.5rem;
            transition: 0.3s;
            text-align: center;
            outline: 0;
            color: #fff;
            margin-top: 1rem;
            padding: 0.5rem 0;
        }
        input:focus{
            width: 80%;
        }
        ::placeholder{
            color: rgba(255,255,255,0.5);
        }
        .username{
            padding-top: 3rem;
        }
        button{
            margin-top: 2rem;
            width: 20%;
            font-size: 1.5rem;
            padding: 0.15rem 0;
            background-color: rgba(255,255,255,0.3);
            color: #fff;
            border: 1px solid #fff;
            border-radius: 10px;
            cursor: pointer;
            transition:0.25s;
            outline: 0;
        }
        button:hover{
            background-color: rgba(255,255,255,0.5);
        }
    }

</style>