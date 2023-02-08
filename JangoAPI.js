const jango = window.jango || {};
jango.math = {
    slope(a, b, c, d){
        if(c !== undefined && d !== undefined)
            return (b - d) / (a - c);
        return this.slope(a.x || a[0], a.y || a[1], b.x || b[0], b.y || b[1]);
    },
    referenceAngle(degrees){
        degrees %= 360;
        if(degrees < 0)degrees += 360
        return degrees;
    },
    toDegrees(radians){
        return radians * 180 / Math.PI;
    },
    toRadians(degrees){
        return degrees * Math.PI / 180;
    },
    vector(a, b, c, d) {
        if(c !== undefined && d !== undefined)
            return this.referenceAngle(this.toDegrees(Math.atan2(d - b, c - a)));
        return this.vector(a.x || a[0], a.y || a[1], b.x || b[0], b.y || b[1]);
    },
    areaRegularPolygon(sideLength, numSides) {
        return (numSides * sideLength * sideLength) / (4 * Math.tan(Math.PI / numSides));
    },
    cube(sideLength) {
        var faceArea = sideLength * sideLength;
        return {
            volume: faceArea * sideLength,
            surfaceArea: faceArea * 6
        };
    },
    rectangularPrism(l, w, h) {
        return {
            volume: l * w * h,
            surfaceArea: 2 * ((l * w) + (l * h) + (w * h))
        };
    },
    cone(radius, height) {
        var baseArea = Math.PI * radius * radius;
        return {
            volume: baseArea * height / 3,
            surfaceArea: baseArea + (Math.PI * radius * Math.sqrt((radius * radius) + (height * height)))
        };
    },
    pyramid4(l, w, h) {
        return {
            volume: l * w * h / 3,
            surfaceArea: (l * w) + (l * Math.sqrt((w * w / 4) + (h * h))) + (w * Math.sqrt((l * l / 4) + (h * h)))
        };
    },
    sphere(radius){
        var surfaceArea = 4 * Math.PI * radius * radius;
        return {
            volume: surfaceArea * radius / 3,
            surfaceArea
        };
    },
    cylinder(radius, height) {
        return {
            volume: Math.PI * radius * radius * height,
            surfaceArea: Math.PI * radius * 2 * (radius + height)
        };
    },
    factorial(x) {
        if(x < 2)return 1;
        for(var i = 2; i < x; i++)
            x *= i;
        return x;
    },
    getFactors(x) {
        var facs = [1];
        for(var i = 2; i < x; i++){
            if(x % i == 0){
                facs.push(i);
            }
        }
        facs.push(x);
        return facs;
    },
    range(start, end = undefined, step = 1){
        if(typeof end === "undefined")return this.range(0, start, 1);
        var nums = [];
        for(var i = start; i < end; i += step){
            nums.push(i);
        }
        return nums;
    },
    isPrime(num){
        for(var i = 2; i < num; i++){
            if(num % i === 0)return false;
        }
        return true;
    },
    gcf(...nums){
        function gcf2(a, b){
            return a ? gcf2(b % a, a) : b;
        }
        return nums.reduce(gcf2);
    },
    lcm(...nums){
        return nums.reduce(function(a, b){
            a * b / jango.math.gcf(a, b);
        });
    },
    nor(a, b){
        return ~(a | b);
    },
    nand(a, b){
        return ~(a & b);
    },
    xnor(a, b){
        return ~(a ^ b);
    },
    isInt(x){
        return x === Math.floor(x);
    },
    isSquare(x){
        return Math.sqrt(x).isInt();
    },
    getDecimal(x){
        return x - Math.floor(x);
    }
};

jango.random = {
    int(minOrExclusiveMax, exclusiveMax = undefined){
        if(typeof exclusiveMax === "undefined")return Math.floor(Math.random() * minOrExclusiveMax);
        return Math.floor(Math.random() * (exclusiveMax - minOrExclusiveMax)) + minOrExclusiveMax;
    },
    arrayMember(array){
        return array[jango.random.int(array.length)];
    },
    boolean(weightTrue = 0.5){
        return Math.random() < weightTrue;
    }
};

