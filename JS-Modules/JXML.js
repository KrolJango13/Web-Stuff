const JXML = {
    // Parse XML from a string
    parse: (string) => new DOMParser().parseFromString(string,"text/xml").children[0],

    // Get all elements of a certain tag on a document
    byTag: (doc,tagName) => Array.from(doc.getElementsByTagName(tagName)),
    
    // Convert an xml element to json
    toJSON(xml){
        var json = {
            type: xml.tagName,
            id: xml.id,
            innerXML: xml.innerHTML,
            attributes: {},
            children: [],
            classes: []
        };
        var cl = xml.classList || [];
        if(xml.attributes){
            var attrs = xml.attributes;
            for(var i = 0; i < attrs.length; i++){
                json.attributes[attrs[i].name] = attrs[i].value;
            }
        }
        cl.forEach(x => json.classes.push(x));
        Array.from(xml.children).forEach(x => json.children.push(JXML.toJSON(x)));
        return json;
    },

    // Create an xml tag
    makeTag(name,attributes = {},classes = [],innerXML = ""){
        var tag = `<${name} `;
        Object.getOwnPropertyNames(attributes ? attributes : {}).forEach(x => tag += `${x}="${attributes[x]}" `);
        if(classes && classes.length > 0){
            tag += `class="${classes.join(" ")}"`;
        }
        return JXML.parse(tag + `>${innerXML}</${name}>`).children[0];
    },

    // Make a simple object of an xml element
    simplify(xml){
        var obj = {};
        xml.getAttributeNames().forEach(attr => obj[attr] = xml[attr])
        return obj;
    }
}
