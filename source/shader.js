
var vertexShader = 0
var fragmentShader = 0
var programID = 0

var meshData = 0

function MacroCreateShader(vert,frag){
    meshData = MacroReadFile(vert)
    vertexShader = gl.CreateShader(gl.VERTEX_SHADER)
    gl.ShaderSource(vertexShader,1, *meshData, *fsize)
    gl.CompileShader(vertexShader)


    meshData = MacroReadFile(frag)
    fragmentShader = gl.CreateShader(gl.FRAGMENT_SHADER)
    gl.ShaderSource(fragmentShader,1, *meshData, *fsize)
    gl.CompileShader(fragmentShader)

    printf("before creste prog")

    programID = gl.CreateProgram()
    gl.AttachShader(programID, vertexShader)
    gl.AttachShader(programID, fragmentShader)
    gl.LinkProgram(programID)
    gl.UseProgram(programID)
    //gl.ValidateProgram,*programID
    gl.DeleteShader(vertexShader)
    gl.DeleteShader(fragmentShader)

    printf("creste prog")
    return programID
}


var uniformLocation = 0

function MacroSetUniform1i(program,name,value){
    uniformLocation = gl.GetUniformLocation(program, name)
        //printf("uniformLocation=%i",uniformLocation)
    gl.Uniform1i(uniformLocation, value)
}

function MacroSetUniformMatrix(program,name,value){
    uniformLocation = gl.GetUniformLocation(program, name)
    //if(uniformLocation > -1){
        gl.UniformMatrix4dv(uniformLocation, 1, 0, *value)
    //}
}
