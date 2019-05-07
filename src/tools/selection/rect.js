import {rectWithBullets} from './controls';

export default function Rect(object, canvasModel, controlModel){
	this.object = object;
	this.canvasModel = canvasModel;
	this.controlModel = controlModel;
};

Object.assign(Rect.prototype, {
	outline: null,

	add: function(){
		var {object, canvasModel, controlModel} = this;
		var [x1, y1, x2, y2] = object.attr(['x1', 'y1', 'x2', 'y2'])

		this.outline = rectWithBullets({x1, y1, x2, y2}, canvasModel, controlModel);
		controlModel.controls.push(this);
	},

	update: function(values){
		this.outline.attr(values);
	},

	rezoom: function(){
		this.outline.rezoom();
	},

	remove: function(){
		var {controlModel} = this;
		var index = controlModel.controls.indexOf(this);
		if(index !== -1){
			controlModel.controls.splice(index, 1);
		}

		this.outline.destroy();
		this.outline = null;
	}
});
