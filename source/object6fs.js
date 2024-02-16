
class File{
    constructor(){
        this.handle = 0
        this.fsize = 0
        this.buffor = 0
    }
    readRile(fileName){
        this.handle = CreateFile(fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
        this.fsize = GetFileSize(this.handle, 0)
        this.buffor = alloc(this.fsize)
        ReadFile(this.handle, &this.buffor, this.fsize, 0, 0)
        CloseHandle(this.handle)
    }
    open(fileName){
        this.handle = CreateFile(fileName, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
        this.fsize = GetFileSize(this.handle, 0)
        this.buffor = alloc(this.fsize)
    }
    read(fsize){
        ReadFile(this.handle, &this.buffor, fsize, 0, 0)
    }
    close(){
        CloseHandle(this.handle)
    }
}
var file = new File()





var fileA = 'model2.bin'

function start(){

    printf("start")

    //tobj.constructor()

    //printf("cnstr")
  

    file.readRile(&fileA)
    printf(" OK %i", file.buffor[0])
    printf(" OK %f", file.buffor[1])


    file.open(&fileA)
    file.read(8)
    printf(" OK %i", file.buffor[0])
    file.close()

    //printf(" OK %i", tobj.buffor)

}