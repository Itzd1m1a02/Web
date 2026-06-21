import os

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# URL de conexão. Para deploy, use a variável de ambiente DATABASE_URL.
# Exemplo local com SQLite:
# DATABASE_URL=sqlite:///./biscoito.db
# Exemplo PostgreSQL:
# DATABASE_URL=postgresql://usuario:senha@localhost/biscoito
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./biscoito.db")

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Esta função cria uma "sessão" com o banco toda vez que uma rota for chamada, 
# e garante que a conexão seja fechada quando a rota terminar.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()