from sqlalchemy.orm import Session
from ..models.tarefa import Tarefa

class TarefaRepository:
    def __init__(self, db: Session):
        self.db = db

    def salvar_nova_tarefa(self, tarefa: Tarefa):
        self.db.add(tarefa)
        self.db.commit()
        self.db.refresh(tarefa)
        return tarefa

    def buscar_por_usuario(self, user_id: int):
        return self.db.query(Tarefa).filter(Tarefa.user_id == user_id).all()
