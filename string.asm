; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

    include \masm64\include64\masm64rt.inc

    include \masm64\include64\opengl32.inc
    include \masm64\include64\glu32.inc

    include \danger\include\opengl.inc
    include \danger\include\requires.inc

    includelib \masm64\lib64\opengl32.lib
    includelib \masm64\lib64\glu32.lib

    include \danger\include\extern.inc

    include \danger\include\math.asm

    .data

        teA db "test tekst",0
        teB db "test tekst",0
        sep db "e",0

        fromA dq 2
        toA dq 4

    .code

; ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤

StringLength macro text
    LOCAL loop11

    lea rcx, text

    mov rbx, 0
    loop11:
        add rbx, 1
        cmp byte ptr [rcx+rbx],0
        jne loop11

    
    mov rax,rbx
endm

StringCompare macro textA, textB
    LOCAL end11
    LOCAL end44
    LOCAL end1111

    invoke CompareString, 0, 0, addr textA, -1, addr textB, -1

    mov rbx,rax
    mov rax,0
    cmp rbx,2
    jz end44
    end11:
        mov rbx,0
        jmp end1111
    end44:
        mov rbx,1
    end1111:

    mov rax,rbx

endm



entry_point proc

    ;invoke printf, "%s ", addr text1

    StringLength teA
    invoke printf, "%i", rax

    StringCompare teA, teB
    invoke printf, "%i", rax


    invoke ExitProcess,0

    ret

entry_point endp


    end
