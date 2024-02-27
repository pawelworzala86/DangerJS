
class TestClass{
    constructor(){
        this.valA = 2344
        this.valB = 666
    }
    print(){
        mov rax,this.valB
        printf('valB %i', rax)
    }
}

var obj = new TestClass(100)

function start(){

    obj[0].print()

    printf('OK ')

}