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
    var array = [];
    while(this.length % size){
        this.push(null)
    }
    var l = this.length;
    for(var i = 0; i < l; i++){
        array.push(this.splice(0,size))
    }
    return array;
}
