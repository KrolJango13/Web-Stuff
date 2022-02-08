const tempFS = (size = 2**20) => new Promise((res,rej) => webkitRequestFileSystem(0,size,res));
const persistentFS = (size = 2**20) => new Promise((res,rej) => webkitRequestFileSystem(1,size,res));

const getFile = (dir,path) => new Promise((res,rej) => dir.getFile(path,{},res));
const getDir = (dir,path) => new Promise((res,rej) => dir.getDirectory(path,{},res));

const dirEntries = (dir) => new Promise((res,rej) => dir.createReader().readEntries(res));

function dirTree(dir){
    var tree = {};
    dir.createReader().readEntries(x => x.forEach(y => tree[y.name] = y.isDirectory ? dirTree(y) : y))
    return tree;
}
function dirTreeNames(dir){
    var tree = {};
    dir.createReader().readEntries(x => x.forEach(y => tree[y.name] = y.isDirectory ? dirTreeNames(y) : y.name))
    return tree;
}

const txtBlob = (text) => new Blob([text],{type:"text/plain"});

const asFile = (fileEntry) => new Promise((res,rej) => fileEntry.file(res));

const writeToFile = (fileEntry,blob) => asFile(fileEntry).then(f => f.createWriter(w => w.write(blob)));

export {tempFS,persistentFS,getFile,getDir,dirEntries,dirTree,dirTreeNames,txtBlob,asFile,writeToFile}
