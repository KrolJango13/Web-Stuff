let cashCache;
oninstall = async(e) => {
    cashCache = await caches.open("CashCache");
    cashCache.add("https://kroljango13.github.io/Web-Stuff/Character%20Codes/MathChars.json")
}
onmessage = async(e) => {
    e.ports[0].postMessage(await cashCache.match("https://kroljango13.github.io/Web-Stuff/Character%20Codes/MathChars.json"))
}