Number.prototype.getFactors = function(){
    return jango.math.getFactors(this);
};
Number.prototype.isPrime = function(){
    return jango.math.isPrime(this);
};
Number.prototype.isInt = function(){
    return this === Math.floor(this);
};
Number.prototype.isSquare = function(){
    return Math.sqrt(this).isInt();
};
Number.prototype.getDecimal = function(){
    return this - Math.floor(this);
};

(function(){
    var primeFacWASMMod = new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,142,128,128,128,0,3,96,0,1,127,96,1,126,1,127,96,1,126,0,2,141,128,128,128,0,1,3,101,110,118,5,112,114,105,110,116,0,1,3,130,128,128,128,0,1,2,4,132,128,128,128,0,1,112,0,0,5,131,128,128,128,0,1,0,1,6,129,128,128,128,0,0,7,159,128,128,128,0,2,6,109,101,109,111,114,121,2,0,18,112,114,105,109,101,70,97,99,116,111,114,105,122,97,116,105,111,110,0,1,10,224,128,128,128,0,1,218,128,128,128,0,1,2,126,2,64,2,64,32,0,66,2,84,13,0,3,64,32,0,66,1,124,34,1,66,3,84,13,2,3,64,66,2,33,2,2,64,3,64,32,0,32,2,130,80,13,1,32,2,66,1,124,34,2,32,1,84,13,0,12,2,11,11,11,32,2,16,0,26,32,0,32,2,128,34,0,66,1,86,13,0,11,11,15,11,3,64,12,0,11,11]));
    var facs = [];
    var primeFacWASMInstance = new WebAssembly.Instance(primeFacWASMMod, {
        env: {
            print(x){
                facs.push(x);
            }
        }
    });
    jango.math.primeFactors = function(x){
        var pFacs = [];
        if(typeof x === "number" || typeof x === "string"){
            x = BigInt(x);
        }
        primeFacWASMInstance.exports.primeFactorization(x);
        var l = facs.length;
        for(var i = 0; i < l; i++){
            pFacs.push(facs.shift());
        }
        return pFacs;
    }
})();

Object.entriesRecursive = function(obj){
    return this.entries(obj).map(x => x.map(y => {
        if(x.__proto__ === objProto)return Object.entriesRecursive(x);
        return x;
    }));
}

function strCheck(str, chars){
    for(var char of str){
        if(!chars.includes(char)){
            return false;
        }
    }
    return true;
}

jango.regex = {
    importantRGX: {
        oneLineComment: /\/\/.*$/g,
        multiLineComment: /\/\*.*\n*(.*\n)*\n*\*\//g,
        func: (name) => new RegExp(`(^|\\0)\\s*${name}\s?\\((.*)\\)`)
    },
    stringIndexes(str,quoteType = '"'){
        var isStr = false, strIndexes = [];
        for(var i = 0; i < str.length; i++){
            if(str[i] === quoteType){
                isStr = !isStr;
                continue;
            }
            if(isStr){
                strIndexes.push(i);
            }
        }
        return strIndexes;
    },
    
    comment1LIndexes(str){
        var prev = "", isComm = false, indexes = [];
        for(var i = 0; i < str.length; i++){
            if(prev + str[i] === "//"){
                isComm = true;
                continue;
            } else if(str[i] === "\n"){
                isComm = false;
            }
            if(isComm){
                indexes.push(i);
            }
            prev = str[i]
        }
        return indexes;
    },
    
    commentMultiLIndexes(str){
        var prev = "", isComm = false, indexes = [];
        for(var i = 0; i < str.length; i++){
            if(prev + str[i] === "/*"){
                isComm = true;
                continue;
            } else if(prev + str[i] === "*/"){
                isComm = false;
            }
            if(isComm){
                indexes.push(i);
            }
            prev = str[i]
        }
        return indexes;
    }
    
};

