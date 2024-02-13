

var numA = 2134
var numB = 2134.45

var arraA = [12,224,34]

var textA = 'test'


class TestObj{
    constructor(){
        this.val = 234
        //this.vaBB = 55
    }
    init(){
        this.val = 234
        //this.constructor()
        return this
    }
    init2(){
        this.val = 23422
        //this.constructor()
        return this
    }
    ttt(){
        //this.val = 356
        printf("%s %i %s", "TTT ", this.val, "TEST")
        this.tst2()
    }
    tst2(){
        printf(" OK %i", this.val)
    }
}

var tobj = new TestObj()

function start(){

    //tobj.constructor()

    tobj = tobj.init()

    tobj.ttt()

    tobj.init2()

    tobj.ttt()

}