; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

    include \masm64\include64\masm64rt.inc

    include \masm64\include64\opengl32.inc
    include \masm64\include64\glu32.inc

    include \danger\include\opengl.inc
    include \danger\include\requires.inc

    includelib \masm64\lib64\opengl32.lib
    includelib \masm64\lib64\glu32.lib

    include \danger\include\extern.inc

    .data

        text1 db "test tekst",0
        indexWhile dq 10

    .data?
        obj dq ?

    .code

        testCLASS struct
            fieldA qword ?
            fieldB qword ?
        testCLASS ends

    .data?
        testObj label testCLASS
    .code
; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

testProcA proc adres
    ;lea rax, qword ptr adres
    invoke printf, "%s %i", "OK", adres
ret
testProcA endp

testProc proc adres
    invoke printf, "%s %i", "OK", adres
ret
testProc endp


entry_point proc


    lea rax, obj
    invoke printf, "%s %i", "OK", rax

    lea rax, obj
    rcall testProc, rax



    lea rax, testObj
    invoke printf, "%s %i", "OK", rax

    lea rax, testObj
    rcall testProcA, rax


    invoke ExitProcess,0

    ret

entry_point endp


    end
