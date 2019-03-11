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

		<!-- For save dialog -->
		<div class="save-btn" v-on:click="saveVisible = true">Save</div>
		<ExportWindow
			v-bind:visible="saveVisible"
			v-bind:model="canvasModel"
			v-on:close="saveVisible = false"
		/>
	</BasePanel>
</template>

<script>
import BasePanel from './BasePanel.vue';
import ExportWindow from './ExportWindow.vue';

export default {
	name: 'ToolsPanel',
	props: ['model', 'canvasModel'],

	components: {
		BasePanel, ExportWindow
	},

	data: () => ({
		tools: ['path', 'pointer', 'rect', 'hand'],
		saveVisible: false
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

.save-btn
	padding 10px
	background #f5f5f5
	border-top 1px solid #aaa
	cursor pointer

</style>
