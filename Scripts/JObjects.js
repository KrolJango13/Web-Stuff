const objProto = ({}).__proto__;

objProto.keys = function(){
    return Object.keys(this);
}
objProto.values = function(){
    return Object.values(this);
}
objProto.entries = function(){
    return Object.entries(this);
}

objProto.entriesRecursive = function(){
    return this.entries().map(x => {
        if(x.__proto__ === objProto){
            return x.entriesRecursive();
        }
        return x;
    });
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
