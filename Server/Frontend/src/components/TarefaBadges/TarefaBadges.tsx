import './TarefaBadges.css';
import type { TarefaStatus } from '../../types/Tarefa';

export const getCorStatus = (status?: TarefaStatus) => {
  switch (status) {
    case 'concluido':
      return '#10B981';
    case 'atrasada':
      return '#EF4444';
    case 'pendente':
    default:
      return '#F59E0B';
  }
};

export const getCorTipo = (tipo?: string) => {
  switch (tipo) {
    case 'Prova':
      return '#EF4444';
    case 'Lista de Exercício':
      return '#08ad08';
    case 'Projeto':
      return '#8B5CF6';
    case 'Compromisso':
      return '#3B82F6';
    default:
      return '#9CA3AF';
  }
};

const statusTexto: Record<TarefaStatus, string> = {
  pendente: 'Pendente',
  atrasada: 'Atrasada',
  concluido: 'Concluído',
};

export function BadgeStatus({ status }: { status?: TarefaStatus }) {
  const displayStatus = status || 'pendente';
  return (
    <span className="badge status" style={{ backgroundColor: getCorStatus(displayStatus) }}>
      {statusTexto[displayStatus]}
    </span>
  );
}

export function BadgeTipo({ tipo }: { tipo?: string }) {
  return (
    <span className="badge prioridade" style={{ backgroundColor: getCorTipo(tipo) }}>
      {tipo || 'Outro'}
    </span>
  );
}