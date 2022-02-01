let JMath = {}
import("https://kroljango13.github.io/Web-Stuff/JS-Modules/Math/index.js").then(module => Object.assign(JMath,module))

// Create an SVG element
const createSVG = (tag = "svg") => document.createElementNS("http://www.w3.org/2000/svg", tag),

// Make an SVG polygon from an array of points and a color (if specified)
function createPolygon(points,color = "#00f"){
    var poly = createSVG("polygon")
    points.forEach(coords => poly.points.appendItem(svgPoint(coords[0],coords[1])))
    poly.style.fill = color
    return poly
}

// Move each point of a polygon, effectively moving the whole shape
function movePolygon(polygon,x = 0, y = 0){
    for(var point of polygon.points){
        point.x += x
        point.y += y
    }
}

const rotate = (element,degrees) => element.setAttribute("transform",`rotate(${degrees} ${element.x.baseVal.value} ${element.y.baseVal.value})`)
const rotatePoly = (element,degrees) => element.setAttribute("transform",`rotate(${degrees} ${centerOf(element).x} ${centerOf(element).y})`)

// Rotate an element to face a certain position
const pointTo = (element, x, y) => rotate(element,JMath.vector(element.x.baseVal.value,element.y.baseVal.value,x,y))

// Helper functions for SVG shapes
const shapes = {
    rect(x, y, width, height, color = "#00f"){
        var rect = createSVG("rect")
        rect.x.baseVal.value = x
        rect.y.baseVal.value = y
        rect.width.baseVal.value = width
        rect.height.baseVal.value = height
        rect.style.fill = color
        return rect
    },
    star(startPos = [0,0], size = 50, color = "#00f"){
        var x = startPos[0], y = startPos[1], pt7 = size * 0.7
        return createPolygon([
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
}
const lineAngle = (line) => JMath.vector(line.x1.baseVal.value, line.y1.baseVal.value, line.x2.baseVal.value, line.y2.baseVal.value)
function launch(obj, velocityX = 0, velocityY = 0){
    obj.setAttribute("velocityX", velocityX)
    obj.setAttribute("velocityY", velocityY)
}
function launch2(obj,targetX,targetY,velocity){
    var xDist = targetX - obj.x.baseVal.value, yDist = obj.y.baseVal.value - targetY, dist = Math.hypot(xDist,yDist)
    launch(obj,xDist * velocity / dist, yDist * -velocity / dist)
}

function centerOf(poly){
    var xList = [...poly.points].map(pt => pt.x), yList = [...poly.points].map(pt => pt.y)
    return {
        x: (Math.max(...xList) + Math.min(...xList)) / 2,
        y: (Math.max(...yList) + Math.min(...yList)) / 2
    }
}

function svgPoint(x, y){
    var pt = createSVG().createSVGPoint()
    pt.x = x
    pt.y = y
    return pt
}

export {createSVG,createPolygon,movePolygon,rotate,rotatePoly,pointTo,shapes,lineAngle,launch,launch2,centerOf,svgPoint}
