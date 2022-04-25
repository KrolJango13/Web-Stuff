// C code can be found in https://kroljango13.github.io/Web-Stuff/Ciphers/Vigenere/Vigenere.c
var wasmB64 = "AGFzbQEAAAABh4CAgAABYAJ/fwF/A4KAgIAAAQAEhICAgAABcAAABYOAgIAAAQABBoGAgIAAAAeVgICAAAIGbWVtb3J5AgAIdmlnZW5lcmUAAAqfgoCAAAGZgoCAAAEHf0F" + 
    "/IQYDQCAAIAZqIQQgBkEBaiICIQYgBEEBai0AAA0AC0EAIQYDQCABIAZqIQQgBkEBaiIDIQYgBC0AAA0ACyABIANqIQUCQCADQX9qIghBAUgNAEEAIQYDQCAGQQFqIQQCQCAFIAZqLQAA" + 
    "RQ0AIAVBAWohBUEAIQYMAQsgBCEGIAQgCEgNAAsgCEEBSA0AQQAhBiAFIQRBACEHA0ACQAJAIAEgBmosAAAiCEGff2pB/wFxQRtJDQAgB0EBaiEHDAELIAggACAGIAdrIAJvai0AAEEYd" + 
    "EGAgID4eWpBGHVqQZ9/akEab0HhAGohCAsgBCAIOgAAIARBAWohBCAGQQJqIQggBkEBaiEGIAggA0cNAAsLIAUL";

var wasmBuff = new Uint8Array(atob(wasmB64).split("").map(x => x.codePointAt()));
async function load(){
    var wasmMod = await WebAssembly.instantiate(wasmBuff);
    var inst = wasmMod.instance;
    window.vigenere = function(key,text){
        var kl = key.length + 1, tl = text.length;
        function memSect(start,len){
            return new Uint8Array(inst.exports.memory.buffer,start,len);
        }
        function memSetText(start,txt){
            memSect(start,txt.length).set(txt.split("").map(x => x.codePointAt()));
        }
        memSetText(0, key);
        memSetText(kl, text);
        inst.exports.vigenere(0, kl);
        var retPtr = memSect(kl + tl + 1, tl);
        return [...retPtr].map(x => String.fromCodePoint(x)).join("");
    }
}
load();
