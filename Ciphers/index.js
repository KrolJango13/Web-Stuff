const getCipherScript = (name) => import(`https://kroljango13.github.io/Web-Stuff/Ciphers/${name}.js`)
    .then(x => console.log(`Successfully imported ${name}.js from Ciphers`))
    .catch(err => console.error(`Failed to import ${name}.js from Ciphers because of:\n${err}`));

const scripts = [
    "Arrows",
    "Caesar",
    "Jango",
    "Vigenere"
];

for(var script of scripts){
    getCipherScript(script);
}
