


.data?
    var uniformLocation

    var prop1
    var prop2
    var prop3
    var prop4


    var vertexShader
    var fragmentShader
    var programID
    var _size1

class cSHADER{
    constructor(){
        //this.vertexShader = 0
        //this.fragmentShader = 0
        this.pramID = 0
    }
    CreateShader(fvert,ffrag){

        file.ReadFile(fvert, meshData)
        vertexShader = gl.CreateShader(gl.VERTEX_SHADER)
        _size1 = file.GetSize()
        gl.ShaderSource(vertexShader,1, *meshData, *_size1)
        gl.CompileShader(vertexShader)
    
        file.ReadFile(ffrag, meshData)
        fragmentShader = gl.CreateShader(gl.FRAGMENT_SHADER)
        _size1 = file.GetSize()
        gl.ShaderSource(fragmentShader,1, *meshData, *_size1)
        gl.CompileShader(fragmentShader)

        printf('before creste prog %s', EOL)
    
        programID = gl.CreateProgram()
        gl.AttachShader(programID, vertexShader)
        gl.AttachShader(programID, fragmentShader)
        gl.LinkProgram(programID)
        gl.UseProgram(programID)
        //gl.ValidateProgram,*programID
        gl.DeleteShader(vertexShader)
        gl.DeleteShader(fragmentShader)

        printf('creste prog %s', EOL)

        /*mov rax, programID
        mov programID,rax
        return programID*/

        printf('end shad %s', EOL)
    }
    SetUniform4d(nname, pv1,pv2,pv3,pv4){
        uniformLocation = gl.GetUniformLocation(programID, nname)
        //mov uniformLocation, rax
        //if(uniformLocation > -1){
            movsd xmm0, pv4
            movsd xmm1, pv3
            movsd xmm2, pv2
            movsd xmm3, pv1
            movsd qword ptr [rsp], xmm0
            movsd qword ptr [rsp + 8], xmm1
            movsd qword ptr [rsp + 16], xmm2
            movsd qword ptr [rsp + 24], xmm3
            mov rcx, uniformLocation
            mov rdx, 1
            lea r8, [rsp]
            call glUniform4dv
            //gl.Uniform4d(uniformLocation, pv1,pv2,pv3,pv4)
        //}
    }
    SetUniform4f(nname, pv1,pv2,pv3,pv4){
        uniformLocation = gl.GetUniformLocation(programID, nname)
        //mov uniformLocation, rax
        //if(uniformLocation > -1){
            movsd xmm0, pv4
            movsd xmm1, pv3
            movsd xmm2, pv2
            movsd xmm3, pv1
            movsd qword ptr [rsp], xmm0
            movsd qword ptr [rsp + 8], xmm1
            movsd qword ptr [rsp + 16], xmm2
            movsd qword ptr [rsp + 24], xmm3
            mov rcx, uniformLocation
            mov rdx, 1
            lea r8, [rsp]
            call glUniform4fv
            //gl.Uniform4f(uniformLocation, pv1,pv2,pv3,pv4)
        //}
    }
    SetUniform1d(nname, value){
        uniformLocation = gl.GetUniformLocation(programID, nname)
        //mov uniformLocation, rax
        //if(uniformLocation > -1){
            /*movsd xmm0, value
            movsd qword ptr [rsp], xmm0
            mov rcx, uniformLocation
            call glUniform1d*/
            gl.Uniform1d(uniformLocation, value)
        //}
    }
    SetUniform1i(nname, value){
        uniformLocation = gl.GetUniformLocation(programID, nname)
        //if(uniformLocation > -1){
            /*mov eax, dword ptr value
            mov rcx, uniformLocation
            call glUniform1i*/
            gl.Uniform1i(uniformLocation, value)
        //}
    }
    /*function SetUniform3dv(program, nname, index, value){

        var uniformLocation = gl.GetUniformLocation(program, nname)

        if(uniformLocation > -1){

            gl.Uniform3dv(uniformLocation, index, value)
        
        }

    }*/
    SetUniformMatrix(nname, value){
        uniformLocation = gl.GetUniformLocation(programID, nname)
        //if(uniformLocation > -1){
            gl.UniformMatrix4dv(uniformLocation, 1, 0, *value)
        //}
    }
    Use(){
        gl.UseProgram(programID)
    }
}



    //var isCompiled
/*
function CreateShader(fvert,ffrag){


    file.ReadFile(fvert, meshData)

    vertexShaderID = gl.CreateShader(gl.VERTEX_SHADER)
    //mov vertexShaderID,rax
    gl.ShaderSource(vertexShaderID,1, *meshData, *_size1)
    gl.CompileShader(vertexShaderID)
    //Check for compilation result
    //gl.GetShaderiv, vertexShaderID, gl.COMPILE_STATUS, *isCompiled
    //if(isCompiled==0){
        //Did not compile, why?
        //std::cout << "The shader could not be compiled\n" << std::endl;
        //char errorlog[500] = {'\0'};
        //gl.GetShaderInfoLog, *vertexShaderID, 500, 0, errorlog
        //string failed(errorlog);
        //printf("Log size is %d", failed.size());
        //conout('VERT ERROR...',EOL)
    //}

    file.ReadFile(ffrag, meshData)
    fragmentShaderID = gl.CreateShader(gl.FRAGMENT_SHADER)
    //mov fragmentShaderID,rax
    gl.ShaderSource(fragmentShaderID,1, *meshData, *_size1)
    gl.CompileShader(fragmentShaderID)

    programID = gl.CreateProgram()
    //mov programID,rax
    gl.AttachShader(programID, vertexShaderID)
    gl.AttachShader(programID, fragmentShaderID)
    gl.LinkProgram(programID)
    gl.UseProgram(programID)
    //gl.ValidateProgram,*programID
    //gl.DeleteShader,*fragmentShaderID
    //gl.DeleteShader,*vertexShaderID

}*/