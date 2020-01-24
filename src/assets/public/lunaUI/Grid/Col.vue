<template>
    <div class="lunaCol" :class="[className, {block: !flex, flex: flex}]" :style="[colPadding, colWidth, colHeight, colMaxWidth, colMaxHeight, colScrollable]">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Col",
        data() {
            return {
                gutter: 0
            }
        },
        props: {
            width: {
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
            maxHeight: {
                type: [Number, String],
                default: 'auto'
            },
            padding: {
                type: Number,
                default: 8
            },
            scrollable: {
                type: Boolean,
                default: false
            },
            flex: {
                type: Boolean,
                default: false
            },
            span: {
                type: Number,
                default: 0
            },
            order: {
                type: Number,
                default: 0
            },
            offset: {
                type: Number,
                default: 0
            },
            push: {
                type: Number,
                default: 0
            },
            pull: {
                type: Number,
                default: 0
            },
            className: {
                type: String,
                default: ''
            },
        },
        computed: {
            colPadding() {
                return {
                    padding: this.padding + 'px'
                }
            },
            colWidth() {
                if(this.width < 100) {
                    return {
                        width: 'calc(' + this.width + '%' + '-' + this.padding * 2 + 'px)'
                    }
                } else {
                    return {
                        width: this.width - this.padding * 2 + 'px'
                    }
                }
            },
            colMaxWidth() {
                if(this.maxWidth < 100) {
                    return {
                        maxWidth: 'calc(' + this.maxWidth + '%' + '-' + this.padding * 2 + 'px)'
                    }
                } else {
                    return {
                        maxWidth: this.maxWidth - this.padding * 2 + 'px'
                    }
                }
            },
            colHeight() {
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
            colMaxHeight() {
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
            colScrollable() {
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
            colSpan() {
                if(this.span !== 0) {
                    return {

                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
