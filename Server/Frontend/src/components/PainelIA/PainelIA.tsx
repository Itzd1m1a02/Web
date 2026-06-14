import { useState } from 'react';
import { apiFetch } from '../../utils/api';
import { BadgeTipo } from '../TarefaBadges/TarefaBadges';
import '../GerenciadorTarefas/GerenciadorTarefas.css'; // Mantém para a estrutura geral (header, botões)
import './PainelIA.css'; // IMPORTA O NOVO CSS AQUI

interface TarefaIA {
  nome: string;
  tipo: string;
  datalimite: string;
  observacoes: string;
}

interface PainelIAProps {
  onTarefaAdicionada?: () => void;
}

export function PainelIA({ onTarefaAdicionada }: PainelIAProps) {
  const [sugestoes, setSugestoes] = useState<TarefaIA[]>([]);
  const [carregando, setCarregando] = useState(false);

  const gerarSugestoes = async () => {
    setCarregando(true);
    try {
      const response = await apiFetch('/IA/SugerirTarefas');
      if (response.ok) {
        const data = await response.json();
        setSugestoes(data);
      } else {
        alert('Erro ao buscar sugestões da IA.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCarregando(false);
    }
  };

  const salvarNaRotina = async (tarefa: TarefaIA) => {
    try {
      const response = await apiFetch('/NovaTarefa', {
        method: 'POST',
        body: JSON.stringify(tarefa),
      });
      if (response.ok) {
        alert('Tarefa adicionada à sua rotina!');
        if (onTarefaAdicionada) onTarefaAdicionada();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="gerenciador-container">
      <div className="gerenciador-header" style={{ background: 'linear-gradient(135deg, #f0ebff, #fff)' }}>
        <h2>✨ Sugestões da IA</h2>
        <button className="btn-criar-tarefa" onClick={gerarSugestoes} disabled={carregando}>
          {carregando ? 'Pensando...' : 'Gerar Novas Ideias'}
        </button>
      </div>

      <div className="tarefas-lista grid-sugestoes">
        {sugestoes.map((tarefa, idx) => (
          <div key={idx} className="tarefa-card" data-tipo={tarefa.tipo}>
            <div className="tarefa-header">
              <div className="tarefa-titulo-container">
                <h3 className="tarefa-titulo">{tarefa.nome}</h3>
                <p className="tarefa-descricao">{tarefa.observacoes}</p>
              </div>
              <BadgeTipo tipo={tarefa.tipo} />
            </div>
            <div className="tarefa-footer">
              <span className="data-vencimento">📅 Limite sugerido: {tarefa.datalimite.split('-').reverse().join('/')}</span>
              <button className="btn-acao btn-completar" onClick={() => salvarNaRotina(tarefa)}>+ Adicionar à Rotina</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}