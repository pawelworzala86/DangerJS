
var hDib = 0
var hDib32 = 0
var wFormat = 0
var dwWidth = 0
var dwHeight = 0
var lpBits = 0

var textureID = 0

function MacroLoadTexture(name){

    //LoadTexture('textures\girl.jpg', textures1)
    wFormat = FreeImage_GetFileType(*name, 0)
    //mov wFormat, rax
    hDib = FreeImage_Load(wFormat, *name, 0)
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

    gl.GenTextures(1, *textureID, 0)
    gl.BindTexture(gl.TEXTURE_2D, textureID)

    gl.TexParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.TexParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    //gl.PixelStorei(GL_UNPACK_ALIGNMENT, 1);

    gl.TexImage2D(gl.TEXTURE_2D, 0, gl.BGRA_EXT, dwWidth, dwHeight, 0, gl.BGRA_EXT, GL_UNSIGNED_BYTE, lpBits)

    return textureID
}