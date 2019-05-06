<template>
	<div v-if="canvasModel.ctx" class="container">
		<button style="position: absolute; top: 10px; left: 170px;">abcdef</button>
		<div class="items">
			<LayersPanelItem
				v-for="elem in elements"
				v-bind:element="elem"
				v-bind:key="elem.uid"
				v-bind:canvasModel="canvasModel"
			/>
		</div>
		<div class="buttons">
			<div
				v-on:click="remove"
				v-bind:class="['button', canvasModel.activeElement ? '' : 'button_disable']
			">
				Remove
			</div>
		</div>
	</div>
</template>

<script>
import LayersPanelItem from './LayersPanelItem.vue';

export default {
	name: 'LayersPanel',
	props: ['canvasModel'],
	components: {
		LayersPanelItem
	},
	computed: {
		elements: function(){
			return this.canvasModel.ctx.elements.slice().reverse();
		}
	},
	methods: {
		remove: function(){
			if(!this.canvasModel.activeElement){
				return;
			}

			this.canvasModel.activeElement.remove();
			this.canvasModel.activeElement = null;
		}
	}
};
</script>

<style scoped lang="stylus">
button
	padding 7px 15px
	background linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.5));
	border solid 1px #ccc
	border-radius 4px
	box-shadow 0 3px 3px rgba(0, 0, 0, 0.1)
	outline 0
	cursor pointer
	&:hover
		background linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.7));
		border-color #bbb
	&:active
		background #999
		box-shadow inset 0 3px 3px rgba(0, 0, 0, 0.3), 0 1px white
		border-color #777

.container
	height 100%
	display grid
	grid-template-rows auto 34px

.items
	overflow auto
	border-bottom solid 1px #eee

.button
	font-size 12px
	cursor pointer
	padding 10px 10px
	display inline-block
	background #fafafa
	&:hover
		background #eee
	&:active
		background #ddd
	&_disable
		opacity 0.5
		pointer-events none
</style>
