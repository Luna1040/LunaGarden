<template>
    <div
            class="lunaForm"
            :style="[formStyles]"
            :class="[className,
            {darkShadow: shadow && shadowStyle === 'dark', lightShadow: shadow && shadowStyle === 'light'},
            {scrollable: scrollable},
            {squareCorner: corner === 'square', smallCorner: corner === 'small', filletCorner: corner === 'fillet', largeCorner: corner === 'large', fullCorner: corner === 'full'},
            {lightForm: theme === 'light', darkForm: theme === 'dark'},
            {formColumn: direction === 'column', formRow: direction === 'row'}
            ]">
        <FormItem
                class="lunaFormItem"
                v-for="(i, index) in formData"
                :key="index"
                :itemData="i"
                :labelWidthCount="labelWidthCount"
                :style="formItemStyle"
                :corner="corner"
        ></FormItem>
    </div>
</template>

<script>

    export default {
        name: "Form",
        props: {
            shadow: {
                type: Boolean,
                default: true
            },
            shadowStyle: {
                type: String,
                default: 'dark'
            },
            theme: {
                type: String,
                default: 'light'
            },
            radius: {
                type: Number,
                default: -1
            },
            corner: {
                type: String,
                default: 'large'
            },
            background: {
                type: String,
                default: 'none'
            },
            border: {
                type: String,
                default: '1px solid #EFEFEF'
            },
            //宽度高度相关小于等于100为百分比，大于100为px
            width: {
                //可选auto
                type: [Number, String],
                default: 100
            },
            height: {
                type: [Number, String],
                default: 'auto'
            },
            maxHeight: {
                type: [Number, String],
                default: 'auto',
            },
            padding: {
                type: Number,
                default: 16
            },
            scrollable: {
                type: Boolean,
                default: false
            },
            className: {
                type: String,
                default: ''
            },
            direction: {
                type: String,
                default: 'column'
            },
            labelPosition: {
                type: String,
                default: 'left'
            },
            labelWidth: {
                type: Number,
                default: 120
            },
            form: {
                type: Array,
                default: []
            },
        },
        computed: {
            formStyles() {
                const styleList = {
                    padding: this.padding + 'px',
                    border: this.border
                };
                if (this.background !== 'none') {
                    styleList.backgroundColor = this.background + '!important'
                }

                if (typeof this.width !== 'string') {
                    if (this.width <= 100) {
                        styleList.width = this.width + '%'
                    } else {
                        styleList.width = this.width + 'px'
                    }
                } else {
                    styleList.width = this.width
                }

                if (typeof this.height !== 'string') {
                    if (this.height <= 100) {
                        styleList.height = this.height + '%'
                    } else {
                        styleList.height = this.height + 'px'
                    }
                } else {
                    styleList.height = this.height
                }

                if (this.maxHeight !== 'auto') {
                    if (typeof this.maxHeight !== 'string') {
                        if (this.height <= 100) {
                            styleList.height = this.height + '%'
                        } else {
                            styleList.height = this.height + 'px'
                        }
                    } else {
                        styleList.height = this.height
                    }
                }

                if (this.radius !== -1) {
                    styleList.borderRadius = this.radius
                }


                return styleList
            },
            formItemStyle() {
                const styleList = {};

                if (this.labelPosition === 'left') {
                    styleList.display = 'flex';
                    styleList.alignItems = 'center';
                }

                return styleList
            },
            labelWidthCount() {
                return {
                    width: this.labelWidth + 'px'
                }
            }
        },
        data() {
            return {
                formData: this.form
            }
        },
        created() {
            // this.addAttr(this.form)
        },
        methods: {
            createContent(h) {
                return h('div', this.$slots.default)
            },
            addAttr(data) {
                data.forEach((item, index) => {
                    if(item.validate) {
                        data[index].errStatus = false;
                        data[index].errText = '';
                        this.formData.push(data[index])
                    } else {
                        this.formData.push(item)
                    }
                });
            },
            examine(data) {
                for (let i = 0; i < this.formData.length; i++) {
                    if(this.formData[i].validate) {
                        this.formData[i].errStatus = false;
                        this.formData[i].errText = '';
                        let str = data[this.formData[i].validate];
                        if(this.formData[i].required) {
                            if(str === '') {
                                this.formData[i].errStatus = true;
                                this.formData[i].errText = this.formData[i].emptyWarning;
                            }
                        }
                        if(this.formData[i].errStatus === false && this.formData[i].validateMethods) {
                            for(let ins = 0;ins < this.formData[i].validateMethods.length; ins ++) {

                            }
                        }
                    }
                }
                // Object.keys(data).forEach((key) => {
                //   console.log(key + ':' + data[key]);
                //
                // })
            }
        },
    }
</script>

<style scoped>
</style>
