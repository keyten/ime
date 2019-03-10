import zoomOffsetModel from '../models/ZoomOffset';

export function screenToCanvas(x, y, canvasModel){
	var bounds = canvasModel.ctx.canvas.getBoundingClientRect();
	return [
		(x - bounds.x) / zoomOffsetModel.zoom,
		(y - bounds.y) / zoomOffsetModel.zoom
	];
}
