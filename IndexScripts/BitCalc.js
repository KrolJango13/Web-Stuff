const ops = {
    NOT: (base) => ~base,
    OR: (base,x) => base | x,
    AND: (base,x) => base & x,
    NOR: (base,x) => ~base & ~x,
    NAND: (base,x) => ~base | ~x,
    XOR: (base,x) => base ^ x,
    XNOR: (base,x) => ~base ^ x
}
const bitCalc = () => ops[byID("selector").value](parseInt(byID("base").value), parseInt(byID("otherNum") ? byID("otherNum").value) : 1) || 
      "Operators: NOT, OR, AND, NOR, NAND, XOR, XNOR";
