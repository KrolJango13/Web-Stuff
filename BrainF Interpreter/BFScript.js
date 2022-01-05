let cellIndex = 0, cells = new Uint8Array(16), bracketStack = new Array(32767), loops = {}, codePointer = 0, cellHistory = new Map(), cellEntry = 0
function BFLoop(start,end){
    this.start = start;
    this.end = end
}
function handleBF(str){
    var chars = str.replaceAll("\n","").split("")
    chars.forEach(c => {
        if(c == "["){
            bracketStack.push(codePointer)
        } else if (c == "]"){
            var startIndex = bracketStack.pop()
            loops[startIndex] = codePointer
            loops[codePointer] = startIndex
        }
        codePointer++
    })
    codePointer = 0
    while(codePointer < str.length){
        switch (str.charAt(codePointer)) {
            case "+": {
                cells[cellIndex]++
                break
            }
            case "-": {
                cells[cellIndex]--
                break
            }
            case "<": {
                cellIndex--
                break
            }
            case ">": {
                cellIndex++
                break
            }
            case ".": {
                var s = String.fromCodePoint(cells[cellIndex])
                console.log(s)
                alert(s)
                break
            }
            case ",": {
                cells[cellIndex] = prompt().codePointAt(0)
                break
            }
            case "[": {
                if (!cells[cellIndex]){
                    codePointer = loops[codePointer]
                }
                break
            }
            case "]":{
                if (cells[cellIndex]){
                    codePointer = loops[codePointer]
                }
                break
            }
        }
        cellHistory.set(cellEntry,{
            cells: [...cells],
            current: cellIndex
        })
        cellEntry++
        codePointer++
    }
    var entries = cellHistory.values()
    var i = 0
    function update(){
        var entry = cellHistory.get(i)
        Array.from(queryAll("th")).forEach((cr,j) => {
            cr.textContent = entry.cells[j]
            if(cr.classList.contains("currentcell"))cr.classList.remove("currentcell")
            if(j == entry.current)cr.classList.add("currentcell")
        })
        if(++i < cellHistory.size)setTimeout(update,25)
    }
    setTimeout(update,25)
}

function init(){
    cellIndex = 0
    cells = new Uint8Array(16)
    bracketStack = new Array(32767)
    loops = {}
    cellHistory = new Map()
    cellEntry = 0
    codePointer = 0
}
function updateDisplay(){
    var cellRows = Array.from(queryAll("th"))
    cellRows.forEach((cr,i) => {
        cr.textContent = cells[i]
        if(cr.classList.contains("currentcell"))cr.classList.remove("currentcell")
        if(i == cellIndex)cr.classList.add("currentcell")
    })
}