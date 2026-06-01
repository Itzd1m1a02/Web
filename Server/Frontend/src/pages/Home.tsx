import { useState } from 'react';
import { ModalNovaTarefa } from '../components/JanelaNovaTarefa/JanelaNovaTarefa';
import '../css/Home.css';

export function Home() {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <div className="home-wrapper">
      
      <main className="card-container">
        <h1>Olá! Seja bem-vindo(a)!</h1>
        <p>Aqui sua <strong>Rotina Inteligente</strong> é nossa prioridade.</p>
        
        <div className="btn-group">
          <button className="btn-primary" onClick={() => setModalAberto(true)}>
            Nova Tarefa
          </button>
          
          <button className="btn-secondary">Ver Calendário</button>
        </div>
      </main>

      {/* Se o modalAberto for true, renderiza o componente.
          Passamos a função de mudar para 'false' através da propriedade 'aoFechar' */}
      {modalAberto && (
        <ModalNovaTarefa aoFechar={() => setModalAberto(false)} />
      )}

    </div>
  );
}