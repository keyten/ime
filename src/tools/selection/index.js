import rect from './rect';

var types = {rect};

export default function(object){
	var imeProperties = object.attr('imeProperties');
	if(imeProperties){
		return types[imeProperties.selectionType] || null;
	}
	return null;
};
