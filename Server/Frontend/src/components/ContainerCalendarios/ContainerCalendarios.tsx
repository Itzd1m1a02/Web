import { useState } from 'react';
import { SeletorVisualizacao } from '../SeletorVisualizacao/SeletorVisualizacao';
import { CalendarioMensal } from '../CalendarioMensal/CalendarioMensal';
import { CalendarioSemanal } from '../CalendarioSemanal/CalendarioSemanal';
import './ContainerCalendarios.css';

interface ContainerCalendariosProps {
  atualizacaoTrigger?: number; // Repassando o gatilho da Home
}

export function ContainerCalendarios({ atualizacaoTrigger = 0 }: ContainerCalendariosProps) {
  // Estado que controla qual calendário está na tela (padrão: mês)
  const [visualizacao, setVisualizacao] = useState<'dia' | 'semana' | 'mes'>('mes');

  return (
    <div className="container-calendarios">
      {/* Cabeçalho com o Título e os Botões de Troca */}
      <div className="calendarios-header">
        <h2>Calendário</h2>
        <SeletorVisualizacao visualizacao={visualizacao} onChange={setVisualizacao} />
      </div>

      {/* Conteúdo Dinâmico */}
      <div className="calendarios-content">
        
        {/* Renderiza o Calendário Mensal se 'mes' estiver selecionado */}
        {visualizacao === 'mes' && <CalendarioMensal atualizacaoTrigger={atualizacaoTrigger} />}
        
        
        {visualizacao === 'semana' && (
          <CalendarioSemanal atualizacaoTrigger={atualizacaoTrigger} />
        )}

        {/* Tela de Placeholder para a implementação */}
        {visualizacao === 'dia' && (
          <div className="calendario-placeholder">
            <h3>📍 Calendário Diário (Hoje)</h3>
            <p>A interface do dia será construída aqui.</p>
          </div>
        )}

      </div>
    </div>
  );
}