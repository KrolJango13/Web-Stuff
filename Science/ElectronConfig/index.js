var wasmB64 = "AGFzbQEAAAABjICAgAACYAJ/fwF/YAF/AX8Dg4CAgAACAAEEhICAgAABcAAABYOAgIAAAQABBoGAgIAAAAecgICAAAMGbWVtb3\
J5AgADbWluAAAJYm9ock1vZGVsAAEK04OAgAAClICAgAAAQQAgASAAIAAgAUobIABBAUgbC7SDgIAAAQF/QQAgAEF+aiIBQQggAUEISBtBGnQgAEE\
DSBtBACAAQQIgAEECSBtBHnQgAEEBSBtyQQAgAEGqf2oiAUECIAFBAkgbIABB1wBIG0EAIABBkH9qIgFBBiABQQZIGyAAQfEASBtqckEAIABBdmoi\
AUEIIAFBCEgbIABBC0gbQQAgAEFsaiIBQQogAUEKSBsgAEEVSBtqQRV0ckEAIABBSmoiAUECIAFBAkgbIABBN0gbQQAgAEGwf2oiAUEGIAFBBkgbI\
ABB0QBIG2pBACAAQZp/aiIBQQogAUEKSBsgAEHnAEgbakEEdHJBACAAQW5qIgFBAiABQQJIGyAAQRNIG0EAIABBYmoiAUEGIAFBBkgbIABBH0gbak\
EAIABBWmoiAUEKIAFBCkgbIABBJ0gbakEAIABBSGoiAUEOIAFBDkgbIABBOUgbakEPdHJBACAAQVxqIgFBAiABQQJIGyAAQSVIG0EAIABBUGoiAUE\
GIAFBBkgbIABBMUgbakEAIABBun9qIgFBCiABQQpIGyAAQccASBtqQQAgAEGof2oiAUEOIAFBDkgbIABB2QBIG2pBCXRyCw==";

var wasmBMod = new WebAssembly.Instance(new WebAssembly.Module(Uint8Array.from(atob(wasmB64).split("").map(x => x.codePointAt()))),{}).exports.bohrModel;

window.bohrModel = function(atomicNum){
    const a = (bits,pos) => parseInt(Uint32Array.of(wasmBMod(atomicNum))[0].toString(2).substring(pos,pos + bits),2);
    return [a(2,0),a(4,2),a(5,6),a(6,11),a(6,17),a(5,23),a(4,28)];
}