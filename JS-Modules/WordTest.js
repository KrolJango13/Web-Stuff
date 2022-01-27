onconnect = e => {
    var port = e.ports[0];
    var words = [];
    fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt").then(x => x.text()).then(x => words = x.replaceAll("\r","").split("\n"));
    port.addEventListener("message", event => port.postMessage(words.includes(event.data)));
    port.start();
};
