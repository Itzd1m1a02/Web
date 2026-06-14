from pydantic import BaseModel, EmailStr
from typing import Optional

# Molde para o Login
class UserLogin(BaseModel):
    usuario: Optional[str] = None
    email: EmailStr
    senha: str

class Token(BaseModel):
    access_token: str
    token_type: str
    usuario: str

# Arquivo recriado e salvo com sucesso!