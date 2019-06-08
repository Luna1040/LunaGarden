<template>
    <div :class="theme">
        <span class="left">
            {{unFinishedTodoLength}} List
        </span>
        <div class="tabs">
            <span v-for="state in states" :key="state" :class="[state, filter === state ? 'actived' : '']" @click="toggleFilter(state)">{{state}}</span>
            <span class="clear" @click="clearAllCompleted">Clear Completed</span>
        </div>
    </div>
</template>

<script>
    import { Theme } from  "../assets/public/js/loadTheme"

    export default {
        name: "mtabs",
        data(){
            return{
                states: ['all','active','completed'],
                theme:'material'
            }
        },
        props:{
            filter:{
                type:String,
                required:true,
            },
            todos:{
                type:Array,
                required: true
            },
        },
        computed : {
            unFinishedTodoLength () {
                return this.todos.filter(todo => !todo.completed).length
            }
        },
        created(){
            Theme();
            var localTheme = JSON.parse(localStorage.getItem("theme"));
            if(localTheme.length !== 0){
                this.theme=localTheme;
            }
        },
        methods:{
            toggleFilter(state){
                this.$emit('toggle' , state)
            },
            clearAllCompleted(){
                this.$emit('clearAllCompleted')
            },
        }
    }
</script>

<style scoped lang="scss">
    .glass{
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
                background-color: red;
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
    //
    //Metro
    //
    .metro {
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
                background-color: red;
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
    .material{
        font-weight: 400;
        display: flex;
        justify-content: space-between;
        background-color: #1AB7EA;
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
                background-color: red;
                color: #fff;
            }
        }
    }
</style>