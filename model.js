const fs = require('fs')

var vertices = [1.0,1.0,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
var coords = [1.0,1.0,1.0,0.0,0.0,0.0,1.0,1.0,0.0,0.0,0.0,1.0]


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


addInt64([BigInt(vertices.length*8)])
addFloat64(vertices)
addInt64([BigInt(coords.length*8)])
addFloat64(coords)


//var array8 = new Uint8Array(data)
var array8 = new Uint8Array(data)
fs.writeFileSync('./dist/model3.bin',array8)

var data = new Uint8Array(fs.readFileSync('./dist/model3.bin'))
var array64 = new Float64Array(data.buffer)

console.log(array64)

var array64 = new BigInt64Array(data.buffer)

console.log(array64)