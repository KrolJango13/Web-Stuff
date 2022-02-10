const ops = {
    NOT: (base) => ~base,
    OR: (base,x) => base | x,
    AND: (base,x) => base & x,
    NOR: (base,x) => ~base & ~x,
    NAND: (base,x) => ~base | ~x,
    XOR: (base,x) => base ^ x,
    XNOR: (base,x) => ~base ^ x
}
function bitCalc(){
    var other1 = byID("otherNum") || {value:1}
    var other = parseInt(other1.value)
    var op = byID("selector").value;
    if(op in ops){
        return ops[op](parseInt(byID("base").value), other);
    }
    return `Operators: ${Object.keys(ops).join(", ")}`
}
