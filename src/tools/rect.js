import {screenToCanvas} from '../lib/coords.js';
import imeProperties from './imeProperties';
import RectSelection from './selection/rect';

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
			...canvasModel.elementStyle
		});

		this.object.attr('imeProperties', imeProperties({
			name: 'Rect',
			selectionModel: new RectSelection(this.object, canvasModel, controlModel)
		}));

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

		this.object.attr('imeProperties').selectionModel.update({
			x2: x,
			y2: y
		});
	},

	type: 'vector',
	change: function(options){
		if(options.type){
			this.type = options.type;
		}
	}
};
