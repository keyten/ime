<template>
	<div
		class="ui-pane"
	>
		<!-- <div class="left">
			<LayersPanel
				v-bind:canvasModel="canvasPaneModel"
			/>
		</div>

		<div class="right">
			<ZoomPanel
				v-bind:model="zoomOffsetModel"
			/>

			<PropsPanel
				v-bind:model="canvasPaneModel"
			/>
		</div>

		<div class="tools">
			<ToolsPanel
				v-bind:model="toolsModel"
				v-bind:canvasModel="canvasPaneModel"
			/>
		</div> -->
		<TopMenu class="top-menu" />

		<div class="tools">
			<ToolsPanel
				v-bind:model="toolsModel"
				v-bind:canvasModel="canvasPaneModel"
			/>
		</div>

		<ToolPropPanel
			class="tool-prop-panel"
			v-bind:toolsModel="toolsModel"
		/>

		<BasePanel
			header="Layers"
			v-bind:x="viewWidth - 210"
			v-bind:y="95"
		>
			<LayersPanel
				v-bind:canvasModel="canvasPaneModel"
			/>
		</BasePanel>

		<BasePanel
			header="Zoom"
			v-bind:x="viewWidth - 210"
			v-bind:y="viewHeight - 106"
		>
			<ZoomPanel
				v-bind:model="zoomOffsetModel"
			/>
		</BasePanel>

		<ExportWindow
			v-bind:visible="uiModel.exportWindowVisible"
			v-bind:model="canvasPaneModel"
			v-on:close="uiModel.exportWindowVisible = false"
		/>
	</div>
</template>

<script>
import canvasPaneModel from '../models/CanvasPane.js';
import controlPaneModel from '../models/ControlPane.js';
import toolsModel from '../models/Tools.js';
import zoomOffsetModel from '../models/ZoomOffset.js';
import uiModel from '../models/Ui.js';

import BasePanel from './BasePanel.vue';
import LayersPanel from './LayersPanel.vue';
import ToolsPanel from './ToolsPanel.vue';
import ToolPropPanel from './ToolPropPanel.vue';
import ZoomPanel from './ZoomPanel.vue';
import PropsPanel from './PropsPanel.vue';
import ScriptPanel from './ScriptPanel.vue';
import TopMenu from './TopMenu.vue';

import ExportWindow from './ExportWindow.vue';

export default {
	name: 'UiPane',

	components: {
		BasePanel,

		LayersPanel,
		ToolsPanel,
		ZoomPanel,
		PropsPanel,
		ScriptPanel,
		ToolPropPanel,

		TopMenu,

		ExportWindow
	},

	data: () => ({
		canvasPaneModel,
		controlPaneModel,
		toolsModel,
		zoomOffsetModel,
		uiModel
	}),

	computed: {
		viewWidth: () => window.innerWidth,
		viewHeight: () => window.innerHeight
	}
};
</script>

<style scoped lang="stylus">

.ui-pane
	width 100vw
	height 100vh
	position absolute
	pointer-events none

//.left, .right, .tools

.ui-pane > *
	pointer-events all

.left
	position absolute
	bottom 0
	left 0
	height calc(100vh - 40px)
	width 200px
	background #fafafa

.right
	position absolute
	bottom 0
	right 0
	height calc(100vh - 40px)
	width 200px
	background #fafafa

.tools
	position absolute
	top 30vh
	left 0

.top-menu
	position absolute
	top 0
	left 0
	width 100%

.tool-prop-panel
	position absolute
	top 35px
	left 0
</style>
