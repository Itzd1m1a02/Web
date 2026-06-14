# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from .routes.login import router as login_router
from .routes.cadastro import router as cadastro_router
from .routes.tarefas import router as tarefas_router
from .routes.ia import router as ia_router
from .database import Base, engine
from .models.user import User # type: ignore
from .models.tarefa import Tarefa # type: ignore

# Cria as tabelas no banco de dados
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API Biscoito",
    description="Sistema de Rotinas Inteligentes",
    version="1.0.0"
)

# Configuração do CORS para o seu React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Em produção, coloque o IP do seu front aqui
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Redireciona a raiz para a documentação da API
@app.get("/", include_in_schema=False)
async def root():
    return RedirectResponse(url="/docs")

# Incluímos as rotas de autenticação e tarefas
app.include_router(login_router)
app.include_router(cadastro_router)
app.include_router(tarefas_router)
app.include_router(ia_router)
