let channels = {}
onmessage = async(e) => {
    var clientList = await clients.matchAll();
    
    clientList.forEach(c => {
        var cId = c.url.split("#")[1];
        channels[cId] = new BroadcastChannel(cId)
    })
    
    if(e.data.to in channels){
        channels[e.data.to].postMessage(e.data.msg || "");
    } else {
        e.source.postMessage("User not found")
    }
}
