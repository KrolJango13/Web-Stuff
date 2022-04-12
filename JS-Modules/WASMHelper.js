// Compile C or C++ to WASM bytecode
async function compileToWASMBytes(code,langName,std){
    // Make a request to the WASM compiler
    function fetchWASMComp(input,action) {
        return new Promise((resolve,reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("POST","https://wasmexplorer-service.herokuapp.com/service.php");
            xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
            xhr.onloadend = function(){
                resolve(this.response);
            }
            xhr.onerror = reject;
            xhr.send(`input=${encodeURIComponent(input)}&action=${action}&options=-O3%20std%3d${encodeURI(std)}`);
        });
    }
    
    // WASM text format
    var wat = await fetchWASMComp(code,`${langName}2wast`,std);
    
    // WASM binary as base64
    var wasmB64 = await fetchWASMComp(wat,"wast2wasm",std);
    
    // Check for code error
    if(wasmB64.startsWith("..."))throw wasmB64;
    
    // WASM response has extra text, which needs to be removed
    var b64 = atob(wasmB64.split("\n")[1]);
    return new Uint8Array(b64.split("").map(x => x.codePointAt()));
}

function cToWASMBytes(cCode, std = "C99"){
    return compileToWASMBytes(cCode,"c",std);
}

function cppToWASMBytes(cppCode, std = "C++14"){
    return compileToWASMBytes(cppCode,"cpp",std);
}

async function cToJS(cCode, std = "C99"){
    var cBytes = await cToWASMBytes(cCode, std);
    var cMod = await WebAssembly.instantiate(cBytes);
    return cMod.instance.exports;
}

async function cppToJS(cppCode, std = "C++14"){
    var cppBytes = await cppToWASMBytes(cppCode, std);
    var cppMod = await WebAssembly.instantiate(cppBytes);
    return cppMod.instance.exports;
}

export {cToWASMBytes,cppToWASMBytes,cToJS,cppToJS};
