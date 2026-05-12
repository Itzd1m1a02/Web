# README_parte2.md

## Integrantes

* Dimitri Pereira Maia

---

# Objetivo

Desenvolver uma API REST utilizando FastAPI com autenticação JWT e persistência em memória.

A aplicação possui duas entidades:

* Disciplinas
* Alunos

---

# Estrutura do projeto

```bash
backend/
 ├── main.py
 ├── models.py
 └── database.py
```

---

# Instalação

```bash
pip install fastapi uvicorn python-jose
```

---

# Execução

```bash
uvicorn main:app --reload
```

A API ficará disponível em:

```txt
http://127.0.0.1:8000
```

A documentação Swagger:

```txt
http://127.0.0.1:8000/docs
```

---

# Endpoints

| Método | Endpoint     | Descrição         | Proteção |
| ------ | ------------ | ----------------- | -------- |
| POST   | /login       | Gera token JWT    | Público  |
| GET    | /disciplinas | Lista disciplinas | Público  |
| POST   | /disciplinas | Cria disciplina   | JWT      |
| GET    | /alunos      | Lista alunos      | Público  |
| POST   | /alunos      | Cria aluno        | JWT      |

---

# Autenticação

Realizar login:

```json
{
  "username": "admin",
  "password": "1234"
}
```

Resposta:

```json
{
  "access_token": "TOKEN_JWT",
  "token_type": "bearer"
}
```

Utilizar no Swagger:

```txt
Bearer TOKEN_JWT
```

---

# Schemas Pydantic

## Disciplina

```python
class Disciplina(BaseModel):
    id: int
    nome: str
    professor: str
    periodo: str
```

## Aluno

```python
class Aluno(BaseModel):
    id: int
    nome: str
    curso: str
    idade: int
```

---

# Persistência em memória

Os dados são armazenados em listas Python no arquivo `database.py`.

---

# Funções principais

| Função               | Responsabilidade  |
| -------------------- | ----------------- |
| login()              | Gera token JWT    |
| verificar_token()    | Valida token      |
| listar_disciplinas() | Lista disciplinas |
| criar_disciplina()   | Cria disciplina   |
| listar_alunos()      | Lista alunos      |
| criar_aluno()        | Cria aluno        |

---
