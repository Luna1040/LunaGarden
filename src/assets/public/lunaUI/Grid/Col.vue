<template>
    <div class="lunaCol">
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
        }
    }
</script>

<style scoped>

</style>
