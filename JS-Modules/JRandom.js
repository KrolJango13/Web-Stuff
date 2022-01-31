var wordsPromise = fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt").then(x => x.text()).then(x => x.replaceAll("\r","").split("\n"));
const int = (xBound) => Math.floor(Math.random() * xBound);
const rangedInt = (min,xMax) => int(xMax - min) + min;
const arrayMember = (array) => array[int(array.length)];
const char = (codeRange = {min:0x41,max:0xff}) => String.fromCodePoint(rangedInt(codeRange.min,codeRange.max + 1));
const string = (length,codeRange = {min:0x41,max:0xff}) => new Array(length).fill(char(codeRange)).join("");
async function word(){
    var words = await wordsPromise;
    return arrayMember(words);
}

export {int,rangedInt,arrayMember,char,string,word}
