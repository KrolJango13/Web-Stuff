WebAssembly.instantiateStreaming(fetch("https://kroljango13.github.io/Web-Stuff/Science/ChemEquations.wasm"))
    .then(x => {
        window.balanceChem = function(elements, maxCoef = 20){
            var l = elements.length;
            var arr = new Int32Array(x.instance.exports.memory.buffer, 0, l);
            arr.set(elements);
            var int = x.instance.exports.base(l, arr, maxCoef);
            return [int >> 24, ((int >> 16) % 256), ((int >> 8) % 256), int % 256];
        };
    });
