window.arrowDecode = function(arrows){
    var codePoint = 0;
    if(arrows.includes("|")){
        return arrows.split("|").map(x => arrowDecode(x)).join("");
    }
    for (var i = 0; i < arrows.length; i++){
        switch (arrows[i]) {
            case "↑":
                codePoint++;
                break;
            case "↓":
                codePoint--;
                break;
            case "⇧":
                codePoint += 10;
                break;
            case "⇩":
                codePoint -= 10;
                break;
            case "↟":
                codePoint *= 2;
                break;
            case "↡":
                codePoint /= 2;
                break;
            case "↻":
                codePoint *= codePoint;
                break;
        }
    }
    return String.fromCodePoint(codePoint);
}
