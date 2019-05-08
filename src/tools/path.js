import {screenToCanvas} from '../lib/coords.js';
import imeProperties from './imeProperties';
import PathSelection from './selection/path';

const states = {
	initial: 'initial', // path does not exist
	continue: 'continue' // path exists
};

export default {
	init: function(canvasModel, controlModel){
		this.state = states.initial;
	},
	destroy: function(canvasModel, controlModel){
		this.object = null;
	},

	state: states.initial,
	object: null,
	down: false,

	mousedown: function(e, canvasModel, controlModel){
		if(canvasModel.activeElement !== this.object){
			this.state = states.initial;
		}

		var [x, y] = screenToCanvas(e.clientX, e.clientY, canvasModel);

		if(this.state === states.initial){
			this.createPath(x, y, canvasModel, controlModel);
			this.state = states.continue;
		} else if(this.state === states.continue){
			this.addPoint(x, y, canvasModel, controlModel);
		}

		this.down = true;
	},

	mouseup: function(e, canvasModel, controlModel){
		this.down = false;
	},

	mousemove: function(e, canvasModel, controlModel){
		if(!this.down){
			return;
		}

		var [x, y] = screenToCanvas(e.clientX, e.clientY, canvasModel);
		if(this.isLastCurveLine()){
			this.transformLastLineToBezier(x, y);
		} else {
			this.moveLastBezierHandle(x, y);
		}
	},

	createPath: function(x, y, canvasModel, controlModel){
		this.object = canvasModel.ctx.path({
			d: [[x, y]],
			...canvasModel.elementStyle
		});

		this.object.attr('imeProperties', imeProperties({
			name: 'Path',
			selectionModel: new PathSelection(this.object, canvasModel, controlModel)
		}));

		canvasModel.activeElement = this.object;
	},

	addPoint: function(x, y, canvasModel, controlModel){
		var {selectionModel} = this.object.attr('imeProperties');

		if(this.isLastCurveLine()){
			this.object.lineTo(x, y);

			selectionModel.addPoint('line', x, y);
		} else {
			var [lh1x, lh1y, lh2x, lh2y, lx, ly] = this.getLastCurve().attr('args');
			var [h1x, h1y] = mirrorPointByAnotherPoint([lh2x, lh2y], [lx, ly]);
			this.object.bezierCurveTo(
				h1x, h1y,
				x, y,
				x, y
			);

			selectionModel.addPoint('bezier', x, y, h1x, h1y);
		}
	},

	transformLastLineToBezier: function(mouseX, mouseY){
		var lastCurve = this.getLastCurve();
		var [x, y] = lastCurve.attr('args');
		var [h1x, h1y] = lastCurve.startAt();
		var [h2x, h2y] = mirrorPointByAnotherPoint([mouseX, mouseY], [x, y]);

		this.object.remove(this.object.attr('curves').length - 1);
		this.object.bezierCurveTo(h1x, h1y, h2x, h2y, x, y);

		var {selectionModel} = this.object.attr('imeProperties');
		selectionModel.transformLastLineToBezier(h1x, h1y, h2x, h2y, x, y);
	},

	moveLastBezierHandle: function(mouseX, mouseY){
		var curves = this.object.attr('curves');
		var bezier = curves[curves.length - 1];
		var [h1x, h1y, _h2x, _h2y, x, y] = bezier.attr('args');
		var [h2x, h2y] = mirrorPointByAnotherPoint([mouseX, mouseY], [x, y]);
		bezier.attr('args', [h1x, h1y, h2x, h2y, x, y]);

		var {selectionModel} = this.object.attr('imeProperties');
		selectionModel.moveLastBezierHandle(h2x, h2y, x, y);
	},

	getLastCurve: function(){
		var curves = this.object.attr('curves');
		return curves[curves.length - 1];
	},

	isLastCurveLine: function(){
		return [
			'moveTo',
			'lineTo'
		].includes(this.getLastCurve().method);
	}
};

function mirrorPointByAnotherPoint(point, pivot){
	var dx = point[0] - pivot[0];
	var dy = point[1] - pivot[1];
	return [pivot[0] - dx, pivot[1] - dy];
}

/* import {screenToCanvas} from '../lib/coords.js';
import uid from '../lib/uid.js';
import {bullet, mirrorBulletLine} from './controls.js';

const states = {
	initial: 'initial',
	drawing: 'drawing'
};

export default {
	init: function(canvasModel, controlModel){
		this.state = states.initial;
	},
	destroy: function(canvasModel, controlModel){},

	state: states.initial,
	object: null,
	control: null,
	down: false,

	mousedown: function(e, canvasModel, controlModel){
		var [x, y] = screenToCanvas(e.clientX, e.clientY, canvasModel);

		this.down = true;

		this.control = bullet({x, y}, canvasModel, controlModel);

		if(this.state === states.initial){
			this.object = canvasModel.ctx.path({
				d: [[x, y]],
				...canvasModel.elementStyle
				// можно прям тут передавать imeProperties
			});

			this.object.uid = uid();
			this.object.name = 'Path';
			this.object.createSelection = function(){
				/* var [x1, y1, x2, y2] = this.attr(['x1', 'y1', 'x2', 'y2'])
				this.outline = rectWithBullets({x1, y1, x2, y2}, canvasModel, controlModel);
				controlModel.controls.push(this.outline); * /
			};
			this.object.removeSelection = function(){
				/* var index = controlModel.controls.indexOf(this.outline);
				if(index !== -1){
					controlModel.controls.splice(index, 1);
				}
				this.outline.destroy(); * /
			};

			canvasModel.activeElement = this.object;

			this.state = states.drawing;
		} else if(this.state === states.drawing){
			this.object.lineTo(x, y);
		}
	},

	mouseup: function(e, canvasModel, controlModel){
		this.down = false;
	},

	mousemove: function(e, canvasModel, controlModel){
		if(!this.down){
			return;
		}

		var [x, y] = screenToCanvas(e.clientX, e.clientY, canvasModel);

		if(this.control.type === 'bullet'){
			var [cx, cy] = this.control.attr(['x', 'y']);
			this.control.destroy();
			this.control = mirrorBulletLine({cx, cy, x, y}, canvasModel, controlModel);

			var curves = this.object.attr('curves');
			this.object.remove(this.object.attr('curves').length - 1);
			var lastCurve = curves[curves.length - 1];
			// в этой реализации первая кривая получается норм, проверить, не будет ли она плохо получаться в других
			var lx = lastCurve.attr('args')[lastCurve.method === 'bezierCurveTo' ? 2 : 0],
				ly = lastCurve.attr('args')[lastCurve.method === 'bezierCurveTo' ? 3 : 1];
			this.object.bezierCurveTo(
				lx, ly, cx, cy, cx, cy
			);
		} else {
			this.control.attr({x, y});

			var curves = this.object.attr('curves');
			var lastCurve = curves[curves.length - 1];
			var lastCurveArgs = lastCurve.attr('args');

			lastCurveArgs[2] = this.control.attr('mx');
			lastCurveArgs[3] = this.control.attr('my');

			lastCurve.attr('args', lastCurveArgs);
		}
	},

	mousedownControl: function(){}, // returns control properties
	mousemoveControl: function(){},
	mouseupControl: function(){},

	createPath: function(){},
	addPoint: function(){},
	transformPointToBezier:function(){},
	closePath: function(){}
}; */
