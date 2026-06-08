import './CalendarioMensal.css';
import { useState } from 'react';

export function CalendarioMensal() {
  const [mes, setMes] = useState(6); // Junho = 6
  const [ano, setAno] = useState(2026);

  const mesNomes = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const handleProxMes = () => {
    if (mes === 12) {
      setMes(1);
      setAno(ano + 1);
    } else {
      setMes(mes + 1);
    }
  };

  const handleMesAnterior = () => {
    if (mes === 1) {
      setMes(12);
      setAno(ano - 1);
    } else {
      setMes(mes - 1);
    }
  };

  return (
    <div className="calendar-full-content">
      <div className="calendar-header">
        <h2>{mesNomes[mes - 1]} {ano}</h2>
        <div className="calendar-controls">
          <button onClick={handleMesAnterior}>◀</button>
          <button onClick={handleProxMes}>▶</button>
        </div>
      </div>
      
      {/* Grade do Calendário */}
      <div className="month-grid">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
          <div key={d} className="grid-header">{d}</div>
        ))}
        
        {/* Gerando 35 dias mocados para preencher a grade */}
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className={`grid-cell ${i === 15 ? 'today' : ''}`}>
            <span className="date-num">{i > 2 && i < 33 ? i - 2 : ''}</span>
            {i === 10 && <div className="mock-task prova">Prova de Física</div>}
            {i === 15 && <div className="mock-task projeto">Entrega POO</div>}
            {i === 22 && <div className="mock-task lista">Lista de C++</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
