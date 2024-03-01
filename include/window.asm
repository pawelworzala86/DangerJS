

    ;.data
       ; EOL db 13,10,0

    .code


    ;{{CODE}}



    SCREEN STRUCT
        itop QWORD 0
        ileft QWORD 0
        iwidth QWORD 0
        iheight QWORD 0
        fwidth REAL8 0
        fheight REAL8 0
    SCREEN ENDS

    MOUSE STRUCT
        posX QWORD 0
        posY QWORD 0
    MOUSE ENDS



    .data?
      hInstance dq ?
      hWnd      dq ?
      hIcon     dq ?
      hCursor   dq ?
      sWid      dq ?
      sHgt      dq ?
      hBrush    dq ?
      
      hDC	dq	?
      hRC	dq	?
      w dd ?
      h dd ?
      ps dd ?

      texture		dq ?
      texID dq ?

      ;{{BBS}}


    .data
      classname db "worzala_scene_class",0
      caption db "WooRrrZala SceNeeE",0

      mbtitle db "WooRrrZala SceNeeE",0
      mbtext db "WooRrrZala SceNeeE MessageBox",0
      pttl dq mbtitle
      ptxt dq mbtext

    screen label SCREEN
      ileft   dq  32
      itop    dq  32
      iwidth  dq  1280
      iheight dq  840
      fwidth  dq  1280.0
      fheight dq  840.0

    mouse label MOUSE
      posX dq 0
      posY dq 0



  WINDOWWIDTH  equ 440
  WINDOWHEIGHT equ 400


  PixFrm  label	PIXELFORMATDESCRIPTOR 
	  nSize             dw	sizeof PIXELFORMATDESCRIPTOR
  	nVersion          dw	1
  	dwFlags           dd	PFD_SUPPORT_OPENGL or PFD_DOUBLEBUFFER or PFD_DRAW_TO_WINDOW ;
  	iPixelType        db	PFD_TYPE_RGBA
  	cColorBits        db	32;Select Our Color Depth
  	cRedBits          db	0
  	cRedShift         db	0
  	cGreenBits        db	0
  	cGreenShift       db	0
  	cBlueBits         db	0
  	cBlueShift        db	0;Color Bits Ignored
  	cAlphaBits        db	0;No Alpha Buffer
  	cAlphaShift       db	0;Shift Bit Ignored
  	cAccumBits        db	0;No Accumulation Buffer
  	cAccumRedBits     db	0
  	cAccumGreenBits   db	0
  	cAccumBlueBits    db	0
  	cAccumAlphaBits   db	0;Accumulation Bits Ignored
  	cDepthBits        db	16;16Bit Z-Buffer (Depth Buffer)
  	cStencilBits      db	0;No Stencil Buffer
  	cAuxBuffers       db	0;No Auxiliary Buffer
  	iLayerType        db	PFD_MAIN_PLANE;Main Drawing Layer
  	bReserved         db	0;Reserved
  	dwLayerMask       dd	0
  	dwVisibleMask     dd	0
  	dwDamageMask      dd	0;Layer Masks Ignored


      _title db 'OpenGL example',0
      _class db 'FASMOPENGL32',0





    .code



entry_point proc

    ;GdiPlusBegin                    ; initialise GDIPlus

    mov hInstance, rvcall(GetModuleHandle,0)
    mov hIcon,     rvcall(LoadIcon,hInstance,10)
    mov hCursor,   rvcall(LoadCursor,0,IDC_ARROW)
    ;mov sWid,      rvcall(GetSystemMetrics,SM_CXSCREEN)
    ;mov sHgt,      rvcall(GetSystemMetrics,SM_CYSCREEN)
    ;mov hBrush,    rvcall(CreateSolidBrush,00C4C4C4h)

    rcall main

    ;GdiPlusEnd                      ; GdiPlus cleanup

    rcall ExitProcess,0

    ret

entry_point endp

;    .data?
  ;      arr dq ?
  ;      hThread dq ?
 ;   .code

;TestThread PROC
   ; invoke printf,"THREDED %s",lf
   ; ret
;TestThread ENDP

