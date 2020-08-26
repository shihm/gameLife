var ww = screen.availWidth
var hh = screen.availHeight
m = 40
n = 40
if (ww > hh) {
    document.getElementById('whole').style = 'display:flex'
    document.getElementById('grids').style = 'width=' + hh
}
var thematrix = {}
var thematrix1={}
function initgrid(m, n) {
    var grids = ''
    for (var i = 0; i < m; i++) {
        grids += '<div class="gridrow">'
        for (var j = 0; j < n; j++) {
            var id = 'r' + i + 'c' + j
            grids += '<button onclick="selectinit(this.id)" class="deadcell" id=' + id + '></button>'
            thematrix[id] = 0
        }
        grids += '</div>'
    }
    return grids
}

document.getElementById("grids").innerHTML = initgrid(m, n)
var running = false

function selectinit(e) {
    if (!running) {
        if (thematrix[e]) {
            thematrix[e] = 0
            document.getElementById(e).style.backgroundColor = 'white'
        }
        else {
            thematrix[e] = 1
            document.getElementById(e).style.backgroundColor = 'red'
        }
    }
}
function findadj(i, j) {
    living = 0
    if (j - 1 >= 0) {
        id = 'r' + i + 'c' + (j - 1)
        living += thematrix[id]
    }
    if (j + 1 < n) {
        id = 'r' + i + 'c' + (j + 1)
        living += thematrix[id]
    }
    if (i - 1 >= 0) {
        var id = 'r' + (i - 1) + 'c' + j
        living += thematrix[id]
        if (j - 1 >= 0) {
            id = 'r' + (i - 1) + 'c' + (j - 1)
            living += thematrix[id]
        }
        if (j + 1 < n) {
            id = 'r' + (i - 1) + 'c' + (j + 1)
            living += thematrix[id]
        }
    }
    if (i + 1 < m) {
        var id = 'r' + (i + 1) + 'c' + j
        living += thematrix[id]
        if (j - 1 >= 0) {
            id = 'r' + (i + 1) + 'c' + (j - 1)
            living += thematrix[id]
        }
        if (j + 1 < n) {
            id = 'r' + (i + 1) + 'c' + (j + 1)
            living += thematrix[id]
        }
    }
    //if(living>0){console.log(i,j,living)}
    return living
}
function isEnd(){
    var ans=true
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            var id = 'r' + i + 'c' + j
            if(thematrix1[id]!=thematrix[id]){
                return false
            }
        }
    }
    if(ans){
        return true
    }
}
function theEnd() {
    alert('No more changes')
    document.getElementById('next').disabled = true
    document.getElementById('auto').disabled = true
    running=false
}
function nextmatrix() {
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
            var id = 'r' + i + 'c' + j
            /*if(document.getElementById(id).classList.value.includes('livecell')){
                console.log(i,j)
            }*/
            if (thematrix[id]) {
                if (findadj(i, j) == 2 || findadj(i, j) == 3) {
                    thematrix1[id] = 1
                    document.getElementById(id).style.backgroundColor = 'red'
                }
                else {
                    thematrix1[id] = 0
                    document.getElementById(id).style.backgroundColor = 'white'
                }
            }
            else {
                if (findadj(i, j) == 3) {
                    thematrix1[id] = 1
                    document.getElementById(id).style.backgroundColor = 'red'
                }
                else {
                    thematrix1[id] = 0
                    document.getElementById(id).style.backgroundColor = 'white'
                }
            }
        }
    }
    return thematrix1

}
function nextgeneration(){
    nextmatrix
    thematrix=thematrix
}

function autorun(){
    if(!running){
        running=true
        document.getElementById('next').disabled=true
        document.getElementById('auto').innerText='Stop'
        
        var autorun1= setInterval(nextgeneration(),1000)
        if(isEnd()){
            clearInterval(autorun1)
        }
        
    }
    else{
        running=false
        document.getElementById('next').disabled=false
        document.getElementById('auto').innerText='Auto'
    }
    
}