const int = (xBound) => Math.floor(Math.random() * xBound);
const rangedInt(min,xMax) => int(xMax - min) + min;
const arrayMember = (array) => array[int(array.length)];
const char = (codeRange = {min:0x41,max:0xff}) => String.fromCodePoint(rangedInt(codeRange.min,codeRange.max + 1));
const string = (length,codeRange = {min:0x41,max:0xff}) => new Array(length).fill(char(codeRange)).join("");
async function word(){
    var wordBlob = await fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt");
    var wordsTxt = await wordBlob.text();
    var words = wordsTxt.replaceAll("\r","").split("\n");
    return arrayMember(words);
}

export {int,rangedInt,arrayMember,char,string,word}
