import { useState } from 'react';
import '../css/Home.css';
import { ModalNovaTarefa } from '../components/JanelaNovaTarefa/JanelaNovaTarefa';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { ContainerCalendarios } from '../components/ContainerCalendarios/ContainerCalendarios';
import { CalendarioSemana } from '../components/CalendarioSemana/CalendarioSemana';
import { GraficoStatus } from '../components/GraficoStatus/GraficoStatus';
import { GerenciadorTarefas } from '../components/GerenciadorTarefas/GerenciadorTarefas';
import { PainelIA } from '../components/PainelIA/PainelIA';

export function Home() {
  const [modalAberto, setModalAberto] = useState(false);
  const [tarefasRefresh, setTarefasRefresh] = useState(0);

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

  // Função para rolar suavemente para o Painel da IA
  const rolarParaIA = () => {
    const sessaoIA = document.getElementById('sessao-ia');
    if (sessaoIA) {
      sessaoIA.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="scroll-container">
      
      {/* Componente Sidebar */}
      <Sidebar onHomeClick={rolarParaHome} onCalendarClick={rolarParaCalendario} onTasksClick={rolarParaTarefas} onIAClick={rolarParaIA} />

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
            <CalendarioSemana key={`semana-${tarefasRefresh}`} />
            <GraficoStatus key={`grafico-${tarefasRefresh}`} completas={65} atrasadas={15} semPrazo={20} />
          </div>
        </div>
      </section>

      {/* ==========================================
          SEÇÃO 2: CALENDÁRIO MENSAL COMPLETO
          ========================================== */}
      <section className="scroll-section" id="sessao-mensal">
        <ContainerCalendarios atualizacaoTrigger={tarefasRefresh} />
      </section>

      {/* ==========================================
          SEÇÃO 3: GERENCIADOR DE TAREFAS
          ========================================== */}
      <section className="scroll-section" id="sessao-tarefas">
        <GerenciadorTarefas 
          onNovaClick={() => setModalAberto(true)} 
          refreshTrigger={tarefasRefresh}
          onTarefasChange={() => setTarefasRefresh(prev => prev + 1)}
        />
      </section>

      {/* ==========================================
          SEÇÃO 4: SUGESTÕES INTELIGENTES (IA)
          ========================================== */}
      <section className="scroll-section" id="sessao-ia">
        <PainelIA onTarefaAdicionada={() => setTarefasRefresh(prev => prev + 1)} />
      </section>

      {/* Modal Renderizado por cima de tudo */}
      {modalAberto && (
        <ModalNovaTarefa 
          aoFechar={() => setModalAberto(false)} 
          onSucesso={() => setTarefasRefresh(prev => prev + 1)}
        />
      )}
      
    </div>
  );
}