main proc

    LOCAL wc      :WNDCLASSEX
    ;LOCAL lft     :QWORD
    ;LOCAL top     :QWORD
    ;LOCAL wid     :QWORD
    ;LOCAL hgt     :QWORD



       ; //await TestThread()
        ;mov hThread, rv(CreateThread,0,0, addr TestThread,addr arr,0,0)
        ;fn SleepEx,1,0



    mov wc.cbSize,         SIZEOF WNDCLASSEX
    mov wc.style,          CS_BYTEALIGNCLIENT or CS_BYTEALIGNWINDOW
    mov wc.lpfnWndProc,    ptr$(WndProc)
    mov wc.cbClsExtra,     0
    mov wc.cbWndExtra,     0
    mrm wc.hInstance,      hInstance
    mrm wc.hIcon,          hIcon
    mrm wc.hCursor,        hCursor
    mrm wc.hbrBackground,  hBrush
    mov wc.lpszMenuName,   0
    mov wc.lpszClassName,  ptr$(classname)
    mrm wc.hIconSm,        hIcon

    lea rcx, wc
    call RegisterClassEx

    ;mov wid, rvcall(getpercent,sWid,65)     ; 65% screen width
    ;mov hgt, rvcall(getpercent,sHgt,65)     ; 65% screen height

    ;rcall aspect_ratio,hgt,45               ; height + 45%
    ;cmp wid, rax                            ; if wid > rax
    ;jle @F
    ;mov wid, rax                            ; set wid to rax
  ;@@:
    ;mov rax, sWid                           ; calculate offset from left side
    ;sub rax, wid
    ;shr rax, 1
    ;mov lft, rax

    ;mov rax, sHgt                           ; calculate offset from top edge
   ; sub rax, hgt
    ;shr rax, 1
    ;mov top, rax

  ; ---------------------------------
  ; centre window at calculated sizes
  ; ---------------------------------
    invoke CreateWindowEx,WS_EX_LEFT or WS_EX_ACCEPTFILES, \
                          ADDR classname,ADDR caption, \
                          WS_VISIBLE or WS_OVERLAPPEDWINDOW or WS_CLIPCHILDREN or WS_CLIPSIBLINGS,\
                          screen.ileft,screen.itop,\
                          screen.iwidth,screen.iheight,\
                          0,0,hInstance,0
    mov hWnd, rax

    call msgloop

    ret

main endp



msgloop proc

    LOCAL msg    :MSG
    LOCAL pmsg   :QWORD

    mov pmsg, ptr$(msg)                     ; get the msg structure address
    jmp gmsg                                ; jump directly to GetMessage()

  mloop:
    rcall TranslateMessage,pmsg
    rcall DispatchMessage,pmsg
  gmsg:
    test rax, rvcall(GetMessage,pmsg,0,0,0) ; loop until GetMessage returns zero
    jnz mloop

    ret

msgloop endp



WndProc proc hWin:QWORD,uMsg:QWORD,wParam:QWORD,lParam:QWORD

    LOCAL dfbuff[260]:BYTE
    LOCAL pbuff :QWORD

    .switch uMsg
      .case WM_COMMAND
        .switch wParam
          .case 200
            rcall SendMessage,hWin,WM_SYSCOMMAND,SC_CLOSE,NULL
          .case 300
            invoke MsgboxI,hWin, \
                   "Wickedly Crafted In Microsoft Assembler (MASM)", \
                   "About rcall and rvcall Test",MB_OK,10
        .endsw

      .case WM_CREATE
            ;rcall LoadMenu,hInstance,100
            ;rcall SetMenu,hWin,rax

            invoke	GetDC
            mov	hDC,rax

            lea	rdx,  [PixFrm]
            invoke	ChoosePixelFormat,hDC,rdx
 
            lea	r8d,  [PixFrm]
            invoke	SetPixelFormat,hDC,rax,r8d
    
            invoke	wglCreateContext,hDC
            mov	hRC,rax
    
            invoke	wglMakeCurrent,hDC,eax
            



            invoke	glEnable,GL_TEXTURE_2D
            invoke	glShadeModel,GL_SMOOTH


            rcall SystemInit

                ;invoke SetForegroundWindow, hWin


            .return 0

      ;.case WM_DROPFILES
      ;      mov pbuff, ptr$(dfbuff)
      ;      rcall DragQueryFile,wParam,0,pbuff,260
      ;      invoke MsgboxI,hWin,ADDR dfbuff,"Drop File Name",MB_OK,10

      .case WM_CLOSE
            rcall SendMessage,hWin,WM_DESTROY,0,0

      .case WM_DESTROY

            rcall SystemDestroy

            rcall PostQuitMessage,NULL

      .case WM_SIZE

            movzx	r8d,r9w
            mov	w,r8d
            shr	r9d,16
            mov	h,r9d
            invoke	glViewport,0,0;,640,640
            ;invoke	glMatrixMode,GL_PROJECTION
            ;invoke	glLoadIdentity
        
            ;movq	xmm3,constd100
            ;movq	xmm2,constd0_1
            ;cvtsi2sd xmm1,w
            ;cvtsi2sd xmm0,h
            ;divsd	xmm1,xmm0
            ;movq	xmm0,constd45
            ;invoke	gluPerspective
        
            ;invoke	glMatrixMode,GL_MODELVIEW
            ;invoke	glLoadIdentity

        .case WM_PAINT


            ;invoke GetCursorPos, dword ptr MyPoint
            ;mov rax, qword ptr MyPoint
            ;invoke printf, "MyPoint.x... %i %s", rax, lf

            ;lea	edx,ps
            ;invoke  BeginPaint

            rcall SystemRender
            
            ;invoke  glFlush

            invoke	SwapBuffers,hDC
            ;lea	edx,ps
            ;invoke  EndPaint,hWin

        .case WM_MOUSEMOVE

            movzx rax, word ptr lParam[0]
            mov mouse.posX, rax
            movzx rax, word ptr lParam[2]
            mov mouse.posY, rax
            ;invoke printf, "MyPoint.x... %i %i %s", mouse.posX, mouse.posY, lf


    .endsw

    rcall DefWindowProc,hWin,uMsg,wParam,lParam

    ret

WndProc endp



.data
    constd07 dd 0.7
    consta09 dd 0.9
    consta10 dd 1.0