String.prototype.toHexCodes = function(){
    return this.split("").map(x => x.codePointAt().toString(16))
};
String.prototype.reverse = function(){
    return this.split("").reverse().join("")
};

String.prototype.isUpperCase = function(){
    return this === this.toUpperCase()
};
String.prototype.isLowerCase = function(){
    return this === this.toLowerCase()
};

String.prototype.stripChars = function(...chars) {
    var str = this;
    for(var char of chars){
        str = str.replaceAll(char,"");
    }
    return str;
}

String.prototype.isNumeric = function(){
    return strCheck(this,"0123456789.,-");
};
String.prototype.isPureNumeric = function(){
    return strCheck(this,"0123456789");
};
String.prototype.isAlphabetic = function(){
    return strCheck(this,"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,. ");
};
String.prototype.isPureAlphabetic = function(){
    return strCheck(this, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
};
String.prototype.shiftCodePoints = function(amount){
    var str = "";
    for(var char of this){
        str += String.fromCodePoint(char.codePointAt() + amount);
    }
    return str;
};

String.prototype.forEach = function(func){
    for(var i = 0; i < this.length; i++){
        func(this[i],i,this);
    }
};
String.prototype.forEach1 = function(func){
    for(var char of this){
        func(char);
    }
};

String.prototype.map = function(func){
    var str = "";
    for(var char of this){
        str += func(char);
    }
    return str;
};

String.prototype.some = function(predicate){
    for(var char of this){
        if(predicate(char)){
            return true;
        }
    }
    return false;
};

String.prototype.every = function(predicate){
    for(var char of this){
        if(!predicate(char)){
            return false;
        }
    }
    return true;
};

String.prototype.shiftAlphabet = function(upperShift){
    return this.shiftCodePoints(upperShift - (this.isUpperCase() ? 0 : 32));
}

String.prototype.toRegionChar = function(){
    return this.shiftAlphabet(0x1f1a5);
}

String.prototype.circleLetters = function(){
    return this.shiftCodePoints(this.isUpperCase() ? 0x2475 : 0x246f);
};

String.prototype.unicodeAt = function(index = 0){
    return this.codePointAt(index).toString(16);
};

String.prototype.getBytes = function(){
    var byteBuff = [];
    for(var char of this) {
        if(char.isPureAlphabetic() || char.isPureNumeric() || "!'()*-._~".includes(char)){
            byteBuff.push(char.codePointAt());
            continue;
        }
        var uriBytes = encodeURIComponent(char);
        for(var byte of uriBytes.match(/([\dABCDEF]{2})/g)){
            byteBuff.push(parseInt(byte, 16));
        }
    }
    return Uint8Array.from(byteBuff);
};

String.prototype.mapChars = function(charMap){
    var str = this;
    for(var entry of Object.entries(charMap)){
        str = str.replaceAll.call(str,...entry);
    }
    return str;
};

Array.prototype.middle = function(){
    var half = this.length / 2;
    if(this.length % 2){
        return this[Math.floor(half)];
    }
    return [this[half-1],this[half]];
};

Array.prototype.last = function(){
    return this[this.length - 1];
};

Array.prototype.max = function(){
    return this.sort((x,y) => y - x)[0];
};
Array.prototype.min = function(){
    return this.sort((x,y) => x - y)[0];
};
    
Array.prototype.divide = function(size){
    var arr = [];
    for(var i = 0; i < arr.length; i+=size){
        arr.push(this.slice(i,i + size));
    }
    return arr;
};

Array.prototype.randomMember = function(){
    return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.forEach1 = function(func){
    for(var x of this){
        func(x);
    }
};

Array.prototype.cycleLeft = function(amount){
    for(var i = 0; i < amount; i++){
        this.push(this.shift());
    }
};

Array.prototype.cycleRight = function(amount){
    for(var i = 0; i < amount; i++){
        this.unshift(this.pop());
    }
};

jango.google = {
    getFormEntries(){
        var fields = [...document.querySelector("form > div > div").children];
        return fields.map(x => Object.fromEntries([[x.name,x.value]])).reduce((x,y) => Object.assign(y,x));
    },

    submitToForm(formKey,entries) {
        fetch(`https://docs.google.com/forms/u/0/d/e/${formKey}/formResponse?${new URLSearchParams(entries).toString()}&submit=Submit`)
    },
    
    getFormKey() {
        return location.pathname.split("/")[4]
    },
    
    submit() {
        submitToForm(JangoFormHelper.getFormKey(),JangoFormHelper.getFormEntries())
    }
};

jango.html = {
    randHash32(){
        return Math.floor(Math.random() * 4294967296).toString(16);
    },
    
    makeHTML(tagName,properties = {}){
        return Object.assign(document.createElement(tagName),properties);
    },
    
    evalXML(xml){
        return new DOMParser().parseFromString(xml,"text/xml");
    },
    
    evalHTML(html){
        return makeHTML("div",{
            innerHTML: html
        }).children[0];
    },
    
    makeTR(...cells){
        var tr = "<tr>";
        for(var cell of cells){
            tr += `<td>${cell}</td>`;
        }
        return evalHTML(tr + "</tr>");
    },
    
    makeSelect(options,properties = {}){
        var sel = makeHTML("select",properties);
        for(var opt of Object.entries(options)){
            sel.options.add(makeHTML("option",{
                textContent: opt[0],
                value: opt[1]
            }));
        }
        return sel;
    },
    
    downloaderButton(properties = {}){
        return makeHTML("button",Object.assign(properties,{
            onclick: function(e){
                if(!confirm("Would you like to input a file to download?"))return;
                
                var url = confirm("Download from URL?") ? prompt("URL: ") :
                URL.createObjectURL(new Blob([prompt("Enter content")], {
                    type: prompt("Enter mime type: ","text/plain")
                }));
                
                makeHTML("a",{
                    href: url,
                    download: prompt("Enter file name: ",randHash32())
                }).click();
            }
        }));
    }
};

Boolean.prototype.bit = function(){
    return this.valueOf() ? 1 : 0;
}

jango.logic = {
    nor(a, b){
        return !(a || b);
    },
    nand(a, b){
        return !(a && b);
    },
    xor(a, b){
        return (a || b) && !(a && b);
    },
    xnor(a, b){
        return (a && b) || !(a || b);
    }
};

jango.crypto = {
    caesar(text, shift){
        shift %= 26;
        if(shift < 0)
            shift += 26;
        var encoded = "";
        for(var char of text){
            if(!char.isPureAlphabetic()){
                encoded += char;
                continue;
            }
            var code = char.codePointAt() + shift;
            if((code > 0x5a && code < 0x61) || code > 0x7a)
                code %= 26;
            encoded += String.fromCodePoint(code);
        }
        return encoded;
    }
};

(function(){
    // C code can be found in https://kroljango13.github.io/Web-Stuff/Ciphers/Vigenere/Vigenere.c
    var wasmB64 = "AGFzbQEAAAABh4CAgAABYAJ/fwF/A4KAgIAAAQAEhICAgAABcAAABYOAgIAAAQABBoGAgIAAAAeVgICAAAIGbWVtb3J5AgAIdmlnZW5lcmUAAAqfgoCAAAGZgoCAAAEHf0F" + 
    "/IQYDQCAAIAZqIQQgBkEBaiICIQYgBEEBai0AAA0AC0EAIQYDQCABIAZqIQQgBkEBaiIDIQYgBC0AAA0ACyABIANqIQUCQCADQX9qIghBAUgNAEEAIQYDQCAGQQFqIQQCQCAFIAZqLQAA" + 
    "RQ0AIAVBAWohBUEAIQYMAQsgBCEGIAQgCEgNAAsgCEEBSA0AQQAhBiAFIQRBACEHA0ACQAJAIAEgBmosAAAiCEGff2pB/wFxQRtJDQAgB0EBaiEHDAELIAggACAGIAdrIAJvai0AAEEYd" + 
    "EGAgID4eWpBGHVqQZ9/akEab0HhAGohCAsgBCAIOgAAIARBAWohBCAGQQJqIQggBkEBaiEGIAggA0cNAAsLIAUL";

    var inst = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array(atob(wasmB64).split("").map(x => x.codePointAt()))));
    function memSetText(start,txt){
        new Uint8Array(inst.exports.memory.buffer, start, txt.length).set(txt.split("").map(x => x.codePointAt()));
    }
    jango.crypto.vigenere = function(key,text){
        var kl = key.length + 1, tl = text.length;
        memSetText(0, key);
        memSetText(kl, text);
        inst.exports.vigenere(0, kl);
        var retPtr = memSect(kl + tl + 1, tl);
        return [...retPtr].map(x => String.fromCodePoint(x)).join("");
    }
})();

