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
