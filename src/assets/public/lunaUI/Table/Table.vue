<template>
    <table>
        <thead>
        <tr>
            <th v-for="col in columns">{{ col.title }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row, rowIndex) in data">
            <td v-for="col in columns">
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
            }
        },
        methods: {
            createContent(h) {
                return h('div', this.$slots.default
                )
            }
        }
    }
</script>

<style scoped>

</style>
