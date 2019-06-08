<template>
    <div>
        <input type="text" v-model="username">
        <input type="text" v-model="password">
    <button @click="click">111</button>
    </div>
</template>

<script>
    export default {
        name: "test",
        data(){
            return{
                username:"",
                password:"",
            }
        },
        methods:{
            click(){
                this.$http.post("http://xn--ilr89m.com/login.php",{username:this.username,password:this.password},{emulateJSON: true})
                    .then(
                        (response)=>{
                            console.log(response);
                        },
                        (error)=>{
                            console.log(error);
                        }
                    );
            }
        }
    }
</script>

<style scoped>

</style>