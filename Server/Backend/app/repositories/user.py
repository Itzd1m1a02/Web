# app/repositories/user.py
from sqlalchemy.orm import Session
from ..models.user import User

class UserRepository:
    # O self.db é a conexão injetada
    def __init__(self, db: Session):
        self.db = db

    def buscar_por_email(self, email: str):
        # Toda a lógica do SQLAlchemy fica escondida aqui
        return self.db.query(User).filter(User.email == email).first()

    def salvar_novo_usuario(self, usuario: User):
        self.db.add(usuario)
        self.db.commit()
        self.db.refresh(usuario)
        return usuario