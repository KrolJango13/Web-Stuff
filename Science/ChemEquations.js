function getCoefs(a,b,c,d,maxCoef = 20){
    var elements = [], molecs = [a,b,c,d],coefs = [1,1,1,1];
    for(var molec of molecs) {
        for(var elem of Object.keys(molec)){
            if(!elements.includes(elem.toLowerCase())){
                elements.push(elem.toLowerCase());
            }
        }
    }
    for(var i = 0; i < maxCoef; i++){
        for(var j = 0; j < maxCoef; j++){
            for(var k = 0; k < maxCoef; k++){
                for(var l = 0; l < maxCoef; l++){                
                    if(elements.every((elem) => {
                        var a1 = (a[elem] || 0) * (i + 1);
                        var b1 = (b[elem] || 0) * (j + 1);
                        var c1 = (c[elem] || 0) * (k + 1);
                        var d1 = (d[elem] || 0) * (l + 1);
                        return a1 + b1 == c1 + d1;
                    }))return [i + 1, j + 1, k + 1, l + 1];
                }
            }
        }
    }
}
