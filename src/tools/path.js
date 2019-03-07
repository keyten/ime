const states = {
	initial: 'initial'
};

export default {
	init: function(canvasModel, controlModel){},
	destroy: function(canvasModel, controlModel){},

	mousedown: function(canvasModel, controlModel){},
	mouseup: function(canvasModel, controlModel){},
	mousemove: function(canvasModel, controlModel){},

	state: states.initial,

	createPath: function(){},
	addPoint: function(){},
	transformPointToBezier:function(){},
	closePath: function(){}
};
