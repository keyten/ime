import {screenToCanvas} from '../lib/coords.js';

export default {
	cursor: 'crosshair',

	init: function(canvasModel, controlModel){},

	destroy: function(canvasModel, controlModel){},

	ctx: null,
	mousedown: function(e, canvasModel, controlModel){
		var ctx = canvasModel.layersModel.toRasterMode();
		if(!ctx){
			return;
		}

		this.ctx = ctx;
	},

	mouseup: function(e, canvasModel, controlModel){
		this.ctx = null;
	},

	mousemove: function(e, canvasModel, controlModel){
		if(!this.ctx){
			return;
		}

		var [x, y] = screenToCanvas(e.clientX, e.clientY, canvasModel);
		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		this.ctx.arc(x, y, 10, 0, Math.PI * 2, true);
		this.ctx.fill();
	}
};
