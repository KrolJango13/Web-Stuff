const jquery = (() => {
    var script = document.createElement("script");
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
    return script;
})();
const getJQuery = ()=>import("https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js");
const byID = (id) => document.getElementById(id)
function applyLink(id,url){
    byID(id).href = url.replaceAll(" ","%20");
    byID(id).target = "_blank";
}
// Create HTML table row (<tr>) element from an array
const rowFromArray = (...cells) => `<tr><td>${cells.join("</td><td>")}</td></tr>`;

// Boolean logic gates
const Logic = {
    xor: (a, b) => (a || b) && !(a && b),
    xnor: (a, b) => !(a || b) || (a && b)
}

const query = (selector,element = document) => element.querySelector(selector)
const queryAll = (selector,element = document) => element.querySelectorAll(selector)

const JMath = {
    // Return a coordinate pair of x and y
    coordPair: (x, y) => {return {x: x, y: y, 0: x, 1: y}},
    // Return the slope between
    slope: (x1,y1,x2,y2) => (y1 - y2) / (x1 - x2),
    slope2: (a, b) => JMath.slope(a[0],a[1],b[0],b[1]),
    // Return the angle of a line between 2 points
    vector: (x1,y1,x2,y2) => (Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI + 360) % 360,
    vector2: (a, b) => JMath.vector(a[0],a[1], b[0], b[1]),
    // Advanced square root that supports imaginary numbers
    sqrt:(num) => {return {
        imaginary: num < 0,
        value: Math.sqrt(Math.abs(num)),
        toString: () => `${JMath.sqrt(num).value}${num < 0 ? "i" : ""}`
    }},
    // Equivalent to the python range() function
    range:(start = 0, end, step = 1) => new Array(Math.ceil((end - start) / step)).fill(start).map((x,i) => x + (step*i)),
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
    pi:{
        str: "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679",
        nums: () => [Math.PI].concat(JBigInt.toIntArray(2384626433832795028841971693993751058209749445923078164062862089986280348253421170679n))
    }
}
class JArray extends Array {
    array = () => Array.from(this)
    // Split an array into chunks of a set size
    split(size){
        var arr = []
        while(this.length % size)this.push(null)
        JMath.range(size,this.length + size - 1,size).forEach(i => arr.push(this.slice(i - size, i).filter(x => x !== null && x !== undefined).array()))
        return arr
    }
    equals = (other) => this.toString() === other.toString()
    max = () => this.reduce((x,y) => Math.max(x,y))
    min = () => this.reduce((x,y) => Math.min(x,y))
    static split = (array, size) => new JArray(...array).split(size)
    static equals = (array, other) => new JArray(...array).equals(other)
}
const JSVG = {
    // Create an SVG element
    createSVG: (tag = "svg") => document.createElementNS("http://www.w3.org/2000/svg", tag),
    // Make an SVG polygon from an array of points and a color (if specified)
    createPolygon(points,color = "#00f"){
        var poly = JSVG.createSVG("polygon")
        points.forEach(coords => {
            var point = JSVG.createSVG().createSVGPoint()
            point.x = coords[0]
            point.y = coords[1]
            poly.points.appendItem(point)
        })
        poly.style.fill = color
        return poly
    },
    // Move each point of a polygon, effectively moving the whole shape
    movePolygon(polygon,x = 0, y = 0){
        for(var point of polygon.points){
            point.x += x
            point.y += y
        }
    },
    rotate: (element,degrees) => element.setAttribute("transform",`rotate(${degrees} ${element.x.baseVal.value} ${element.y.baseVal.value})`),
    // Rotate an element to face a certain position
    pointTo: (element, x, y) => JSVG.rotate(element,JMath.vector(element.x.baseVal.value,element.y.baseVal.value,x,y)),
    shapes: {
        rect(x, y, width, height, color = "#00f"){
            var rect = JSVG.createSVG("rect")
            rect.x.baseVal.value = x
            rect.y.baseVal.value = y
            rect.width.baseVal.value = width
            rect.height.baseVal.value = height
            rect.style.fill = color
            return rect
        },
        star(startPos = [0,0], size = 50, color = "#00f"){
            var x = startPos[0], y = startPos[1], pt7 = size * 0.7
            return JSVG.createPolygon([
                [size,       0],
                [size * 1.2, pt7],
                [size * 2,   pt7],
                [size * 1.3, size],
                [size * 1.6, 1.7 * size],
                [size,       size * 1.2],
                [size * 0.4, 1.7 * size],
                [pt7,        size],
                [0,          pt7],
                [size * 0.8, pt7]
            ].map(arr => [arr[0] + x, arr[1] + y]),color)
        }
    },
    lineAngle: (line) => JMath.vector(line.x1.baseVal.value, line.y1.baseVal.value, line.x2.baseVal.value, line.y2.baseVal.value),
    launch(obj, velocityX = 0, velocityY = 0){
        obj.setAttribute("velocityX", velocityX)
        obj.setAttribute("velocityY", velocityY)
    },
    launch2(obj,targetX,targetY,velocity){
        var xDist = targetX - obj.x.baseVal.value, yDist = obj.y.baseVal.value - targetY, dist = Math.hypot(xDist,yDist)
        JSVG.launch(obj,xDist * velocity / dist, yDist * -velocity / dist)
    }
}
const JXML = {
    parse: (string) => new DOMParser().parseFromString(string,"text/xml").children[0],
    byTag: (doc,tagName) => Array.from(doc.getElementsByTagName(tagName)),
    // Convert an xml (or html) element to json
    toJSON(xml){
        var json = {
            type: xml.tagName,
            id: xml.id,
            innerXML: xml.innerHTML,
            attributes: {},
            children: [],
            classes: []
        };
        var cl = xml.classList || [];
        if(xml.attributes){
            var attrs = xml.attributes;
            for(var i = 0; i < attrs.length; i++){
                json.attributes[attrs[i].name] = attrs[i].value;
            }
        }
        cl.forEach(x => json.classes.push(x));
        Array.from(xml.children).forEach(x => json.children.push(JXML.toJSON(x)));
        return json;
    },
    // Create an xml tag
    makeTag(name,attributes = {},classes = [],innerXML = ""){
        var tag = `<${name} `;
        Object.getOwnPropertyNames(attributes ? attributes : {}).forEach(x => tag += `${x}="${attributes[x]}" `);
        if(classes && classes.length > 0){
            tag += `class="${classes.join(" ")}"`;
        }
        return JXML.fromString(tag + `>${innerXML}</${name}>`).children[0];
    },
    simplify(html){
        var obj = {};
        html.getAttributeNames().forEach(attr => obj[attr] = html[attr])
        return obj;
    }
}
// Create a file input and append it to the document
function genFileIn(){
    var fileIn = document.createElement("input");
    fileIn.type = "file";
    fileIn.id = "fileIn";
    document.body.append(fileIn);
}
// Get the users webcam, mic, or both and display it in a <video> element
function getAV(videoElement,useVideo = true, useAudio = false){
    navigator.getUserMedia({
        audio: useAudio,
        video: useVideo
    },(v) => {
        videoElement.srcObject = v;
        videoElement.play();
    },console.error);
}
const JRandom = {
    // Return a random integer between 0 and the upper bound
    int: (bound = 1000) => Math.floor(Math.random() * bound)
}
