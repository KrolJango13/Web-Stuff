(async function(){
    var wordsTxt = await fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt").then(x => x.text());
    var strProto = String.prototype;
    
    strProto.toHexCodes = function(){return this.split("").map(x => x.codePointAt().toString(16))}
    strProto.reverse = function(){return this.split("").reverse().join("")}
    
    strProto.isUpperCase = function(index = 0){return this[index] === this[index].toUpperCase()}
    strProto.isLowerCase = function(index = 0){return this[index] === this[index].toLowerCase()}
    
    strProto.lines = function(){return this.split("\n")}
    strProto.ENGLISH_WORDS = wordsTxt.replaceAll("\r","").lines()
    strProto.isWord = function(){return this.ENGLISH_WORDS.includes(this)}
    strProto.words = function(){return this.replaceAll("\n"," ").split(" ")}
    
    strProto.caesarCipher = function(shift){
        shift %= 26;
        shift += shift < 0 ? 26 : 0;
        var alpha = "abcdefghijklmnopqrstuvwxyz", alpha1 = alpha.split(""), coded = ""
        if(this.includes(" ")){
            return this.words().map(x => x.caesarCipher(shift)).join(" ")
        }
        for(var i = 0; i < shift; i++){
            alpha1.push(alpha1.shift())
        }
        for(var i = 0; i < this.length; i++){
            var encoded = alpha1[alpha.indexOf(this[i].toLowerCase())]
            coded += this[i].isUpperCase() ? encoded.toUpperCase() : encoded;
        }
        return coded;
    }
    
})();
