import { useState } from 'react';
import '../css/Home.css';
import { ModalNovaTarefa } from '../components/JanelaNovaTarefa/JanelaNovaTarefa';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { CalendarioMensal } from '../components/CalendarioMensal/CalendarioMensal';
import { CalendarioSemana } from '../components/CalendarioSemana/CalendarioSemana';
import { GraficoStatus } from '../components/GraficoStatus/GraficoStatus';
import { GerenciadorTarefas } from '../components/GerenciadorTarefas/GerenciadorTarefas';

export function Home() {
  const [modalAberto, setModalAberto] = useState(false);

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
            <GraficoStatus completas={65} atrasadas={15} semPrazo={20} />
          </div>
        </div>
      </section>

      {/* ==========================================
          SEÇÃO 2: CALENDÁRIO MENSAL COMPLETO
          ========================================== */}
      <section className="scroll-section" id="sessao-mensal">
        <CalendarioMensal />
      </section>

      {/* ==========================================
          SEÇÃO 3: GERENCIADOR DE TAREFAS
          ========================================== */}
      <section className="scroll-section" id="sessao-tarefas">
        <GerenciadorTarefas onNovaClick={() => setModalAberto(true)} />
      </section>

      {/* Modal Renderizado por cima de tudo */}
      {modalAberto && <ModalNovaTarefa aoFechar={() => setModalAberto(false)} />}
      
    </div>
  );
}