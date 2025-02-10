powershell -NoProfile -NoLogo "New-Item -ItemType Directory -Path ${env:USERPROFILE}/.aws -Force | Out-Null"
@REM powershell -NoProfile -NoLogo "Write-Output $null >> ${env:USERPROFILE}/.aws/config"