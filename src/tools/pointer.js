import {screenToCanvas} from '../lib/coords.js';
import {rectWithBullets} from './controls.js';

export default {
	init: function(canvasModel, controlModel){},
	destroy: function(canvasModel, controlModel){
		if(this.outline){
			this.outline.destroy();
			this.outline = null;
		}
	},

	mousedown: function(e, canvasModel, controlModel){
		if(this.outline){
			this.outline.destroy();
			this.outline = null;
		}

		var [x, y] = screenToCanvas(e.clientX, e.clientY, canvasModel);
		var ob = canvasModel.ctx.getObjectInPoint(x, y);
		canvasModel.activeElement = ob;
	},

	mouseup: function(e, canvasModel, controlModel){},
	mousemove: function(e, canvasModel, controlModel){}
};
