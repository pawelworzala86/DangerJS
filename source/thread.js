

var aaa = 22

async function testF(){
    printf('%i',aaa)
    fn SleepEx,100,0              ; 1 timeslice delay
    testF()
}

function start(){
    testF()
    fn SleepEx,1000,0              ; 1 timeslice delay
}