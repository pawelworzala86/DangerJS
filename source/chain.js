

class CElement{
    constructor(){
        this.valA = 2344
        this.valB = 2453
    }
}

function ProcCreateElement(){
    LOCAL elem:CElement
    CElement_constructor(elem)
    printf('element %i',elem.valB)
}

function start(){
    ProcCreateElement()
    printf('end ')
}