from typing import Any

from fastapi import APIRouter, status, Depends, HTTPException
from sqlalchemy.orm import Session

from ..schemas.tarefa import TarefaCreate, TarefaUpdate
from ..models.tarefa import Tarefa
from ..database import get_db
from ..repositories.tarefa import TarefaRepository
from ..security import obter_usuario_atual

router = APIRouter(prefix="/api", tags=["Tarefas"])

@router.get("/Tarefas")
async def listar_tarefas(
    usuario_atual: Any = Depends(obter_usuario_atual),
    db: Session = Depends(get_db),
):
    repo = TarefaRepository(db)
    # Usa o método buscar_por_usuario que você já declarou no TarefaRepository
    tarefas = repo.buscar_por_usuario(int(usuario_atual.id)) 
    return tarefas

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

@router.put("/Tarefas/{tarefa_id}")
async def atualizar_tarefa(
    tarefa_id: int,
    tarefa_atualizada: TarefaUpdate,
    usuario_atual: Any = Depends(obter_usuario_atual),
    db: Session = Depends(get_db),
):
    tarefa_db = db.query(Tarefa).filter(Tarefa.id == tarefa_id, Tarefa.user_id == int(usuario_atual.id)).first()
    if not tarefa_db:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada ou não pertence a este usuário")

    update_data = tarefa_atualizada.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(tarefa_db, key, value)

    db.commit()
    db.refresh(tarefa_db)
    return tarefa_db

@router.delete("/Tarefas/{tarefa_id}", status_code=status.HTTP_200_OK)
async def deletar_tarefa(
    tarefa_id: int,
    usuario_atual: Any = Depends(obter_usuario_atual),
    db: Session = Depends(get_db),
):
    tarefa_db = db.query(Tarefa).filter(Tarefa.id == tarefa_id, Tarefa.user_id == int(usuario_atual.id)).first()
    if not tarefa_db:
        raise HTTPException(status_code=404, detail="Tarefa não encontrada ou não pertence a este usuário")

    db.delete(tarefa_db)
    db.commit()
    return {"mensagem": "Tarefa deletada com sucesso"}
