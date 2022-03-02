const getModule = (moduleName) => import(`https://kroljango13.github.io/Web-Stuff/JS-Modules/${moduleName}.js`)
let JMath = {}, JSVG = {}, JXML = {}, JArray = {}, JRandom = {}, FS = {}
async function imports(){
    Object.assign(JMath, await getModule("Math/index"))
    Object.assign(JSVG, await getModule("JSVG"))
    Object.assign(JXML, await getModule("JXML"))
    Object.assign(JArray, await getModule("JArray"))
    Object.assign(JRandom, await getModule("JRandom"))
    Object.assign(FS, await getModule("FileSystem"))
}
imports()
// Shorthand for creating a promise
const promise = (resolveRejectCallback) => new Promise(resolveRejectCallback); 

const AsyncFunction = (async()=>0).constructor

// Return a promise that holds the specified ServiceWorker's response
const getWorkerResponse = (worker) => promise((res,rej) => worker.port.addEventListener("message", e => res(e.data)));

const byID = (id) => document.getElementById(id)
function applyLink(id,url){
    byID(id).href = url.replaceAll(" ","%20");
    byID(id).target = "_blank";
}
// Create HTML table row (<tr>) element from an array
const rowFromArray = (...cells) => `<tr><td>${cells.join("</td><td>")}</td></tr>`;

// Bitwise operators
const ops = {
    NOT: (base) => ~base,
    OR: (base,x) => base | x,
    AND: (base,x) => base & x,
    NOR: (base,x) => ~base & ~x,
    NAND: (base,x) => ~base | ~x,
    XOR: (base,x) => base ^ x,
    XNOR: (base,x) => ~base ^ x
}

// Boolean logic gates
const nor = (a,b) => !a && !b
const nand = (a,b) => !a || !b
const xor = (a,b) => (a || b) && nand(a,b)
const xnor = (a,b) => !xor(a,b)

const query = (selector,element = document) => element.querySelector(selector)
const queryAll = (selector,element = document) => element.querySelectorAll(selector)

// Get the users webcam, mic, or both as a promise
const getAV = (useVideo = true, useAudio = false) => promise((res,rej) => navigator.getUserMedia({audio: useAudio,video: useVideo},res,rej));

// Get a file from the user asynchronously
const getUserFiles = () => promise((res,rej) => {
    var fileIn = document.createElement("input");
    fileIn.type = "file";
    fileIn.multiple = true;
    fileIn.oninput = function(e){res(this.files)};
    fileIn.click();
});

function matchBrackets(str){
  let brackets = {}, stack = [];
  for(var i = 0; i < str.length; i++){
    if(str[i] === "["){
      stack.push(i);
    } else if(str[i] === "]"){
      brackets[stack.pop()] = i + 1;
    }
  }
  return Object.entries(brackets).map(x => str.substring(parseInt(x[0]),x[1]));
}
