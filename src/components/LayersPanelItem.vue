<template>
	<div
		class="item"
		v-bind:class="{active: canvasModel.activeElement === element}"
	>
		{{'Name: ' + element.name}}
	</div>
</template>

<script>
export default {
	name: 'LayersPanelItem',

	props: ['element', 'canvasModel']
};
</script>

<style scoped lang="stylus">
.item
	padding 15px
	cursor pointer
	&:active
		background #eee
	&.active
		background #ddd
</style>
