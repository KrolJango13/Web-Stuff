/* 
A cipher I made that returns an obfuscated string that varies based on the time created
Each string can have 1,440 different results! Quite a pain to do by hand!
*/
String.prototype.jangoEncode = function(date = new Date()){
    var h = date.getHours(), m = date.getMinutes()
    var str = `At ${h}:${m}\n`;
    for(var char of this){
        str += String.fromCodePoint(char.codePointAt() ^ (h * 60) + m)
    }
    return str
}

String.prototype.jangoDecode = function(hours, minutes){
    return this.split("").map(x => String.fromCodePoint(x.codePointAt() ^ ((hours * 60) + m))).join("");
}
