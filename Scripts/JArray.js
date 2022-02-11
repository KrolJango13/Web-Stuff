/**
* Here is a link to JQuery to execute this script remotely
* @link https://code.jquery.com/jquery-3.6.0.js
*/

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
    for(var i = 0; i < this.length; i += size){
        array.push(this.splice(i,size))
    }
    return array;
}
