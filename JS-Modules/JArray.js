JMath = {}
import("https://kroljango13.github.io/Web-Stuff/JS-Modules/Math/index.js").then(x => JMath = x)
function split(array,size){
    var arr = []
    while(array.length % size)array.push(null)
    JMath.range(size,array.length + size - 1,size).forEach(i => arr.push(array.slice(i - size, i).filter(x => x !== null && x !== undefined).array()))
    return arr
}
    
const equals = (a,b) => a.toString() === b.toString()
const max = (array) => array.sort().pop()
const min = (array) => array.sort()[0]

function rotate2d(array){
    var l = array.length
    for(var i = 0; i < parseInt(l / 2); i++){
        for(var j = i; j < l - i - 1; j++){
            var temp = array[i][j], k = l - 1
            array[i][j] = array[k - j][i]
            array[k - j][i] = array[k - i][k - j]
            array[k - i][k - j] = array[j][k - i]
            array[j][k - i] = temp
        }
    }
}
function middleOf(array){
    var l = array.length;
    if(l%2 == 0){
        var l1 = Math.floor(l/2)
        return [array[l1-1],array[l1]]
    } else {
        return array[Math.ceil(l/2)-1]
    }
}

export {split,equals,max,min,rotate2d,middleOf}
