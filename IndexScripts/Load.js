function load(){
    // Links
    applyLink("javadocsLink","./Javadocs/JavaDocsHome.html")

    // BitCalc
    byID("converter").onclick = () => byID("result").textContent = bitCalc();
    byID("selector").addEventListener("input", e => {
        if (byID("otherNum") && e.target.value == "NOT"){
            byID("bitCalc").removeChild(byID("otherNum"));
        } else if (!byID("otherNum") && e.target.value != "NOT"){
            byID("base").insertAdjacentHTML("afterend",'<input id=otherNum placeHolder="Enter another number"></input>')
        }
    })

    // Hexadecimal
    byID("hexIn").addEventListener("input", e => {
        var string = "";
        byID('hexIn').value.split(" ").forEach((x) => {
            string += String.fromCodePoint(parseInt((x.length ? x : "20"),16));
        });
        byID('fromHex').textContent = string;
    })
    byID("stringIn").addEventListener("input", e => {
        var hexArr = [], s = byID('stringIn').value;
        for(var i = 0; i < s.length; i++){
          hexArr.push(s.codePointAt(i).toString(16));
        }
        byID('toHex').textContent = hexArr.join(" ");
    })
}
