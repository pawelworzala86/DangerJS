





    PIXELFORMATDESCRIPTOR STRUCT
        nSize             WORD      ?
        nVersion          WORD      ?
        dwFlags           DWORD      ?
        iPixelType        BYTE      ?
        cColorBits        BYTE      ?
        cRedBits          BYTE      ?
        cRedShift         BYTE      ?
        cGreenBits        BYTE      ?
        cGreenShift       BYTE      ?
        cBlueBits         BYTE      ?
        cBlueShift        BYTE      ?
        cAlphaBits        BYTE      ?
        cAlphaShift       BYTE      ?
        cAccumBits        BYTE      ?
        cAccumRedBits     BYTE      ?
        cAccumGreenBits   BYTE      ?
        cAccumBlueBits    BYTE      ?
        cAccumAlphaBits   BYTE      ?
        cDepthBits        BYTE      ?
        cStencilBits      BYTE      ?
        cAuxBuffers       BYTE      ?
        iLayerType        BYTE      ?
        bReserved         BYTE      ?
        dwLayerMask       DWORD      ?
        dwVisibleMask     DWORD      ?
        dwDamageMask      DWORD      ?
    PIXELFORMATDESCRIPTOR ENDS



    PFD_TYPE_RGBA                    equ 0
    PFD_TYPE_COLORINDEX              equ 1
    PFD_MAIN_PLANE                   equ 0
    PFD_OVERLAY_PLANE                equ 1
    PFD_UNDERLAY_PLANE               equ (-1)
    PFD_DOUBLEBUFFER                 equ 00000001h
    PFD_STEREO                       equ 00000002h
    PFD_DRAW_TO_WINDOW               equ 00000004h
    PFD_DRAW_TO_BITMAP               equ 00000008h
    PFD_SUPPORT_GDI                  equ 00000010h
    PFD_SUPPORT_OPENGL               equ 00000020h
    PFD_GENERIC_FORMAT               equ 00000040h
    PFD_NEED_PALETTE                 equ 00000080h
    PFD_NEED_SYSTEM_PALETTE          equ 00000100h
    PFD_SWAP_EXCHANGE                equ 00000200h
    PFD_SWAP_COPY                    equ 00000400h
    PFD_SWAP_LAYER_BUFFERS           equ 00000800h
    PFD_GENERIC_ACCELERATED          equ 00001000h
    PFD_SUPPORT_DIRECTDRAW           equ 00002000h
    PFD_DEPTH_DONTCARE               equ 20000000h
    PFD_DOUBLEBUFFER_DONTCARE        equ 40000000h
    PFD_STEREO_DONTCARE              equ 80000000h










    BITMAPFILEHEADER STRUCT
        bfType        dw ?
        bfSize        dd ?
        bfReserved1   dw ?
        bfReserved2   dw ?
        bfOffBits     dd ?
    BITMAPFILEHEADER ENDS
    BITMAPINFOHEADER STRUCT
        biSize          dd ?
        biWidth         dd ?
        biHeight        dd ?
        biPlanes        dw ?
        biBitCount      dw ?
        biCompression   dd ?
        biSizeImage     dd ?
        biXPelsPerMeter dd ?
        biYPelsPerMeter dd ?
        biClrUsed       dd ?
        biClrImportant  dd ?
    BITMAPINFOHEADER ENDS

BITMAPFILEHEADER STRUCT
  bfType        dw ?
  bfSize        dd ?
  bfReserved1   dw ?
  bfReserved2   dw ?
  bfOffBits     dd ?
BITMAPFILEHEADER ENDS
BITMAPINFOHEADER STRUCT
  biSize          dd ?
  biWidth         dd ?
  biHeight        dd ?
  biPlanes        dw ?
  biBitCount      dw ?
  biCompression   dd ?
  biSizeImage     dd ?
  biXPelsPerMeter dd ?
  biYPelsPerMeter dd ?
  biClrUsed       dd ?
  biClrImportant  dd ?
BITMAPINFOHEADER ENDS