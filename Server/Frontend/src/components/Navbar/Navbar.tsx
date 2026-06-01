import './Navbar.css';

export function Navbar() {
  return (
    <nav className="modern-navbar">
      <div className="nav-logo">Biscoito 🍪</div>
      <div className="nav-links">
        <a href="/" className="active">Home</a>
        <a href="/tarefas">Tarefas</a>
        <a href="/calendario">Calendário</a>
        <a href="/configuracoes">Configurações</a>
      </div>
      <div className="nav-user">
        <div className="avatar">D</div>
      </div>
    </nav>
  );
}