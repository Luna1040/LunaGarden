<template>
	<div class="charaSelectArea">
		<figure
			v-for="(i, index) in charaList"
			:key="index"
			@click="chooseChara(i)"
			@mouseenter="hoverIndex = index"
			@mouseleave="hoverIndex = -1"
		>
			<img :class="{ blur: hoverIndex === index }" :src="i.previewSrc" alt="" />
			<figcaption v-show="hoverIndex === index">
				<p>{{ i.name }}</p>
				<p>{{ i.desc }}</p>
				<p>{{ i.camp }}</p>
			</figcaption>
		</figure>
		<figure style="border: 0;"></figure>
		<figure style="border: 0;"></figure>
		<figure style="border: 0;"></figure>
		<figure style="border: 0;"></figure>
		<figure style="border: 0;"></figure>
	</div>
</template>

<script>
export default {
    props: {
        charaList: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            hoverIndex: -1
        }
    },
    methods: {
        chooseChara(obj) {
            this.$emit.chooseChara(obj)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>