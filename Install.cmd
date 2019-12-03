:: ===================================================================================================
:: This command file is used to add a new menu item: "Chrome HTML Document" to the existing right-click  
:: context menu item: "New" which is built into Windows Explorer.
::
:: Double-click this command file to have the new context menu automatically added along with all the   
:: dependencies installed to the PC.
::
:: (c) 2013-2019 SokoolTools
:: ===================================================================================================
@echo off

net session >nul 2>&1
if errorlevel 1 (
	echo ^(This command file needs to be run as an administrator!^)
	echo.
	goto:error
)

set installDir=%ProgramFiles(x86)%\SokoolTools\New Html Document\

if not exist "%installDir%" mkDir "%installDir%"
if not exist "%installDir%" goto:error

xcopy/r/s/y "%~dp0*.*" "%installDir%" >NUL

del/q "%installDir%Install.cmd"

echo Windows Registry Editor Version 5.00> install.reg
echo [HKEY_CLASSES_ROOT\.htm\ShellNew]>> install.reg
echo "FileName"="C:\\Program Files (x86)\\SokoolTools\\New Html Document\\New HTML Document.htm">> install.reg

if exist install.reg (
	regedit.exe/s install.reg
	if %errorlevel%==0 (
		@echo.
		@echo Installation was successful!
		@echo.
		del/q install.reg
		pause
		goto:EOF
	)
	del/q install.reg
)
:error
@echo Installation was NOT successful!
pause

