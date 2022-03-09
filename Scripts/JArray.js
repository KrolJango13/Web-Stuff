let arrProto = Array.prototype;

arrProto.middle = function(){
    var half = this.length / 2;
    if(this.length % 2){
        return this[Math.floor(half)]
    }
    return [this[half-1],this[half]]
}

arrProto.max = function(){return this.sort().pop()}
arrProto.min = function(){return this.sort()[0]}
    
arrProto.divide = function(size){
    var arr = new Array(Math.ceil(this.length / size)).fill(new Array(size))
    for(var i = 0; i < arr.length; i++){
        var arr1 = []
        for(var j = 0; j < size; j++){
            arr1.push(this[(i * size) + j])
        }
        arr[i] = arr1
    }
    return arr;
}

arrProto.randomMember = function(){
    return this[Math.floor(Math.random() * this.length)];
};

arrProto.forEach1 = function(func){
    for(var x of this){
        func(x);
    }
}
