import { useState, useEffect } from 'react';
import '../css/Home.css';
import { JanelaNovaTarefa } from '../components/JanelaNovaTarefa/JanelaNovaTarefa';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { CalendarioMensal } from '../components/CalendarioMensal/CalendarioMensal';
import { CalendarioSemana } from '../components/CalendarioSemana/CalendarioSemana';
import { GraficoStatus } from '../components/GraficoStatus/GraficoStatus';
import { GerenciadorTarefas } from '../components/GerenciadorTarefas/GerenciadorTarefas';
import { getAccessToken } from '../utils/auth';

interface TarefaAPI {
  id: number;
  nome: string;
  tipo: string;
  datalimite: string;
  observacoes?: string;
  user_id: number;
}

export function Home() {
  const [modalAberto, setModalAberto] = useState(false);

  // 1. CRIANDO O TRIGGER DE ATUALIZAÇÃO
  const [triggerRefresh, setTriggerRefresh] = useState(0); 
  const [completas, setCompletas] = useState(0);
  const [pendentes, setPendentes] = useState(0);
  const [atrasadas, setAtrasadas] = useState(0);
  const [semPrazo, setSemPrazo] = useState(0);

  const calcularStatusTarefas = (tarefas: TarefaAPI[]) => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    let completasContagem = 0;
    let pendentesContagem = 0;
    let atrasadasContagem = 0;
    let semPrazoContagem = 0;

    tarefas.forEach((tarefa) => {
      const prazo = tarefa.datalimite?.trim();
      if (!prazo) {
        semPrazoContagem += 1;
        return;
      }

      const dataLimite = new Date(prazo);
      dataLimite.setHours(0, 0, 0, 0);

      if (dataLimite < hoje) {
        atrasadasContagem += 1;
      } else {
        pendentesContagem += 1;
      }
    });

    setCompletas(completasContagem);
    setPendentes(pendentesContagem);
    setAtrasadas(atrasadasContagem);
    setSemPrazo(semPrazoContagem);
  };

  useEffect(() => {
    const fetchStatusTarefas = async () => {
      const token = getAccessToken();
      if (!token) return;

      try {
        const response = await fetch('http://127.0.0.1:8000/api/Tarefas', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          console.error('Falha ao buscar tarefas para o gráfico de status', response.statusText);
          return;
        }

        const dados: TarefaAPI[] = await response.json();
        calcularStatusTarefas(dados);
      } catch (error) {
        console.error('Erro ao buscar tarefas para o gráfico de status', error);
      }
    };

    fetchStatusTarefas();
  }, [triggerRefresh]);

  // Função que será chamada quando o modal fechar
  const lidarComFechamentoModal = () => {
    setModalAberto(false);
    // Somamos +1 para quebrar a igualdade anterior. O React vai perceber e forçar 
    // os useEffects dos componentes filhos a rodarem de novo!
    setTriggerRefresh(prev => prev + 1);
  };

  // Função para rolar suavemente para o Home
  const rolarParaHome = () => {
    const sessaoHome = document.getElementById('sessao-home');
    if (sessaoHome) {
      sessaoHome.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Função para rolar suavemente para o Calendário Mensal
  const rolarParaCalendario = () => {
    const sessaoCalendario = document.getElementById('sessao-mensal');
    if (sessaoCalendario) {
      sessaoCalendario.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Função para rolar suavemente para o Gerenciador de Tarefas
  const rolarParaTarefas = () => {
    const sessaoTarefas = document.getElementById('sessao-tarefas');
    if (sessaoTarefas) {
      sessaoTarefas.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="scroll-container">
      {/* Componente Sidebar */}
      <Sidebar onHomeClick={rolarParaHome} onCalendarClick={rolarParaCalendario} onTasksClick={rolarParaTarefas} />

      {/* ==========================================
          SEÇÃO 1: DASHBOARD INICIAL (Home)
          ========================================== */}
      <section className="scroll-section" id="sessao-home">
        <div className="dashboard-content">
          
          {/* Cartão de Boas-vindas */}
          <header className="hero-card">
            <h1>Olá! Seja bem-vindo(a)!</h1>
            <p>Aqui sua <strong>Rotina Inteligente</strong> é nossa prioridade.</p>
            <div className="btn-group">
              <button className="btn-primary" onClick={() => setModalAberto(true)}>
                Nova Tarefa
              </button>
              <button className="btn-secondary" onClick={rolarParaCalendario}>
                Ver Calendário
              </button>
            </div>
          </header>

          {/* Widgets Inferiores (Semana e Gráfico) */}
          <div className="widgets-grid">
            <CalendarioSemana />
            <GraficoStatus completas={completas} pendentes={pendentes} atrasadas={atrasadas} semPrazo={semPrazo} />
          </div>
        </div>
      </section>

      {/* ==========================================
          SEÇÃO 2: CALENDÁRIO MENSAL COMPLETO
          ========================================== */}
      <section className="scroll-section" id="sessao-mensal">
        {/* 2. INJETANDO A PROP DE RECARREGAR */}
        <CalendarioMensal atualizacaoTrigger={triggerRefresh} />
      </section>

      {/* ==========================================
          SEÇÃO 3: GERENCIADOR DE TAREFAS
          ========================================== */}
      <section className="scroll-section" id="sessao-tarefas">
        <GerenciadorTarefas onNovaClick={() => setModalAberto(true)} />
      </section>

      {/* Modal Renderizado por cima de tudo */}
      {modalAberto && <JanelaNovaTarefa aoFechar={lidarComFechamentoModal} />}
      
    </div>
  );
}