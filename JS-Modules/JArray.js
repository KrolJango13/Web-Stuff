let JMath = {}
import("./JMath.js").then(jm => JMath = jm)

/**
 * Split an array into an array of arrays of a set size
 * @param {any[]} array Array to split
 * @param {number} size Size of the array chunks
 * @returns {any[][]}
 */
function split(array,size){
    var arr = []
    while(array.length % size)array.push(null)
    JMath.range(size,array.length + size - 1,size).forEach(i => arr.push(array.slice(i - size, i).filter(x => x !== null && x !== undefined).array()))
    return arr
}

/**
 * 
 * @param {any[]} a 
 * @param {any[]} b 
 * @returns {boolean}
 */
const equals = (a,b) => a.toString() === b.toString()

/**
 * Return the largest number of an array
 * @param {number[]} array 
 * @returns {number}
 */
const max = (array) => array.sort().pop()

/**
 * Return the smallest number of an array
 * @param {number[]} array 
 * @returns {number}
 */
const min = (array) => array.sort()[0]

/**
 * 
 * @param {any[][]} array
 * @returns {any[][]} 
 */
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

export {split,equals,max,min,rotate2d}
