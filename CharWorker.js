let charCache;
oninstall = async(e) => {
    charCache = await caches.open("CharCache");
    const charJSON = (name) => fetch(`https://kroljango13.github.io/Web-Stuff/Character%20Codes/${name}.json`)
    charCache.put("Math",await charJSON("MathChars"))
    charCache.put("Misc",await charJSON("Chars"))
}
onmessage = async(e) => {
    e.source.postMessage(await charCache.match("Math"))
    e.source.postMessage(await charCache.match("Misc"))
}
