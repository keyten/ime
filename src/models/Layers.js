import imeProperties from '../tools/imeProperties';
import uid from '../lib/uid';
import canvasModel from './CanvasPane';

/*
структура такая:
<preLayers />
<canvas />
<postLayers />

canvas -- главный, с которым связан контекст
layers рендерятся если drawMode = multiple

в prePostLayers находятся
<CanvasLayer elements={layer.elements} composite={layer.composite} for="layer in preLayers" key={layer.elements.map(x => x.attrs.imeProperties.uid)} />
где CanvasLayer по mounted рисует всё из layers
*/

export default {
	layers: [],
	// todo: переименовать в renderPrePostLayers?
	drawMode: 'single', // or 'multiple'

	preLayers: [],
	postLayers: [],
	mode: 'vector',

	createRaster(){
		var layer = canvasModel.ctx.image('', 0, 0, canvasModel.width, canvasModel.height);
		layer.attr('imeProperties', imeProperties({
			name: 'Raster'
		}));
		return canvasModel.activeElement = layer;
	},

	_originalUpdater: null,
	_rasterContext: null,

	toRasterMode(){
		var element = canvasModel.activeElement;
		if(!isRaster(element)){
			return null;
		}

		if(this._rasterContext && this._rasterContext.element === element){
			return this._rasterContext.ctx;
		}

		var ctx = canvasModel.ctx;
		var z = element.attr('z');
		var elements = canvasModel.ctx.elements;

		var preLayers = [];
		var postLayers = [];

		var currentLayer = [];
		var currentComposite;
		for(var i = 0; i < elements.length; i++){
			if(i < z){
				if(!currentLayer[currentLayer.length - 1] ||
					currentLayer[currentLayer.length - 1].attrs.composite === elements[i].attrs.composite){
					currentLayer.push(elements[i]);
					currentComposite = elements[i].attrs.composite;
				} else {
					if(currentLayer.length > 0){
						preLayers.push(
							new Layer({
								elements: currentLayer,
								composite: currentComposite
							})
						);
						currentLayer = [];
					}
				}
			} else if(i === z){
				if(currentLayer.length > 0){
					preLayers.push(
						new Layer({
							elements: currentLayer,
							composite: currentComposite
						})
					);
					currentLayer = [];
				}
				continue;
			} else {
				if(!currentLayer[currentLayer.length - 1] ||
					currentLayer[currentLayer.length - 1].attrs.composite === elements[i].attrs.composite){
					currentLayer.push(elements[i]);
					currentComposite = elements[i].attrs.composite;
				} else {
					if(currentLayer.length > 0){
						postLayers.push(
							new Layer({
								elements: currentLayer,
								composite: currentComposite
							})
						);
						currentLayer = [];
					}
				}
			}
		}

		if(currentLayer.length > 0){
			postLayers.push(
				new Layer({
					elements: currentLayer
				})
			);
		}

		this.preLayers = preLayers;
		this.postLayers = postLayers;
		this.renderPrePostLayers = true;

		this._originalUpdater = ctx.updateNow;
		ctx.updateNow = function(){};

		var context = ctx.context;
		context.save();
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		context.restore();
		context.setTransform(canvasModel.dpi, 0, 0, canvasModel.dpi, 0, 0);
		element.draw(context);

		this._rasterContext = {
			element: canvasModel.activeElement,
			ctx: context
		};
		this.mode = 'raster';

		return ctx.context;
	},

	compileRaster(element){
		element.attr('image', canvasModel.ctx.context.canvas.toDataURL());
	},

	toVectorMode(){
		if(this.mode === 'vector') return;

		this.renderPrePostLayers = false;
		this.preLayers = [];
		this.postLayers = [];

		var ctx = canvasModel.ctx;
		ctx.updateNow = this._originalUpdater;
		ctx.update();
		this._rasterContext = null;
		this._originalUpdater = null;
		this.mode = 'vector';
	}
};

function Layer(options){
	this.uid = uid();
	Object.assign(this, options);
}

function isRaster(element){
	return element instanceof Delta.Image;
}
/*
function renderMultipleMode(){
	;
} */
