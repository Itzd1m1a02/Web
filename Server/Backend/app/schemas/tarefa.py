from pydantic import BaseModel
from typing import Optional

class TarefaCreate(BaseModel):
    nome: str
    tipo: str
    datalimite: str
    observacoes: Optional[str] = None
    status: Optional[str] = "pendente"
    user_id: int

class TarefaUpdate(BaseModel):
    nome: Optional[str] = None
    tipo: Optional[str] = None
    datalimite: Optional[str] = None
    observacoes: Optional[str] = None
    status: Optional[str] = None
