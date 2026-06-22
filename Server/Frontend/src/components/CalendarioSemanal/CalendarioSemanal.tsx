import React, { useState, useEffect } from 'react';
import { type Tarefa } from '../../types/Tarefa';
import { apiFetch } from '../../utils/api';
import { isAuthenticated } from '../../utils/auth'; 
import './CalendarioSemanal.css';

interface CalendarioSemanalProps {
  atualizacaoTrigger?: number;
}

const getColorForTipo = (tipo: string) => {
  let hash = 0;
  for (let i = 0; i < tipo.length; i++) {
    hash = tipo.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return {
    strong: `hsl(${hue}, 55%, 40%)`,
    light: `hsl(${hue}, 75%, 93%)`,
    text: `hsl(${hue}, 60%, 20%)`
  };
};

export function CalendarioSemanal({ atualizacaoTrigger = 0 }: CalendarioSemanalProps) {
  const [dataBase] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });
  
  const [daysWindow, setDaysWindow] = useState(7);
  const [tarefasBD, setTarefasBD] = useState<Tarefa[]>([]);

  const mesNomes = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const diasSemanaNomes = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  useEffect(() => {
    const fetchTarefas = async () => {
      if (!isAuthenticated()) return;
      try {
        const response = await apiFetch('/Tarefas', { method: 'GET' });
        if (response.ok) {
          const data = await response.json();
          setTarefasBD(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Erro ao buscar tarefas para prazos', error);
      }
    };
    fetchTarefas();
  }, [atualizacaoTrigger]);

  const diasArray = Array.from({ length: daysWindow }).map((_, i) => {
    const d = new Date(dataBase);
    d.setDate(d.getDate() + i);
    return d;
  });

  const tarefasPrazos = tarefasBD.filter(t => {
    if (!t.datalimite || t.status === 'concluido') return false;
    const [datePart] = t.datalimite.split(/[T ]/);
    const [ano, mes, dia] = datePart.split('-').map(Number);
    const taskDate = new Date(ano, mes - 1, dia);
    return taskDate >= dataBase;
  }).sort((a, b) => new Date(a.datalimite).getTime() - new Date(b.datalimite).getTime());

  const mesesSpans: { nome: string; span: number }[] = [];
  let currentMonth = -1;
  let currentSpan = 0;

  diasArray.forEach((dia) => {
    if (dia.getMonth() !== currentMonth) {
      if (currentSpan > 0) mesesSpans.push({ nome: mesNomes[currentMonth], span: currentSpan });
      currentMonth = dia.getMonth();
      currentSpan = 1;
    } else {
      currentSpan++;
    }
  });
  if (currentSpan > 0) mesesSpans.push({ nome: mesNomes[currentMonth], span: currentSpan });

  // Definição das colunas idêntica para o Cabeçalho e para o Corpo garantir alinhamento perfeito
  // Definição das colunas idêntica para o Cabeçalho e para o Corpo
  const gridLayoutStyles = {
    display: 'grid',
    // 140px para a coluna da esquerda, e EXATOS 85px para cada dia
    // (Livre-se do 1fr e do minmax para matar o alargamento)
    gridTemplateColumns: `140px repeat(${daysWindow}, 85px)`, 
    columnGap: '4px',
    rowGap: '6px',
    width: 'max-content' 
  };

  return (
    <div className="prazos-full-content">
      <div className="prazos-header">
        <h2>Visão de Prazos (Diagrama de Gantt)</h2>
        <div className="prazos-controls">
          <span>{daysWindow} Dias Visíveis</span>
          {daysWindow > 7 && (
            <button onClick={() => setDaysWindow(prev => Math.max(prev - 1, 7))}>-</button>
          )}
          {daysWindow < 25 && (
            <button onClick={() => setDaysWindow(prev => Math.min(prev + 1, 25))}>+</button>
          )}
        </div>
      </div>
      
      <div className="prazos-main-container">
        <div className="prazos-sync-wrapper">
          
          {/* 1. CABEÇALHO FIXO NO TOPO */}
          <div className="prazos-grid-header" style={gridLayoutStyles}>
            <div className="grid-corner" style={{ gridRow: 1 }}></div>
            {mesesSpans.map((mes, idx) => (
              <div key={`m-${idx}`} className="grid-header-cell grid-header-mes" style={{ gridRow: 1, gridColumn: `span ${mes.span}` }}>
                {mes.nome}
              </div>
            ))}

            <div className="grid-corner" style={{ gridRow: 2 }}></div>
            {diasArray.map((dia, idx) => (
              <div key={`ds-${idx}`} className="grid-header-cell grid-header-semana" style={{ gridRow: 2, gridColumn: idx + 2 }}>
                {diasSemanaNomes[dia.getDay()]}
              </div>
            ))}

            <div className="grid-corner" style={{ gridRow: 3 }}></div>
            {diasArray.map((dia, idx) => (
              <div 
                key={`dn-${idx}`} 
                className={`grid-header-cell grid-header-numero ${idx === 0 ? 'grid-header-hoje' : ''}`} 
                style={{ gridRow: 3, gridColumn: idx + 2 }}
              >
                {String(dia.getDate()).padStart(2, '0')}
              </div>
            ))}
          </div>

          {/* 2. CORPO ROLÁVEL VERTICALMENTE */}
          <div className="prazos-grid-body-scroll">
            <div style={gridLayoutStyles}>
              {tarefasPrazos.map((tarefa, index) => {
                const rowIndex = index + 1; // Index interno relativo à seção de conteúdo
                
                const [datePart, timePart] = tarefa.datalimite.split(/[T ]/);
                const [y, m, d] = datePart.split('-').map(Number);
                const taskDate = new Date(y, m - 1, d);
                
                const diffTime = taskDate.getTime() - dataBase.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                const spanLimit = Math.min(diffDays + 1, daysWindow); 
                const color = getColorForTipo(tarefa.tipo || 'Geral');

                let horarioStr = '';
                if (timePart && timePart !== '00:00' && timePart !== '00:00:00') {
                  horarioStr = timePart.substring(0, 5);
                }

                return (
                  <React.Fragment key={tarefa.id || index}>
                    <div 
                      className="prazos-categoria" 
                      style={{ 
                        gridRow: rowIndex, 
                        gridColumn: '1 / 2', 
                        backgroundColor: color.strong 
                      }}
                    >
                      {tarefa.tipo || 'Geral'}
                    </div>

                    <div 
                      className="prazos-barra" 
                      style={{ 
                        gridRow: rowIndex, 
                        gridColumn: `2 / ${2 + spanLimit}`, 
                        backgroundColor: color.light,
                        border: `1px solid ${color.strong}` 
                      }}
                    >
                      <span className="prazos-tarefa-nome" style={{ color: color.text }}>
                        {tarefa.nome}
                      </span>
                      
                      {horarioStr && (
                        <span className="prazos-tarefa-horario" style={{ color: color.strong }}>
                          {horarioStr}
                        </span>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
              
              {tarefasPrazos.length === 0 && (
                <div style={{ gridColumn: `1 / span ${daysWindow + 1}`, textAlign: 'center', padding: '30px', color: '#868e96', fontSize: '0.9rem' }}>
                  Nenhuma tarefa futura para exibir.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}