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
	props: ['model', 'zoom', 'offset'],

	mounted: function(){
		this.model.ctx = Delta.query(this.$refs.canvas);
/*
		var cnv = document.querySelector('.pane canvas');
		var bounds = cnv.getBoundingClientRect();
		var control = this.model.ctx.circle({
			cx: bounds.x + 100,
			cy: bounds.y + 100,
			radius: 4,
			fill: '#0284a8',
			stroke: '10px #0284a8 0.2'
		});
		control.originalX = 100;
		control.originalY = 100;

		control.rezoom = function(bounds, zoom){
			this.attr({
				cx: bounds.x + control.originalX * zoom,
				cy: bounds.y + control.originalY * zoom
			});
		};

		this.model.controls.push(control); */
	},

	computed: {
		width: function(){
			return window.innerWidth;
		},

		height: function(){
			return window.innerHeight;
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

<style scoped>
canvas {
	position: absolute;
}
</style>
