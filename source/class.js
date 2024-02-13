


class TestObj{
    constructor(){
        this.val = 234
        this.v = 23
    }
    ttt(){
        printf(" OK %i", this.v)
        this.tt2()
    }
    tt2(){
        printf(" 222 %i ", this.val)
    }
}

var tobj = new TestObj()

function start(){

    //mov tobj, alloc(16)

    tobj.constructor()
    tobj.ttt()

    printf(" TST %i ", tobj[0])

    //TestObj_constructor(tobj)
    //TestObj_ttt(tobj)

    printf("end")

}