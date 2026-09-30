@echo off
chcp 65001 >nul
cd /d "C:\Users\falsp\Projeto-NC"

:: Detecta ano atual e garante que as pastas existem
for /f "tokens=2 delims==" %%a in ('wmic os get localdatetime /value') do set dt=%%a
set ANO=%dt:~0,4%

if not exist "Arquivos\%ANO%\ADP" mkdir "Arquivos\%ANO%\ADP"
if not exist "Arquivos\%ANO%\RM"  mkdir "Arquivos\%ANO%\RM"

:: Adiciona e commita ADP e RM
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
