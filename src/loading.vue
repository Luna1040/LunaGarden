<template>
        <h1>Welcome</h1>
</template>

<script>
    export default {
        name: "loading",
        created () {
            setTimeout(()=>{
                this.$router.push("home")
            },100)
        }
    }
</script>

<style scoped>
    h1{
        color: #fff;
    }
</style>