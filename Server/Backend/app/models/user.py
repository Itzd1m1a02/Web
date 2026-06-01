from sqlalchemy import Column, Integer, String
from ..database import Base

class User(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    usuario = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    senha = Column(String, nullable=False) # Guardaremos a senha criptografada aqui
    nascimento = Column(String)