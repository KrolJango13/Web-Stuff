const JArray = {
    split(array,size){
        var arr = []
        while(array.length % size)array.push(null)
        JMath.range(size,array.length + size - 1,size).forEach(i => arr.push(array.slice(i - size, i).filter(x => x !== null && x !== undefined).array()))
        return arr
    },
    equals: (a,b) => a.toString() === b.toString(),
    max: (array) => array.sort().pop(),
    min: (array) => array.sort()[0],
    rotate2d(array){
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
}
