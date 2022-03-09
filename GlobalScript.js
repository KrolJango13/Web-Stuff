const getModule = (moduleName,path = moduleName) => import(`https://kroljango13.github.io/Web-Stuff/JS-Modules/${path}.js`)
    .then(module => {
        console.log(`Successfully imported ${moduleName}.js`)
        window[moduleName] = Object.assign({},module);
    })
    .catch(error => console.error(`Failed to import moduleName because:\n${error}`))

getModule("Math/index","JMath");
["JSVG","JXML","JRandom","FileSystem"].forEach(x => getModule(x));

import("https://kroljango13.github.io/Web-Stuff/Scripts/index.js");

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

Boolean.prototype.bit = function(){return this.valueOf() ? 1 : 0}

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

function createTxtFile(text,name = Math.floor(Math.random() * 2147483647).toString(16)) {
    var txtFile = new Blob([text],{type:"text/plain"});
    var objURL = URL.createObjectURL(txtFile);
    var a = document.createElement("a");
    a.href = objURL;
    a.download = name + ".txt";
    a.click();
    URL.revokeObjectURL(objURL);
    return txtFile;
}
