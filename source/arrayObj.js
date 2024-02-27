
class TestClass{
    constructor(){
        this.valA = 2344
        this.array = 0
        this.valB = 666
    }
    print(){
        mov this.array, alloc(128)
        mov this.array[0], 11
        mov this.array[1], 11

        mov rax,this.valB
        printf('valB %i', rax)
    }
}

var obj = new TestClass(100)

function start(){

    obj[0].print()

    printf('OK ')

}