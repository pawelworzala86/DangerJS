fs = require('fs')


const obj = fs.readFileSync('./dist/box.obj').toString()

const lines = obj.split('\n')

var model = {vertices:[],normals:[],coords:[],indices:[],}

//console.log(lines[0])
var FUNCS = {
    v(params){
        model.vertices.push(...params.map(parseFloat))
    },
    vn(params){
      model.normals.push(...params.map(parseFloat))
    },
    vt(params){
      model.coords.push(...params.map(parseFloat))
    },
    f(params){
      params.map(f=>{
        var arr = f.split('/')
        arr = arr.map(a=>parseInt(a))
         model.indices.push(...arr)
      })
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


console.log(model)


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


addInt64([BigInt(model.indices.length)])

        addInt64([BigInt(model.vertices.length*8)])
        addFloat64([...model.vertices])
        //addInt64([BigInt(mesh.geometry.coords.length*8)])
        //addFloat64([...mesh.geometry.coords])
        addInt64([BigInt(model.indices.length*8)])
        addUInt16([...model.indices])

var array8 = new Uint8Array(data)
fs.writeFileSync('./dist/box.binary',array8)