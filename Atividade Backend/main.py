from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from jose import jwt, JWTError #nome de uma biblioteca
from typing import List
from fastapi import FastAPI
from fastapi.responses import RedirectResponse

app = FastAPI()

SECRET_KEY = "segredo123"
ALGORITHM = "HS256"

security = HTTPBearer()

# =========================
# SCHEMAS PYDANTIC
# =========================

class Login(BaseModel):
    username: str
    password: str


class Disciplina(BaseModel):
    id: int
    nome: str
    professor: str
    periodo: str


class Aluno(BaseModel):
    id: int
    nome: str
    curso: str
    idade: int

# =========================
# DADOS EM MEMÓRIA
# =========================

usuarios = {
    "admin": "1234"
}

disciplinas = [
    {
        "id": 1,
        "nome": "Desenvolvimento Web",
        "professor": "Carlos Silva",
        "periodo": "3º período"
    }
]

alunos = [
    {
        "id": 1,
        "nome": "João",
        "curso": "Engenharia de Computação",
        "idade": 21
    }
]

# =========================
# AUTENTICAÇÃO JWT
# =========================

def verificar_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")

# =========================
# AUTENTICAÇÃO JWT
# =========================

@app.get("/")
def redirecionar_docs():
    return RedirectResponse(url="/docs")

# =========================
# ENDPOINT LOGIN
# =========================

@app.post("/login")
def login(dados: Login):
    usuario = usuarios.get(dados.username)

    if not usuario or usuario != dados.password:
        raise HTTPException(status_code=401, detail="Usuário ou senha inválidos")

    token = jwt.encode(
        {"sub": dados.username},
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }


# =========================
# ENDPOINTS DISCIPLINAS
# =========================

@app.get("/disciplinas", response_model=List[Disciplina])
def listar_disciplinas():
    return disciplinas


@app.post("/disciplinas", response_model=Disciplina)
def criar_disciplina(
    disciplina: Disciplina,
    usuario=Depends(verificar_token)
):
    disciplinas.append(disciplina.dict())
    return disciplina


# =========================
# ENDPOINTS ALUNOS
# =========================

@app.get("/alunos", response_model=List[Aluno])
def listar_alunos():
    return alunos


@app.post("/alunos", response_model=Aluno)
def criar_aluno(
    aluno: Aluno,
    usuario=Depends(verificar_token)
):
    alunos.append(aluno.dict())
    return aluno