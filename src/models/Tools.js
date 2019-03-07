import tools from '../tools';
import canvasPaneModel from './CanvasPane.js';
import controlPaneModel from './ControlPane.js';

export default {
	tool: 'path',

	setTool: function(tool){
		this.tool = tool;
		tools[this.tool].init(
			canvasPaneModel,
			controlPaneModel
		);
	}
};
