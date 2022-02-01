let keys = {}, JSVG = {}, mouse = {x:0,y:0,down:false}, ammo = 30, reloading = false;
import("https://kroljango13.github.io/Web-Stuff/JS-Modules/JSVG.js").then(jsvg => JSVG = jsvg)
const bodyEvent = (type,listener) => document.body.addEventListener(type,listener)
function load(){
    board = byID("gameboard");
    bodyEvent("keydown",e => {
        handleKey(e)
        if(e.keyCode == 82)reload()
    })
    bodyEvent("keyup",handleKey)
    bodyEvent("mousedown",handleMouse)
    bodyEvent("mouseup",handleMouse)
    bodyEvent("mousemove", (e) => {
        mouse.x = e.pageX
        mouse.y = e.pageY
    })
    board.addEventListener("click", loops[1].func)
    byID("ammoDisplay").addEventListener("selectstart",e => false)
    loops.forEach(loop => setInterval(loop.func,loop.period))
}
const handleMouse = (e) => mouse.down = e.type == "mousedown"
const handleKey = (e) => keys[e.keyCode] = e.type == "keydown"
function move(){
    var x = byID("eRect").x.baseVal.value, y = byID("eRect").y.baseVal.value
    if (x < 0){
        x = 0;
    } else if (keys[37] || keys[65]){
       x--
    }    
    if (x > gameboard.width.baseVal.value - 75){
        x = gameboard.width.baseVal.value - 75;
    } else if (keys[39] || keys[68]){
        x++
    }
    if (y < 0){
        y = 0;
    } else if (keys[38] || keys[87]){
        y--
    }
    if (y > gameboard.height.baseVal.value - 13){
        y = gameboard.height.baseVal.value - 13;
    } else if (keys[40] || keys[83]){
        y++
    }
    byID("eRect").x.baseVal.value = x
    byID("eRect").y.baseVal.value = y
    byID("ammoDisplay").setAttribute("x",(x + ((100 - byID("ammoDisplay").getBBox().width) / 2)).toString())
    byID("ammoDisplay").setAttribute("y",(y + 32).toString())
}
function loop(){
    move()
    for (obj of queryAll("[velocityX]")){
        var velX = parseFloat(obj.getAttribute("velocityX")), velY = parseFloat(obj.getAttribute("velocityY"))
        if(obj.x && obj.y && obj.x.baseVal && obj.y.baseVal){
            obj.x.baseVal.value += velX
            obj.y.baseVal.value += velY
        } else if (obj.points){
            JSVG.movePolygon(obj,velX,velY)
        }
    }
    for (obj of queryAll("[life]")){
        var life = parseInt(obj.getAttribute("life"))
        if(!--life){
            obj.remove()
        }
        obj.setAttribute("life",life)
    }
    if(reloading){
        byID("ammoDisplay").textContent = "Reloading"
    }
}

const loops = [
    {
        period: 1,
        func: loop
    },
    {
        period: 100,
        func(){
            if(mouse.down){
                if(!reloading){
                    if(ammo > 0){
                        var shot = JSVG.shapes.rect(
                            byID("eRect").x.baseVal.value + 50, 
                            byID("eRect").y.baseVal.value + 25,
                            20, 5, "#f00")
                        shot.setAttribute("life",200)
                        shot.classList.add("laserBullet")
                        board.append(shot)
                        JSVG.rotate(shot,JMath.vector(shot.x.baseVal.value,shot.y.baseVal.value,mouse.x,mouse.y))
                        JSVG.launch(shot,3,0)
                        ammo--
                    } else {
                        reload()
                    }
                    byID("ammoDisplay").textContent = ammo.toString()
                }
            }
        }
    }
]
function reload(){
    setTimeout(() => {
        ammo = 30
        reloading = false
        byID("ammoDisplay").textContent = ammo.toString()
    }, 500)
    reloading = true
}
