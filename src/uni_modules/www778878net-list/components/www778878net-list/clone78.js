"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function clone78(obj) {
    if (typeof obj != 'object')
        return obj;
    //  null,object,array  ='object'; 
    if (obj === null) { // 
        return null;
    }
    let o;
    //  
    if (obj instanceof Array) {
        o = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            o.push(clone78(obj[i]));
        }
        return o;
    }
    //   
    o = {};
    for (var j in obj) {
        o[j] = clone78(obj[j]);
    }
    return o;
}
exports.default = clone78;
//# sourceMappingURL=index.js.map