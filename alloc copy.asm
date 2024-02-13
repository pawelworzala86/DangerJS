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

        dataset dq ?
        testA dq 123

    .code

; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

entry_point proc

    mov dataset, alloc(1024)
    ;lea rax, rbx
    ;mov dataset, rax


    mov rax, dataset
    mov qword ptr [rax + 0], 11
    mov qword ptr [rax + 8], 11

    invoke printf, "TEST %i ", qword ptr [rax + 8]
    invoke printf, "TEST %i ", testA

    invoke ExitProcess,0

    ret

entry_point endp


    end
