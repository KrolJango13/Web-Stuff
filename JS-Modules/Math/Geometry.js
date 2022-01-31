// Return the slope between
const slope = (x1,y1,x2,y2) => (y1 - y2) / (x1 - x2)
const slope2 = (a, b) => slope(a[0],a[1],b[0],b[1])

// Get the reference angle for a degree value
function refAng(degrees){
    degrees %= 360;
    if(degrees < 0)degrees += 360
    return degrees;
}

// Convert angle units
const toDegrees = (radians) => radians * 180 / Math.PI;
const toRadians = (degrees) => degrees * Math.PI / 180;

// Return the angle of a line between 2 points
const vector = (x1,y1,x2,y2) => refAng(toDegrees(Math.atan2(y2 - y1, x2 - x1)))
const vector2 = (a, b) => vector(a[0], a[1], b[0], b[1]);

// Area/Volume formulas
const trapezoidArea = (base1,base2,height) => (base1 + base2) * height / 2;
const sphereVolume = (radius) => (4/3) * (Math.PI * radius**3)

export {slope,slope2,refAng,toDegrees,toRadians,vector,vector2,trapezoidArea,sphereVolume}
