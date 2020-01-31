<template>
    <div class="lunaPage" :style="[styles]" :class="{squareCorner: corner === 'square', smallCorner: corner === 'small', filletCorner: corner === 'fillet', largeCorner: corner === 'large', fullCorner: corner === 'full', roundCorner: corner === 'round'}">
        <span v-if="counter" class="pageCounter">共{{limit}}条</span>
        <slot name="pre"></slot>
        <div class="lunaPageCell" v-for="i in limitCount" :key="i" :style="[cellStyles]" :class="[{pageCellActive:i === choiceIndex},{squareCorner: cellCorner === 'square', smallCorner: cellCorner === 'small', filletCorner: cellCorner === 'fillet', largeCorner: cellCorner === 'large', fullCorner: cellCorner === 'full', roundCorner: cellCorner === 'round'}]" @click="handelClick(i)">{{i}}</div>
        <div class="pageSizer">
            <!--            <Select></Select>-->
        </div>
        <div class="pageElevator">
            <span>前往第</span>
        <Input v-if="elevator" :value="1" :width="40" :height="24" border-color="#cfcfcf" ghost font-size="12px"></Input>
            <span>页</span>
        </div>
        <slot name="suffix"></slot>
    </div>
</template>

<script>
    export default {
        name: "Page",
        props: {
            limit: {
                type: Number,
                default: 0
            },
            width: {
                type: [Number, String],
                default: 100
            },
            backgroundColor: {
                type: String,
                default: '#F5F5F5'
            },
            cellWidth: {
                type: [Number, String],
                default: '24px'
            },
            cellBackgroundColor: {
                type: String,
                default: '#FFFFFF'
            },
            radius: {
                type: Number,
                default: -1
            },
            corner: {
                type: String,
                default: "large"
            },
            cellCorner: {
                type: String,
                default: 'round'
            },
            elevator: {
                type: Boolean,
                default: false,
            },
            counter: {
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                choiceIndex: -1
            }
        },
        computed: {
            limitCount() {
                const count = [];
                for(let i = 0; i<this.limit; i++) {
                    count.push(i + 1)
                }
                return count
            },
            styles() {
                const styleList = {};
                if(typeof this.width !== 'string') {
                    if(this.width <= 100) {
                        styleList.width = 'calc(' + this.width + '% - ' + '32px)'
                    } else {
                        styleList.width = this.width - 32 + 'px'
                    }
                } else {
                    styleList.width = 'calc(' + this.width + ' - 32px'
                }
                if(this.backgroundColor !== 'none') {
                    styleList.backgroundColor = this.backgroundColor
                }

                return styleList
            },
            cellStyles() {
                const styleList = [];
                if(typeof this.cellWidth !== 'string') {
                    styleList.width = this.width + 'px'
                } else {
                    styleList.width = this.width
                }
                if(this.backgroundColor !== 'none') {
                    styleList.backgroundColor = this.backgroundColor
                }
                if(this.radius !== -1) {
                    styleList.borderRadius = this.radius + 'px'
                }

                return styleList
            }
        },
        methods: {
            handelClick(value) {
                this.choiceIndex = value;
                console.log(value);
                this.$emit('on-click', value)
            }
        },
        mounted() {
            if(this.page !== 0) {
                this.choiceIndex = 1
            }
        }
    }
</script>

<style scoped>

</style>
