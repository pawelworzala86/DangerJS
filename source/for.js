import 'math.js'

var indexFor = 0
var ForEnd = 10
var StepFor = 1

function tst(){

    /*while(indexFor<ForEnd){
        indexFor = indexFor + StepFor
        printf("%s", "OK")
    }*/

    for(indexFor = 0;indexFor<ForEnd;indexFor = indexFor + StepFor){
        printf("%s", "OK")
    }

}

function start(){

    tst()

}