

var numA = 2134
var numB = 2134.45

var arraA = [12,224,34]

var textA = 'test'


var file1 = 'model2.bin'
var bufforA = ?
var fsize = 0
var handle = 0


class TestObj{
    constructor(){
        this.val = 234
        this.buffor = 0
        this.fsize = 0
    }
    init(){
        this.val = 234
        //this.constructor()
        //return qword ptr this
    }
    init2(){
        this.val = 23422
        //this.constructor()
        //return qword ptr this
    }
    ttt(){
        //this.val = 356
        printf("%s %i %s", "TTT ", this.val, "TEST")
        this.tst2()
    }
    tst2(){
        printf(" OK %i", this.val)
    }
    read(){
        printf("cnstr")

        handle = CreateFile(addr file1, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
        fsize = GetFileSize(handle, 0)
        this.buffor = alloc(fsize)
        printf("fsize")
        ReadFile(handle, addr this.buffor, fsize, 0, 0)

        printf(" OK %i ", fsize)

        //mov rax, [buffor1

        printf(" OK %f", this.buffor[1])

        return this.buffor
    }
    //ptr(){
    //    printf(" OK %f", this.buffor[7])
    //}
}



var tobj = new TestObj()

function start(){

    printf("start")

    tobj.constructor()

    printf("cnstr")
    //tobj.init()
    //mov qword ptr tobj,rax

    bufforA = tobj.read()

    //tobj.ptr()

    printf(" OK %i", bufforA)
    printf(" OK %f", tobj.buffor[1])

    //printf(" OK %i", tobj.buffor)

}