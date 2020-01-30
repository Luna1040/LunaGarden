<template>
    <table class="lunaTable" cellspacing="0" :style="[tableStyles]">
        <thead :style="[headerStyles]">
        <tr>
            <th v-for="col in columns">{{ col.title }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, rowIndex) in data"
            :style="{hoverBorder: choiceIndex === rowIndex}"
            @click="choiceRow(row)"
            @mouseenter="hoverEnter(rowIndex)"
            @mouseleave="hoverOut(rowIndex)"
            @focusin="focusEnter(rowIndex)"
            @focusout="focusLeave(rowIndex)">
            <td v-for="col in columns"
                :style="[baseBorder]">
                <template v-if="'render' in col">
                    <Render :row="row" :column="col" :index="rowIndex" :render="col.render"></Render>
                </template>
                <template v-else-if="col.type === 'index'">{{ rowIndex + 1 }}</template>
                <template v-else>{{ row[col.key] }}</template>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script>
    import Render from './tableRender.js';

    export default {
        name: "Table",
        components: { Render },
        render(h) {
            return h("div", [
                this.createContent(h)
            ])
        },
        props: {
            data: {
                type: Array,
                default: []
            },
            columns: {
                type: Array,
                default: []
            },
            border: {
                type: Boolean,
                default: false,
            },
            borderStyle: {
                type: String,
                default: '#F5F5F5'
            },
            background: {
                type: String,
                default: '#FFFFFF'
            },
            headerBackground: {
                type: String,
                default: '#E8E8E8'
            },
            hoverRowColor: {
                type: String,
                default: '#FFCBE7'
            },
            currentRowColor: {
                type: String,
                default: '#FDA8D6'
            },
            currentRowBorder: {
                type: String,
                default: '#FFCBE7',
            }
        },
        data() {
            return {
                hoverRowBorder: '',
                hoverRow: this.borderStyle,
                currentRow: this.borderStyle,
                choiceIndex: -1
            }
        },
        computed: {
            tableStyles() {
                let styleList = {
                    backgroundColor: this.background
                };
                if(this.border) {
                    styleList.border = '1px solid ' + this.borderStyle
                }

                return styleList
            },
            headerStyles() {
                return {
                    backgroundColor: this.headerBackground,
                }
            },
            baseBorder() {
                return {
                    border: '1px solid ' + this.borderStyle
                }
            },
            hoverBorder() {
                return {
                    backgroundColor: this.hoverRowBorder
                }
            }
        },
        methods: {
            createContent(h) {
                return h('div', this.$slots.default)
            },
            choiceRow(params) {
                this.$emit('on-row-click', params)
            },
            hoverEnter(index) {
                this.hoverRowBorder = this.currentRowBorder
                this.choiceIndex = index
            },
            hoverOut(index) {
                this.hoverRowBorder = this.borderStyle;
            },
            focusEnter(index) {
                if (this.borderColor !== "") {
                    this.boxShadow =
                        "0 0 0 2px rgba(" + this.toRGB(this.borderColor) + ", 0.2)";
                    this.borderColorStyle = this.borderColor;
                } else {
                    this.boxShadow =
                        "0 0 0 2px rgba(" + this.toRGB(this.background) + ", 0.2)";
                    this.borderColorStyle = this.background;
                }
            },
            focusLeave(index) {
                this.boxShadow = "0 0 0 2px rgba(0,0,0, 0)";
                this.hoverRowBorder = "#EEEEEE";
            },
        }
    }
</script>

<style scoped>

</style>
