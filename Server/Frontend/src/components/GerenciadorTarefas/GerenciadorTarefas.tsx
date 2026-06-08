import { useState } from 'react';
import './GerenciadorTarefas.css';

interface Tarefa {
  id: number;
  titulo: string;
  descricao: string;
  dataVencimento: string;
  status: 'pendente' | 'completa' | 'atrasada';
  prioridade: 'baixa' | 'media' | 'alta';
}

interface GerenciadorTarefasProps {
  onNovaClick?: () => void;
}

export function GerenciadorTarefas({ onNovaClick }: GerenciadorTarefasProps) {
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    {
      id: 1,
      titulo: 'Prova de Física',
      descricao: 'Estudar mecânica quântica',
      dataVencimento: '2026-06-15',
      status: 'pendente',
      prioridade: 'alta',
    },
    {
      id: 2,
      titulo: 'Entrega POO',
      descricao: 'Projeto final de orientação a objetos',
      dataVencimento: '2026-06-10',
      status: 'atrasada',
      prioridade: 'alta',
    },
    {
      id: 3,
      titulo: 'Lista de C++',
      descricao: 'Exercícios de ponteiros',
      dataVencimento: '2026-06-20',
      status: 'pendente',
      prioridade: 'media',
    },
    {
      id: 4,
      titulo: 'Relatório de Química',
      descricao: 'Experimento de titulação',
      dataVencimento: '2026-06-05',
      status: 'completa',
      prioridade: 'baixa',
    },
    {
      id: 5,
      titulo: 'Apresentação em Inglês',
      descricao: 'Apresentar sobre história',
      dataVencimento: '2026-06-22',
      status: 'pendente',
      prioridade: 'media',
    },
  ]);

  const [filtro, setFiltro] = useState<'dia' | 'semana' | 'mes'>('semana');
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState<Tarefa | null>(null);

  // Filtrar tarefas por período
  const getTarefasFiltradas = () => {
    const hoje = new Date('2026-06-07');
    const umDia = 24 * 60 * 60 * 1000;

    return tarefas.filter((tarefa) => {
      const data = new Date(tarefa.dataVencimento);
      const diff = Math.floor((data.getTime() - hoje.getTime()) / umDia);

      switch (filtro) {
        case 'dia':
          return diff === 0;
        case 'semana':
          return diff >= 0 && diff < 7;
        case 'mes':
          return diff >= 0 && diff < 30;
        default:
          return true;
      }
    });
  };

  const tarefasFiltradas = getTarefasFiltradas();

  const deletarTarefa = (id: number) => {
    setTarefas(tarefas.filter((t) => t.id !== id));
  };

  const atualizarTarefa = (id: number, novaData: Partial<Tarefa>) => {
    setTarefas(tarefas.map((t) => (t.id === id ? { ...t, ...novaData } : t)));
    setTarefaEmEdicao(null);
  };

  const getCorStatus = (status: string) => {
    switch (status) {
      case 'completa':
        return '#10B981';
      case 'atrasada':
        return '#EF4444';
      case 'pendente':
        return '#F59E0B';
      default:
        return '#9CA3AF';
    }
  };

  const getCorPrioridade = (prioridade: string) => {
    switch (prioridade) {
      case 'alta':
        return '#EF4444';
      case 'media':
        return '#F59E0B';
      case 'baixa':
        return '#10B981';
      default:
        return '#9CA3AF';
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
            <div key={tarefa.id} className="tarefa-card">
              <div className="tarefa-header">
                <div className="tarefa-titulo-container">
                  <h3 className="tarefa-titulo">{tarefa.titulo}</h3>
                  <p className="tarefa-descricao">{tarefa.descricao}</p>
                </div>
                <div className="tarefa-badges">
                  <span
                    className="badge status"
                    style={{ backgroundColor: getCorStatus(tarefa.status) }}
                  >
                    {tarefa.status.charAt(0).toUpperCase() + tarefa.status.slice(1)}
                  </span>
                  <span
                    className="badge prioridade"
                    style={{ backgroundColor: getCorPrioridade(tarefa.prioridade) }}
                  >
                    {tarefa.prioridade.charAt(0).toUpperCase() + tarefa.prioridade.slice(1)}
                  </span>
                </div>
              </div>

              <div className="tarefa-footer">
                <span className="data-vencimento">
                  📅 {new Date(tarefa.dataVencimento).toLocaleDateString('pt-BR')}
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
        <div className="modal-backdrop" onClick={() => setTarefaEmEdicao(null)}>
          <div className="modal-edicao" onClick={(e) => e.stopPropagation()}>
            <h3>Editar Tarefa</h3>
            <div className="form-group">
              <label>Título</label>
              <input
                type="text"
                value={tarefaEmEdicao.titulo}
                onChange={(e) =>
                  setTarefaEmEdicao({ ...tarefaEmEdicao, titulo: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Descrição</label>
              <textarea
                value={tarefaEmEdicao.descricao}
                onChange={(e) =>
                  setTarefaEmEdicao({ ...tarefaEmEdicao, descricao: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Data de Vencimento</label>
              <input
                type="date"
                value={tarefaEmEdicao.dataVencimento}
                onChange={(e) =>
                  setTarefaEmEdicao({ ...tarefaEmEdicao, dataVencimento: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={tarefaEmEdicao.status}
                onChange={(e) =>
                  setTarefaEmEdicao({
                    ...tarefaEmEdicao,
                    status: e.target.value as 'pendente' | 'completa' | 'atrasada',
                  })
                }
              >
                <option value="pendente">Pendente</option>
                <option value="completa">Completa</option>
                <option value="atrasada">Atrasada</option>
              </select>
            </div>
            <div className="form-group">
              <label>Prioridade</label>
              <select
                value={tarefaEmEdicao.prioridade}
                onChange={(e) =>
                  setTarefaEmEdicao({
                    ...tarefaEmEdicao,
                    prioridade: e.target.value as 'baixa' | 'media' | 'alta',
                  })
                }
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </select>
            </div>
            <div className="modal-acoes">
              <button
                className="btn-salvar"
                onClick={() =>
                  atualizarTarefa(tarefaEmEdicao.id, {
                    titulo: tarefaEmEdicao.titulo,
                    descricao: tarefaEmEdicao.descricao,
                    dataVencimento: tarefaEmEdicao.dataVencimento,
                    status: tarefaEmEdicao.status,
                    prioridade: tarefaEmEdicao.prioridade,
                  })
                }
              >
                Salvar
              </button>
              <button className="btn-cancelar" onClick={() => setTarefaEmEdicao(null)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
