
class TestClass{
    constructor(){
        this.valA = 2344
        this.array = 0
        this.valB = 666
        this.lastIdx = 0
    }
    init(){
        this.constructor()
        mov this.array, alloc(128)
    }
    set(value){
        mov rbx, this.lastIdx
        this.lastIdx++
        mov rax, value
        mov rcx, qword ptr this.array
        mov qword ptr [rcx+rbx], rax
        return rbx
    }
    get(index){
        mov rbx, index
        mov rcx, qword ptr this.array
        mov rax, qword ptr [rcx+rbx]
    }
}

var obj = new TestClass()

var tmp = 0
var val = 4545
var idx = 0

function start(){

    obj.init()

    idx = obj.set(val)

    tmp = obj.get(idx)

    printf('OK %i',tmp)

    printf(' %i',obj.valB)

}