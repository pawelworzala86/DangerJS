


class TestObj{
    constructor(){
        this.val = 234
        this.v = 23
    }
    ttt(prop){
        this.val = prop
        //printf(" OK %i", this.v)
        //this.tt2()
    }
    t(){
        this.val = 23
    }
    ttA(){
        printf(" 4554 %i ", this.val)
    }
}

var tobj = new TestObj()

var array = new TestObj()

var propA = 12
var propB = 233

function start(){

    mov array, alloc(32) //2+2

    array[1].constructor()
    array[1].ttt(propA)
    array[1].ttA()
    //TestObj_constructor(array[1])
    //TestObj_ttt(array[1],propA)
    //TestObj_ttA(array[1])

    //array[0] = tobj

    //TestObj_constructor(array[0])
    //TestObj_ttt(array[0])

    //mov tobj, alloc(16)
    array[2].constructor()
    array[2].ttt(propB)
    array[2].ttA()
    //TestObj_constructor(array[2])
    //TestObj_ttt(array[2],propB)
    //TestObj_ttA(array[2])

    //tobj = array[0]

    //tobj.ttA()
    array[1].ttA()

    printf("end")

}