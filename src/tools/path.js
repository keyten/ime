const states = {
	initial: 'initial'
};

export default {
	init: function(canvasModel, controlModel){},
	destroy: function(canvasModel, controlModel){},

	mousedown: function(e, canvasModel, controlModel){},
	mouseup: function(e, canvasModel, controlModel){},
	mousemove: function(e, canvasModel, controlModel){},

	state: states.initial,

	createPath: function(){},
	addPoint: function(){},
	transformPointToBezier:function(){},
	closePath: function(){}
};
