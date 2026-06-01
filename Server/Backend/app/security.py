# app/security.py
from datetime import datetime, timedelta, timezone
from typing import Optional, Any

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from sqlalchemy.orm import Session

from .database import get_db
from .repositories.user import UserRepository

SECRET_KEY = "uma_chave_muito_secreta_e_dificil_de_descobrir"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 
security = HTTPBearer()

# CORREÇÃO 1: Definimos que 'data' é um dicionário de chaves string e valores Any,
# e que a função retorna uma string (-> str)
def criar_token_acesso(data: dict[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    
    # CORREÇÃO 2: Substituímos o utcnow() obsoleto pelo now(timezone.utc)
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
        
    to_encode.update({"exp": expire})
    
    token_codificado = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return token_codificado


def obter_usuario_atual(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db),
):
    token = credentials.credentials
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

    repo = UserRepository(db)
    usuario = repo.buscar_por_email(email)
    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário do token não existe",
        )
    return usuario
