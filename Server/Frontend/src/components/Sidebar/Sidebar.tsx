import { useState } from 'react';
import './Sidebar.css';
import iconePerfil from '../../assets/icons/profile_icon(2)_inverted.png';
import iconeHome from '../../assets/icons/home_icon(2)_inverted.png';
import iconeCalendario from '../../assets/icons/calendar_icon(2)_inverted.png';
import iconeManager from '../../assets/icons/list_icon(1)_inverted.png';
import iconeGlow from '../../assets/icons/glow_icon(2)_inverted.png';
import iconeConfig from '../../assets/icons/config_icon(1)_inverted.png';
import iconeInfo from '../../assets/icons/info_icon(2)_inverted.png';

interface SidebarProps {
  onHomeClick: () => void;
  onCalendarClick: () => void;
  onTasksClick: () => void;
  onIAClick?: () => void;
}

export function Sidebar({ onHomeClick, onCalendarClick, onTasksClick, onIAClick }: SidebarProps) {
  // 1. Estado para memorizar qual botão está aceso
  const [ativo, setAtivo] = useState('home');

  return (
    <nav className="sidebar">

      <div className="menu-top">
        <button className="icon-btn" onClick={onHomeClick}>
          <img src={iconePerfil} alt="👤" className="icone-botao" />
        </button>
      </div>

      <div className="menu-icons">
        {/* 2. Lógica condicional: Injeta a classe 'active' só se o estado bater */}
        <button 
          className={`icon-btn ${ativo === 'home' ? 'active' : ''}`} 
          onClick={() => { setAtivo('home'); onHomeClick(); }}
        >
          <img src={iconeHome} alt="🏠" className="icone-botao" />
        </button>
        
        <button 
          className={`icon-btn ${ativo === 'calendario' ? 'active' : ''}`} 
          onClick={() => { setAtivo('calendario'); onCalendarClick(); }}
        >
          <img src={iconeCalendario} alt="📅" className="icone-botao" />
        </button>
        
        <button 
          className={`icon-btn ${ativo === 'tarefas' ? 'active' : ''}`} 
          onClick={() => { setAtivo('tarefas'); onTasksClick(); }}
        >
          <img src={iconeManager} alt="📊" className="icone-botao" />
        </button>
        
        <button 
          className={`icon-btn ${ativo === 'ia' ? 'active' : ''}`} 
          onClick={() => { setAtivo('ia'); if(onIAClick) onIAClick(); }} 
          title="Sugestões IA"
        >
          <img src={iconeGlow} alt="✨" className="icone-botao" />
        </button>
      </div>

      <div className="menu-bottom">
        <button className="icon-btn" title="Configurações">
          <img src={iconeConfig} alt="⚙️" className="icone-botao" />
        </button>
        <button className="icon-btn" title="Informações">
          <img src={iconeInfo} alt="ℹ️" className="icone-botao" />
        </button>
      </div>

    </nav>
  );
}