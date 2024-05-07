
class TestClass{
    constructor(){
        this.valA = 2344
        this.array = 0
        this.valB = 666
    }
    set(val){
        this.array = val
    }
}

var objA = new TestClass()
var objB = new TestClass()
var objC = new TestClass()

function start(){

    objB.set(100)
    objC.set(222)

    qword ptr objA = qword ptr objC
    printf(' OK %i ', objA.array)

    qword ptr objA = qword ptr objB
    printf(' OK %i ', objA.array)

    qword ptr objA = qword ptr objC
    printf(' OK %i ', objA.array)

}