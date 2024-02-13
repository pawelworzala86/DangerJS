import '\danger\include\window.asm'

import 'math.js'


import 'uniform.js'

import 'file.js'
import 'shader.js'
import 'texture.js'






var modelFileName = 'model3.bin'
//var modelFileNameO = 'model.bin'

var vert = 'shaders\draw2d.vert'
var frag = 'shaders\draw2d.frag'
//var size1 = 0

EOL db 10,13,0

var VAO = 0
var bufferID = 0
var bufferCoordID = 0





    var projection = [1.3737387097273113,0.0,0.0,0.0,0.0,1.3737387097273113,0.0,0.0,0.0,0.0,-1.02020202020202,-1.0,0.0,0.0,-2.0202020202020203,0.0]
    var camera = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,-1.100090086,1.0]
    var model = [1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0,0.0,0.0,0.0,0.0,1.0]
    
    //var vertices = [1.0,1.0,0.0,1.0,-1.0,0.0,-1.0,-1.0,0.0,1.0,1.0,0.0,-1.0,-1.0,0.0,-1.0,1.0,0.0]
    //var coords = [1.0,1.0,1.0,0.0,0.0,0.0,1.0,1.0,0.0,0.0,0.0,1.0]
    
    


//var fsize = 0
//var handle = 0



function SystemInit(){
    FreeImage_Initialise()

    InitGLFunctions()
    

    //shader1.CreateShader('shaders\draw2d.vert','shaders\draw2d.frag')


    programID = MacroCreateShader(vert,frag)



        printf('end shad %s', EOL)

        
        
        
        //pModel.CreateGeometry()
        CreateGeometry()




        


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


}


var texName = 'textures\girl.jpg'
var textureID1 = 0

var modelData = 0
var modelSize = 0

function CreateGeometry(){


    textureID1 = MacroLoadTexture(texName)


    //printf("dwWidth=%i",dwWidth)

    //modelData = MacroReadFile(modelFileNameO)
    handle = CreateFile(addr modelFileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
    fsize = GetFileSize(handle, 0)
   
        gl.GenVertexArrays(1, *VAO)
        gl.BindVertexArray(VAO)
    
        modelSize = alloc(8)
    ReadFile(handle, addr modelSize, 8, 0, 0)
    modelData = alloc(modelSize)
    ReadFile(handle, modelData, modelSize, 0, 0)

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

        CloseHandle(handle)

}

//var uniformLocation = 0
//var nname = 'diffuseTexture'

function Render(){


    //frameID++

        //SetUniform1d(programID, 'frame', frameID)


        gl.UseProgram(programID)

        gl.BindVertexArray(VAO)

        gl.ActiveTexture(gl.TEXTURE0);
        gl.BindTexture(gl.TEXTURE_2D, textureID1)
        MacroSetUniform1i(programID, 'diffuseTexture', 0)


        MacroSetUniformMatrix(programID, 'projection', projection)
        MacroSetUniformMatrix(programID, 'camera', camera)
        MacroSetUniformMatrix(programID, 'model', model)

    
        //gl.BindBuffer,gl.ELEMENT_ARRAY_BUFFER, *indID
    
        gl.DrawArrays(gl.TRIANGLES, 0, 6)
    
        //glDrawElements(gl.TRIANGLES, 3*2, gl.UNSIGNED_SHORT,0)

}



function start(){

    CreateWindow()

}


colorcomathree dd 0.3
colorcmmasevben dd 0.7
colorcmmasn dd 0.25
coloralpha dd 1.0
