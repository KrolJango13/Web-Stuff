onconnect = e => {
    var port = e.ports[0];
    
    port.addEventListener("message",event => {
        self.ungabunga = "isuravbaeuscn";
        port.postMessage("Message received!");
    });
    
    port.start();
}
