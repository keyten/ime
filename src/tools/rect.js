import {screenToCanvas} from '../lib/coords.js';
import uid from '../lib/uid.js';
import {rectWithBullets} from './controls.js';

export default {
	init: function(canvasModel, controlModel){},
	destroy: function(canvasModel, controlModel){},

	down: false,
	object: null,

	mousedown: function(e, canvasModel, controlModel){
		var [x, y] = screenToCanvas(e.clientX, e.clientY, canvasModel);
		this.object = canvasModel.ctx.rect({
			x, y,
			width: 0,
			height: 0,
			fill: canvasModel.fcolor
		});

		this.object.uid = uid();
		this.object.name = uid().substr(8, 4);
		this.object.createSelection = function(){
			var [x1, y1, x2, y2] = this.attr(['x1', 'y1', 'x2', 'y2'])
			this.outline = rectWithBullets({x1, y1, x2, y2}, canvasModel, controlModel);
			controlModel.controls.push(this.outline);
		};
		this.object.removeSelection = function(){
			var index = controlModel.controls.indexOf(this.outline);
			if(index !== -1){
				controlModel.controls.splice(index, 1);
			}
			this.outline.destroy();
		};

		canvasModel.activeElement = this.object;
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

		this.object.outline.attr({
			x2: x,
			y2: y
		});
	}
};
