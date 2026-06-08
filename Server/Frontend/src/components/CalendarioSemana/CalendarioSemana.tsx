import './CalendarioSemana.css';

export function CalendarioSemana() {
  return (
    <div className="widget-card">
      <h3>Calendário da semana:</h3>
      <div className="week-table">
        {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((dia, index) => (
          <div key={dia} className="week-day">
            <span className="day-name">{dia}</span>
            {/* Bolinhas simulando tarefas */}
            <div className="task-dots">
              {index % 2 === 0 ? <span className="dot active"></span> : <span className="dot"></span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
