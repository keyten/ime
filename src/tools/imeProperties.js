import uid from '../lib/uid.js';

export default function imeProperties(options){
	if(!(this instanceof imeProperties)){
		return new imeProperties(options);
	}

	this.uid = uid();
	Object.assign(this, options);
};

Object.assign(imeProperties.prototype, {});
