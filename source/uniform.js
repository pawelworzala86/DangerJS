

.data?
    impGL glGenBuffers
    impGL glCreateShader
    impGL glCreateProgram
    impGL glShaderSource
    impGL glCompileShader
    impGL glAttachShader
    impGL glLinkProgram
    impGL glUseProgram
    impGL glGetUniformLocation
    impGL glUniform4f
    impGL glUniform4d
    impGL glUniform1d
    impGL glUniform1i
    impGL glUniform3dv
    impGL glUniformMatrix4dv
    impGL glBindBuffer
    impGL glBufferData
    impGL glVertexAttribPointer
    impGL glEnableVertexAttribArray
    impGL glGenVertexArrays
    impGL glBindVertexArray
    impGL glDeleteShader
    impGL glCreateFramebuffers
    impGL glBindFramebuffer
    impGL glFramebufferTexture2D
    impGL glValidateProgram
    impGL glActiveTexture
    impGL glGenerateMipmap
    impGL glUniform4fv
    impGL glUniform1iv
    impGL glUniform4dv

    .code



    function MacroLoadGLFunc(nname,prop){
        prop = wglGetProcAddress(nname)
    }



    function InitGLFunctions(){

        GLIMPORTFUNC
        
    }




