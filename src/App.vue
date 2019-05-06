<template>
	<div id="app">
		<CanvasPane
			v-bind:model="canvasPaneModel"
			v-bind:zoom="zoomOffsetModel.zoom"
			v-bind:offset="zoomOffsetModel.offset"
		/>

		<ControlPane
			v-bind:model="controlPaneModel"
			v-bind:zoom="zoomOffsetModel.zoom"
			v-bind:offset="zoomOffsetModel.offset"
			v-on:mousedown="controlPaneMouseDown"
		/>

		<UiPane />

		<!-- тут нужен uiPane -->
		<!-- <BasePanel
			header="Layers"
			v-bind:x="viewWidth - 210"
			v-bind:y="10"
		>
			<LayersPanel
				v-bind:canvasModel="canvasPaneModel"
			/>
		</BasePanel>

		<BasePanel
			header="Zoom"
			v-bind:x="viewWidth - 210 * 2"
			v-bind:y="10"
		>
			<ZoomPanel
				v-bind:model="zoomOffsetModel"
			/>
		</BasePanel>

		<BasePanel
			header="Properties"
			v-bind:x="viewWidth - 210 * 2"
			v-bind:y="110"
		>
			<PropsPanel
				v-bind:model="canvasPaneModel"
			/>
		</BasePanel>

		<BasePanel
			header="Tools"
			v-bind:x="10"
			v-bind:y="10"
			class="tools_panel"
		>
			<ToolsPanel
				v-bind:model="toolsModel"
				v-bind:canvasModel="canvasPaneModel"
			/>
		</BasePanel>

		<BasePanel
			header="Script"
			v-bind:x="10"
			v-bind:y="viewHeight - 210"
			class="script-panel"
		>
			<ScriptPanel
				v-bind:model="canvasPaneModel"
			/>
		</BasePanel> -->

		<portal-target name="window"></portal-target>
	</div>
</template>

<script>
import canvasPaneModel from './models/CanvasPane.js';
import controlPaneModel from './models/ControlPane.js';
import toolsModel from './models/Tools.js';
import zoomOffsetModel from './models/ZoomOffset.js';

import CanvasPane from './components/CanvasPane.vue';
import ControlPane from './components/ControlPane.vue';

import UiPane from './components/UiPane.vue';
/* import BasePanel from './components/BasePanel.vue';
import LayersPanel from './components/LayersPanel.vue';
import ToolsPanel from './components/ToolsPanel.vue';
import ZoomPanel from './components/ZoomPanel.vue';
import PropsPanel from './components/PropsPanel.vue';
import ScriptPanel from './components/ScriptPanel.vue'; */

export default {
	name: 'app',

	components: {
		CanvasPane,
		ControlPane,

		UiPane
	},

	data: () => ({
		canvasPaneModel,
		controlPaneModel,
		toolsModel,
		zoomOffsetModel
	}),

	mounted: function(){
		this.toolsModel.tool = 'path';

		window.addEventListener('mouseup', this.windowMouseUp);
		window.addEventListener('mousemove', this.windowMouseMove);
		window.addEventListener('keydown', this.windowKeyDown);
	},

	methods: {
		controlPaneMouseDown: function(e){
			this.toolsModel.mousedown(e);
		},
		windowMouseUp: function(e){
			this.toolsModel.mouseup(e);
		},
		windowMouseMove: function(e){
			this.toolsModel.mousemove(e);
		},
		windowKeyDown: function(e){
			this.toolsModel.keydown(e);
		},

		activateTool: function(){}
	},

	computed: {
		viewWidth: () => window.innerWidth,
		viewHeight: () => window.innerHeight
	}
};

</script>

<style lang="stylus">
html, body, *
	margin 0
	padding 0
	border-collapse collapse
	font-family "Helvetica Neue", Helvetica, Arial, sans-serif
	font-size 13px
</style>
