<template>
	<canvas
		v-bind:width="width"
		v-bind:height="height"
		v-on:mousedown="$emit('mousedown', $event)"
		v-on:mouseup="$emit('mouseup', $event)"
		v-on:mousemove="$emit('mousemove', $event)"
		ref="canvas"
	></canvas>
</template>

<script>
export default {
	name: 'ControlPane',
	props: ['model', 'zoom'],

	mounted: function(){
		this.model.ctx = Delta.query(this.$refs.canvas);

		var cnv = document.querySelector('.pane canvas');
		var bounds = cnv.getBoundingClientRect();
		this.control = this.model.ctx.circle({
			cx: bounds.x + 100,
			cy: bounds.y + 100,
			radius: 4,
			fill: '#0284a8',
			stroke: '10px #0284a8 0.2'
		});
	},

	computed: {
		width: function(){
			return window.innerWidth;
		},

		height: function(){
			return window.innerHeight;
		}
	},

	watch: {
		zoom: function(newVal, oldVal){
			var cnv = document.querySelector('.pane canvas');
			var bounds = cnv.getBoundingClientRect();

			var c = this.control;
			var cx = bounds.x + 100 * this.zoom;
			var cy = bounds.y + 100 * this.zoom;

			c.attr({cx, cy});
		}
	}
};
</script>

<style scoped>
canvas {
	position: absolute;
}
</style>
