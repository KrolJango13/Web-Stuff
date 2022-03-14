let arrProto = Array.prototype;
const {floor,random} = Math;

arrProto.middle = function(){
    var half = this.length / 2;
    if(this.length % 2){
        return this[floor(half)]
    }
    return [this[half-1],this[half]]
}

arrProto.last = function(){
    return [...this].pop();
}

arrProto.max = function(){
    return this.sort((x,y) => y - x)[0];
}
arrProto.min = function(){
    return this.sort((x,y) => x - y)[0];
}
    
arrProto.divide = function(size){
    var arr = [];
    for(var i = 0; i < arr.length; i+=size){
        arr.push(this.slice(i,i + size));
    }
    return arr;
}

arrProto.randomMember = function(){
    return this[floor(random() * this.length)];
};

arrProto.forEach1 = function(func){
    for(var x of this){
        func(x);
    }
}

arrProto.cycleLeft = function(amount){
    for(var i = 0; i < amount; i++){
        this.push(this.shift());
    }
}

arrProto.cycleRight = function(amount){
    for(var i = 0; i < amount; i++){
        this.unshift(this.pop());
    }
}

arrProto.cycledLeft = function(amount){
    var arr = [...this];
    arr.cycleLeft(amount);
    return arr;
}

arrProto.cycledRight = function(amount){
    var arr = [...this];
    arr.cycleRight(amount);
    return arr;
}
