import { useState, useEffect } from 'react';
import { DiaCalendario } from './DiaCalendario';
import type { Tarefa } from './DiaCalendario';
import { getAccessToken } from '../../utils/auth'; // Usando sua utils de auth
import './CalendarioMensal.css';

interface CalendarioMensalProps {
  atualizacaoTrigger?: number; // Prop que a Home enviará para forçar recarregamento
}

export function CalendarioMensal({ atualizacaoTrigger = 0 }: CalendarioMensalProps) {
  const dataAtual = new Date();
  const [mes, setMes] = useState(dataAtual.getMonth() + 1);
  const [ano, setAno] = useState(dataAtual.getFullYear());
  
  // Estado para armazenar as tarefas que vem do GET
  const [tarefasBD, setTarefasBD] = useState<Tarefa[]>([]);

  // ADICIONE ESTA LINHA:
  console.log("Tarefas salvas no estado do calendário:", tarefasBD);

  const mesNomes = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  // Disparado sempre que o mês, ano ou o trigger mudam
  useEffect(() => {
    const fetchTarefas = async () => {
      const token = getAccessToken();
      if (!token) return;

      try {
        const response = await fetch('http://127.0.0.1:8000/api/Tarefas', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setTarefasBD(data);
        }
      } catch (error) {
        console.error('Erro ao buscar tarefas para o calendário', error);
      }
    };

    fetchTarefas();
  }, [mes, ano, atualizacaoTrigger]); 

  // --- LÓGICA DE GERAÇÃO REAL DOS DIAS DO MÊS ---
  const diasNoMes = new Date(ano, mes, 0).getDate();
  const primeiroDiaSemana = new Date(ano, mes - 1, 1).getDay(); // 0 (Dom) a 6 (Sáb)
  
  // 1. Array com os espaços vazios do começo + dias reais
  const diasIniciais = [
    ...Array.from({ length: primeiroDiaSemana }, () => null),
    ...Array.from({ length: diasNoMes }, (_, i) => i + 1)
  ];

  // 2. Quantos quadrados vazios faltam para fechar a última linha (múltiplo de 7)?
  const espacosFinais = (7 - (diasIniciais.length % 7)) % 7;

  // 3. Array final perfeitamente alinhado
  const diasArray: (number | null)[] = [
    ...diasIniciais,
    ...Array.from({ length: espacosFinais }, () => null)
  ];

  const handleProxMes = () => {
    if (mes === 12) { setMes(1); setAno(ano + 1); } else { setMes(mes + 1); }
  };
  const handleMesAnterior = () => {
    if (mes === 1) { setMes(12); setAno(ano - 1); } else { setMes(mes - 1); }
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
      
      <div className="month-grid">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(d => (
          <div key={d} className="grid-header">{d}</div>
        ))}
        
        {diasArray.map((dia, idx) => {
          // Criamos a string formato BD (YYYY-MM-DD) do dia atual do loop
          const dataFormatada = dia 
            ? `${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}` 
            : '';

          // Filtramos quais tarefas caem neste dia específico
          const tarefasNesteDia = dia 
            ? tarefasBD.filter(t => t.datalimite.startsWith(dataFormatada)) 
            : [];

          const isHoje = dia === dataAtual.getDate() && mes === dataAtual.getMonth() + 1 && ano === dataAtual.getFullYear();

          return (
            <DiaCalendario 
              key={idx} 
              dia={dia} 
              isHoje={isHoje} 
              tarefas={tarefasNesteDia} 
            />
          );
        })}
      </div>
    </div>
  );
}