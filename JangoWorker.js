const jangoModule = (name) => `https://kroljango13.github.io/Web-Stuff/JS-Modules/${name}.js`;
importScripts(jangoModule("JMath"), jangoModule("JXML"), jangoModule("JSVG"), jangoModule("JArray"), jangoModule("JRandom"));
onmessage = e => {
    if(e.data){
        switch(e.data) {
            case "getModules":{
                e.source.postMessage(JSON.stringify({JMath,JXML,JSVG,JArray,JRandom}));
                break;
            }
            default:{
                e.source.postMessage("send \"getModules\" for imports");
                break;
            }    
        }
    }
}
