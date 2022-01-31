import * as Geometry from "./Geometry.js"

// Advanced square root that supports imaginary numbers
const sqrt = (num) => ({
    imaginary: num < 0,
    value: Math.sqrt(Math.abs(num)),
    toString: () => `${sqrt(num).value}${num < 0 ? "i" : ""}`
})

// Equivalent to the python range() function
const range = (start = 0, end, step = 1) => new Array(Math.ceil((end - start) / step)).fill(start).map((x,i) => x + (step*i))
const range0 = (end,step = 1) => range(0,end,step)

const factorial = (num) => range(1,num + 1).reduce((x,y) => x*=y)

// Get the factors of a number as an object
const factors = (num) => range(1,num).filter(x => num % x == 0));

const isPrime = (num) => factors(num).length == 1

// Get the greatest common factor of a set of numbers
const gcf = (...nums) => nums.reduce(function gcd(x,y){return x ? gcd(y % x,x) : y})

// Get the least common multiple of a set of numbers
const lcm = (...nums) => nums.reduce((x,y) => (x*y) / gcf(x,y))

// Advanced pi
const pi = {
    str: "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679"
}

export {sqrt,range,range0,factorial,factors,isPrime,gcf,lcm,pi,Geometry}
