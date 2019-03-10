<template>
	<BasePanel
		header="Zoom"
		v-bind:x="initialPanelX"
		v-bind:y="10"
	>
		<div class="container">
			<input
				type="range"
				min="0.5"
				max="10"
				step="0.1"
				v-bind:value="model.zoom"
				v-on:input="onValueChange"
			/>
		</div>
	</BasePanel>
</template>

<script>
import BasePanel from './BasePanel.vue';

export default {
	name: 'ZoomPanel',
	props: ['model'],
	components: {
		BasePanel
	},
	computed: {
		initialPanelX: () => window.innerWidth - 210 * 2
	},
	methods: {
		onValueChange: function(e){
			this.model.zoom = Number(e.target.value);
		}
	}
};
</script>

<style scoped lang="stylus">
.container
	padding 15px 20px
</style>
