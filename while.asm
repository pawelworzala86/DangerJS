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

    .code

; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤



entry_point proc


    .while1:
        dec indexWhile
        invoke printf, "%s", "OK"
        cmp indexWhile,0
        jnz .while1


    invoke ExitProcess,0

    ret

entry_point endp


    end
