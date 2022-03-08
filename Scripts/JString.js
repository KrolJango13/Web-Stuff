(async function(){
    var wordsTxt = await fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt").then(x => x.text());
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
    
    strProto.lines = function(){
        return this.split("\n")
    }
    strProto.ENGLISH_WORDS = wordsTxt.replaceAll("\r","").lines()
    strProto.isWord = function(){
        return this.ENGLISH_WORDS.includes(this)
    }
    strProto.words = function(){
        return this.replaceAll("\n"," ").split(" ")
    }
    
    strProto.isNumeric = function(){
        return strCheck.call(this,"0123456789.,")
    };
    strProto.isAlphabetic = function(){
        return strCheck.call(this,"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,. ")
    };
    
})();
