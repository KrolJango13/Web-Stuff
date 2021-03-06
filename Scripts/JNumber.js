(async() => {
    var numProto = (1).__proto__
    const {sqrt,abs,floor} = Math;
    
    if(![].divide){
        await import("https://kroljango13.github.io/Web-Stuff/Scripts/JArray.js");
    }

    numProto.getBytes = function(signed = false){
        var bytes = this.toString(16).split("").reverse().divide(2).map(x => parseInt(x.reverse().join(""),16)).reverse()
        return signed ? [...Int8Array.from(bytes)] : bytes;
    }

    numProto.sqrt = function(){
        return {
            imaginary: this < 0,
            value: sqrt(abs(this)),
            toString: function(){
                return `${this.value}${this.imaginary ? "i" : ""}`;
            }
        }
    }

    numProto.factorial = function(){
        if(this === 0){
            return 0;
        } else if(this > 0){
            return this > 2 ? (this - 1).factorial() * this : this;
        }
        return -1 * (abs(this).factorial());
    }
    
    numProto.nor = function(otherNum){
        return ~(this | otherNum);
    }
    numProto.nand = function(otherNum){
        return ~(this & otherNum);
    }
    numProto.xnor = function(otherNum){
        return ~(this ^ otherNum);
    }
    
    numProto.char = function(){
        return String.fromCodePoint(this);
    }
    
    numProto.factors = function(){
        var facs = {};
        for(var i = 1; i < abs(this); i++){
            if(!(this % i) && !Object.entries(facs).flat().some(x => parseInt(x) === i)){
                facs[i] = this / i;
                facs[-i] = this / -i;
            }
        }
    }
    
    numProto.factorArray = function(){
        Object.entries(this.factors()).map(x => [parseInt(x[0]),x[1]]);
    }
    
    numProto.isPrime = function(){
        return this.factorArray().length > 1;
    }
    
    numProto.isAntiPrime = function(){
        var facs = this.factorArray();
        for(var i = 1; i < abs(this); i++){
            if(facs.length < i.factorArray().length){
                return false;
            }
        }
        return true;
    }
    
    numProto.isSquare = function(){
        return this.sqrt().value.isInt();
    }
    
    function gcd(a,b){
        return a ? gcd(b % a, a) : b;
    }
    numProto.gcf = function(...others){
        return others.reduce((a,b) => gcd(a,b));
    }
    
    numProto.lcm = function(...others){
        return others.reduce((x,y) => x * y) * this / this.gcf(...others)
    }
    
    numProto.isInt = function(){
        return floor(this) === this;
    }
    
    numProto.getDecimal = function(){
        return this - floor(this);
    }
})();
