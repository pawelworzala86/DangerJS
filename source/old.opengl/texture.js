
.data?
    var hDib
    var hDib32
    var wFormat
    var dwWidth
    var dwHeight
    var lpBits
    var meshData


    function LoadTexture(texName,textureID1){
        wFormat = FreeImage_GetFileType(texName, 0)
            //mov wFormat, rax
            hDib = FreeImage_Load(wFormat, texName, 0)
            //mov hDib, rax
            //invoke FreeImage_LoadFromHandle, 0, addr meshData, 0
            //mov hDib, rax
            hDib32 = FreeImage_ConvertTo32Bits(hDib)
            //mov hDib32, rax
            
            

            lpBits = FreeImage_GetBits(hDib32, NULL, 0)
            //mov lpBits, rax

            dwWidth = FreeImage_GetWidth(hDib32)
            //mov dwWidth, rax
            dwHeight = FreeImage_GetHeight(hDib32)
            //mov dwHeight, rax

            FreeImage_Unload(hDib)



            gl.GenTextures(1, *textureID1, 0)
            gl.BindTexture(gl.TEXTURE_2D, textureID1)

            gl.TexParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.TexParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

            //gl.PixelStorei(GL_UNPACK_ALIGNMENT, 1);

            gl.TexImage2D(gl.TEXTURE_2D, 0, gl.BGRA_EXT, dwWidth, dwHeight, 0, gl.BGRA_EXT, GL_UNSIGNED_BYTE, lpBits)
        

        }


    /*
    function LoadTextureFromStream(texName){

        file.ReadFile(texName, meshData)

        invoke FreeImage_OpenMemory, meshData, _size1
        mov hMem, rax
        invoke FreeImage_GetFileTypeFromMemory, hMem
        mov wFormat, rax
        //printf('wFormat... %i %s',wFormat,EOL)
        //invoke FreeImage_GetFileType, addr fileTex2, 0
        //mov wFormat, rax
        invoke FreeImage_LoadFromMemory, wFormat, hMem
        mov hDib, rax
        //invoke FreeImage_LoadFromHandle, 0, addr meshData, 0
        //mov hDib, rax
        //invoke FreeImage_ConvertTo32Bits, hDib
        //mov hDib32, rax

        //invoke FreeImage_GetBits, hDib32, NULL, 0
        //mov lpBits, rax
        invoke FreeImage_GetBits, hDib//, NULL, 0
        mov lpBits, rax

        invoke FreeImage_GetWidth, hDib
        mov dwWidth, rax
        invoke FreeImage_GetHeight, hDib
        mov dwHeight, rax



        printf('dwWidth... %i %s',dwWidth,EOL)


        gl.GenTextures(1, *textureID, 0)
        gl.BindTexture(gl.TEXTURE_2D, textureID)
        //gl.TexParameterf(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.REPEAT)
        //gl.TexParameterf(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.REPEAT)
        //gl.uBuild2DMipmaps(gl.TEXTURE_2D, 3, dwWidth, dwHeight, gl.RGB, gl.UNSIGNED_BYTE, lpBits)
        gl.TexImage2D(gl.TEXTURE_2D, 0, gl.RGB, dwWidth, dwHeight, 0, gl.BGRA_EXT, GL_UNSIGNED_BYTE, lpBits)

        printf('dwWidth... %i %s',dwWidth,EOL)

    }*/

