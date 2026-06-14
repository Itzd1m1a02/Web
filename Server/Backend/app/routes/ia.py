import os
from typing import Any
from fastapi import APIRouter, Depends, HTTPException
import google.generativeai as genai
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from ..security import obter_usuario_atual
from ..database import get_db
from ..repositories.tarefa import TarefaRepository

load_dotenv() # Carrega as variáveis do arquivo .env para o sistema

router = APIRouter(prefix="/api", tags=["IA Gemini"])

@router.get("/IA/Direcionamento")
async def direcionamento_tarefas(
    usuario_atual: Any = Depends(obter_usuario_atual),
    db: Session = Depends(get_db)
):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Chave da API do Gemini não encontrada no .env")
    
    genai.configure(api_key=api_key) # type: ignore

    repo = TarefaRepository(db)
    tarefas = repo.buscar_por_usuario(int(usuario_atual.id))
    
    if not tarefas:
        return {"direcionamento": "Você não possui tarefas pendentes no momento. Aproveite para descansar ou planejar novos objetivos!"}

    tarefas_texto = "\n".join([
        f"- Tarefa: {t.nome} | Tipo: {t.tipo} | Data Limite: {t.datalimite} | Obs: {t.observacoes or 'Nenhuma'}"
        for t in tarefas
    ])

    prompt = f"""
Você é um assistente focado em produtividade e gestão de tempo.
O usuário possui as seguintes tarefas pendentes:

{tarefas_texto}

Baseado nessas tarefas (considerando urgência pela data limite e importância pelo tipo da tarefa), forneça:
1. Um direcionamento claro de qual tarefa o usuário deve priorizar e fazer primeiro, explicando o porquê.
2. Duas ou três pequenas dicas práticas de como começar ou realizar essa tarefa principal.

Seja direto, encorajador e amigável. Retorne apenas o texto da sua resposta, sem formatação JSON. Pode usar formatação markdown leve (como negrito e listas).
"""

    candidate_models = [
       'gemini-3.5-flash',
    ]

    last_err = None
    for m in candidate_models:
        try:
            model = genai.GenerativeModel(m) # type: ignore
            resp = model.generate_content(prompt) # type: ignore
            return {"direcionamento": resp.text}
        except Exception as e:
            last_err = e
            
    raise HTTPException(status_code=500, detail=f"Erro ao gerar com IA: {str(last_err)}")