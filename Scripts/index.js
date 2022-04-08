const WEB_STUFF = "https://kroljango13.github.io/Web-Stuff";

const getScript = (name,path = "Scripts") => import(`${WEB_STUFF}/${path}/${name}.js`)
    .then(x => console.log(`Successfully imported ${name}.js from ${path}`))
    .catch(err => console.error(`Failed to import ${name}.js from ${path} because of:\n${err}`));

function getAllScripts(path){
    console.log(`Getting all scripts from ${path}...`);
    import(`${WEB_STUFF}/${path}/index.js`)
        .then(x => console.log(`Successfully imported all scripts from ${path}`))
        .catch(err => console.error(`Failed to load scripts from ${path} because of:\n${err}`));
}

const scripts = [
    "JArray",
    "JString",
    "JObjects",
    "JNumber",
    "RegexHelper",
    "GoogleHelper",
    "HTMLHelper"
];

(async function loadAll(){
    for(var script of scripts){
        await getScript(script);
    }
    await getAllScripts("Science");
    await getAllScripts("Ciphers");
})();
