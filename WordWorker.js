let channel = new BroadcastChannel("jangoWordWorker");
oninstall = e => {
    e.waitUntil(
        fetch("https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt")
        .then(x => x.text())
        .then(x => self.words = x.replaceAll("\r","").split("\n"))
    )
}

onmessage = e => {
    const reply = (msg) => channel.postMessage(msg);
    var hasMsgObj = e.data.msgObj ? 1 : 0;
    switch(e.data.method){
        case "random":{
            if(hasMsgObj && e.data.msgObj.length){
                reply(self.words.filter(x => x.length === e.data.msgObj.length)[Math.floor(Math.random() * self.words.length)]);
            } else {
                reply(self.words[Math.floor(Math.random() * self.words.length)]);
            }
            break;
        }
        case "test":{
            if(hasMsgObj && e.data.msgObj.word){
                reply(self.words.includes(e.data.msgObj.word));
            } else {
                reply("Specify a word property on msgObj")
            }
            break;
        }
        case "help": {
            reply("Methods:\n\random,\n\ttest,")
            break;
        }
        default: {
            reply("Send message as {method: (a method, help if you need help), msgObj: (an object with specified params)}")
            break;
        }
    }
}
