
    include \danger\include\utils.inc



    includelib \masm64\lib64\msvcrt.lib
    externdef scanf: near
    externdef printf: near
    externdef fopen: near
    externdef fwrite: near
    externdef fclose: near
    externdef fseek: near
    externdef ftell: near
    externdef rewind: near
    externdef fread: near
    externdef free: near
    externdef getchar: near
    externdef system: near
    externdef strlen: near
    externdef exit: near
    externdef sprintf: near
    externdef fgetc: near
    externdef getch: near
    externdef strcpy: near
    externdef strcat: near
    externdef atof: near
    externdef atol: near
    externdef atoi: near
    externdef ftoa: near
    externdef strtok: near
    externdef fgets: near
    externdef memset: near
    ;externdef malloc: near
    ;externdef relloc: near



    externdef wglGetProcAddress: near
    


    includelib \danger\include\FreeImage.lib
    externdef FreeImage_OpenMemory: near
    externdef FreeImage_LoadFromMemory: near
    externdef FreeImage_GetWidth: near
    externdef FreeImage_GetHeight: near
    externdef FreeImage_GetBits: near
    externdef FreeImage_ConvertTo32Bits: near
    externdef FreeImage_GetFormatFromFIF: near
    externdef FreeImage_LoadFromHandle: near
    externdef FreeImage_Initialise: near
    externdef FreeImage_Load: near
    externdef FreeImage_GetFileType: near
    externdef FreeImage_GetFileTypeFromMemory: near
    externdef FreeImage_LoadFromMemory: near
    externdef FreeImage_DeInit: near
    externdef FreeImage_Unload: near


    externdef InternetOpen: near
    externdef InternetConnect: near
    externdef HttpOpenRequest: near
    externdef HttpSendRequest: near
    externdef InternetReadFile: near
    externdef InternetCloseHandle: near
    
    