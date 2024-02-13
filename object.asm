include \masm64\include64\masm64rt.inc
include \masm64\include64\opengl32.inc
include \masm64\include64\glu32.inc

include \danger\include\opengl.inc
include \danger\include\requires.inc

includelib \masm64\lib64\opengl32.lib
includelib \masm64\lib64\glu32.lib

include \danger\include\extern.inc

.data?

mth1 dq ?

prm1 dq ?
prm2 dq ?
prm3 dq ?
prm4 dq ?

.code





.data
numA dq 2134
.code

.data
numB dq 2134.45
.code



.data
arraA dq 12,224,34
.code



.data
textA db "test",0
.code





TestObj STRUCT
            val QWORD ?
        TestObj ENDS
        .code
    TestObj_ttt proc self:QWORD
    


        mov qword ptr self + 0 , 234

        invoke printf, "%s %i %s", "TTT ", qword ptr self + 0, "TEST"

        rcall TestObj_tst2, qword ptr self

    

        ret
    TestObj_ttt endp
    .data

.code
    TestObj_tst2 proc self:QWORD
    


        invoke printf, " OK %i", qword ptr self + 0

    

        ret
    TestObj_tst2 endp
    .data




    tobj label TestObj2



.code
    entry_point proc 
    
rcall defaultContructors




    

    rcall TestObj2_ttt, qword ptr tobj



invoke ExitProcess, 0

        ret
    entry_point endp
    .data
.code

defaultContructors proc
    mov rax,1
    
    ret
defaultContructors endp

    end
