const getCharset = (name) => fetch(`https://kroljango13.github.io/Web-Stuff/Character%20Codes/${name}.json`).then(x => x.json());
const JangosChars = [];
function extractChars(obj){
    for(var {char,code} of Object.values(obj)){
        JangosChars.push([char,code]);
    }
}

function extractAlphabet(alphabet){
    for(var letter of Object.values(alphabet)){
        extractChars(letter);
    }
}

(async() => {
    var {symbols,fractions,superscripts,subscripts} = await getCharset("MathChars");
    var {one_numerator,half,third,fourth,fifth,sixth,eighth} = fractions
    
    for (var mathCharset of [symbols,superscripts,subscripts]){
        extractChars(mathCharset);
    }
    
    JangosChars.push([one_numerator.char,one_numerator.code]);
    JangosChars.push([half.char,half.code]);
    for(var frac of [third,fourth,fifth,sixth,eighth]){
        extractChars(frac);
    }
    
    extractAlphabet(await getCharset("PolishChars"));
    extractAlphabet(await getCharset("RussianChars"));
    
    for (var char of Object.entries(await getCharset("Chars"))){
        JangosChars.push(char);
    }
    
    window.JangosChars = JangosChars;
})();
