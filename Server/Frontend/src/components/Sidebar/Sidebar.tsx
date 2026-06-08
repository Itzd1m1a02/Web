import './Sidebar.css';

interface SidebarProps {
  onHomeClick: () => void;
  onCalendarClick: () => void;
  onTasksClick: () => void;
}

export function Sidebar({ onHomeClick, onCalendarClick, onTasksClick }: SidebarProps) {
  return (
    <nav className="sidebar">
      <div className="avatar">D</div>
      <div className="menu-icons">
        <button className="icon-btn active" onClick={onHomeClick}>
          🏠
        </button>
        <button className="icon-btn" onClick={onCalendarClick}>
          📅
        </button>
        <button className="icon-btn" onClick={onTasksClick}>
          📊
        </button>
        <button className="icon-btn">⚙️</button>
      </div>
      <button className="icon-btn info-btn">ℹ️</button>
    </nav>
  );
}
