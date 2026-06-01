@echo off
title Projeto WEB - Gerenciador de Inicializacao
echo ========================================
echo   Iniciando o Projeto Projeto WEB
echo   (FastAPI + React)
echo ========================================
echo.

:: 1. Garante que estamos na pasta onde o .bat está salvo (pasta Server)
cd /d "%~dp0"

:: 2. Pre-flight Check: Verificando e instalando dependencias do Python
echo [CHECK] Verificando dependencias do Backend...
if exist "Backend\requirements.txt" (
    echo [INFO] Arquivo de requisitos encontrado. Garantindo instalacao...
    :: O comando abaixo instala apenas o que falta, sem reinstalar o que ja existe
    python -m pip install -r "Backend\requirements.txt" --quiet
    if %errorlevel% neq 0 (
        echo [ERRO] Falha ao instalar dependencias. Verifique sua conexao ou o Python.
        pause
        exit /b
    )
    echo [OK] Dependencias verificadas.
) else (
    echo [AVISO] Arquivo requirements.txt nao encontrado na pasta Backend. 
    echo Pulando instalacao automatica...
)

echo.
echo [CHECK] Verificando dependencias do Frontend (node_modules)...
if not exist "Frontend\node_modules\" (
    echo [INFO] Pasta node_modules nao encontrada. Instalando dependencias do React...
    cd Frontend && npm install && cd ..
) else (
    echo [OK] node_modules ja existe.
)

echo.
echo ========================================
echo   Disparando Servidores...
echo ========================================

:: 3. Inicia o Backend (FastAPI) em uma NOVA janela
start "Projeto WEB - Backend" cmd /k "cd Backend && python main.py"

:: 4. Inicia o Frontend (React/Vite) em outra NOVA janela
start "Projeto WEB - Frontend" cmd /k "cd Frontend && npm run dev"

echo.
echo [SUCESSO] Tudo pronto!
timeout /t 3 >nul
exit