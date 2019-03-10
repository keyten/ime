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

		<LayersPanel
			v-bind:canvasModel="canvasPaneModel"
		/>

		<ZoomPanel
			v-bind:model="zoomOffsetModel"
		/>

		<ToolsPanel
			v-bind:model="toolsModel"
		/>
	</div>
</template>

<script>
import canvasPaneModel from './models/CanvasPane.js';
import controlPaneModel from './models/ControlPane.js';
import toolsModel from './models/Tools.js';
import zoomOffsetModel from './models/ZoomOffset.js';

import CanvasPane from './components/CanvasPane.vue';
import ControlPane from './components/ControlPane.vue';
import LayersPanel from './components/LayersPanel.vue';
import ToolsPanel from './components/ToolsPanel.vue';
import ZoomPanel from './components/ZoomPanel.vue';

export default {
	name: 'app',

	components: {
		CanvasPane,
		ControlPane,
		LayersPanel,
		ToolsPanel,
		ZoomPanel
	},

	data: () => ({
		canvasPaneModel,
		controlPaneModel,
		toolsModel,
		zoomOffsetModel
	}),

	mounted: function(){
		this.toolsModel.tool = 'rect';

		window.addEventListener('mouseup', this.windowMouseUp);
		window.addEventListener('mousemove', this.windowMouseMove);
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

		activateTool: function(){}
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
