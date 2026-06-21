# app/routes/login.py
from fastapi import APIRouter, HTTPException, status, Depends, Response
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import cast

from ..security import (
    criar_token_acesso,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    verificar_senha,
    COOKIE_SECURE,
    COOKIE_SAMESITE,
)
from ..schemas.login import UserLogin, Token
# from ..models.user import User  # removed unused import
from ..database import get_db
from ..repositories.login import LoginRepository

router = APIRouter(prefix="/api", tags=["Autenticação"])

@router.post("/Login", response_model=Token)
def login(dados: UserLogin, response: Response, db: Session = Depends(get_db)):
    access_token = None
    nome_usuario = ""

    repo = LoginRepository(db)
    usuario_db = repo.buscar_por_email(dados.email)
    
    if not usuario_db or not verificar_senha(dados.senha, cast(str, usuario_db.senha)):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    access_token = criar_token_acesso(
        data={"sub": usuario_db.email, "id": usuario_db.id},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    nome_usuario = usuario_db.usuario

    # COOKIES HTTPONLY
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        secure=COOKIE_SECURE,
        samesite=COOKIE_SAMESITE,
        max_age=ACCESS_TOKEN_EXPIRE_MINUTES * 60,
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "usuario": nome_usuario
    }
# Arquivo recriado e salvo com sucesso!