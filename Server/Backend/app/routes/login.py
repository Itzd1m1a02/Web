# app/routes/login.py
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import cast

from ..security import criar_token_acesso, ACCESS_TOKEN_EXPIRE_MINUTES, verificar_senha
from ..schemas.login import UserLogin, Token
# from ..models.user import User  # removed unused import
from ..database import get_db
from ..repositories.login import LoginRepository

router = APIRouter(prefix="/api", tags=["Autenticação"])

@router.post("/Login", response_model=Token)
def login(dados: UserLogin, db: Session = Depends(get_db)):
    

    # 1. VERIFICAÇÃO DO ADMINISTRADOR PADRÃO (Não acessa o BD)
    if dados.email.strip().lower() == "teste@teste.com" and dados.senha == "289160db0d9f39f9ae1754c4ec9c16f90b50e32e09c5fb5481ae642b3d3d1a36":
        access_token = criar_token_acesso(
            data={"sub": dados.email, "id": 0},
            expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        )
        
        return Token(access_token=access_token, token_type="bearer", usuario="teste")

    # 2. FLUXO NORMAL PARA USUÁRIOS COMUNS (Acessa o BD)
    repo = LoginRepository(db)
    usuario_db = repo.buscar_por_email(dados.email)
    
    if not usuario_db or not verificar_senha(dados.senha, cast(str, usuario_db.senha)):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Email ou senha incorretos")

    access_token = criar_token_acesso(
        data={"sub": usuario_db.email, "id": usuario_db.id},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )

    return Token(access_token=access_token, token_type="bearer", usuario=str(usuario_db.usuario))

# Arquivo recriado e salvo com sucesso!