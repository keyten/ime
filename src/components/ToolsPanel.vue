<template>
	<BasePanel
		header="Tools"
		v-bind:x="10"
		v-bind:y="10"
		class="tools_panel"
	>
		<div class="inside">
			<div
				class="tool-button"
				v-for="tool in tools"
				v-bind:key="tool"
				v-bind:class="{active: model.tool === tool}"
				v-on:click="toolChange(tool)"
			>
				{{tool}}
			</div>
		</div>
	</BasePanel>
</template>

<script>
import BasePanel from './BasePanel.vue';

export default {
	name: 'ToolsPanel',
	props: ['model'],

	components: {
		BasePanel
	},

	data: () => ({
		tools: ['path', 'pointer', 'rect', 'hand']
	}),

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
.tool-button
	padding 10px
	cursor pointer
	border-top 1px solid #ccc
	&:first-child
		border-top 0
	&.active
		background #eee

</style>
