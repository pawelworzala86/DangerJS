

IF ERRORLEVEL 1 GOTO koniec





ml64.exe /c %1.asm

link.exe /SUBSYSTEM:CONSOLE /MACHINE:X64 /ENTRY:entry_point /nologo /LARGEADDRESSAWARE %1.obj



IF ERRORLEVEL 1 GOTO koniec


del dist\%1.exe


copy .\%1.exe .\dist\%1.exe

del .\%1.exe
del .\%1.obj



cd dist
%1.exe
cd ..





:koniec