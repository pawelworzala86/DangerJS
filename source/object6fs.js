
import 'fs.js'





var fileA = 'model2.bin'

function start(){

    printf("start")

    //tobj.constructor()

    //printf("cnstr")
  

    file.readRile(&fileA)
    printf(" OK %i", file.buffor[0])
    printf(" OK %f", file.buffor[1])


    file.open(&fileA)
    file.read(8)
    printf(" OK %i", file.buffor[0])
    file.close()

    //printf(" OK %i", tobj.buffor)

}