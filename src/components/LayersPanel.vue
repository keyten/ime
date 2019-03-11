<template>
	<BasePanel
		header="Layers"
		v-bind:x="initialPanelX"
		v-bind:y="10"
	>
		<div v-if="canvasModel.ctx" class="container">
			<LayersPanelItem
				v-for="elem in elements"
				v-bind:element="elem"
				v-bind:key="elem.uid"
				v-bind:canvasModel="canvasModel"
			/>
		</div>
	</BasePanel>
</template>

<script>
import BasePanel from './BasePanel.vue';
import LayersPanelItem from './LayersPanelItem.vue';

export default {
	name: 'LayersPanel',
	props: ['canvasModel'],
	components: {
		BasePanel,
		LayersPanelItem
	},
	computed: {
		elements: function(){
			return this.canvasModel.ctx.elements.slice().reverse();
		},
		initialPanelX: () => window.innerWidth - 210
	}
};
</script>

<style scoped lang="stylus">
.container
	max-height 322px
	overflow auto
</style>
