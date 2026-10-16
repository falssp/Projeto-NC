@echo off
chcp 65001 >nul

set REPO=C:\Users\falsp\Projeto-NC
set ORIGEM=C:\Users\falsp\OneDrive\Documentos\Profissional\Stormx\Unilever

:: Ano atual
for /f "tokens=2 delims==" %%a in ('wmic os get localdatetime /value') do set dt=%%a
set ANO=%dt:~0,4%

:: Garante que as pastas de destino existem no repo
if not exist "%REPO%\Arquivos\%ANO%\ADP" mkdir "%REPO%\Arquivos\%ANO%\ADP"
if not exist "%REPO%\Arquivos\%ANO%\RM"  mkdir "%REPO%\Arquivos\%ANO%\RM"

:: Copia arquivos novos do OneDrive para o repo (não sobrescreve existentes)
xcopy "%ORIGEM%\%ANO%\ADP\*" "%REPO%\Arquivos\%ANO%\ADP\" /S /Y /D
xcopy "%ORIGEM%\%ANO%\RM\*"  "%REPO%\Arquivos\%ANO%\RM\"  /S /Y /D

:: Commit e push
cd /d "%REPO%"
git add "Arquivos\%ANO%\ADP\" "Arquivos\%ANO%\RM\"
git diff --cached --quiet
if %errorlevel%==0 (
    echo Nenhum arquivo novo para subir.
    pause
    exit /b
)

git commit -m "chore: sync ADP/RM %ANO% - %date%"
git push

echo.
echo Concluido! Arquivos enviados com sucesso.
pause
