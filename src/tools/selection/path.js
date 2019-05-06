import {bullet, lineWith1Bullet, lineWith2Bullets, path} from './controls';

export default function Path(object, canvasModel, controlModel){
	this.object = object;
	this.canvasModel = canvasModel;
	this.controlModel = controlModel;
};

Object.assign(Path.prototype, {
	outline: null,
	handlers: null,

	add: function(){
		var {object, canvasModel, controlModel} = this;
		var curves = object.attr('curves');

		this.outline = path({curves}, canvasModel, controlModel);
		this.handlers = [];

		for(var i = 0; i < curves.length; i++){
			var cur = curves[i];
			var prev = curves[i - 1];
			var next = curves[i + 1];

			var curArgs = cur.attr('args');

			if(cur.method === 'bezierCurveTo'){
				if(next && next.method === 'bezierCurveTo'){
					var nextArgs = next.attr('args');
					this.handlers.push(lineWith2Bullets({
						x: curArgs[4],
						y: curArgs[5],
						h1x: curArgs[2],
						h1y: curArgs[3],
						h2x: nextArgs[0],
						h2y: nextArgs[1]
					}, canvasModel, controlModel));
				} else {
					this.handlers.push(lineWith1Bullet({
						x: curArgs[4],
						y: curArgs[5],
						hx: curArgs[2],
						hy: curArgs[3],
					}, canvasModel, controlModel));
				}
			} else if(cur.method === 'moveTo' || cur.method === 'lineTo'){
				if(next && next.method === 'bezierCurveTo'){
					var nextArgs = next.attr('args');
					this.handlers.push(
						lineWith1Bullet({
							x: curArgs[0],
							y: curArgs[1],
							hx: nextArgs[0],
							hy: nextArgs[1]
						}, canvasModel, controlModel)
					);
				} else {
					this.handlers.push(
						bullet({
							x: curArgs[0],
							y: curArgs[1]
						}, canvasModel, controlModel)
					);
				}
			}
		}

		controlModel.controls.push(this);
	},

	addPoint: function(x, y){
		var {canvasModel, controlModel} = this;

		this.outline.update();
		this.handlers.push(bullet({x, y}, canvasModel, controlModel));
	},

	transformLastLineToBezier: function(h1x, h1y, h2x, h2y, x, y){
		var {canvasModel, controlModel} = this;
		this.outline.update();

		this.handlers[this.handlers.length - 1].destroy();
		this.handlers.length -= 1;
		this.handlers.push(lineWith2Bullets({
			x, y, h1x, h1y, h2x, h2y
		}, canvasModel, controlModel))
	},

	moveLastBezierHandle: function(h2x, h2y, x, y){
		var [h1x, h1y] = mirrorPointByAnotherPoint([h2x, h2y], [x, y]);
		this.outline.update();

		this.handlers[this.handlers.length - 1].attr({h2x, h2y, h1x, h1y});
	},

	remove: function(){
		var {controlModel} = this;
		var index = controlModel.controls.indexOf(this);
		if(index !== -1){
			controlModel.controls.splice(index, 1);
		}

		this.outline.destroy();
		this.outline = null;
		this.handlers.forEach(handler => handler.destroy());
		this.handlers = null;
	}
});

function mirrorPointByAnotherPoint(point, pivot){
	var dx = point[0] - pivot[0];
	var dy = point[1] - pivot[1];
	return [pivot[0] - dx, pivot[1] - dy];
}
