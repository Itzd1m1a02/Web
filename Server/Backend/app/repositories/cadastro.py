from sqlalchemy.orm import Session
from ..models.user import User

class CadastroRepository:
    def __init__(self, db: Session):
        self.db = db

    def buscar_por_email(self, email: str) -> User | None:
        """Verifica se um email já existe antes de cadastrar"""
        return self.db.query(User).filter(User.email == email).first()

    def salvar_novo_usuario(self, usuario: User):
        self.db.add(usuario)
        self.db.commit()
        self.db.refresh(usuario)

# Arquivo recriado e salvo com sucesso!