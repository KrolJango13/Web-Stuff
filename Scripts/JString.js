(async function(){
    var strProto = String.prototype;
    function strCheck(chars){
        for(var char of this){
            if(!chars.includes(char)){
                return false;
            }
        }
        return true;
    }
    
    strProto.toHexCodes = function(){
        return this.split("").map(x => x.codePointAt().toString(16))
    }
    strProto.reverse = function(){
        return this.split("").reverse().join("")
    }
    
    strProto.isUpperCase = function(index = 0){
        return this[index] === this[index].toUpperCase()
    }
    strProto.isLowerCase = function(index = 0){
        return this[index] === this[index].toLowerCase()
    }
    
    strProto.stripChars = function(...chars) {
        var str = this;
        for(var char of chars){
            str = str.replaceAll(char,"");
        }
        return str;
    }
    
    strProto.isNumeric = function(){
        return strCheck.call(this,"0123456789.,")
    };
    strProto.isAlphabetic = function(){
        return strCheck.call(this,"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,. ")
    };
    
    strProto.modCodePoint = function(func,index = 0){
        return String.fromCodePoint(func(this.codePointAt(index)))
    };
    strProto.shiftCodePoint = function(amount,index = 0){
        return this.modCodePoint(x => x + amount, index);
    };
    
    strProto.forEach = function(func){
        for(var i = 0; i < this.length; i++){
            func(this[i],i,this);
        }
    };
    strProto.forEach1 = function(func){
        for(var char of this){
            func(char);
        }
    };
    
    strProto.map = function(func){
        var str = "";
        for(var char of this){
            str += func(char);
        }
        return str;
    };
    
    strProto.some = function(predicate){
        for(var char of this){
            if(predicate(char)){
                return true;
            }
        }
        return false;
    };
    
    strProto.every = function(predicate){
        for(var char of this){
            if(!predicate(char)){
                return false;
            }
        }
        return true;
    };
    
    strProto.shiftAlphabet = function(upperShift){
        return this.shiftCodePoint(upperShift - (this.isUpperCase() ? 0 : 32));
    }
    
    strProto.toRegionChar = function(){
        return this.shiftAlphabet(0x1f1a5);
    }
    
    strProto.circleLetters = function(){
        return this.shiftCodePoint(this.isUpperCase() ? 0x2475 : 0x246f);
    };
    
    strProto.unicodeAt = function(index = 0){
        return this.codePointAt(index).toString(16);
    };
    
    strProto.getBytes = function(){
        var hex = this.toHexCodes().join(""), bytes = [];
        if(hex.length % 2){
            hex = "0" + hex;
        }
        for(var i = 0; i < hex.length; i+=2){
            bytes.push(parseInt(hex.substr(i,2),16));
        }
        return bytes;
    };
    
    strProto.mapChars = function(charMap){
        var str = this;
        for(var entry of Object.entries(charMap)){
            str = str.replaceAll.call(str,...entry);
        }
        return str;
    }
})();
