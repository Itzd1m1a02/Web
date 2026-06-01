from fastapi import Request, Response
from typing import Callable, Awaitable
import time

# Assinamos que a função recebe uma Request, um call_next (que é uma função assíncrona), e retorna uma Response
async def tempo_de_processamento_middleware(
    request: Request, 
    call_next: Callable[[Request], Awaitable[Response]]
) -> Response:
    
    # 1. Antes da Rota: Marca o relógio
    tempo_inicio = time.time()
    
    # 2. Deixa a requisição seguir para as Rotas (Login, Cadastro, etc)
    response = await call_next(request)
    
    # 3. Depois da Rota: Calcula o tempo gasto
    tempo_total = time.time() - tempo_inicio
    print(f"[LOG] A rota {request.url.path} demorou {tempo_total:.4f} segundos.")
    
    # Adiciona essa informação no cabeçalho invisível da resposta
    response.headers["X-Process-Time"] = str(tempo_total)
    
    return response