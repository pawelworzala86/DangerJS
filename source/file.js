
var handle = 0
var buffor = 0
var fsize = 0
var bufforFile = 0

function FileRead(fileName:ptr qword){
    handle = CreateFile(fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
    fsize = GetFileSize(handle, 0)
    buffor = alloc(fsize)
    ReadFile(handle, buffor, fsize, 0, 0)
    CloseHandle(handle)
    //printf(" OK %i", fsize)
    //printf(" OK %s", buffor)
    return buffor
}
function MacroReadFile(fileName){
    lea rax, fileName
    bufforFile = FileRead(rax)
    return bufforFile
}

//buffor1 = MacroReadFile(file1)