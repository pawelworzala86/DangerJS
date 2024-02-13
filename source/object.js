


class TestObj{
    constructor(){
        this.val = 234
        this.v = 23
        //this.arr = [33,55]
    }
    ttt(){
        //this.val = 234
        //this.v = 23
        //printf("%s %i %s", "TTT ", this.val, "TEST")
        printf("OK %i",this.v)
        this.tstA()
    }
    tstA(){
        printf("OK")
    }
}

var tobj = new TestObj()

function start(){

    printf("start")

    tobj.constructor()
    tobj.ttt()

}