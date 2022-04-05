const getScript = (name,path = "Scripts") => import(`https://kroljango13.github.io/Web-Stuff/${path}/${name}.js`)
    .then(x => console.log(`Successfully imported ${name}.js from ${path}`))
    .catch(err => console.error(`Failed to import ${name}.js from ${path} because of:\n${err}`))

const scripts = {
    Scripts: [
        "JArray",
        "JString",
        "JObjects",
        "JNumber",
        "RegexHelper",
        "GoogleHelper",
        "HTMLHelper"
    ],
    Science: [
        "ElectronConfig",
        "Light"
    ],
    Ciphers: [
        "Arrows",
        "Caesar",
        "Jango",
        "Vigenere"
    ]
};

for(var path of Object.keys(scripts)){
    for(var script of scripts[path]){
        getScript(script,path);
    }
}
