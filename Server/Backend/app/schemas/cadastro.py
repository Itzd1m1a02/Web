from pydantic import BaseModel, EmailStr

# Molde para o Cadastro
class UserRegister(BaseModel):
    usuario: str
    email: EmailStr
    senha: str
    nascimento: str # No futuro podemos usar o tipo date

# Arquivo recriado e salvo com sucesso!