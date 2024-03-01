

.data
var troneptr1X = -\\1.0
var troneptr1Y = 1.0
var fntOffsetX = 0.0
var fntDefWidth = 0.1
var fnMaxWidth = 64.0
var newfntOffsetX = 0.0
var fntOffsetX22 = 0.0
var fntDefFactrrX = 1.953

function DrawLetter(number){

            mov numLtr1,number

                
            lea rax,widthsFnt
            //mov rcx,number
            imul rcx,8
            mov rax,[rax\\+\\rcx]
            mov wiid,rax
            //wiid = widthsFnt[number]
            printf('wiid %f %s',wiid,lf)

            mat4.identity(matrix1)
            mat4.translate(matrix1,matrix1,translate1)
            mat4.scale(matrix1,matrix1,scale1)




            //fild qword ptr wiid
            //fdiv qword ptr fnMaxWidth
            //fstp qword ptr fntOffsetX
            Math_podziel(wiid,fnMaxWidth,fntOffsetX)

            printf('%f %s',fntOffsetX,lf)

            Math_pomnoz(fntOffsetX,fntDefWidth,newfntOffsetX)

            printf('ff %f %s',newfntOffsetX,lf)
            
            //Math_pomnoz(newfntOffsetX,fntDefFactrrX,fntOffsetX22)

            Math_pomnoz(fntDefFactrrX,newfntOffsetX,newfntOffsetX)

            printf('%f %s',newfntOffsetX,lf)



            RenderLetter(numLtr1)
            

            Math_dodaj(translate1[0],newfntOffsetX,translate1[0])

            printf('tt %f %s',translate1[0],lf)

            //translate1[0] = fntOffsetX22




        }

function RenderLetter(number){

                mov rax\\,n\\umber
                mov qword ptr tmpNumber11,rax

                cSHADER_SetUniform1i(shader1, 'fontIndex', tmpNumber11)

                cSHADER_SetUniform1d(shader1, 'fontWidth', wiid)
            
                cSHADER_SetUniformMatrix(shader1, 'projection', projection)
                cSHADER_SetUniformMatrix(shader1, 'camera', camera)
                cSHADER_SetUniformMatrix(shader1, 'model', matrix1)



                

                cMODEL_ModelRender(pModel)

            }
            
function PrintOutAllText(text11){
            
            mov rdi, 0
            mov RDIptr,rdi

            .loop11:
                MOV RCX, offset text11
                mov rax,RDIptr
                mov rdi,rax
                ADD RCX, rdi
            
                MOV DL, byte ptr [rcx]
                MOVZX RBX, DL

                mov rax,0
                cmp RBX,rax
                je .endo11

                mov rax,rbx
                //push rcx
                //PrintLetter(rax)
                //rcall callback11, rax
                //printf('letter %i %s',rax,lf)
                mov rcx,rbx
                DrawLetter(rax)
                //pop rcx

                //mov rdi,1
                add RDIptr,1

                jmp .loop11
            .endo11:

        }

    

 .data
    widthsFnt d\\q 7.0,49.0,0.0,49.0,49.0,49.0,49.0,    
        dq 49.0,49.0,16.0,16.0,16.0,16.0,16.0,    
        dq 49.0,49.0,49.0,49.0,49.0,49.0,49.0,    
        dq 49.0,49.0,49.0,49.0,49.0,49.0,49.0,    
        dq 49.0,49.0,49.0,49.0,16.0,21.0,26.0,    
        dq 32.0,32.0,53.0,49.0,11.0,21.0,21.0,    
        dq 32.0,36.0,16.0,21.0,16.0,17.0,32.0,    
        dq 32.0,32.0,32.0,32.0,32.0,32.0,32.0,    ;1234567
        dq 32.0,32.0,17.0,17.0,36.0,36.0,36.0,    ;89
        dq 28.0,58.0,42.0,42.0,42.0,42.0,39.0,    ;  ABCDE
        dq 35.0,42.0,42.0, 21.0,24.0,42.0,39.0,    ;FGH IJKL
        dq 56.0,42.0,42.0,35.0,42.0,42.0,35.0,    ;MNOPQRS
        dq 39.0,42.0,42.0, 52.0,42.0,42.0,39.0,    ;TUV WXYZ
        dq 21.0,17.0,21.0,30.0,32.0,21.0,28.0,    ;      a
        dq 32.0,28.0,32.0,28.0,21.0,32.0,32.0,    ;bcdefgh
        dq 17.0,17.0,32.0,17.0,49.0,32.0,32.0,    ;ijklmno
        dq 32.0,32.0,21.0,24.0,17.0,32.0,32.0,    ;pqrstuv
        dq 46.0,32.0,32.0,28.0,30.0,12.0,30.0,    ;wxyz   
        dq 34.0,32.0,49.0,49.0,49.0,49.0,49.0,     
        dq 49.0,49.0,49.0,49.0,49.0,49.0,49.0,     
        dq 49.0,49.0,49.0,49.0,49.0,49.0,49.0,     
        dq 49.0,49.0,49.0,49.0,49.0,49.0,49.0,     
        dq 49.0,49.0,49.0,49.0,49.0,49.0,16.0,     
        dq 21.0,32.0,32.0,32.0,32.0,12.0,32.0,     
        dq 21.0,48.0,17.0,32.0,36.0,0.0,48.0,     
        dq 32.0,25.0,35.0,19.0,19.0,21.0,36.0,     
        dq 29.0,21.0,21.0,19.0,19.0,32.0,48.0,    
        dq 48.0,48.0,28.0,46.0,46.0,46.0,46.0,    ;   ÀÁÂÃ
        dq 46.0,46.0,56.0,42.0,39.0,39.0,39.0,    ;ÄÅÆÇÈÉÊ
        dq 39.0,21.0,21.0,21.0,21.0,46.0,46.0,    ;ËÌÍÎÏÐÑ
        dq 46.0,46.0,46.0,46.0,46.0,36.0,46.0,    ;ÒÓÔÕÖ  
        dq 46.0,46.0,46.0,46.0,46.0,35.0,32.0,     
        dq 28.0,28.0,28.0,28.0,28.0,28.0,42.0,     
        dq 28.0,28.0,28.0,28.0,28.0,17.0,17.0,     
        dq 17.0,17.0,32.0,32.0,32.0,32.0,32.0,     
        dq 32.0,32.0,35.0,32.0,32.0,32.0,32.0,     
        dq 32.0,32.0,32.0,32.0
    
    