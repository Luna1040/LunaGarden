<template>
    <div class="lunaSelect" @click="handelClick">
        <Input :readonly="!filterable" :disabled="disabled"></Input>
        <div class="optionGroup">
            <slot>
                <Option v-for="(i,index) in data" :key="index" :value="i[keyValue]" :label="i[label]" @optionSelect="optionSelect"></Option>
            </slot>
        </div>
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
            data: {
                type: Array,
                default: []
            },
            keyValue: {
                type: String,
                default: ""
            },
            label: {
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
            }
        },
        methods: {
            handelClick() {
                this.$emit('on-click')
            },
            optionSelect(obj) {
                console.log(obj)
                this.$emit('input', obj.value);
                if(!this.returnLabel) {
                    this.$emit('on-change', obj.value)
                } else {
                    this.$emit('on-change', obj)
                }
            }
        },
        // mounted() {
        //     this.$on('optionSelect', this.optionSelect);
        // }
    }
</script>

<style scoped>

</style>
