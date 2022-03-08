if(["words","isUpperCase"].some(prop => !""[prop])){
    import("https://kroljango13.github.io/Web-Stuff/Scripts/JString.js");
}
String.prototype.caesarCipher = function(shift){
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
