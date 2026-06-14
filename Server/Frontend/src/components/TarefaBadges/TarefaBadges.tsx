import './TarefaBadges.css';

export const getCorStatus = (status?: string) => {
  switch (status) {
    case 'completa':
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

export function BadgeStatus({ status }: { status?: string }) {
  return (
    <span className="badge status" style={{ backgroundColor: getCorStatus(status) }}>
      {(status || 'pendente').charAt(0).toUpperCase() + (status || 'pendente').slice(1)}
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