async function execFile(url){
    var codeBytes = await fetch(`https://kroljango13.github.io/Web-Stuff/ChromeShell/${url}`);
    var code = await codeBytes.text();
    eval(code);
    console.log(`Successfully imported ${url}`);
}

execFile("nassh_deps.concat.js");
execFile("nassh.js");
execFile("jchromeshell.js");
