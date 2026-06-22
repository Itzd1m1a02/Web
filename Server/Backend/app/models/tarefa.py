from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from ..database import Base

class Tarefa(Base):
    __tablename__ = "tarefas"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, nullable=False)
    tipo = Column(String, nullable=False)
    datalimite = Column(String, nullable=False)
    observacoes = Column(String, nullable=True)
    status = Column(String, default="pendente", nullable=False)
    user_id = Column(Integer, ForeignKey("usuarios.id"), nullable=False)

    user = relationship("User")
