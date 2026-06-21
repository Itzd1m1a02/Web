@echo off
title Projeto WEB - Gerenciador de Inicializacao (PRODUCAO)
echo ========================================
echo   Iniciando o Projeto Projeto WEB
echo   (FastAPI + React) - MODO PRODUCAO
echo ========================================
echo.

:: 1. Garante que estamos na pasta onde o .bat está salvo (pasta Server)
cd /d "%~dp0"

:: 2. Pre-flight Check: Verificando e instalando dependencias do Python
echo [CHECK] Verificando dependencias do Backend...
if exist "Backend\requirements.txt" (
    echo [INFO] Arquivo de requisitos encontrado. Garantindo instalacao...
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
echo [CHECK] Verificando .env do Backend...
if not exist "Backend\.env" (
    echo [AVISO] Arquivo .env nao encontrado na pasta Backend!
    echo [INFO] Copie o arquivo Backend\.env.example para Backend\.env e configure as variaveis.
    echo [INFO] Particularmente, GEMINI_API_KEY e SECRET_KEY devem ser configurados!
    pause
    exit /b
) else (
    echo [OK] Arquivo .env encontrado.
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
echo   Disparando Servidores (PRODUCAO)
echo ========================================

:: 3. Inicia o Backend (FastAPI) em uma NOVA janela com ENV=production
:: NOTE: Para producao real, considere usar PM2, systemd ou Docker!
start "Projeto WEB - Backend (PRODUCAO)" cmd /k "cd Backend && setlocal enabledelayedexpansion & set ENV=production & python main.py"

:: 4. Inicia o Frontend (React/Vite) em outra NOVA janela
:: NOTE: Para producao, use `npm run build` e sirva com um servidor HTTP (NGINX, Express, etc)
start "Projeto WEB - Frontend (PRODUCAO)" cmd /k "cd Frontend && npm run build"

echo.
echo [SUCESSO] Servidores iniciados em modo PRODUCAO!
echo [INFO] Backend (com ENV=production): http://localhost:8000
echo [INFO] Frontend: execute `npm run preview` para servir a build localmente
echo [AVISO] Para producao real, configure HTTPS, um reverse-proxy e considere usar Docker/Kubernetes!
timeout /t 3 >nul
exit
