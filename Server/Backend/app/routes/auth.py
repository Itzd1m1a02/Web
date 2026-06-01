# app/routes/auth.py
from fastapi import APIRouter, HTTPException, status, Depends
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from datetime import timedelta # <-- NOVO IMPORT

# IMPORTANDO O GERADOR DE TOKENS E O NOVO SCHEMA
from ..security import criar_token_acesso, ACCESS_TOKEN_EXPIRE_MINUTES 
from ..schemas.auth import UserLogin, UserRegister, Token

from ..models.user import User
from ..database import get_db
from ..repositories.user import UserRepository 

router = APIRouter(prefix="/api", tags=["Autenticação"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verificar_senha(senha_pura: str, senha_criptografada: str) -> bool:
    return pwd_context.verify(senha_pura, senha_criptografada)

def obter_hash_senha(senha: str) -> str:
    return pwd_context.hash(senha)

# ---------- ROTA DE LOGIN ATUALIZADA ----------
# Note que o tipo de retorno da função agora usa o schema Token!
@router.post("/Login", response_model=Token)
async def login(dados: UserLogin, db: Session = Depends(get_db)):
    
    repo = UserRepository(db)
    usuario_db = repo.buscar_por_email(dados.email)

    if not usuario_db or not verificar_senha(dados.senha, str(usuario_db.senha)):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos"
        )

    # SE CHEGOU AQUI, A SENHA BATEU! VAMOS GERAR O JWT:
    tempo_expiracao = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    # O "sub" (subject) guarda a identificação única do usuário dentro do token
    token = criar_token_acesso(
        data={"sub": usuario_db.email}, 
        expires_delta=tempo_expiracao
    )

    # Devolvemos o token exatamente no formato que o schema exige
    return Token(
        access_token=token,
        token_type="bearer",
        usuario=str(usuario_db.usuario)
        )

# ----------------ROTA DE CADASTRO------------------------------
@router.post("/Cadastro", status_code=status.HTTP_201_CREATED)
async def cadastro(dados: UserRegister, db: Session = Depends(get_db)):
    
    repo = UserRepository(db)
    
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

    # 2. Usando o repo para salvar! A rota não precisa saber dar "db.add" ou "db.commit".
    repo.salvar_novo_usuario(novo_usuario)

    return {"mensagem": f"Usuário {novo_usuario.usuario} criado com sucesso!"}