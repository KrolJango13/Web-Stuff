var wasmB64 = "AGFzbQEAAAABh4CAgAABYAJ/fwF/A4KAgIAAAQAEhICAgAABcAAABYOAgIAAAQABBoGAgIAAAAeagICAAAIGbWV\
tb3J5AgANY2Flc2FyX2xldHRlcgAACuOAgIAAAd2AgIAAAQF/AkAgAEG/f2pB/wFxQTlLDQBBwQBBACAAQdsASBtB4QBBACAAQeAAS\
htqIgJFDQAgAUEab0EaakEabyAAaiACQRh0QRh1IgBrQRpvIABqIQALIABBGHRBGHUL";
var wasmBuff = Uint8Array.from(atob(wasmB64).split("").map(x => x.codePointAt()));
var wasmCaesar = new WebAssembly.Instance(new WebAssembly.Module(wasmBuff)).exports.caesar_letter;

window.caesarCipher = function(text,shift){
    var coded = "";
    for(var char of text){
        coded += String.fromCodePoint(wasmCaesar(char.codePointAt(),shift));
    }
    return coded;
}
