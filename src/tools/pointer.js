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

		if(!ob){
			return;
		}

		var b = ob.bounds();
		this.outline = rectWithBullets({
			x1: b.x,
			y1: b.y,
			x2: b.x + b.width,
			y2: b.y + b.height
		}, canvasModel, controlModel);
		controlModel.controls.push(this.outline);
	},

	mouseup: function(e, canvasModel, controlModel){},
	mousemove: function(e, canvasModel, controlModel){}
};
