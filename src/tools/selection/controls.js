import {screenToCanvas} from '../../lib/coords.js';
import controlStyle from '../../lib/controlStyle.js';
import zoomOffsetModel from '../../models/ZoomOffset.js';

function drawBullet(ctx, x, y){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = controlStyle.bulletFill;
	ctx.strokeStyle = controlStyle.bulletStrokeColor;
	ctx.lineWidth = controlStyle.bulletStrokeWidth;
	ctx.moveTo(x + controlStyle.bulletRadius, y);
	ctx.arc(x, y, controlStyle.bulletRadius, 0, Math.PI * 2);
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}

function drawRectOutline(ctx, x, y, w, h){
	ctx.save();
	ctx.strokeStyle = controlStyle.outlineColor;
	ctx.lineWidth = 1;
	ctx.strokeRect(x, y, w, h);
	ctx.restore();
}

function drawLine(ctx, x1, y1, x2, y2){
	ctx.save();
	ctx.strokeStyle = controlStyle.outlineColor;
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ctx.restore();
}

export function bullet(attrs, canvasModel, controlModel){
	return controlModel.ctx.object({
		draw: function(ctx){
			var bounds = canvasModel.ctx.canvas.getBoundingClientRect();
			var zoom = zoomOffsetModel.zoom;
			var {x, y} = this.attrs;

			x = bounds.x + x * zoom;
			y = bounds.y + y * zoom;

			drawBullet(ctx, x, y);
		},

		attrs,
		attrHooks: {
			x: {set: function(){ this.update(); }},
			y: {set: function(){ this.update(); }},
		},

		destroy: function(){
			this.remove();
		},

		rezoom: function(){
			this.update();
		}
	});
};

export function rectWithBullets(attrs, canvasModel, controlModel){
	return controlModel.ctx.object({
		draw: function(ctx){
			var bounds = canvasModel.ctx.canvas.getBoundingClientRect();
			var zoom = zoomOffsetModel.zoom;
			var {x1, y1, x2, y2} = this.attrs;

			x1 = bounds.x + x1 * zoom;
			y1 = bounds.y + y1 * zoom;
			x2 = bounds.x + x2 * zoom;
			y2 = bounds.y + y2 * zoom;

			drawRectOutline(ctx, x1, y1, x2 - x1, y2 - y1);
			drawBullet(ctx, x1, y1);
			drawBullet(ctx, x1, y2);
			drawBullet(ctx, x2, y1);
			drawBullet(ctx, x2, y2);
		},

		attrs,
		attrHooks: {
			x1: {set: function(){ this.update(); }},
			x2: {set: function(){ this.update(); }},
			y1: {set: function(){ this.update(); }},
			y2: {set: function(){ this.update(); }}
		},

		destroy: function(){
			this.remove();
		},

		rezoom: function(){
			this.update();
		}
	});
};

export function lineWith1Bullet(attrs, canvasModel, controlModel){
	return controlModel.ctx.object({
		draw: function(ctx){
			var bounds = canvasModel.ctx.canvas.getBoundingClientRect();
			var zoom = zoomOffsetModel.zoom;
			var {hx, hy, x, y} = this.attrs;

			hx = bounds.x + hx * zoom;
			hy = bounds.y + hy * zoom;
			x = bounds.x + x * zoom;
			y = bounds.y + y * zoom;

			drawLine(ctx, x, y, hx, hy);
			drawBullet(ctx, hx, hy);
			drawBullet(ctx, x, y);
		},

		attrs,
		attrHooks: {
			hx: {set: function(){ this.update(); }},
			hy: {set: function(){ this.update(); }},
			x: {set: function(){ this.update(); }},
			y: {set: function(){ this.update(); }}
		},

		destroy: function(){
			this.remove();
		},

		rezoom: function(){
			this.update();
		}
	});
};

