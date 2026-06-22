import { useState } from 'react';
import './DiaCalendario.css';
import { type Tarefa } from '../../types/Tarefa';

interface DiaCalendarioProps {
    dia: number | null;
    isHoje: boolean;
    tarefas: Tarefa[];
}

export function DiaCalendario({ dia, isHoje, tarefas }: DiaCalendarioProps) {
    const [popupAberto, setPopupAberto] = useState(false);

    // Caso seja uma célula de preenchimento (dias do mês anterior/próximo)
    if (dia === null) {
        return <div className="dia-calendario vazio"></div>;
    }

    // Lógica de limitação de exibição visual na célula do grid
    const tarefasExibidas = tarefas.slice(0, 2);
    const temMaisTarefas = tarefas.length > 2;

    const abrirModal = () => {
        if (tarefas.length > 0) {
            setPopupAberto(true);
        }
    };

    return (
        <>
            <div className={`dia-calendario ${isHoje ? 'hoje' : ''} ${tarefas.length > 0 ? 'clicavel' : ''}`}
                onClick={abrirModal}>
                <span className="numero-dia">{dia}</span>
                <div className="lista-tarefas-preview">
                    {tarefasExibidas.map(tarefa => {
                        const classeTipo = tarefa.tipo.toLowerCase().replace(/\s+/g, '-');
                        return (
                            <div key={tarefa.id} className={`tarefa-tag ${classeTipo}`}>
                                {tarefa.nome}
                            </div>
                        );
                    })}

                    {temMaisTarefas && (
                        <div className="indicador-mais">
                            ... e mais {tarefas.length - 2}
                        </div>
                    )}
                </div>
            </div>

            {/* Janela flutuante maior (Modal) */}
            {popupAberto && (
                <div className="modal-tarefas-overlay" onClick={() => setPopupAberto(false)}>
                    <div className="modal-tarefas-conteudo" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-tarefas-header">
                            <h3>Tarefas do Dia {dia}</h3>
                            <button className="botao-fechar-modal" onClick={() => setPopupAberto(false)}>
                                &times;
                            </button>
                        </div>

                        <div className="modal-tarefas-lista">
                            {tarefas.map(tarefa => {
                                const classeTipo = tarefa.tipo.toLowerCase().replace(/\s+/g, '-');
                                return (
                                    <div key={tarefa.id} className={`modal-tarefa-item ${classeTipo}`}>
                                        <span className="modal-tarefa-badge">{tarefa.tipo}</span>
                                        <h4 className="modal-tarefa-nome">{tarefa.nome}</h4>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}