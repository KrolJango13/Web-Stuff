onmessage = async(e) => {
    var userCache = await caches.open("users")
    userCache.put(e.origin,new Response(e.origin.split("#")[1]))
    userCache.match(`${e.origin.split("#")[0]}#{e.data.to}`).then(user => {
        if(user){
            var channel = new BroadcastChannel(e.data.to);
            channel.postMessage({sender:e.data.sender,msg:e.data.msg})
        } else {
            var channel = new BroadcastChannel(e.data.to);
            channel.postMessage({sender:"Worker",msg:"Couldn't find user " + e.data.to})
        }
    })
}
