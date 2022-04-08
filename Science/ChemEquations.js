function getElems(...molecules){
    var elems = [];
    for(var molec of molecules){
        for(var elem of Object.keys(molec)){
            if(!elems.includes(elem.toLowerCase())){
                elems.push(elem.toLowerCase());
            }
        }
    }
    return elems;
}

function EGetter(elem){
    return (x,y) => (x[elem] || 0) * y;
}

function getCoefs(a,b,c,d,maxCoef = 20){
    var elems = getElems(a,b,c,d);
    for(var i = 1; i < maxCoef + 1; i++){
        for(var j = 1; j < maxCoef + 1; j++){
            for(var k = 1; k < maxCoef + 1; k++){
                for(var l = 1; l < maxCoef + 1; l++){                
                    if(elems.every((elem) => {
                        const e = EGetter(elem);
                        return e(a,i) + e(b,j) == e(c,k) + e(d,l);
                    }))return [i, j, k, l];
                }
            }
        }
    }
}

function getCoefsSynthesis(a,b,product,maxCoef = 20){
    var elems = getElems(a,b,product);
    for(var i = 1; i < maxCoef + 1; i++){
        for(var j = 1; j < maxCoef + 1; j++){
            for(var k = 1; k < maxCoef + 1; k++){
                if(elems.every((elem) => {
                    const e = EGetter(elem);
                    return e(a,i) + e(b,j) == e(product,k);
                }))return [i, j, k];
            }
        }
    }
}

function getCoefsDecomp(reactant,c,d,maxCoef = 20){
    var synth = getCoefsSynthesis(c,d,reactant,maxCoef);
    synth.unshift(synth.pop());
    return synth;
}

window.ChemBalancer = {getCoefs,getCoefsSynthesis,getCoefsDecomp};
