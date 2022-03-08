const MAPPINGS = {
    a: "abcdefghijklmnopqrstuvwxyz",
    b: "bcdefghijklmnopqrstuvwxyza",
    c: "cdefghijklmnopqrstuvwxyzab",
    d: "defghijklmnopqrstuvwxyzabc",
    e: "efghijklmnopqrstuvwxyzabcd",
    f: "fghijklmnopqrstuvwxyzabcde",
    g: "ghijklmnopqrstuvwxyzabcdef",
    h: "hijklmnopqrstuvwxyzabcdefg",
    i: "ijklmnopqrstuvwxyzabcdefgh",
    j: "jklmnopqrstuvwxyzabcdefghi",
    k: "klmnopqrstuvwxyzabcdefghij",
    l: "lmnopqrstuvwxyzabcdefghijk",
    m: "mnopqrstuvwxyzabcdefghijkl",
    n: "nopqrstuvwxyzabcdefghijklm",
    o: "opqrstuvwxyzabcdefghijklmn",
    p: "pqrstuvwxyzabcdefghijklmno",
    q: "qrstuvwxyzabcdefghijklmnop",
    r: "rstuvwxyzabcdefghijklmnopq",
    s: "stuvwxyzabcdefghijklmnopqr",
    t: "tuvwxyzabcdefghijklmnopqrs",
    u: "uvwxyzabcdefghijklmnopqrst",
    v: "vwxyzabcdefghijklmnopqrstu",
    w: "wxyzabcdefghijklmnopqrstuv",
    x: "xyzabcdefghijklmnopqrstuvw",
    y: "yzabcdefghijklmnopqrstuvwx",
    z: "zabcdefghijklmnopqrstuvwxy"
}

String.prototype.vigenereEncode = function(key) {
    var str = "", lower = this.toLowerCase();
    key = key.toLowerCase();
    if(this.includes(" ")){
        return this.split(" ").map(word => word.vigenereEncode(key)).join(" ");
    }
    for(var i = 0; i < lower.length; i++){
        str += MAPPINGS[key[i % key.length]][MAPPINGS.a.indexOf(lower[i])]
    }
    return str;
}

String.prototype.vigenereDecode = function(key){
    var str = "", lower = this.toLowerCase();
    key = key.toLowerCase();
    if(lower.includes(" ")){
        return lower.split(" ").map(word => word.vigenereDecode(key)).join(" ");
    }
    var dCoded = lower.vigenereEncode(key);
    for(var i = 0; i < 24; i++){
        dCoded = dCoded.vigenereEncode(key);
    }
    return dCoded
}
