import { useState, useEffect } from 'react';
import { DiaCalendario } from '../CalendarioMensal/DiaCalendario';
import type { Tarefa } from '../CalendarioMensal/DiaCalendario';
import { apiFetch } from '../../utils/api';
import { isAuthenticated } from '../../utils/auth'; 
import './CalendarioSemanal.css';

interface CalendarioSemanalProps {
  atualizacaoTrigger?: number;
}

export function CalendarioSemanal({ atualizacaoTrigger = 0 }: CalendarioSemanalProps) {
  const dataAtual = new Date();
  const [dataBase, setDataBase] = useState(dataAtual);
  const [tarefasBD, setTarefasBD] = useState<Tarefa[]>([]);

  const mesNomes = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  useEffect(() => {
    const fetchTarefas = async () => {
      if (!isAuthenticated()) return;
      
      try {
        const response = await apiFetch('/Tarefas', {
          method: 'GET'
        });
        
        if (response.ok) {
          const data = await response.json();
          setTarefasBD(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Erro ao buscar tarefas para a semana', error);
      }
    };

    fetchTarefas();
  }, [dataBase, atualizacaoTrigger]);

  const getInicioDaSemana = (data: Date) => {
    const d = new Date(data);
    d.setHours(0, 0, 0, 0);
    const diaDaSemana = d.getDay(); 
    d.setDate(d.getDate() - diaDaSemana); 
    return d;
  };

  const inicioSemana = getInicioDaSemana(dataBase);

  const diasDaSemana = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(inicioSemana);
    d.setDate(d.getDate() + i);
    return d;
  });

  const handleProximaSemana = () => {
    const novaData = new Date(dataBase);
    novaData.setDate(novaData.getDate() + 7);
    setDataBase(novaData);
  };

  const handleSemanaAnterior = () => {
    const novaData = new Date(dataBase);
    novaData.setDate(novaData.getDate() - 7);
    setDataBase(novaData);
  };

  const mesInicio = inicioSemana.getMonth();
  const anoInicio = inicioSemana.getFullYear();
  const fimSemana = diasDaSemana[6];
  const mesFim = fimSemana.getMonth();
  const anoFim = fimSemana.getFullYear();

  let titulo = `${mesNomes[mesInicio]} ${anoInicio}`;
  if (mesInicio !== mesFim) {
    titulo = `${mesNomes[mesInicio]} / ${mesNomes[mesFim]} ${anoInicio !== anoFim ? anoInicio + ' - ' + anoFim : anoInicio}`;
  }

  return (
    <div className="calendar-full-content">
      <div className="calendar-header">
        <h2>{titulo}</h2>
        <div className="calendar-controls">
          <button onClick={handleSemanaAnterior}>◀</button>
          <button onClick={handleProximaSemana}>▶</button>
        </div>
      </div>
      
      <div className="week-grid">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((d) => (
          <div key={d} className="grid-header">{d}</div>
        ))}
        
        {diasDaSemana.map((data, idx) => {
          const ano = data.getFullYear();
          const mes = String(data.getMonth() + 1).padStart(2, '0');
          const dia = String(data.getDate()).padStart(2, '0');
          const dataFormatada = `${ano}-${mes}-${dia}`;
          
          const tarefasNesteDia = tarefasBD.filter(t => t.datalimite.startsWith(dataFormatada));
          
          const isHoje = data.getDate() === dataAtual.getDate() && 
                         data.getMonth() === dataAtual.getMonth() && 
                         data.getFullYear() === dataAtual.getFullYear();

          return (
            <DiaCalendario 
              key={idx} 
              dia={data.getDate()} 
              isHoje={isHoje} 
              tarefas={tarefasNesteDia} 
            />
          );
        })}
      </div>
    </div>
  );
}