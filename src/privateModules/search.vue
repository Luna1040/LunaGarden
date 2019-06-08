<template>
    <el-autocomplete
            popper-class="my-autocomplete"
            v-model="state3"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect">
        <i
                class="el-icon-edit el-input__icon"
                slot="suffix"
                @click="handleIconClick">
        </i>
        <template slot-scope="{ item }">
            <div class="name">{{ item.name }}</div>
            <span class="addr">{{ item.web }}</span><br>
            <span class="addr">{{ item.password }}</span><br>
            <span class="addr">{{ item.Email }}</span><br>
        </template>
    </el-autocomplete>
</template>

<script>
    export default {
        data() {
            return {
                restaurants: [],
                state3: ''
            };
        },
        created(){
            let pswList = localStorage.getItem("pswList") || "[]";
            this.restaurants = JSON.parse(pswList)
        },
        methods: {
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item);
            },
            handleIconClick(ev) {
                console.log(ev);
            }
        },
    }
</script>

<style scoped lang="scss">
    .my-autocomplete {
        li {
            line-height: normal;
            padding: 7px;

            .name {
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .addr {
                font-size: 12px;
                color: #b4b4b4;
            }

            .highlighted .addr {
                color: #ddd;
            }
        }
    }
</style>