; Definicja struktury
MyStruct STRUCT
    field1 DWORD ?
    field2 DWORD ?
MyStruct ENDS

.DATA
    ; Definicja tablicy struktur
    myArray MyStruct 10 DUP({0, 0})

.CODE
main PROC
    ; Inicjalizacja elementów tablicy
    mov myArray[0].field1, 1
    mov myArray[0].field2, 2
    ; ...
    ret
main ENDP
END main