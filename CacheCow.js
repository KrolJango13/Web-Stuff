let cashCache, $URL = "https://www.google.com/search?q=dollar+sign&safe=active&rlz=1CATAVM_enUS946US946&tbm=isch&source=iu&ictx=1&vet=1&fir=3owrVvPYA5cElM%252CdbhFl9YvSZ6unM%252C_%253BtKd1qCSW0qQ2PM%252C8V5i1WaLNa7BrM%252C_%253BrZNelyarPXTp2M%252CesM5uezMDnqgzM%252C_&usg=AI4_-kTE9kuu-wYA4BX_YHx58dvbkVwjkg&sa=X&ved=2ahUKEwjnxPvxnIf2AhWGdt8KHTYhAf4Q_h16BAgEEAE#imgrc=3owrVvPYA5cElM";
oninstall = async(e) => {
    cashCache = await caches.open("CashCache");
    cashCache.add($URL)
}
onmessage = async(e) => {
    e.ports[0].postMessage(await cashCache.match($URL))
}
