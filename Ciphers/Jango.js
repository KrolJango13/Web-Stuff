/* 
A cipher I made that returns an obfuscated string that varies based on the time created
Each string can have 1,440 different results! Quite a pain to do by hand!
*/
function charXOR(str,h,m){
    return str.split("").map(c => String.fromCodePoint(c.codePointAt() ^ ((h * 60) + m))).join("");
}

String.prototype.jangoEncode = function(date = new Date()){
    var h = date.getHours(), m = date.getMinutes();
    return `[At ${h}:${m}]:    ${charXOR(this,h,m)}`;
};

String.prototype.jangoDecode = function(hours, minutes){
    return charXOR(this,hours,minutes);
};
