onconnect = e => {
    var port = e.ports[0];
    
    port.addEventListener("message",event => {
        port.postMessage("Message received!");
    });
    
    port.start();
}
