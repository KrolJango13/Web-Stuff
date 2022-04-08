const getSciScript = (name) => import(`https://kroljango13.github.io/Web-Stuff/Science/${name}.js`)
    .then(x => console.log(`Successfully imported ${name}.js from Science`))
    .catch(err => console.error(`Failed to import ${name}.js from Science because of:\n${err}`));

const scripts = [
    "Light",
    "ElectronConfig",
    "ChemEquations"
];

for(var script of scripts) {
    getSciScript(script);
}
