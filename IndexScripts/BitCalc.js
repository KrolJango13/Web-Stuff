function bitCalc(){
    var op = byID("selector").value, base = parseInt(byID("base").value)
    var x = op != "NOT" ? parseInt(byID("otherNum").value) : 1
    switch (op){
          case "NOT":{
              return ~base;
          }
          case "OR":{
              return base | x;
          }
          case "AND":{
              return base & x;
          }
          case "NOR":{
              return ~(base | x);
          }
          case "NAND":{
              return ~(base & x);
          }
          case "XOR":{
              return (base ^ x);
          }
          case "XNOR":{
              return ~(base ^ x);
          }   
          default:{
              return "Operators: NOT, OR, AND, NOR, NAND, XOR, XNOR";
              break;
          }
    }
}