onconnect = e => {
    var port = e.ports[0];
    
    port.addEventListener("message",event => {
        for(var client of clients){
            port.postMessage(client);
        }
        port.postMessage("Message received!");
    });
    
    port.start();
}
