const jquery = (() => {
    var script = document.createElement("script");
    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
    return script;
})();
let JMath = {}
import("./JS-Modules/JMath.js").then(module => JMath = module)
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
