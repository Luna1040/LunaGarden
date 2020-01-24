<template>
    <div class="lunaCol" :class="[className, classes, {block: !flex, flex: flex}]" :style="[colPadding, colHeight, colMaxHeight, colScrollable, colBackground, colBorder, colColor]">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Col",
        props: {
            background: {
                type: String,
                default: '#FFFFFF'
            },
            border: {
                type: String,
                default: '1px solid #FFFFFF'
            },
            color: {
                type: String,
                default: '#4A4A4A'
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
            xs: [Number, Object],
            sm: [Number, Object],
            md: [Number, Object],
            lg: [Number, Object],
            xl: [Number, Object],
            xxl: [Number, Object]
        },
        computed: {
            classes () {
                let classList = [
                    'lunaCol',
                    {
                        [`lunaCol-span-${this.span}`]: this.span,
                        [`lunaCol-order-${this.order}`]: this.order,
                        [`lunaCol-offset-${this.offset}`]: this.offset,
                        [`lunaCol-push-${this.push}`]: this.push,
                        [`lunaCol-pull-${this.pull}`]: this.pull
                    }
                ];

                ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach(size => {
                    if (typeof this[size] === 'number') {
                        classList.push(`lunaCol-span-${size}-${this[size]}`);
                    } else if (typeof this[size] === 'object') {
                        let props = this[size];
                        Object.keys(props).forEach(prop => {
                            classList.push(
                                prop !== 'span'
                                    ? `lunaCol-${size}-${prop}-${props[prop]}`
                                    : `lunaCol-span-${size}-${props[prop]}`
                            );
                        });
                    }
                });

                return classList;
            },
            colBackground() {
                return {
                    backgroundColor: this.background
                }
            },
            colColor() {
                return {
                    color: this.color
                }
            },
            colBorder() {
                return {
                    border: this.border
                }
            },
            colPadding() {
                return {
                    padding: this.padding + 'px'
                }
            },
            colHeight() {
                return {
                    height: this.height - this.padding * 2 - 2 + 'px',
                    lineHeight: this.height - this.padding * 2 - 2 + 'px'
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
        }
    }
</script>

<style scoped>

</style>
