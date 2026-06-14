import { useState, useEffect } from 'react';
import './GerenciadorTarefas.css';
import { getAccessToken } from '../../utils/auth';
import { apiFetch } from '../../utils/api';
import { ModalEdicaoTarefa } from '../ModalEdicaoTarefa/ModalEdicaoTarefa';
import { BadgeStatus, BadgeTipo } from '../TarefaBadges/TarefaBadges';

export interface Tarefa {
  id: number;
  nome: string;
  tipo: string;
  datalimite: string;
  observacoes?: string;
  status?: string;
}

interface GerenciadorTarefasProps {
  onNovaClick?: () => void;
  refreshTrigger?: number;
  onTarefasChange?: () => void;
}

export function GerenciadorTarefas({ onNovaClick, refreshTrigger, onTarefasChange }: GerenciadorTarefasProps) {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  const [filtro, setFiltro] = useState<'dia' | 'semana' | 'mes'>('semana');
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState<Tarefa | null>(null);

  // Carrega as tarefas do backend ao montar o componente ou quando o trigger atualizar
  useEffect(() => {
    carregarTarefas();
  }, [refreshTrigger]);

  const carregarTarefas = async () => {
    try {
      const token = getAccessToken();
      if (!token) return;

      const response = await apiFetch('/Tarefas');

      if (response.ok) {
        const data = await response.json();
        setTarefas(data);
      } else {
        console.error('Erro ao buscar tarefas:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao conectar com o servidor:', error);
    }
  };

  // Filtrar tarefas por período
  const getTarefasFiltradas = () => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Considera apenas a data
    const umDia = 24 * 60 * 60 * 1000;

    return tarefas.filter((tarefa) => {
      if (!tarefa.datalimite) return true;
      const partes = tarefa.datalimite.split('-');
      const data = new Date(parseInt(partes[0]), parseInt(partes[1]) - 1, parseInt(partes[2]));
      const diff = Math.floor((data.getTime() - hoje.getTime()) / umDia);

      switch (filtro) {
        case 'dia':
          return diff === 0;
        case 'semana':
          return diff >= 0 && diff <= 7;
        case 'mes':
          return diff >= 0 && diff <= 30;
        default:
          return true;
      }
    });
  };

  const tarefasFiltradas = getTarefasFiltradas();

  const deletarTarefa = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja deletar esta tarefa?')) return;

    try {
      const response = await apiFetch(`/Tarefas/${id}`, { method: 'DELETE' });

      if (response.ok) {
        setTarefas(tarefas.filter((t) => t.id !== id));
        if (onTarefasChange) onTarefasChange();
      } else {
        alert('Erro ao deletar a tarefa.');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const atualizarTarefa = async (id: number, novaData: Partial<Tarefa>) => {
    try {
      const response = await apiFetch(`/Tarefas/${id}`, {
        method: 'PUT',
        body: JSON.stringify(novaData),
      });

      if (response.ok) {
        setTarefas(tarefas.map((t) => (t.id === id ? { ...t, ...novaData } : t)));
        setTarefaEmEdicao(null);
        if (onTarefasChange) onTarefasChange();
      } else {
        console.warn('Fallback: Atualizando apenas no frontend devido a erro na API.');
        setTarefas(tarefas.map((t) => (t.id === id ? { ...t, ...novaData } : t)));
        setTarefaEmEdicao(null);
        if (onTarefasChange) onTarefasChange();
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className="gerenciador-container">
      <div className="gerenciador-header">
        <h2>Minhas Tarefas</h2>
        <button className="btn-criar-tarefa" onClick={onNovaClick}>
          + Nova Tarefa
        </button>
      </div>

      {/* Filtros */}
      <div className="filtros">
        <button
          className={`filtro-btn ${filtro === 'dia' ? 'active' : ''}`}
          onClick={() => setFiltro('dia')}
        >
          Hoje
        </button>
        <button
          className={`filtro-btn ${filtro === 'semana' ? 'active' : ''}`}
          onClick={() => setFiltro('semana')}
        >
          Esta Semana
        </button>
        <button
          className={`filtro-btn ${filtro === 'mes' ? 'active' : ''}`}
          onClick={() => setFiltro('mes')}
        >
          Este Mês
        </button>
      </div>

      {/* Lista de Tarefas */}
      <div className="tarefas-lista">
        {tarefasFiltradas.length === 0 ? (
          <div className="tarefas-vazio">
            <p>Nenhuma tarefa para este período</p>
          </div>
        ) : (
          tarefasFiltradas.map((tarefa) => (
            <div key={tarefa.id} className="tarefa-card" data-tipo={tarefa.tipo}>
              <div className="tarefa-header">
                <div className="tarefa-titulo-container">
                  <h3 className="tarefa-titulo">{tarefa.nome}</h3>
                  <p className="tarefa-descricao">{tarefa.observacoes || 'Sem observações'}</p>
                </div>
                <div className="tarefa-badges">
                  <BadgeStatus status={tarefa.status} />
                  <BadgeTipo tipo={tarefa.tipo} />
                </div>
              </div>

              <div className="tarefa-footer">
                <span className="data-vencimento">
                  📅 {tarefa.datalimite ? new Date(tarefa.datalimite + 'T00:00:00').toLocaleDateString('pt-BR') : 'Sem data'}
                </span>
                <div className="acoes">
                  <button
                    className="btn-acao btn-editar"
                    onClick={() => setTarefaEmEdicao(tarefa)}
                    title="Editar tarefa"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="btn-acao btn-completar"
                    onClick={() =>
                      atualizarTarefa(tarefa.id, {
                        status: tarefa.status === 'completa' ? 'pendente' : 'completa',
                      })
                    }
                    title="Marcar como completa"
                  >
                    ✓ {tarefa.status === 'completa' ? 'Desfazer' : 'Completar'}
                  </button>
                  <button
                    className="btn-acao btn-deletar"
                    onClick={() => deletarTarefa(tarefa.id)}
                    title="Deletar tarefa"
                  >
                    🗑️ Deletar
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de Edição */}
      {tarefaEmEdicao && (
        <ModalEdicaoTarefa 
          tarefa={tarefaEmEdicao} 
          aoFechar={() => setTarefaEmEdicao(null)} 
          aoSalvar={atualizarTarefa} 
        />
      )}
    </div>
  );
}
