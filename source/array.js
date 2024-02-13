
var array = 0

var idx = 1

function start(){

    mov array, alloc(16)

    mov array[0], alloc(16)
    mov array[1], alloc(16)

    array[0][1] = 333
    array[1][0] = 44

    printf('%i', array[0][1])

    printf("end")

}