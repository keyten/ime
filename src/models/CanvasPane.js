// import imeProperties from '../tools/imeProperties';
import LayersModel from './Layers.js';

export default {
	ctx: null,
	width: 500,
	height: 500,
	fcolor: '#ff0000',
	bcolor: '#000000',
	dpi: window.devicePixelRatio === 2 ? 2 : 1,
	layersModel: LayersModel,

	get elementStyle(){
		return {
			fill: this.fcolor
		};
	},

	_activeElement: null,
	get activeElement(){
		return this._activeElement;
	},

	set activeElement(element){
		var oldElement = this._activeElement;
		if(oldElement && oldElement.attr('imeProperties').selectionModel){
			oldElement.attr('imeProperties').selectionModel.remove();
		}
		if(isRaster(oldElement)){
			this.layersModel.compileRaster(oldElement);
			this.layersModel.toVectorMode();
		}

		this._activeElement = element;

		if(element && element.attr('imeProperties').selectionModel){
			element.attr('imeProperties').selectionModel.add();
		}
	},

/*
	createRaster(){
		var layer = this.ctx.image('', 0, 0);
		layer.attr('imeProperties', imeProperties({
			name: 'Raster'
		}));
		return this.activeElement = layer;
	},

	_originalUpdater: null,
	_preparedRaster: null,
	prepareRaster(){
		if(!isRaster(this.activeElement)){
			return null;
		}

		if(this._preparedRaster && this._preparedRaster.element === this.activeElement){
			return this._preparedRaster.ctx;
		}

		this._originalUpdater = this.ctx.updateNow;
		this.ctx.updateNow = renderPrePost.bind(this);

		var cur = this.ctx.context;
		cur.save();
		cur.setTransform(1, 0, 0, 1, 0, 0);
		cur.clearRect(0, 0, cur.canvas.width, cur.canvas.height);
		cur.restore();
		cur.setTransform(this.dpi, 0, 0, this.dpi, 0, 0);

		this._preparedRaster = {
			element: this.activeElement,
			ctx: cur
		};

		return cur;
	},

	compileRaster(element){
		if(!this._preparedRaster){
			return;
		}

			// это не сработает если есть composites -- нужно рили много канвасов

		element.attr('image', this.cnv[1].toDataURL());
		this.ctx.updateNow = this._originalUpdater;
		this._preparedRaster = null;

		this.ctx.update();

		var pre = this.cnv[0].getContext('2d');
		var post = this.cnv[2].getContext('2d');
		pre.save();
		pre.setTransform(1, 0, 0, 1, 0, 0);
		pre.clearRect(0, 0, pre.canvas.width, pre.canvas.height);
		pre.restore();
		post.save();
		post.setTransform(1, 0, 0, 1, 0, 0);
		post.clearRect(0, 0, post.canvas.width, post.canvas.height);
		post.restore();
	} */
};

function isRaster(element){
	return element instanceof Delta.Image;
}
/*
function renderPrePost(){
	var pre = this.cnv[0].getContext('2d');
	var post = this.cnv[2].getContext('2d');
	var ctx = this.ctx;
	var z = this.activeElement.attr('z');

	pre.save();
	pre.setTransform(1, 0, 0, 1, 0, 0);
	pre.clearRect(0, 0, pre.canvas.width, pre.canvas.height);

	post.save();
	post.setTransform(1, 0, 0, 1, 0, 0);
	post.clearRect(0, 0, post.canvas.width, post.canvas.height);

	if(ctx.attrs.matrix){
		var matrix = ctx.attrs.matrix !== 'dirty' ? ctx.attrs.matrix : ctx.calcMatrix();
		pre.setTransform(matrix[0], matrix[1], matrix[2],
			matrix[3], matrix[4], matrix[5]);
		post.setTransform(matrix[0], matrix[1], matrix[2],
			matrix[3], matrix[4], matrix[5]);
	}

	for(var i = 0; i < z; i++){
		ctx.elements[i].draw(pre);
	}

	for(var i = z + 1; i < ctx.elements.length; i++){
		ctx.elements[i].draw(post);
	}

	pre.restore();
	post.restore();

	ctx._willUpdate = false;
} */

/*
 todo: сделать потом режим рисования infinite mode - когда рисуешь на бесконечном холсте, а затем выбираешь начало координат
*/

/*
растровые слои просто вставляются в ctx.elements с нужным флагом
это модуль где-то здесь их превращает в последовательность канвасов


*/