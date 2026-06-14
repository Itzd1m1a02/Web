import { useState } from 'react';
import './ModalEdicaoTarefa.css';
import type { Tarefa } from '../GerenciadorTarefas/GerenciadorTarefas';

interface ModalEdicaoTarefaProps {
  tarefa: Tarefa;
  aoFechar: () => void;
  aoSalvar: (id: number, dados: Partial<Tarefa>) => void;
}

export function ModalEdicaoTarefa({ tarefa, aoFechar, aoSalvar }: ModalEdicaoTarefaProps) {
  // Criamos estados locais apenas para o Modal
  const [nome, setNome] = useState(tarefa.nome);
  const [observacoes, setObservacoes] = useState(tarefa.observacoes || '');
  const [datalimite, setDatalimite] = useState(tarefa.datalimite);
  const [status, setStatus] = useState(tarefa.status || 'pendente');
  const [tipo, setTipo] = useState(tarefa.tipo || 'Outro');

  const handleSalvar = () => {
    aoSalvar(tarefa.id, { nome, observacoes, datalimite, status, tipo });
  };

  return (
    <div className="modal-backdrop" onClick={aoFechar}>
      <div className="modal-edicao" onClick={(e) => e.stopPropagation()}>
        <h3>Editar Tarefa</h3>
        
        <div className="form-group">
          <label>Nome da Tarefa</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Observações</label>
          <textarea
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Data de Vencimento</label>
          <input
            type="date"
            value={datalimite}
            onChange={(e) => setDatalimite(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pendente">Pendente</option>
            <option value="completa">Completa</option>
            <option value="atrasada">Atrasada</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Tipo</label>
          <select 
            value={tipo} 
            onChange={(e) => setTipo(e.target.value)}
            data-tipo={tipo}
          >
            <option value="Prova">Prova</option>
            <option value="Lista de Exercício">Lista de Exercício</option>
            <option value="Compromisso">Compromisso</option>
            <option value="Projeto">Projeto</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
        
        <div className="modal-acoes">
          <button className="btn-cancelar" onClick={aoFechar}>
            Cancelar
          </button>
          <button className="btn-salvar" onClick={handleSalvar}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}