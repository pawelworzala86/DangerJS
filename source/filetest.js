
import 'file.js'

var file1 = 'model2.bin'
var buffor1 = 0

var test1 = 23.23

function start(){

    //buffor1 = MacroReadFile(file1)

    handle = CreateFile(addr file1, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
    fsize = GetFileSize(handle, 0)
    buffor1 = alloc(8)
    ReadFile(handle, addr buffor1, 8, 0, 0)

    printf(" OK %i ", fsize)

    //mov rax, [buffor1

    printf(" OK %i", buffor1)

}