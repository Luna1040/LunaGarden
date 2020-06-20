<template>
    <div>
        <div :class="{asideShowAnimate : asideShow === 'intro' , asideHideAnimate : asideShow === 'hiding' , '' : asideShow === 'hide'}">
            <div class="blackHover" :class="{blackHoverShowAnimate : asideShow === 'intro' , blackHoverHideAnimate : asideShow === 'hiding'}"></div>
            <aside :class="{asideShowAnimate : asideShow === 'intro' , asideHideAnimate : asideShow === 'hiding'}"></aside>
        </div>
    </div>
</template>

<script>
    export default {
        name: "sideBar",
        data(){
            return{
                asideShow:'hide'
            }
        },
        methods:{
            sideBarToggle(){
                this.asideShow = true;
            }
        }
    }
</script>

<style scoped>

</style>
