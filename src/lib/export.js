export function script(canvasModel, cnvId){
	var ctx = canvasModel.ctx;
	var elementsData = JSON.stringify(ctx.elements.map(element => {
		return {
			type: getElementType(element),
			attrs: element.attrs
		}
	}));
	var elementsCode = ctx.elements.filter(element => element.additionCode).map((element, i) => {
		return `
(function(){
	${element.additionCode}
}).call(elements[${i}]);`;
	})
	var code = `
(function(cnvId){
	var ctx = Delta.query(cnvId);
	var elementsData = ${elementsData};
	var elements = [];
	elementsData.forEach(function(data){
		elements.push(ctx[data.type](data.attrs));
	});
	${elementsCode.join('')}
})('#${cnvId}')`;

	return code;
}

function getElementType(element){
	if(element instanceof Delta.Rect){
		return 'rect';
	}
}
