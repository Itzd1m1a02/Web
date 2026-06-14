from sqlalchemy.orm import Session
from ..models.user import User

class LoginRepository:
    def __init__(self, db: Session):
        self.db = db

    def buscar_por_email(self, email: str) -> User | None:
        """Busca um usuário pelo email para autenticação"""
        return self.db.query(User).filter(User.email == email).first()

# Arquivo recriado e salvo com sucesso!