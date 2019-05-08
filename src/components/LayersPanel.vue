<template>
	<div v-if="canvasModel.ctx" class="container">
		<div class="items">
			<LayersPanelItem
				v-for="elem in elements"
				v-bind:element="elem"
				v-bind:key="elem.attr('imeProperties').uid"
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
	background linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.5));
	&:hover
		background linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.7));
	&:active
		background rgba(0, 0, 0, 0.3)
		box-shadow inset 0 3px 3px rgba(0, 0, 0, 0.3)
	&_disable
		opacity 0.5
		pointer-events none
</style>
