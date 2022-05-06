byID("code").onkeydown = function(e){
    if(e.key === "Tab"){
        e.preventDefault();
        var cursor = this.selectionStart;
        var p1 = this.value.substr(0,cursor);
        var p2 = this.value.substr(cursor);
        this.value = p1 + "    " + p2;
        this.selectionStart = cursor + 4;
        this.selectionEnd = cursor + 4;
    }
};

byID("dl").onclick = function(e){
    var url = URL.createObjectURL(new Blob([byID("code").value],{type: "text/html"}));
    var a = document.createElement("a");
    a.href = url;
    a.download = prompt("Enter the file name:");
    a.click();
    URL.revokeObjectURL(url);
};
