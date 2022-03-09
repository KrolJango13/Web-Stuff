const ImportantRGX = {
    oneLineComment: /\/\/.*$/g,
    multiLineComment: /\/\*.*\n*(.*\n)*\n*\*\//g,
    func: (name) => new RegExp(`(^|\\0)\\s*${name}\s?\\((.*)\\)`)
}

function stringIndexes(str,quoteType = '"'){
    var isStr = false, strIndexes = [];
    for(var i = 0; i < str.length; i++){
        if(str[i] === quoteType){
            isStr = !isStr;
            continue;
        }
        if(isStr){
            strIndexes.push(i);
        }
    }
    return strIndexes;
}

function comment1LIndexes(str){
    var prev = "", isComm = false, indexes = [];
    for(var i = 0; i < str.length; i++){
        if(prev + str[i] === "//"){
            isComm = true;
            continue;
        } else if(str[i] === "\n"){
            isComm = false;
        }
        if(isComm){
            indexes.push(i);
        }
        prev = str[i]
    }
    return indexes;
}


function commentMultiLIndexes(str){
    var prev = "", isComm = false, indexes = [];
    for(var i = 0; i < str.length; i++){
        if(prev + str[i] === "/*"){
            isComm = true;
            continue;
        } else if(prev + str[i] === "*/"){
            isComm = false;
        }
        if(isComm){
            indexes.push(i);
        }
        prev = str[i]
    }
    return indexes;
}
