import { useState, useEffect } from 'react';
// Reaproveitamos exatamente o componente e a tipagem que você já criou no Mensal!
import { DiaCalendario } from '../CalendarioMensal/DiaCalendario';
import type { Tarefa } from '../CalendarioMensal/DiaCalendario';
import { getAccessToken } from '../../utils/auth';
import './CalendarioSemanal.css';

interface CalendarioSemanalProps {
  atualizacaoTrigger?: number; // Repassando o gatilho da Home
}

export function CalendarioSemanal({ atualizacaoTrigger = 0 }: CalendarioSemanalProps) {
  const dataAtual = new Date();
  
  // O estado base que define a "âncora" da semana que estamos olhando
  const [dataBase, setDataBase] = useState(dataAtual);
  const [tarefasBD, setTarefasBD] = useState<Tarefa[]>([]);

  const mesNomes = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  // 1. O mesmo Fetch da API do Calendário Mensal
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
          setTarefasBD(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Erro ao buscar tarefas para a semana', error);
      }
    };

    fetchTarefas();
  }, [dataBase, atualizacaoTrigger]);

  // 2. Matemática para calcular os 7 dias exatos da semana
  const getInicioDaSemana = (data: Date) => {
    const d = new Date(data);
    d.setHours(0, 0, 0, 0);
    const diaDaSemana = d.getDay(); // 0 (Dom) a 6 (Sáb)
    d.setDate(d.getDate() - diaDaSemana); // Subtrai para cair no Domingo
    return d;
  };

  const inicioSemana = getInicioDaSemana(dataBase);

  // Array que gera Domingo a Sábado a partir da data de início
  const diasDaSemana = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(inicioSemana);
    d.setDate(d.getDate() + i);
    return d;
  });

  // 3. Funções de Navegação (Agora pulam de 7 em 7 dias)
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

  // 4. Criação do Título Dinâmico do Cabeçalho
  const mesInicio = inicioSemana.getMonth();
  const anoInicio = inicioSemana.getFullYear();
  const fimSemana = diasDaSemana[6];
  const mesFim = fimSemana.getMonth();
  const anoFim = fimSemana.getFullYear();

  // Se a semana começar em Jan e terminar em Fev, exibe "Janeiro / Fevereiro"
  let titulo = `${mesNomes[mesInicio]} ${anoInicio}`;
  if (mesInicio !== mesFim) {
    titulo = `${mesNomes[mesInicio]} / ${mesNomes[mesFim]} ${anoInicio !== anoFim ? anoInicio + ' - ' + anoFim : anoInicio}`;
  }

  return (
    // Reutilizamos a classe calendar-full-content do seu CalendarioMensal.css 
    // para manter o mesmo container exato de antes
    <div className="calendar-full-content">
      <div className="calendar-header">
        <h2>{titulo}</h2>
        <div className="calendar-controls">
          <button onClick={handleSemanaAnterior}>◀</button>
          <button onClick={handleProximaSemana}>▶</button>
        </div>
      </div>
      
      <div className="week-grid">
        {/* Cabeçalho Fixo dos Nomes dos Dias */}
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((d) => (
          <div key={d} className="grid-header">{d}</div>
        ))}
        
        {/* Desenhando a Célula de cada Dia */}
        {diasDaSemana.map((data, idx) => {
          const ano = data.getFullYear();
          const mes = String(data.getMonth() + 1).padStart(2, '0');
          const dia = String(data.getDate()).padStart(2, '0');
          const dataFormatada = `${ano}-${mes}-${dia}`;
          
          // Filtramos as tarefas do BD que pertencem apenas a este dia do loop
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