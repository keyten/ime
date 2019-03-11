<template>
	<div
		class="item"
		v-bind:class="{active: canvasModel.activeElement === element}"
		v-on:click="elemClick"
	>
		{{'Name: ' + element.name}}
	</div>
</template>

<script>
export default {
	name: 'LayersPanelItem',

	props: ['element', 'canvasModel'],

	methods: {
		elemClick: function(){
			this.canvasModel.activeElement = this.element;
		}
	}
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
