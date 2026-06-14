import './SeletorVisualizacao.css';

interface SeletorVisualizacaoProps {
  visualizacao: 'dia' | 'semana' | 'mes';
  onChange: (novaVisualizacao: 'dia' | 'semana' | 'mes') => void;
}

export function SeletorVisualizacao({ visualizacao, onChange }: SeletorVisualizacaoProps) {
  return (
    <div className="seletor-visualizacao">
      <button
        className={`seletor-btn ${visualizacao === 'dia' ? 'ativo' : ''}`}
        onClick={() => onChange('dia')}
      >
        Hoje
      </button>
      <button
        className={`seletor-btn ${visualizacao === 'semana' ? 'ativo' : ''}`}
        onClick={() => onChange('semana')}
      >
        Semanal
      </button>
      <button
        className={`seletor-btn ${visualizacao === 'mes' ? 'ativo' : ''}`}
        onClick={() => onChange('mes')}
      >
        Mensal
      </button>
    </div>
  );
}