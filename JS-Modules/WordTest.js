let words = [];

oninstall = e => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET","https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt");
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200){
            words = xhr.response.replaceAll("\r","").split("\n");
        }
    };
};

onmessage = e => {
    var port = e.ports[0];
    
    port.addEventListener("message", event => {
        port.postMessage(event.data in words);
    });
    
    port.start();
};
