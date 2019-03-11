<template>
	<div class="pane">
		<canvas
			v-bind:width="model.width"
			v-bind:height="model.height"
			v-bind:style="{
				width: styleWidth + 'px',
				height: styleHeight + 'px',
				transform: 'translate(' + offset[0] + 'px, ' + offset[1] + 'px)'
			}"
			ref="canvas"
		></canvas>
	</div>
</template>

<script>
export default {
	name: 'CanvasPane',
	props: ['model', 'zoom', 'offset'],


	mounted: function(){
		this.model.ctx = Delta.query(this.$refs.canvas);
	},

	computed: {
		styleWidth: function(){
			return this.model.width * this.zoom;
		},

		styleHeight: function(){
			return this.model.height * this.zoom;
		}
	}
};
</script>

<style scoped lang="stylus">
.pane
	position absolute
	width 100vw
	height 100vh
	background #eee
	display flex
	justify-content center
	align-items center

canvas
	background white
	image-rendering pixelated
</style>
