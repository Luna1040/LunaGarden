<template>
    <div class="regist"  :class="{Registed : notRegisted}">
        <!--初始为true  显示注册框-->
        <h1>Regist</h1>
        <h4>This browser didn't find your account,please Regist for this browser.then you can use the Password Keeper</h4>
        <input type="text" v-model="userName" placeholder="Type your UID here">
        <input type="text" v-model="pw" placeholder="Type your password here">
        <input type="text" v-model="configPw" placeholder="Please config your password" @blur="config">
        <button @click="setMd5">Execute MD5 encryption</button>
    </div>
</template>

<script>
    import { load }  from "../assets/public/js/firstLoad"
    import { Theme } from  "../assets/public/js/loadTheme"
    import crypto from  "crypto"

    export default {
        name: "regist",
        data(){
            return{
                pw:'',//注册密码框输入内容
                configPw:'',//确认密码用
                userName:'',//已注册后，此条数据为绑定用户名显示数据
                notRegisted:true,//未注册  若已注册跳转登录页面
            }
        },
        created(){
            load();
            Theme();
            if (this.notRegisted == false){
                this.$router.push("login")
            }
        },
        methods:{
            setMd5(){
                var user = {};
                var userInfo = JSON.parse(localStorage.getItem("userInfo"));
                var md5 = crypto.createHash("md5")
                md5.update(this.pw)//this.pw这是你要加密的密码
                this.loginPw = md5.digest('hex')//this.pw这就是你加密完的密码，这个往后台传就行了
                //密码存入localStorage
                user.uid=this.userName;
                user.pw=this.loginPw;
                userInfo.push(user);
                this.textContent = userInfo;
                // 存入storage
                localStorage.setItem("userInfo" , JSON.stringify(userInfo));
                this.notRegisted = true;
                this.$router.push("login")
            },
            config(){
                console.log(this.configPw);
                console.log(this.pw);
                if(this.configPw !== this.pw) {
                    alert("两次不一致")
                }
            },
        }
    }
</script>

<style scoped lang="scss">
.regist{
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
    ::placeholder{
        color: rgba(255,255,255,0.5);
    }
input:focus{
    width: 80%;
}
.username{
    padding-top: 3rem;
}
button{
    margin-top: 2rem;
    width: 50%;
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