# Generate assets/documents/resume.pdf (requires Python + fpdf2)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

python -m pip install fpdf2 --quiet
python .\scripts\generate-resume-pdf.py

if (Test-Path .\assets\documents\resume.pdf) {
  Write-Host "OK: assets\documents\resume.pdf"
} else {
  Write-Host "Failed. Open assets\documents\resume.html in Edge/Chrome -> Print -> Save as PDF."
}
