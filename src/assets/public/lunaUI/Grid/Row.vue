<template>
    <div class="lunaRow" :style="[rowPadding, rowWidth, rowHeight, rowMaxHeight, rowMaxWidth, rowScrollable, rowBackground, rowBorder]" :class="className">
        <slot></slot>
    </div>
</template>

<script>
    import { findChildren, findBrothers} from "../js/public";

    export default {
        name: "Row",
        props: {
            background: {
                type: String,
                default: '#FEFEFE'
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
            maxWidth: {
                type: Number,
                default: 100
            },
            height: {
                type: Number,
                default: 32
            },
            padding: {
                type: Number,
                default: 0
            },
            maxHeight: {
                type: [Number, String],
                default: 'auto',
            },
            scrollable: {
                type: Boolean,
                default: false
            },
            flex: {
                type: Boolean,
                default: false,
            },
            gutter: {
                type: [Number, Object],
                default: 0
            },
            className: {
                type: String,
                default: ''
            }
        },
        computed: {
            rowBackground() {
                return {
                    backgroundColor: this.background
                }
            },
            rowBorder() {
                return {
                    border: this.border
                }
            },
            rowPadding() {
                return {
                    padding: this.padding + 'px'
                }
            },
            rowWidth() {
                if (this.width <= 100) {
                    return {
                        width: 'calc(' + this.width + '%-' + this.padding * 2 + 'px-6px)'
                    }
                } else {
                    return {
                        width: this.width - this.padding * 2 - 6 + 'px'
                    }
                }
            },
            rowMaxWidth() {
                if (this.maxWidth <= 100) {
                    return {
                        maxWidth: 'calc(' + this.maxWidth + '%-' + this.padding * 2 + 'px-6px)'
                    }
                } else {
                    return {
                        maxWidth: this.maxWidth - this.padding * 2 - 6 + 'px'
                    }
                }
            },
            rowHeight() {
                return {
                    height: this.height + 'px'
                }
            },
            rowMaxHeight() {
                if (this.maxHeight < 100) {
                    return {
                        maxHeight: 'calc(' + this.maxHeight + '%-' + this.padding * 2 + 'px)'
                    }
                } else {
                    return {
                        maxHeight: this.maxHeight - this.padding * 2 + 'px'
                    }
                }
            },
            rowScrollable() {
                if(this.scrollable) {
                    return {
                        overFlow: 'auto'
                    }
                } else {
                    return {
                        overFlow: 'hidden'
                    }
                }
            },
        },
        watch: {
            gutter(value) {
                const lunaCol = findChildren(this, 'Col');
                const childCol = findBrothers(lunaCol, 'Col', false);
                if(childCol.length) {
                    childCol.forEach(item => {
                        item.gutter = value
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
