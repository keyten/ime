<template>
	<div
		class="item"
		v-bind:class="{active: canvasModel.activeElement === element}"
		v-on:click="elemClick"
	>
		{{elemName}}
	</div>
</template>

<script>
export default {
	name: 'LayersPanelItem',

	props: ['element', 'canvasModel'],

	computed: {
		elemName: function(){
			return this.element.attr('imeProperties').name || 'Noname';
		}
	},

	methods: {
		elemClick: function(){
			this.canvasModel.activeElement = this.element;
		}
	}
};
</script>

<style scoped lang="stylus">
.item
	padding 15px 20px
	cursor pointer
	&:active
		background rgba(0, 0, 0, 0.1)
	&.active
		background rgba(0, 0, 0, 0.2)
</style>