export function lineWith2Bullets(attrs, canvasModel, controlModel){
	return controlModel.ctx.object({
		draw: function(ctx){
			var bounds = canvasModel.ctx.canvas.getBoundingClientRect();
			var zoom = zoomOffsetModel.zoom;
			var {h1x, h1y, h2x, h2y, x, y} = this.attrs;

			h1x = bounds.x + h1x * zoom;
			h1y = bounds.y + h1y * zoom;
			h2x = bounds.x + h2x * zoom;
			h2y = bounds.y + h2y * zoom;
			x = bounds.x + x * zoom;
			y = bounds.y + y * zoom;

			drawLine(ctx, x, y, h1x, h1y);
			drawLine(ctx, x, y, h2x, h2y);
			drawBullet(ctx, h1x, h1y);
			drawBullet(ctx, h2x, h2y);
			drawBullet(ctx, x, y);
		},

		attrs,
		attrHooks: {
			h1x: {set: function(){ this.update(); }},
			h1y: {set: function(){ this.update(); }},
			h2x: {set: function(){ this.update(); }},
			h2y: {set: function(){ this.update(); }},
			x: {set: function(){ this.update(); }},
			y: {set: function(){ this.update(); }}
		},

		destroy: function(){
			this.remove();
		},

		rezoom: function(){
			this.update();
		}
	});
};

/*
export function mirrorBulletLine(attrs, canvasModel, controlModel){
	return controlModel.ctx.object({
		type: 'mirrorBullet',
		draw: function(ctx){
			var bounds = canvasModel.ctx.canvas.getBoundingClientRect();
			var zoom = zoomOffsetModel.zoom;
			var {x, y, cx, cy} = this.attrs;

			x = bounds.x + x * zoom;
			y = bounds.y + y * zoom;
			cx = bounds.x + cx * zoom;
			cy = bounds.y + cy * zoom;

			var mx = 2 * cx - x,
				my = 2 * cy - y;

			drawLine(ctx, mx, my, x, y);
			drawBullet(ctx, x, y);
			drawBullet(ctx, cx, cy);
			drawBullet(ctx, mx, my);
		},


		attrs,
		attrHooks: {
			x: {set: function(){ this.update(); }},
			y: {set: function(){ this.update(); }},
			cx: {set: function(){ this.update(); }},
			cy: {set: function(){ this.update(); }},
			mx: {get: function(){ return this.attrs.cx * 2 - this.attrs.x; }},
			my: {get: function(){ return this.attrs.cy * 2 - this.attrs.y; }}
		},

		destroy: function(){
			this.remove();
		},

		rezoom: function(){
			this.update();
		}
	});
}; */

export function path(attrs, canvasModel, controlModel){
	return controlModel.ctx.object({
		draw: function(ctx){
			var bounds = canvasModel.ctx.canvas.getBoundingClientRect();
			var zoom = zoomOffsetModel.zoom;
			var {curves} = this.attrs;

			ctx.save();
			ctx.strokeStyle = controlStyle.outlineColor;
			ctx.lineWidth = 1;
			ctx.beginPath();

			curves.forEach((curve) => {
				let args = curve.attr('args');

				switch(curve.method){
					case 'moveTo': {
						ctx.moveTo(
							bounds.x + args[0] * zoom,
							bounds.y + args[1] * zoom
						);
					} break;

					case 'lineTo': {
						ctx.lineTo(
							bounds.x + args[0] * zoom,
							bounds.y + args[1] * zoom
						);
					} break;

					case 'bezierCurveTo': {
						ctx.bezierCurveTo(
							bounds.x + args[0] * zoom,
							bounds.y + args[1] * zoom,
							bounds.x + args[2] * zoom,
							bounds.y + args[3] * zoom,
							bounds.x + args[4] * zoom,
							bounds.y + args[5] * zoom
						);
					} break;

					default: break;
				}
			});

			ctx.stroke();
			ctx.restore();
		},

		attrs,
		attrHooks: {
			curves: {set: function(){ this.update(); }}
		},

		destroy: function(){
			this.remove();
		},

		rezoom: function(){
			this.update();
		}
	});
};

