const objProto = ({}).__proto__;

objProto.keysSelf = function(){
    return Object.keys(this);
}
objProto.valuesSelf = function(){
    return Object.values(this);
}
objProto.entriesSelf = function(){
    return Object.entries(this);
}

Object.entriesRecursive = function(obj){
    return this.entries(obj).map(x => x.map(y => {
        if(x.__proto__ === objProto)return Object.entriesRecursive(x);
        return x;
    }));
}

objProto.fromPath = function(path){
    var props = path.split(".");
    var val = this[props[0]];
    if(val){
        if(props.length === 1){
            return val;
        }
        return val.fromPath(props.slice(1).join("."));
    }
}
