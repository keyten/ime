<template>
	<canvas
		v-bind:width="width * model.dpi"
		v-bind:height="height * model.dpi"
		v-bind:style="{
			width: width + 'px',
			height: height + 'px',
			cursor: cursor
		}"
		v-on:mousedown="$emit('mousedown', $event)"
		v-on:mouseup="$emit('mouseup', $event)"
		v-on:mousemove="$emit('mousemove', $event)"
		ref="canvas"
	></canvas>
</template>

<script>
export default {
	name: 'ControlPane',
	props: ['model', 'zoom', 'offset', 'toolsModel'],

	mounted: function(){
		this.model.ctx = Delta.query(this.$refs.canvas);
		this.model.ctx.attr({
			scale: this.model.dpi,
			pivot: 'lt'
		});
	},

	computed: {
		width: function(){
			return window.innerWidth;
		},

		height: function(){
			return window.innerHeight;
		},

		cursor: function(){
			return this.toolsModel.toolModel && this.toolsModel.toolModel.cursor;
		}
	},

	methods: {
		rezoom: function(zoom){
			var cnv = document.querySelector('.pane canvas');
			var bounds = cnv.getBoundingClientRect();

			this.model.controls.forEach(control => {
				control.rezoom(bounds, zoom);
			});
		}
	},

	watch: {
		zoom: function(newVal, oldVal){
			this.rezoom(newVal);
		},

		offset: function(newVal, oldVal){
			this.rezoom(this.zoom);
		}
	}
};
</script>

<style scoped lang="stylus">
canvas
	position absolute
	image-rendering pixelated
</style>
