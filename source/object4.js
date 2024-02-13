

var numA = 2134
var numB = 2134.45

var arraA = [12,224,34]

var textA = 'test'


var file1 = 'model2.bin'
var buffor1 = 0
var fsize = 0
var handle = 0


class TestObj{
    constructor(){
        this.val = 234
        this.buffor = 0
    }
    init(){
        this.val = 234
        //this.constructor()
        return qword ptr this
    }
    init2(){
        this.val = 23422
        //this.constructor()
        return qword ptr this
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
        handle = CreateFile(addr file1, GENERIC_READ,0,0,OPEN_EXISTING,FILE_ATTRIBUTE_NORMAL, 0)
        fsize = GetFileSize(handle, 0)
        this.buffor = alloc(8)
        ReadFile(handle, addr this.buffor, 8, 0, 0)

        printf(" OK %i ", fsize)

        //mov rax, [buffor1

        printf(" OK %i", this.buffor)
    }
}



var tobj = new TestObj()

function start(){

    //tobj.constructor()

    tobj.init()
    mov qword ptr tobj,rax

    tobj.read()

}