<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="isCollapse">
        <el-submenu index="1">
            <template slot="title">
                <router-link to="./home"><i class="iconfont icon-home"></i></router-link>
                <!--<span slot="title">Useful Tools</span>-->
            </template>
            <el-menu-item-group>
                <span slot="title">Index</span>
                <router-link to="./home"><el-menu-item index="1-1">Home page</el-menu-item></router-link>
            </el-menu-item-group>
            <el-menu-item-group title="Guide">
                <router-link to="./guide"><el-menu-item index="1-2">How it works?</el-menu-item></router-link>
            </el-menu-item-group>
            <!--<el-submenu index="1-3">-->
                <!--<span slot="title">选项3</span>-->
                <!--<el-menu-item index="1-3-1">选项1</el-menu-item>-->
            <!--</el-submenu>-->
        </el-submenu>
        <router-link to="./pwKeeper"><el-menu-item index="2">
            <i class="iconfont icon-lock"></i>
            <span slot="title">Password Keeper Ver 1.0</span>
        </el-menu-item></router-link>
        <a href="http://www.xn--ilr89m.com/luna-ui.html">
        <el-menu-item index="3">
            <i class="iconfont icon-UI"></i>
            <span slot="title">Luna-UI V.0.1</span>
        </el-menu-item></a>
        <!--<el-menu-item index="4">-->
            <!--<i class="el-icon-menu" @click="changeTheme"></i>-->
            <!--<span slot="title">Don't like this Design style?</span>-->
        <!--</el-menu-item>-->
        <el-submenu index="4">
            <template slot="title">
                <i class="iconfont icon-theme1"></i>
            </template>
            <!--<p style="padding-left: 20px">Don't like this Design style?</p>-->
            <el-menu-item-group>
                <span slot="title">Don't like this Design style?</span>
                <el-menu-item index="1-1" @click="glass">Mordern Glass Design</el-menu-item>
                <p style="font-size: 12px;padding-left: 20px;color: #999;">Strong personal design style.</p>
                <!--<span class="describe">Design Based on Window 10 pad mode.</span>-->
            </el-menu-item-group>
            <el-menu-item-group>
                <el-menu-item index="1-2" @click="metro">Metro Design</el-menu-item>
                <p style="font-size: 12px;padding-left: 20px;color: #999;">Design Based on Window 10 pad mode.</p>
            </el-menu-item-group>
            <el-menu-item-group>
                    <el-menu-item index="1-3" @click="material">Material Design</el-menu-item>
                <p style="font-size: 12px;padding-left: 20px;color: #999;">Design Based on Google new design language.</p>
            </el-menu-item-group>
            <!--<el-submenu index="1-3">-->
            <!--<span slot="title">选项3</span>-->
            <!--<el-menu-item index="1-3-1">选项1</el-menu-item>-->
            <!--</el-submenu>-->
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "sideBar",
        data(){
            return{
                isCollapse: true,//侧栏状态;
                theme:"glass"
            }
        },
        methods:{
            glass(){
                this.$emit("glass")
            },
            metro(){
                this.$emit("metro")
            },
            material(){
                this.$emit("material")
            }
        }
    }
</script>

<style lang="scss">
    .el-submenu__title,.el-tooltip{
        text-align: center;
        padding: 0 10px!important;
    }
    .fa{
        font-size: 20px;
    }
</style>