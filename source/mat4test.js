
import 'math.js'


import 'mat4s.js'



var matA = ?
var matB = ?

var translateVec = [0.5,123.0,45.0]

var mfovy = 45.0
var maspect = 1.0
var mnear = 0.1
var mfar = 100.0

function start(){

    Macro_mat4Create(matA)
    Macro_mat4Create(matB)
    //mov mat, alloc(16*8)

    Macro_mat4_identity(matA)
    Macro_PrintMat('identity',matA)
    Macro_mat4_identity(matB)

    Macro_mat4_translate(matA,matB,translateVec)
    Macro_PrintMat('translate',matA)


    Macro_mat4_perspectiveNO(matA, mfovy, maspect, mnear, mfar)
    Macro_PrintMat('perspectiveNO',matA)

    //printf('%f ', mat[12])
    //printf('%f ', mat[13])
    //printf('%f ', mat[14])
    //printf('%f ', mat[15])
    //printf('%f end', oneNumberFloat)

    //printf('%f ', mat[0])
    //printf('%f ', mat[1])

}