jango.science = {
    get LIGHT_SPEED(){
        return 300000000;
    },
    get PLANCK(){
        return 6.626e-34
    },
    getFrequency(wavelength, unit = "nm"){
        if(unit.toLowerCase() === "nm"){
            wavelength /= 1e9;
        }
        return {
            value: this.LIGHT_SPEED / wavelength,
            unit: "Hz"
        };
    },
    
    getFrequencyJ(energy){
        return {
            value: energy / this.PLANCK,
            unit: "Hz"
        };
    },
    
    getWavelength(freq) {
        return {
            value: this.LIGHT_SPEED / freq,
            unit: "m"
        };
    },
    
    getEnergy(freq) {
        return {
            value: this.PLANCK * freq,
            unit: "J"
        };
    },

    electronConfig(atomicNum) {
        const min = (a,b) => Math.min(Math.max(a,0),Math.max(b,0));
        return {
            "1s": min(2,atomicNum),
            "2s": min(2,atomicNum - 2),
            "2p": min(6,atomicNum - 4),
            "3s": min(2,atomicNum - 10),
            "3p": min(6,atomicNum - 12),
            "4s": min(2,atomicNum - 18),
            "3d": min(10,atomicNum - 20),
            "4p": min(6,atomicNum - 30),
            "5s": min(2,atomicNum - 36),
            "4d": min(10,atomicNum - 38),
            "5p": min(6,atomicNum - 48),
            "6s": min(2,atomicNum - 54),
            "4f": min(14,atomicNum - 56),
            "5d": min(10,atomicNum - 70),
            "6p": min(6,atomicNum - 80),
            "7s": min(2,atomicNum - 86),
            "5f": min(14,atomicNum - 88),
            "6d": min(10,atomicNum - 102),
            "7p": min(6,atomicNum - 112),
            toString: function(){
                return Object.keys(this).filter(x => this[x] > 0).map(x => `${x}${this[x]}`).join(" ")
            }
        };
    },

    nobleGasConfig(atomicNum) {
        const ec = (x) => electronConfig(x).toString();
        if(atomicNum > 86){
            return ec(atomicNum).replaceAll(ec(86),"[Rn]");
        }
        if(atomicNum > 54){
            return ec(atomicNum).replaceAll(ec(54),"[Xe]");
        }
        if(atomicNum > 35){
            return ec(atomicNum).replaceAll(ec(36),"[Kr]");
        }
        if(atomicNum > 17){
            return ec(atomicNum).replaceAll(ec(18),"[Ar]");
        }
        if(atomicNum > 9){
            return ec(atomicNum).replaceAll(ec(10),"[Ne]");
        }
        if(atomicNum > 1){
            return ec(atomicNum).replaceAll(ec(2),"[He]");
        }
        return "1s1";
    },

    bohrModel(atomicNum) {
        var shells = [0,0,0,0,0,0,0];
        for(var subLvl of electronConfig(atomicNum).toString().matchAll(/(?<shellIndex>\d)(?<subLvl>\w)(?<count>\d*)/g)){
            var {shellIndex,count} = subLvl.groups;
            shells[parseInt(shellIndex) - 1] += parseInt(count);
        }
        return shells;
    }
};

