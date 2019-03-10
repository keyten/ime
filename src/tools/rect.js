import {screenToCanvas} from '../lib/coords.js';
import uid from '../lib/uid.js';
import {rectWithBullets} from './controls.js';

export default {
	init: function(canvasModel, controlModel){},
	destroy: function(canvasModel, controlModel){
		if(this.outline){
			this.outline.destroy();
			this.outline = null;
		}
		canvasModel.activeElement = null;
	},

	down: false,
	object: null,
	outline: null,

	mousedown: function(e, canvasModel, controlModel){
		if(this.outline){
			this.outline.destroy();
		}

		var [x, y] = screenToCanvas(e.clientX, e.clientY, canvasModel);
		this.object = canvasModel.ctx.rect({
			x, y,
			width: 0,
			height: 0,
			fill: canvasModel.fcolor
		});
		this.object.name = uid().substr(8, 4);
		canvasModel.activeElement = this.object;

		this.outline = rectWithBullets({
			x1: x,
			y1: y,
			x2: x,
			y2: y
		}, canvasModel, controlModel);
		controlModel.controls.push(this.outline);

		this.down = true;
	},

	mouseup: function(e, canvasModel, controlModel){
		this.object = null;
		this.down = false;
	},

	mousemove: function(e, canvasModel, controlModel){
		if(!this.down){
			return;
		}

		var [x, y] = screenToCanvas(e.clientX, e.clientY, canvasModel);
		this.object.attr({
			x2: x,
			y2: y
		});

		this.outline.attr({
			x2: x,
			y2: y
		});
	}
};
