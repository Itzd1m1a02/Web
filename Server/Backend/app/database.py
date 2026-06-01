from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# URL de conexão. Para usar Postgres no futuro, será algo como: 
# "postgresql://usuario:senha@localhost/biscoito"
DATABASE_URL = "sqlite:///./biscoito.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
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