(function(){
    const chemEquationsB64 = "AGFzbQEAAAABiICAgAABYAN/f38BfwOEgICAAAMAAAAEhICAgAABcAAABYOAgIAAAQABBoGAgIAAAAe\
                            tgICAAAQGbWVtb3J5AgAEYmFzZQAACXN5bnRoZXNpcwABDWRlY29tcG9zaXRpb24AAgrzhYCAAAOP\
                            goCAAAEJfwJAIAJBAUgNAEEBIQUCQANAQQEhBgNAQQEhBwNAQQEhCCAAQQFIDQNBASEIA0AgASEJQ\
                            QEhCkEBIQsCQANAIAtBACAJKAIAIgNBEHVBgAJvIAZsIANBGHUgBWxqIgQgA0EIdUGAAm8gB2wgA0\
                            GAAm8gCGxqIgNGGyELIAQgA0cNASAJQQRqIQkgCiAASCEDIApBAWohCiADDQALCyALQQFGDQQgCCA\
                            CSCEDIAhBAWohCCADDQALIAcgAkghAyAHQQFqIQcgAw0ACyAGIAJIIQMgBkEBaiEGIAMNAAsgBSAC\
                            SCEDIAVBAWohBSADDQALQQAPCyAGQRB0IAVBGHRyIAdBCHRyIAhyDwtBAAvqgYCAAAEJfwJAIAJBA\
                            UgNAEEBIQUCQAJAA0BBASELQQEhBgNAIABBAUgNA0EBIQcDQCABIQhBASEJQQEhCgJAA0AgCkEAIA\
                            goAgAiA0EIdUGAAm8gBmwgA0EQdSAFbGoiBCADQYACbyAHbCIDRhshCiAEIANHDQEgCEEEaiEIIAk\
                            gAEghAyAJQQFqIQkgAw0ACwsgCkEBRg0DIAcgAkghAyAHQQFqIQcgAw0ACyAGIAJIIQMgBkEBaiEG\
                            IAMNAAsgBSACSCEDIAVBAWohBSADDQALQQAPCyAHIQsLIAZBCHQgBUEQdHIgC3IPC0EAC+qBgIAAA\
                            Ql/AkAgAkEBSA0AQQEhBQJAAkADQEEBIQtBASEGA0AgAEEBSA0DQQEhBwNAIAEhCEEBIQlBASEKAk\
                            ADQCAKQQAgCCgCACIDQQh1QYACbyAGbCADQYACbyAHbGoiBCADQRB1IAVsIgNGGyEKIAQgA0cNASA\
                            IQQRqIQggCSAASCEDIAlBAWohCSADDQALCyAKQQFGDQMgByACSCEDIAdBAWohByADDQALIAYgAkgh\
                            AyAGQQFqIQYgAw0ACyAFIAJIIQMgBUEBaiEFIAMNAAtBAA8LIAchCwsgBkEIdCAFQRB0ciALcg8LQQAL";
    var wasmInstance = new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array(atob(chemEquationsB64).split("").map(x => x.codePointAt()))));
    jango.science.balanceChem = function(elements, maxCoef = 20){
        var arr = new Int32Array(wasmInstance.exports.memory.buffer, 0, elements.length);
        arr.set(elements);
        var int = wasmInstance.exports.base(elements.length, arr, maxCoef);
        return [int >> 24, ((int >> 16) % 256), ((int >> 8) % 256), int % 256];
    };
})();
// pi 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679
