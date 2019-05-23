import tools from '../tools';
import canvasPaneModel from './CanvasPane.js';
import controlPaneModel from './ControlPane.js';

export default {
	toolModel: null,

	_tool: null,
	get tool(){
		return this._tool;
	},

	set tool(val){
		if(this.toolModel){
			this.toolModel.destroy(
				canvasPaneModel,
				controlPaneModel
			);
		}

		this._tool = val;
		this.toolModel = tools[val];
		this.toolModel.init(
			canvasPaneModel,
			controlPaneModel
		);
	},

	mousedown: function(e){
		this.toolModel.mousedown(e, canvasPaneModel, controlPaneModel);
	},
	mouseup: function(e){
		this.toolModel.mouseup(e, canvasPaneModel, controlPaneModel);
	},
	mousemove: function(e){
		this.toolModel.mousemove(e, canvasPaneModel, controlPaneModel);
	},
	keydown: function(e){
		if(this.toolModel.keydown){
			this.toolModel.keydown(e, canvasPaneModel, controlPaneModel);
		}
	},
	change: function(options){
		if(this.toolModel.change){
			this.toolModel.change(options);
		}
	}
};
