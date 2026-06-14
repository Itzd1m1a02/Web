import { useState } from 'react';
import type { FormEvent } from 'react';
import './JanelaNovaTarefa.css'; // Apontando para o CSS específico do Modal
import { getAccessToken } from '../../utils/auth';

// 1. Definimos o que o Modal recebe da página que o chamou
interface JanelaNovaTarefaProps {
    aoFechar: () => void;
}

interface TarefaDados {
    nome: string;
    tipo: string;
    datalimite: string;
    observacoes?: string;
    user_id: number; // Incluímos o ID aqui para o tipo, mesmo que ele seja gerado pelo backend
}

// 2. A função agora recebe as 'props' e extrai o 'aoFechar'
export function JanelaNovaTarefa({ aoFechar }: JanelaNovaTarefaProps) {
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');
    const [datalimite, setDataLimite] = useState('');
    const [observacoes, setObservacoes] = useState('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!nome.trim() || !tipo || !datalimite) {
            alert('Preencha o nome, o tipo e a data limite da tarefa.');
            return;
        }

        const novaTarefa: TarefaDados = {
            nome: nome.trim(),
            tipo,
            datalimite,
            observacoes: observacoes.trim() || undefined,
            user_id: 0, // O ID será gerado pelo backend, mas precisamos incluir aqui para o tipo TarefaDados
        };

        try {
            const token = getAccessToken();
            if (!token) {
                alert('Você precisa estar logado para criar uma tarefa.');
                return;
            }

            const response = await fetch('http://127.0.0.1:8000/api/NovaTarefa', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(novaTarefa),
            });

            const resultado = await response.json();

            if (response.ok) {
                alert(resultado.mensagem || 'Tarefa criada com sucesso!');
                // 3. Em vez de navegar para outra página, apenas fechamos o Modal!
                aoFechar(); 
            } else {
                alert('Erro ao salvar a tarefa: ' + (resultado.mensagem || response.statusText));
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao conectar com o servidor.');
        }
    };

    return (
        // 4. Classes atualizadas para o visual flutuante e sombreado
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Nova Tarefa</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="nome">Nome da tarefa</label>
                        <input
                            type="text"
                            id="nome"
                            className="modal-input"
                            placeholder="Ex: Estudar para prova de física"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="tipo">Tipo de tarefa</label>
                        <select 
                            id="tipo" 
                            className="modal-input" 
                            value={tipo} 
                            onChange={(e) => setTipo(e.target.value)} 
                            required
                        >
                            <option value="">Selecione o tipo</option>
                            <option value="Prova">Prova</option>
                            <option value="Lista de Exercício">Lista de Exercício</option>
                            <option value="Compromisso">Compromisso</option>
                            <option value="Projeto">Projeto</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label htmlFor="datalimite">Data limite</label>
                        <input
                            type="date"
                            id="datalimite"
                            className="modal-input"
                            value={datalimite}
                            onChange={(e) => setDataLimite(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="observacoes">Observações (opcional)</label>
                        <textarea
                            id="observacoes"
                            className="modal-input"
                            placeholder="Você pode deixar em branco"
                            value={observacoes}
                            onChange={(e) => setObservacoes(e.target.value)}
                            rows={4}
                        />
                    </div>

                    {/* 5. Agrupamento de botões padrão de Modais (Lado a lado, na direita) */}
                    <div className="modal-actions">
                        <button type="button" className="btn-cancelar" onClick={aoFechar}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn-salvar">
                            Salvar tarefa
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}