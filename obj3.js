fs = require('fs')


const obj = fs.readFileSync('./dist/worzala.obj').toString()

const lines = obj.split('\n')

var meshes = []
var model = {position:[],normal:[],coord:[],indices:[],}
var outmodel
function newMesh(){
    //model = {position:[],normal:[],coord:[],indices:[],}
    outmodel = {position:[],normal:[],coord:[]}
    meshes.push(outmodel)
}

//console.log(lines[0])
var FUNCS = {
    o(params){
        newMesh()
    },
    v(params){
        model.position.push(params.map(parseFloat))
    },
    vn(params){
    model.normal.push(params.map(parseFloat))
    },
    vt(params){
    model.coord.push(params.map(parseFloat))
    },
    f(params){
        params=params.map(f=>{
            var arr = f.split('/')
            arr = arr.map(a=>parseInt(a))
            //model.indices.push(...arr)
            return arr
        })
        outmodel.position.push(
            ...model.position[params[0][0]-1],
            ...model.position[params[1][0]-1],
            ...model.position[params[2][0]-1]
        )
        outmodel.coord.push(
            ...model.coord[params[0][1]-1],
            ...model.coord[params[1][1]-1],
            ...model.coord[params[2][1]-1]
        )
        outmodel.normal.push(
            ...model.normal[params[0][2]-1],
            ...model.normal[params[1][2]-1],
            ...model.normal[params[2][2]-1]
        )
        //model.indices.push(params[0][1],params[1][1],params[2][1])
        //model.indices.push(params[0][2],params[1][2],params[2][2])
    },
}



for(const line of lines){

    var key = line.split(' ')[0]
    var params = line.split(' ').map(a=>a.trim())
    params.splice(0,1)
    
    if(FUNCS[key]!==undefined){
        FUNCS[key](params)
    }

}


    console.log(meshes)
    //console.log(outmodel)
    //model=outmodel


var data = []

function addFloat64(arr){
  var array64 = new Float64Array(arr)
  var array8 = new Uint8Array(array64.buffer)
  data.push(...array8)
}
function addInt64(arr){
  var array64 = new BigInt64Array(arr)
  var array8 = new Uint8Array(array64.buffer)
  data.push(...array8)
}
function addUInt16(arr){
  var array64 = new Uint16Array(arr)
  var array8 = new Uint8Array(array64.buffer)
  data.push(...array8)
}


addInt64([BigInt(2)])

for(let model of meshes){

    addInt64([BigInt(model.position.length)])

        addInt64([BigInt(model.position.length*8)])
        addFloat64([...model.position])
        addInt64([BigInt(model.coord.length*8)])
        addFloat64([...model.coord])
        //addInt64([BigInt(model.indices.length*8)])
        //addUInt16([...model.indices])

}

var array8 = new Uint8Array(data)
fs.writeFileSync('./dist/box.binary4',array8)