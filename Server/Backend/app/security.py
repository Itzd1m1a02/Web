# app/security.py
from datetime import datetime, timedelta, timezone
from typing import Optional, Any
import os

from fastapi import Depends, HTTPException, status, Request
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from .database import get_db
from .repositories.login import LoginRepository

SECRET_KEY = os.getenv("SECRET_KEY", "chave_fallback_apenas_para_dev")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 

# REMOVIDO: security = HTTPBearer()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verificar_senha(senha_pura: str, senha_criptografada: str) -> bool:
    return pwd_context.verify(senha_pura, senha_criptografada)

def obter_hash_senha(senha: str) -> str:
    return pwd_context.hash(senha)

def criar_token_acesso(data: dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Cookie configuration depending on environment
ENV = os.getenv("ENV", "development").lower()
COOKIE_SECURE = True if ENV == "production" else False
# In production we need SameSite=None to allow cross-site cookies when using different domains
COOKIE_SAMESITE = "none" if ENV == "production" else "lax"

# ler o cookie em vez do header
def obter_usuario_atual(request: Request, db: Session = Depends(get_db)) -> Any:
    # 1. Puxa o cookie seguro que o login criou
    token_cookie = request.cookies.get("access_token")
    
    if not token_cookie:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Não autenticado. Faça login novamente.",
        )
    
    # 2. Limpa a string (tira a palavra "Bearer " da frente, se existir)
    token = token_cookie.replace("Bearer ", "") if token_cookie.startswith("Bearer ") else token_cookie

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str | None = payload.get("sub")
        
        if email is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido ou usuário não encontrado",
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido ou expirado",
        )

    # 3. Valida no Banco de Dados
    repo = LoginRepository(db)
    usuario = repo.buscar_por_email(email)
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário do token não existe",
        )
    return usuario