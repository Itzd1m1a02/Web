from typing import Any

from fastapi import APIRouter, status, Depends
from sqlalchemy.orm import Session

from ..schemas.tarefa import TarefaCreate
from ..models.tarefa import Tarefa
from ..database import get_db
from ..repositories.tarefa import TarefaRepository
from ..security import obter_usuario_atual

router = APIRouter(prefix="/api", tags=["Tarefas"])

@router.post("/NovaTarefa", status_code=status.HTTP_201_CREATED)
async def criar_tarefa(
    dados: TarefaCreate,
    usuario_atual: Any = Depends(obter_usuario_atual),
    db: Session = Depends(get_db),
):
    repo = TarefaRepository(db)
    nova_tarefa = Tarefa(
        nome=dados.nome,
        tipo=dados.tipo,
        datalimite=dados.datalimite,
        observacoes=dados.observacoes,
        user_id=int(usuario_atual.id),
    )
    

    repo.salvar_nova_tarefa(nova_tarefa)

    return {"mensagem": "Tarefa criada com sucesso!"}
