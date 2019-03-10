import zoomOffsetModel from '../models/ZoomOffset.js';

export default {
	init: function(canvasModel, controlModel){},
	destroy: function(canvasModel, controlModel){},

	down: false,
	x: null,
	y: null,
	offset: null,

	mousedown: function(e, canvasModel, controlModel){
		this.down = true;
		this.x = e.clientX;
		this.y = e.clientY;
		this.offset = zoomOffsetModel.offset;
	},
	mouseup: function(e, canvasModel, controlModel){
		this.down = false;
		this.x = null;
		this.y = null;
		this.offset = null;
	},

	mousemove: function(e, canvasModel, controlModel){
		if(!this.down){
			return;
		}

		zoomOffsetModel.offset = [
			e.clientX - this.x + this.offset[0],
			e.clientY - this.y + this.offset[1]
		];
	}
};
