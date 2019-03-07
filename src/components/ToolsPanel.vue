<template>
	<BasePanel
		header="Tools"
		v-bind:x="10"
		v-bind:y="10"
		class="tools_panel"
	>
		<div class="inside">
			<BaseButton
				text="Path"
				v-on:click="toolChange('path')"
			/>
			<BaseButton
				text="Brush"
				v-on:click="toolChange('brush')"
			/>
		</div>
	</BasePanel>
</template>

<script>
import BasePanel from './BasePanel.vue';
import BaseButton from './BaseButton.vue';

export default {
	name: 'ToolsPanel',
	props: ['model'],
	components: {
		BasePanel,
		BaseButton
	},
	methods: {
		toolChange: function(tool){
			this.model.tool = tool;
		}
	}
};
</script>

<style lang="stylus">
.tools_panel
	width 100px !important
	min-width 0 !important
</style>

<style lang="stylus" scoped>
.inside
	padding 10px
	padding-top 0

button
	width 100%
</style>
