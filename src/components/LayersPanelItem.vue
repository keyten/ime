<template>
	<div
		class="item"
		v-bind:class="{active: canvasModel.activeElement === element}"
		v-on:click="elemClick"
	>
		<span
			class="eye"
			v-bind:class="{hidden: !elemVisible}"
			v-on:click="changeVisibility"
		>
			+
		</span>
		<span class="name">
			{{elemName}}
		</span>
	</div>
</template>

<script>
export default {
	name: 'LayersPanelItem',

	props: ['element', 'canvasModel'],

	computed: {
		elemName: function(){
			return this.element.attr('imeProperties').name || 'Noname';
		},

		elemVisible: function(){
			return this.element.attr('visible');
		}
	},

	methods: {
		elemClick: function(){
			this.canvasModel.activeElement = this.element;
		},

		changeVisibility: function(){
			this.element.attr('visible', !this.element.attr('visible'));
		}
	}
};
</script>

<style scoped lang="stylus">
item-height = 45px

.item
	cursor pointer
	&:active
		background rgba(0, 0, 0, 0.1)
	&.active
		background rgba(0, 0, 0, 0.2)

.eye
	font-size 19pt
	font-family Courier
	display: inline-block
	width 45px
	text-align center
	height item-height
	line-height item-height
	cursor pointer
	opacity 0.5
	&:hover
		opacity 0.7
	&.hidden
		opacity 0

.name
	display: inline-block
	height item-height
	line-height item-height
	vertical-align bottom

</style>
