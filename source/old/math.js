
var stp1 = 0
var stp2 = 0

var mth1 = 0.0
var mth2 = 0.0
var mth3 = 0.0
var mth4 = 0.0
var mth5 = 0.0
var mth6 = 0.0
var mth7 = 0.0
var mth8 = 0.0

function Macro_Math_pomnoz(aram11,aram22,aret33){
    fld qword ptr aram11
    fmul qword ptr aram22
    fstp qword ptr aret33
}

function Macro_Math_dodaj(aram11,aram22,aret33){
    fld qword ptr aram11
    fadd qword ptr aram22
    fstp qword ptr aret33
}

function Macro_Math_podziel(aram11,aram22,aret33){
    fld qword ptr aram11
    fdiv qword ptr aram22
    fstp qword ptr aret33
}

function Macro_Math_odejmnij(aram11,aram22,aret33){
    fld qword ptr aram11
    fsub qword ptr aram22
    fstp qword ptr aret33
}



function Macro_iMath_pomnoz(aram11,aram22,aret33){
    mov rax, qword ptr aram11
    imul rax, qword ptr aram22
    mov qword ptr aret33, rax
}

function Macro_iMath_dodaj(aram11,aram22,aret33){
    mov rax, qword ptr aram11
    add rax, qword ptr aram22
    mov qword ptr aret33, rax
}

function Macro_iMath_podziel(aram11,aram22,aret33){
    mov rax, qword ptr aram11
    idiv rax, qword ptr aram22
    mov qword ptr aret33, rax
}

function Macro_iMath_odejmnij(aram11,aram22,aret33){
    mov rax, qword ptr aram11
    isub rax, qword ptr aram22
    mov qword ptr aret33, rax
}



function Macro_Math_sin(aram11,aret33){
    fld qword ptr aram11
    fsin
    fstp qword ptr aret33
}

function Macro_Math_cos(aram11,aret33){
    fld qword ptr aram11
    fcos
    fstp qword ptr aret33
}

function Macro_Math_sqrt(aram11,aret33){
    fld qword ptr aram11
    fsqrt
    fstp qword ptr aret33
}


function Macro_Math_tan(aram11,aret33){
    Macro_Math_sin(aram11,stp1)
    Macro_Math_cos(aram11,stp2)
    fld qword ptr stp1
    fdiv qword ptr stp2
    fstp qword ptr aret33
}

function Macro_Math_Deg2Rad(aram11,aret33){
    fld qword ptr aram11
    fmul qword ptr deg2rad
    fstp qword ptr aret33
}