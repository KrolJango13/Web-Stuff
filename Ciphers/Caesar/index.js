var wasmB64 = "AGFzbQEAAAABh4CAgAABYAJ/fwF/A4KAgIAAAQAEhICAgAABcAAABYOAgIAAAQABBoGAgIAAAAeZgICAAAIGbWV" +
    "tb3J5AgAMY2Flc2FyQ2lwaGVyAAAK9ICAgAAB7oCAgAAAAkAgAEG/f2pB/wFxQTlLDQAgAEGlf2pB/wFxQQZJDQAgAUEab0Ea" +
    "akEabyIBQQFIDQADQAJAIABBIHJB/wFxQfoARw0AIABB/wFxQeYBaiEACyAAQQFqIQAgAUF/aiIBDQALCyAAQRh0QRh1Cw==";

async function load(){
    var wasmMod = await WebAssembly.instantiateStreaming(fetch("data:application/wasm;base64," + wasmB64));
    
    window.caesarCipher = function(text,shift){
        return text.split("").map(x => String.fromCodePoint(wasmMod.instance.exports.caesarCipher(x,shift))).join("");
    }
}
load();
