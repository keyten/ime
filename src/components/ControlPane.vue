<template>
	<canvas
		v-bind:width="width * dpi"
		v-bind:height="height * dpi"
		v-bind:style="{
			width: width + 'px',
			height: height + 'px'
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
	props: ['model', 'zoom', 'offset'],

	mounted: function(){
		this.model.ctx = Delta.query(this.$refs.canvas);
		this.model.ctx.attr({
			scale: this.dpi,
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

		dpi: function(){
			return window.devicePixelRatio === 2 ? 2 : 1;
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
