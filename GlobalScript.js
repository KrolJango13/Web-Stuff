const getModule = (moduleName) => import(`./JS-Modules/${moduleName}.js`)
let JMath = {}, JSVG = {}, JXML = {}
(async () => {
    JMath = await getModule("JMath")
    JSVG = await getModule("JSVG")
    JXML = await getModule("JXML")
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
