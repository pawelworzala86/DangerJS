; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

    include \masm64\include64\masm64rt.inc

    include \masm64\include64\opengl32.inc
    include \masm64\include64\glu32.inc

    include \dangerjs\include\opengl.inc

    includelib \masm64\lib64\opengl32.lib
    includelib \masm64\lib64\glu32.lib

    include \dangerjs\include\extern.inc

    include \dangerjs\include\math.asm

    .data

        teA db "test tekst",0
        teB db "test tekst",0
        sep db "e",0

        fromA dq 2
        toA dq 4

        samochod struct
            rok_produkcji qword ?  
            pojemnosc qword ?    
        samochod ends

        samochody samochod 10 dup({})

    .code

; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

TestFunc macro

    mov samochody[0].pojemnosc, 1600
    
    invoke printf, "end "

endm



entry_point proc

    ;invoke printf, "%s ", addr text1

    TestFunc


    invoke ExitProcess,0

    ret

entry_point endp


    end
