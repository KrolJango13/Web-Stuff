const getCipherScript = (name) => import(`https://kroljango13.github.io/Web-Stuff/Ciphers/${name}/index.js`)
    .then(x => console.log(`Successfully imported ${name} from Ciphers`))
    .catch(err => console.error(`Failed to import ${name} from Ciphers because of:\n${err}`));

getCipherScript("Caesar");
getCipherScript("Vigenere");
