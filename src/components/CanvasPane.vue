<template>
	<div class="pane">
		<div
			class="layers"
			v-bind:style="{
				width: styleWidth + 'px',
				height: styleHeight + 'px',
				transform: 'translate(' + offset[0] + 'px, ' + offset[1] + 'px)'
			}"
		>
			<canvas
				v-bind:width="model.width * dpi"
				v-bind:height="model.height * dpi"
				v-bind:style="{
					width: styleWidth + 'px',
					height: styleHeight + 'px',
				}"
				ref="canvas"
			></canvas>
			<canvas
				v-bind:width="model.width * dpi"
				v-bind:height="model.height * dpi"
				v-bind:style="{
					width: styleWidth + 'px',
					height: styleHeight + 'px',
				}"
			></canvas>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CanvasPane',
	props: ['model', 'zoom', 'offset'],

	mounted: function(){
		this.model.ctx = Delta.query(this.$refs.canvas);
		this.model.ctx.attr({
			scale: this.dpi,
			pivot: 'lt'
		});

		var oldRender = this.model.ctx.render;
		this.model.ctx.render = function(ctx){
			// тут нужно по canvas-ам
			oldRender.call(this, ctx);
		};
	},

	computed: {
		styleWidth: function(){
			return this.model.width * this.zoom;
		},

		styleHeight: function(){
			return this.model.height * this.zoom;
		},

		dpi: function(){
			return window.devicePixelRatio === 2 ? 2 : 1;
		}
	}
};
</script>

<style scoped lang="stylus">
.pane
	position absolute
	width 100vw
	height 100vh
	background #fafafa
	display flex
	justify-content center
	align-items center

.layers
	background white
	box-shadow 0 0 3px rgba(0, 0, 0, 0.1)

canvas
	image-rendering pixelated
	position absolute
</style>
