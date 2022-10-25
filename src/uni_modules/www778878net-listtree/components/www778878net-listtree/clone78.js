export default function clone78(obj){	
	if(typeof obj != 'object')
		return obj;
	 //  null,object,array 也是'object'; 
	if (obj === null) {// 如果 是空的话 
		 return null; 
	} 
	
	let o
	 // 如果 是数组arr的话 
	if (obj instanceof Array) {
		 o = [];	 
		 for (var i = 0, len = obj.length; i < len; i++) {	 
			o.push(clone78(obj[ i ]));	 
		 }	
	    return o
	}	 
	 // 如果 是对象object的话	 
	o = {};
	for (var j in obj) {	 
		o[ j ] = clone78(obj[ j ]);	 
	}	  
	
	return o;
 
 
}