onconnect = async(e) => {
    var port = e.ports[0];
    var wordsBlob = await fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt");
    var words1 = await wordsBlob.text();
    var words = words1.replaceAll("\r","").split("\n");
    port.addEventListener("message", event => port.postMessage(`${words} : ${words.includes(event.data)}`));
    port.start();
};
