from pydantic import BaseModel, EmailStr
from typing import Optional

# Molde para o Login
class UserLogin(BaseModel):
    usuario: Optional[str] = None
    email: EmailStr
    senha: str

# Molde para o Cadastro
class UserRegister(BaseModel):
    usuario: str
    email: EmailStr
    senha: str
    nascimento: str # No futuro podemos usar o tipo date

class Token(BaseModel):
    access_token: str
    token_type: str
    usuario: str