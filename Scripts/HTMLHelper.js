var htmlProto = HTMLElement.prototype;

function randHash32(){
    return Math.floor(Math.random() * 4294967296).toString(16);
}

function makeHTML(tagName,properties = {}){
    return Object.assign(document.createElement(tagName),properties);
}

function evalXML(xml){
    return new DOMParser().parseFromString(xml,"text/xml");
}

function evalHTML(html){
    return makeHTML("div",{
        innerHTML: html
    }).children[0];
}

function makeTR(...cells){
    var tr = "<tr>";
    for(var cell of cells){
        tr += `<td>${cell}</td>`;
    }
    return evalHTML(tr + "</tr>");
}

function makeSelect(options,properties = {}){
    var sel = makeHTML("select",properties);
    for(var opt of Object.entries(options)){
        sel.options.add(makeHTML("option",{
            textContent: opt[0],
            value: opt[1]
        }));
    }
    return sel;
}

function DownloaderButton(properties = {}){
    return makeHTML("button",Object.assign(properties,{
        onclick: function(e){
            if(!confirm("Would you like to input a file to download?"))return;
            
            var url = confirm("Download from URL?") ? prompt("URL: ") :
            URL.createObjectURL(new Blob([prompt("Enter content")], {
                type: prompt("Enter mime type: ","text/plain")
            }));
            
            makeHTML("a",{
                href: url,
                download: prompt("Enter file name: ",randHash32())
            }).click();
        }
    }));
}

window.JHTML = {makeHTML,evalHTML,evalXML,makeTR,makeSelect};
