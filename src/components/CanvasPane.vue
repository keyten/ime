<template>
	<div class="pane">
		<div
			class="layers"
			v-bind:style="{
				width: styleWidth + 'px',
				height: styleHeight + 'px',
				transform: 'translate(' + offset[0] + 'px, ' + offset[1] + 'px)'
			}"
			ref="canvasContainer"
		>
			<canvas
				v-if="model.layersModel.renderPrePostLayers"
				v-bind:width="model.width * model.dpi"
				v-bind:height="model.height * model.dpi"
				v-bind:style="{
					width: styleWidth + 'px',
					height: styleHeight + 'px',
				}"
				v-for="layer in model.layersModel.preLayers"
				v-bind:key="layer.uid"
				class="pre-layer"
				ref="preLayer"
			></canvas>

			<canvas
				v-bind:width="model.width * model.dpi"
				v-bind:height="model.height * model.dpi"
				v-bind:style="{
					width: styleWidth + 'px',
					height: styleHeight + 'px',
				}"
				ref="canvas"
				class="main-layer"
			></canvas>

			<canvas
				v-if="model.layersModel.renderPrePostLayers"
				v-bind:width="model.width * model.dpi"
				v-bind:height="model.height * model.dpi"
				v-bind:style="{
					width: styleWidth + 'px',
					height: styleHeight + 'px',
				}"
				v-for="layer in model.layersModel.postLayers"
				v-bind:key="layer.uid"
				class="post-layer"
				ref="postLayer"
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
			scale: this.model.dpi,
			pivot: 'lt'
		});
	},

	computed: {
		styleWidth: function(){
			return this.model.width * this.zoom;
		},

		styleHeight: function(){
			return this.model.height * this.zoom;
		}
	},

	watch: {
		'model.layersModel.preLayers': function(value){
			// на самом деле это костыль
			// есть чуть более норм решение — сделать компонент <CanvasWithElements elements={currentLayer.elements} />
			setTimeout(() => {
				value.forEach((layer, i) => {
					var canvas = this.$refs.preLayer[i];
					var context = canvas.getContext('2d');
					context.setTransform(this.model.dpi, 0, 0, this.model.dpi, 0, 0);

					layer.elements.forEach(element => {
						element.draw(context);
					});
				});
			}, 1);
		},

		'model.layersModel.postLayers': function(value){
			setTimeout(() => {
				value.forEach((layer, i) => {
					var canvas = this.$refs.postLayer[i];
					var context = canvas.getContext('2d');
					context.setTransform(this.model.dpi, 0, 0, this.model.dpi, 0, 0);

					layer.elements.forEach(element => {
						element.draw(context);
					});
				});
			}, 1);
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
