const JMath = {
    // Return a coordinate pair of x and y
    coordPair: (x, y) => ({x: x, y: y, 0: x, 1: y}),

    // Return the slope between
    slope: (x1,y1,x2,y2) => (y1 - y2) / (x1 - x2),
    slope2: (a, b) => JMath.slope(a[0],a[1],b[0],b[1]),

    // Return the angle of a line between 2 points
    vector: (x1,y1,x2,y2) => (Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI + 360) % 360,
    vector2: (a, b) => JMath.vector(a[0],a[1], b[0], b[1]),

    // Advanced square root that supports imaginary numbers
    sqrt: (num) => ({
        imaginary: num < 0,
        value: Math.sqrt(Math.abs(num)),
        toString: () => `${JMath.sqrt(num).value}${num < 0 ? "i" : ""}`
    }),

    // Equivalent to the python range() function
    range: (start = 0, end, step = 1) => new Array(Math.ceil((end - start) / step)).fill(start).map((x,i) => x + (step*i)),
    range0: (end,step = 1) => JMath.range(0,end,step),

    factorial: (num) => JMath.range(1,num + 1).reduce((x,y) => x*=y),

    // Get the factors of a number as an object
    factors(num){
        var facs = {}
        JMath.range(1,num).filter(x => num % x == 0).forEach(x => {if(!JObjects.hasKeyOrValue(facs,x)){facs[x] = num / x}})
        return facs
    },

    isPrime: (num) => Object.keys(JMath.factors(num)).length == 1,

    // Get the greatest common factor of a set of numbers
    gcf: (...nums) => nums.reduce(function gcd(x,y){return x ? gcd(y % x,x) : y}),

    // Get the least common multiple of a set of numbers
    lcm: (...nums) => nums.reduce((x,y) => (x*y) / JMath.gcf(x,y)),

    // Advanced pi
    pi: {
        str: "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679"
    }
}
