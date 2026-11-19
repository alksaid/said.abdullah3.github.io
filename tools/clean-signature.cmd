@echo off
setlocal
set "NODE=%LOCALAPPDATA%\Programs\cursor\resources\app\resources\helpers\node.exe"
if not exist "%NODE%" (
  echo Node Cursor tidak ditemukan:
  echo %NODE%
  pause
  exit /b 1
)
"%NODE%" "%~dp0clean-signature.js"
if errorlevel 1 (
  echo.
  echo Gagal membersihkan tanda tangan.
  pause
  exit /b 1
)
echo.
echo Selesai. assets\images\signature-me.png sekarang berlatar transparan.
echo Foto asli disimpan sebagai assets\images\signature-me-original.png
pause
