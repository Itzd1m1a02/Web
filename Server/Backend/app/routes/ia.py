import os
import json
from typing import Any
from fastapi import APIRouter, Depends, HTTPException
import google.generativeai as genai
from dotenv import load_dotenv
from ..security import obter_usuario_atual

load_dotenv() # Carrega as variáveis do arquivo .env para o sistema

router = APIRouter(prefix="/api", tags=["IA Gemini"])

@router.get("/IA/SugerirTarefas")
async def sugerir_tarefas(usuario_atual: Any = Depends(obter_usuario_atual)):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Chave da API do Gemini não encontrada no .env")
    
    genai.configure(api_key=api_key) # type: ignore

    # Modelos candidatos — ajuste conforme disponibilidade da sua conta
    candidate_models = [
        'gemini-1.5-flash-latest',
        'gemini-1.5-flash',
        'gemini-1.5',
        'gemini-3.5-flash',
    ]

    prompt = """
    Você é um assistente acadêmico e de produtividade focado em rotinas de estudos.
    Sugira exatamente 5 tarefas importantes e de alta dificuldade para um estudante universitário.
    Retorne APENAS um array JSON válido e nada mais. Não use formatação markdown.
    O JSON deve seguir EXATAMENTE este formato para cada objeto:
    {
        "nome": "Nome da tarefa",
        "tipo": "Prova" | "Lista de Exercício" | "Projeto" | "Compromisso" | "Outro",
        "datalimite": "2026-06-20",
        "observacoes": "Dica rápida e inteligente de como iniciar essa tarefa"
    }
    """
    
    try:
        # Tenta usar a API mais direta quando disponível (`generate_text`)
        if hasattr(genai, "generate_text"):
            last_err = None
            for m in candidate_models:
                try:
                    response = genai.generate_text(model=m, prompt=prompt, max_output_tokens=512) # type: ignore
                    # A resposta pode expor o texto em atributos diferentes
                    text = getattr(response, 'text', None) or getattr(response, 'content', None) or str(response)
                    return json.loads(text)
                except Exception as e:
                    last_err = e
            raise last_err or Exception("Nenhum modelo disponível gerou resposta")

        # Fallback: tenta instanciar `GenerativeModel` e gerar conteúdo JSON
        last_err = None
        for m in candidate_models:
            try:
                model = genai.GenerativeModel(m) # type: ignore
                resp = model.generate_content(
                    prompt,
                    generation_config={"response_mime_type": "application/json"}
                )
                return json.loads(resp.text)
            except Exception as e:
                last_err = e
        raise last_err or Exception("Nenhum modelo disponível gerou resposta")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao gerar com IA: {str(e)}")