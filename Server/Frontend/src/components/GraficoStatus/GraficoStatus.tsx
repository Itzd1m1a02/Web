import './GraficoStatus.css';

interface GraficoStatusProps {
  completas?: number;
  atrasadas?: number;
  semPrazo?: number;
}

export function GraficoStatus({ 
  completas = 65, 
  atrasadas = 15, 
  semPrazo = 20 
}: GraficoStatusProps) {
  const total = completas + atrasadas + semPrazo;
  
  // Calcular altura em porcentagem baseado no máximo
  const maxValue = Math.max(completas, atrasadas, semPrazo);
  const calcularAltura = (valor: number) => (valor / maxValue) * 100;

  return (
    <div className="widget-card">
      <h3>Status das Tarefas</h3>
      <div className="chart-container">
        <div className="bar-wrapper">
          <div className="bar completas" style={{ height: `${calcularAltura(completas)}%` }}></div>
          <span className="bar-value">{completas}</span>
          <span className="bar-label">Completas</span>
        </div>
        <div className="bar-wrapper">
          <div className="bar atrasadas" style={{ height: `${calcularAltura(atrasadas)}%` }}></div>
          <span className="bar-value">{atrasadas}</span>
          <span className="bar-label">Atrasadas</span>
        </div>
        <div className="bar-wrapper">
          <div className="bar sem-prazo" style={{ height: `${calcularAltura(semPrazo)}%` }}></div>
          <span className="bar-value">{semPrazo}</span>
          <span className="bar-label">Sem Prazo</span>
        </div>
      </div>
      <div className="chart-total">
        Total: <strong>{total}</strong> tarefas
      </div>
    </div>
  );
}
