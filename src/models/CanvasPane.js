export default {
	ctx: null,
	width: 500,
	height: 500,
	fcolor: '#ff0000',
	bcolor: '#000000',

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

		this._activeElement = element;

		if(element && element.attr('imeProperties').selectionModel){
			element.attr('imeProperties').selectionModel.add();
		}
	}

};

/*
 todo: сделать потом режим рисования infinite mode - когда рисуешь на бесконечном холсте, а затем выбираешь начало координат
*/

/*
растровые слои просто вставляются в ctx.elements с нужным флагом
это модуль где-то здесь их превращает в последовательность канвасов


*/