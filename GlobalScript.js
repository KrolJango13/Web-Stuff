// Shorthand for creating a promise
const promise = (resolveRejectCallback) => new Promise(resolveRejectCallback); 

const AsyncFunction = (async()=>0).constructor

const byID = (id) => document.getElementById(id)

// Create HTML table row (<tr>) element from an array
const rowFromArray = (...cells) => `<tr><td>${cells.join("</td><td>")}</td></tr>`;

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
