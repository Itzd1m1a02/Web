# app/routes/cadastro.py
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session

from ..schemas.cadastro import UserRegister
from ..models.user import User
from ..database import get_db
from ..repositories.cadastro import CadastroRepository 
from ..security import obter_hash_senha

router = APIRouter(prefix="/api", tags=["Autenticação"])

@router.post("/Cadastro", status_code=status.HTTP_201_CREATED)
async def cadastro(dados: UserRegister, db: Session = Depends(get_db)):
    
    repo = CadastroRepository(db)
    
    # 1. Usando o repo para verificar se o e-mail existe
    if repo.buscar_por_email(dados.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Este e-mail já está cadastrado."
        )

    senha_segura = obter_hash_senha(dados.senha)

    novo_usuario = User(
        usuario=dados.usuario,
        email=dados.email,
        senha=senha_segura,
        nascimento=dados.nascimento
    )

    # 2. Usando o repo para salvar
    repo.salvar_novo_usuario(novo_usuario)

    return {"mensagem": f"Usuário {novo_usuario.usuario} criado com sucesso!"}

# Arquivo recriado e salvo com sucesso!