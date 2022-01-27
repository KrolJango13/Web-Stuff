onconnect = e => {
    var port = e.ports[0];
    
    port.addEventListener("message",event => {
        if(event.data == "waluigi"){
            clients.openWindow("https://ncvps.instructure.com/")
        }
        port.postMessage("Message received!");
    });
    
    port.start();
}
