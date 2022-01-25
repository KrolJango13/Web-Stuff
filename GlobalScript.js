const getModule = (moduleName) => import(`https://kroljango13.github.io/Web-Stuff/JS-Modules/${moduleName}.js`)
let JMath = {}, JSVG = {}, JXML = {}, JArray = {}
async function imports(){
    Object.assign(JMath, await getModule("JMath"))
    Object.assign(JSVG, await getModule("JSVG"))
    Object.assign(JXML, await getModule("JXML"))
    Object.assign(JArray, await getModule("JArray"))
}
imports()

const getJQuery = ()=>import("https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js");
const byID = (id) => document.getElementById(id)
function applyLink(id,url){
    byID(id).href = url.replaceAll(" ","%20");
    byID(id).target = "_blank";
}
// Create HTML table row (<tr>) element from an array
const rowFromArray = (...cells) => `<tr><td>${cells.join("</td><td>")}</td></tr>`;

// Boolean logic gates
const nor = (a,b) => !a && !b
const nand = (a,b) => !a || !b
const xor = (a,b) => (a || b) && nand(a,b)
const xnor = (a,b) => !xor(a,b)

const query = (selector,element = document) => element.querySelector(selector)
const queryAll = (selector,element = document) => element.querySelectorAll(selector)

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
