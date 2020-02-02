<template>
<div class="lunaOption" @click="handelSelect">
    <slot>{{label}}</slot>
</div>
</template>

<script>
    import '../js/public'

    export default {
        name: "Option",
        props: {
            label: {
                type: [String,Number],
                default: ''
            },
            value: {
                type: [String,Number],
                default: ''
            }
        },
        methods: {
            // dispatch(componentName, eventName, params) {
            //     let parent = this.$parent || this.$root;
            //     let name = parent.$options.name;
            //
            //     while (parent && (!name || name !== componentName)) {
            //         parent = parent.$parent;
            //
            //         if (parent) {
            //             name = parent.$options.name;
            //         }
            //     }
            //     if (parent) {
            //         parent.$emit.apply(parent, [eventName].concat(params));
            //     }
            // },
            handelSelect() {
                let obj = {
                    value: this.value,
                    label: this.label,
                    tag: this.tag
                };
                this.$emit('optionSelect', obj);
            }
        },

    }
</script>

<style scoped>

</style>
