import '\dangerjs\include\window.asm'




import 'opengl/uniform.js'

import 'file.js'
import 'shader.js'
import 'texture.js'

import 'mat4s.js'




var modelFileName = 'box.binary3'
//var modelFileNameO = 'model.bin'

var vert = 'shaders\box2.vert'
var frag = 'shaders\box2.frag'
//var size1 = 0

EOL db 10,13,0

var VAO = 0
var bufferID = 0
var bufferCoordID = 0



//var projection2 = ?
var mfovy = 45.0
var maspect = 1.4
var mnear = 0.1
var mfar = 100.0

//var camera2 = ?
var cameraTranslateVec = [0.0,0.0,-5.0]

//var matrixA = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0]
//var matrixB = ?

//var model2 = ?


    var projection = [1.3737387097273113,0.0,0.0,0.0,0.0,1.3737387097273113,0.0,0.0,0.0,0.0,-1.02020202020202,-1.0,0.0,0.0,-2.0202020202020203,0.0]
    var camera = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,-5.100090086,1.0]
    var model = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0]

    var modelA = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0]
    var modelATranslateVec = [0.0,2.5,0.0]
    //var vertices = [1.0,1.0,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
    //var coords = [1.0,1.0,1.0,0.0,0.0,0.0,1.0,1.0,0.0,0.0,0.0,1.0]
    
    


//var fsize = 0
//var handle = 0



var texName = 'textures\box.jpg'
var textureIDA = 0

var modelData = 0
var modelSize = 0

var trianglesCount = 0


var ttt = 44.44

function CreateGeometry(){


    textureIDA = MacroLoadTexture(texName)


    //printf("dwWidth=%i",dwWidth)

    //modelData = MacroReadFile(modelFileNameO)
    handle = CreateFile(addr modelFileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
    fsize = GetFileSize(handle, 0)
   
        gl.GenVertexArrays(1, *VAO)
        gl.BindVertexArray(VAO)

        trianglesCount = alloc(8)
    ReadFile(handle, addr trianglesCount, 8, 0, 0)
    printf(' indices %i  ', trianglesCount)
    
        modelSize = alloc(8)
    ReadFile(handle, addr modelSize, 8, 0, 0)
    modelData = alloc(modelSize)
    ReadFile(handle, modelData, modelSize, 0, 0)
    printf(' tris %i  ', modelSize)

        gl.GenBuffers(1,*bufferID)
        gl.BindBuffer(gl.ARRAY_BUFFER, bufferID)
        gl.BufferData(gl.ARRAY_BUFFER, modelSize, modelData, gl.STATIC_DRAW)
        //loadingo model from file
    
        gl.EnableVertexAttribArray(0)
        gl.VertexAttribPointer(0,3,gl.DOUBLE,gl.FALSE, 3*8, 0)
    
        modelSize = alloc(8)
    ReadFile(handle, addr modelSize, 8, 0, 0)
    modelData = alloc(modelSize)
    ReadFile(handle, modelData, modelSize, 0, 0)

        gl.GenBuffers(1,*bufferCoordID)
        gl.BindBuffer(gl.ARRAY_BUFFER, bufferCoordID)
        gl.BufferData(gl.ARRAY_BUFFER, modelSize, modelData,gl.STATIC_DRAW)
    
        gl.EnableVertexAttribArray(1)
        gl.VertexAttribPointer(1,2,gl.DOUBLE,gl.FALSE, 2*8, 0)

        /*modelSize = alloc(8)
    ReadFile(handle, addr modelSize, 8, 0, 0)
    modelData = alloc(modelSize)
    ReadFile(handle, modelData, modelSize, 0, 0)

        gl.GenBuffers(1,*bufferCoordID)
        gl.BindBuffer(gl.ELEMENT_ARRAY_BUFFER, bufferCoordID)
        gl.BufferData(gl.ELEMENT_ARRAY_BUFFER, modelSize, modelData,gl.STATIC_DRAW)
    
        gl.EnableVertexAttribArray(1)
        gl.VertexAttribPointer(1,2,gl.UNSIGNED_SHORT,gl.FALSE, 2*8, 0)*/

        CloseHandle(handle)


        printf('%s %f','GEOMCREATED',ttt)

}

//var uniformLocation = 0
//var nname = 'diffuseTexture'

function Render(){


    //frameID++

        //SetUniform1d(programID, 'frame', frameID)


        gl.UseProgram(programID)

        gl.BindVertexArray(VAO)

        gl.ActiveTexture(gl.TEXTURE0);
        gl.BindTexture(gl.TEXTURE_2D, textureIDA)
        MacroSetUniform1i(programID, 'diffuseTexture', 0)


        MacroSetUniformMatrix(programID, 'projection', projection)
        MacroSetUniformMatrix(programID, 'camera', camera)
        MacroSetUniformMatrix(programID, 'model', model)

    
        //gl.BindBuffer,gl.ELEMENT_ARRAY_BUFFER, *indID
    
        gl.DrawArrays(gl.TRIANGLES, 0, trianglesCount)
    
        //glDrawElements(gl.TRIANGLES, 108, gl.UNSIGNED_SHORT,0)




        MacroSetUniformMatrix(programID, 'projection', projection)
        MacroSetUniformMatrix(programID, 'camera', camera)
        MacroSetUniformMatrix(programID, 'model', modelA)

    
        //gl.BindBuffer,gl.ELEMENT_ARRAY_BUFFER, *indID
    
        gl.DrawArrays(gl.TRIANGLES, 0, trianglesCount)

}


function SystemInit(){
    FreeImage_Initialise()

    InitGLFunctions()
    

    //shader1.CreateShader('shaders\draw2d.vert','shaders\draw2d.frag')


    programID = MacroCreateShader(vert,frag)



        printf('end shad %s', EOL)

        
        
        
        //pModel.CreateGeometry()
        CreateGeometry()



        Macro_mat4Create(projection)
        Macro_mat4_perspectiveNO(projection, mfovy, maspect, mnear, mfar)
        Macro_PrintMat('projection2',projection)

        Macro_mat4Create(camera)
        Macro_mat4_identity(camera)
        Macro_mat4_translate(camera,camera,cameraTranslateVec)
        Macro_PrintMat('translate',camera)

        Macro_mat4Create(model)
        Macro_mat4_identity(model)
        Macro_PrintMat('model',model)

        Macro_mat4Create(modelA)
        Macro_mat4_identity(modelA)
        Macro_mat4_translate(modelA,modelA,modelATranslateVec)
        Macro_PrintMat('modelA',modelA)



        gl.Enable(gl.DEPTH_TEST)
        gl.DepthFunc(gl.LEQUAL)
        gl.Enable(gl.TEXTURE_2D)


    
        //TestThread()


        movd	xmm3,coloralpha
        movd	xmm2,colorcomathree
        movd	xmm1,colorcmmasn
        movd	xmm0,colorcmmasn
        invoke glClearColor//(float dword 0.3, dword 0.3, dword 0.3, dword 1.0)
}

function SystemDestroy(){
    
}

function SystemRender(){

    gl.Clear(gl.COLOR_BUFFER_BIT or gl.DEPTH_BUFFER_BIT)

    Render()

    //printf('ok')

}



function start(){

    call CreateWindow

}


colorcomathree dd 0.3
colorcmmasevben dd 0.7
colorcmmasn dd 0.25
coloralpha dd 1.0



