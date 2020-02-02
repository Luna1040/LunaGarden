<template>
    <div
            class="lunaSelect"
            @click="handelClick"
            :style="[selectStyles]"
            :class="[className, {squareCorner: corner === 'square', smallCorner: corner === 'small', filletCorner: corner === 'fillet', largeCorner: corner === 'large', fullCorner: corner === 'full'}, {disabled: disabled}, {selectBackground: showList}]"
            @focusout="showList = false"
    >
        <Input
                :readonly="!filterable"
                :disabled="disabled"
                :width="inputStyles.width"
                :height="inputStyles.height"
                :corner="corner"
                v-model="initValue"
        ></Input>
        <transition name="fade">
            <div
                    class="optionScrollBarHidden"
                    v-show="showList"
                    :class="{squareCorner: corner === 'square', smallCorner: corner === 'small', filletCorner: corner === 'fillet', largeCorner: corner === 'large', fullCorner: corner === 'full'}"
            >
                <div
                        class="optionGroup"
                        :class="{squareCorner: corner === 'square', smallCorner: corner === 'small', filletCorner: corner === 'fillet', largeCorner: corner === 'large', fullCorner: corner === 'full'}"
                >
                    <slot>
                        <Option
                                v-for="(i,index) in filterData"
                                :key="index"
                                :value="i[keyValue]"
                                :label="i[keyLabel]"
                                @optionSelect="optionSelect"
                        ></Option>
                    </slot>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Select",
        props: {
            value: {
                type: [String, Array, Number],
                default: ''
            },
            selectData: {
                type: Array,
                default: []
            },
            keyValue: {
                type: String,
                default: ""
            },
            keyLabel: {
                type: String,
                default: ''
            },
            filterable: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            returnLabel: {
                type: Boolean,
                default: false
            },
            width: {
                type: [String, Number],
                default: 180
            },
            height: {
                type: [String, Number],
                default: 32
            },
            className: {
                type: String,
                default: ""
            },
            corner: {
                type: String,
                default: "large"
            },
        },
        data() {
            return {
                showList: false,
                initValue: '',
                filterData: []
            }
        },
        computed: {
            selectStyles() {
                const styleList = {};
                if (typeof this.width !== 'string') {
                    styleList.width = this.width + 'px'
                } else {
                    styleList.width = this.width
                }

                if (typeof this.height !== 'string') {
                    styleList.paddingTop = this.height + 'px'
                } else {
                    styleList.height = this.height
                }

                return styleList
            },
            inputStyles() {
                const styleList = {};
                if (typeof this.width !== 'string') {
                    styleList.width = this.width + 'px'
                } else {
                    styleList.width = this.width
                }

                if (typeof this.height !== 'string') {
                    styleList.paddingTop = this.height + 'px'
                } else {
                    styleList.height = this.height
                }

                return styleList
            },
            optionStyles() {

            },
        },
        watch: {
            initValue() {
                let newData = [];
                if (this.initValue !== '') {
                    this.selectData.forEach(item => {
                        if (item[this.keyLabel].indexOf(this.initValue) !== -1) {
                            newData.push(item)
                        }
                    });
                    this.filterData = newData;
                } else {
                    this.filterData = this.selectData
                }
            },
        },
        created() {
            if(this.value !== '') {
                for(let i = 0; i<this.selectData.length; i++) {
                    if(this.selectData[i][this.keyValue] === this.value) {
                        this.initValue = this.selectData[i][this.keyLabel];
                        this.filterData.push(this.selectData[i]);
                        break;
                    }
                }
            } else {
                this.initValue = this.value;
                this.filterData = this.selectData
            }
        },
        methods: {
            handelClick() {
                this.showList = !this.showList;
                this.$emit('on-click')
            },
            optionSelect(obj) {
                this.showList = false;
                this.$emit('input', obj.value);
                this.initValue = obj.label;
                if (!this.returnLabel) {
                    this.$emit('on-change', obj.value)
                } else {
                    this.$emit('on-change', obj)
                }
            },
        },
    }
</script>

<style scoped lang="scss">
    .fade-enter-active {
        transition: all 0.3s cubic-bezier(0, 0, 0, 1) 0s;
    }
    .fade-leave-active {
        transition: all 0.5s cubic-bezier(0.8, 0, 0.2, 1) 0s;
    }
    .fade-enter,
    .fade-leave-to {
        transform: translateY(-200%);
    }
</style>
