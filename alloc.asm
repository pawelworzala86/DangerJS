; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

    include \masm64\include64\masm64rt.inc

    include \masm64\include64\opengl32.inc
    include \masm64\include64\glu32.inc

    include \danger\include\opengl.inc
    include \danger\include\requires.inc

    includelib \masm64\lib64\opengl32.lib
    includelib \masm64\lib64\glu32.lib

    include \danger\include\extern.inc


    obj STRUCT
        dataset qword ?
        testA qword ?
    obj ENDS

    .data

        dataset dq ?
        testA dq 123

.data?
        objA label obj

    .code

; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

entry_point proc

    ;mov objA.testA, 123
    mov objA.dataset, alloc(1024)
    ;lea rax, rbx
    ;mov dataset, rax


    mov rax, objA.dataset
    mov qword ptr [rax + 0], 11
    mov qword ptr [rax + 8], 11
mov rax, objA.dataset
    invoke printf, "TEST %i ", qword ptr [rax + 8]
    invoke printf, "TEST %i ", objA.testA
    invoke printf, "TEST %i ", qword ptr [objA.dataset+0]

    invoke ExitProcess,0

    ret

entry_point endp


    end
