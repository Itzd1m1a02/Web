from pydantic import BaseModel
from typing import Optional

class TarefaCreate(BaseModel):
    nome: str
    tipo: str
    datalimite: str
    observacoes: Optional[str] = None
    user_id: int
