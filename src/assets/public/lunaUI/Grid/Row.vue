<template>
    <div class="lunaRow" :style="[rowPadding, rowWidth, rowHeight, rowMaxHeight, rowMaxWidth, rowScrollable]" :class="[{block: !flex, flex: flex}, className]">
        <slot></slot>
    </div>
</template>

<script>
    import { findChildren, findBrothers} from "../js/public";

    export default {
        name: "Row",
        props: {
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
                default: 8
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
                type: Number,
                default: 0
            },
            className: {
                type: String,
                default: ''
            }
        },
        computed: {
            rowPadding() {
                return {
                    padding: this.padding + 'px'
                }
            },
            rowWidth() {
                if (this.width < 100) {
                    return {
                        width: 'calc(' + this.width + '%' + '-' + this.padding * 2 + 'px)'
                    }
                } else {
                    return {
                        width: this.width - this.padding * 2 + 'px'
                    }
                }
            },
            rowMaxWidth() {
                if (this.maxWidth < 100) {
                    return {
                        maxWidth: 'calc(' + this.maxWidth + '%' + '-' + this.padding * 2 + 'px)'
                    }
                } else {
                    return {
                        maxWidth: this.maxWidth - this.padding * 2 + 'px'
                    }
                }
            },
            rowHeight() {
                if (this.height < 100) {
                    return {
                        height: 'calc(' + this.height + '%' + '-' + this.padding * 2 + 'px)'
                    }
                } else {
                    return {
                        height: this.height - this.padding * 2 + 'px'
                    }
                }
            },
            rowMaxHeight() {
                if (this.maxHeight < 100) {
                    return {
                        maxHeight: 'calc(' + this.maxHeight + '%' + '-' + this.padding * 2 + 'px)'
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
