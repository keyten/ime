import {screenToCanvas} from '../lib/coords.js';
import controlStyle from '../lib/controlStyle.js';
import zoomOffsetModel from '../models/ZoomOffset.js';

function drawBullet(ctx, x, y){
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = controlStyle.bulletFill;
	ctx.strokeStyle = controlStyle.bulletStrokeColor;
	ctx.lineWidth = controlStyle.bulletStrokeWidth;
	ctx.moveTo(x, y);
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
		type: 'bullet',
		draw: function(ctx){
			var bounds = canvasModel.ctx.canvas.getBoundingClientRect();
			var zoom = zoomOffsetModel.zoom;
			var {x, y} = this.attrs;

			x = bounds.x + x * zoom;
			y = bounds.y + y * zoom;

			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = controlStyle.bulletFill;
			ctx.strokeStyle = controlStyle.bulletStrokeColor;
			ctx.lineWidth = controlStyle.bulletStrokeWidth;
			ctx.moveTo(x, y);
			ctx.arc(x, y, controlStyle.bulletRadius, 0, Math.PI * 2);
			ctx.fill();
			ctx.stroke();
			ctx.restore();
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

export function rect(attrs, canvasModel, controlModel){
	return controlModel.ctx.object({
		draw: function(ctx){
			var bounds = canvasModel.ctx.canvas.getBoundingClientRect();
			var zoom = zoomOffsetModel.zoom;
			var {x1, y1, x2, y2} = this.attrs;

			x1 = bounds.x + x1 * zoom;
			y1 = bounds.y + y1 * zoom;
			x2 = bounds.x + x2 * zoom;
			y2 = bounds.y + y2 * zoom;

			ctx.save();
			ctx.strokeStyle = controlStyle.outlineColor;
			ctx.lineWidth = 1;
			ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
			ctx.restore();
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

export function rectWithBullets(attrs, canvasModel, controlModel){
	var outline = rect(attrs, canvasModel, controlModel);
	outline.lt = bullet({
		x: attrs.x1,
		y: attrs.y1
	}, canvasModel, controlModel);
	outline.lb = bullet({
		x: attrs.x1,
		y: attrs.y2
	}, canvasModel, controlModel);
	outline.rt = bullet({
		x: attrs.x2,
		y: attrs.y1
	}, canvasModel, controlModel);
	outline.rb = bullet({
		x: attrs.x2,
		y: attrs.y2
	}, canvasModel, controlModel);

	outline.rezoom = function(){
		outline.update();
		outline.lt.update();
		outline.lb.update();
		outline.rt.update();
		outline.rb.update();
	}

	outline.attrHooks = {
		x1: {set: function(v){
			outline.lt.attrs.x = v;
			outline.lb.attrs.x = v;
			outline.rezoom();
		}},
		y1: {set: function(v){
			outline.lt.attrs.y = v;
			outline.rt.attrs.y = v;
			outline.rezoom();
		}},
		x2: {set: function(v){
			outline.rt.attrs.x = v;
			outline.rb.attrs.x = v;
			outline.rezoom();
		}},
		y2: {set: function(v){
			outline.lb.attrs.y = v;
			outline.rb.attrs.y = v;
			outline.rezoom();
		}}
	};

	outline.destroy = function(){
		outline.remove();
		outline.lt.remove();
		outline.lb.remove();
		outline.rt.remove();
		outline.rb.remove();
	};

	return outline;
};

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
};
