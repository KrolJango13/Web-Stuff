const getScript = (name,path = "Scripts") => import(`https://kroljango13.github.io/Web-Stuff/${path}/${name}.js`)
    .then(x => console.log(`Successfully imported ${name}.js from ${path}`))
    .catch(err => console.error(`Failed to import ${name}.js from ${path} because of:\n${err}`))

getScript("JArray");
getScript("JString");
getScript("JObjects");
getScript("JNumber");
getScript("Time");

getScript("ElectronConfig","Science");
getScript("Light","Science");
