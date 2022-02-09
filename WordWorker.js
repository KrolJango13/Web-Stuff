let channel = new BroadcastChannel("jangoWordWorker");

oninstall = e => {
    e.waitUntil(
        fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt")
        .then(x => x.text())
        .then(x => self.words = x.replaceAll("\r","").split("\n"))
    )
}

onmessage = e => {
    switch(e.data.method){
        case "random":{
            if(e.data.length){
                reply(self.words.filter(x => x.length === e.data.length)[Math.floor(Math.random() * self.words.length)]);
            } else {
                reply(self.words[Math.floor(Math.random() * self.words.length)]);
            }
            break;
        }
        case "test":{
            if(hasMsgObj && e.data.word){
                reply(self.words.includes(e.data.msgObj.word));
            } else {
                reply("Specify a word property")
            }
            break;
        }
        case "help": {
            reply("Methods:\n\random,\n\ttest,")
            break;
        }
        default: {
            reply("Send message as {method: (a method, help if you need help), (params with values)}")
            break;
        }
    }
}

onfetch = e => {
    var headers = e.request.headers, reply = (res) => e.respondWith(res);
    switch(headers.get("method")){
        case "random":{
            if(e.data.length){
                reply(self.words.filter(x => x.length == headers.get("length"))[Math.floor(Math.random() * self.words.length)]);
            } else {
                reply(self.words[Math.floor(Math.random() * self.words.length)]);
            }
            break;
        }
        case "test":{
            if(hasMsgObj && headers.get("word")){
                reply(self.words.includes(headers.get("word")));
            } else {
                reply("Specify a word property")
            }
            break;
        }
        case "help": {
            reply("Methods:\nrandom,\ntest,")
            break;
        }
        default: {
            reply("Set the header \"method\" header to help for a list of methods")
            break;
        }
    }
}
