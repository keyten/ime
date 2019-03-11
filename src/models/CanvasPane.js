export default {
	ctx: null,
	width: 500,
	height: 500,
	fcolor: '#ff0000',
	bcolor: '#000000',

	_activeElement: null,
	get activeElement(){
		return this._activeElement;
	},

	set activeElement(element){
		if(this._activeElement && this._activeElement.removeSelection){
			this._activeElement.removeSelection();
		}

		this._activeElement = element;

		if(element && element.createSelection){
			element.createSelection();
		}
	}

};

/*
 todo: сделать потом режим рисования infinite mode - когда рисуешь на бесконечном холсте, а затем выбираешь начало координат
*/
