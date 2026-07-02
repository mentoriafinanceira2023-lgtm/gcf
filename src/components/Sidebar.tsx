type NavItem = {
  label: string
  icon: string
  view: 'dashboard' | 'clients'
}

type SidebarProps = {
  activeView: 'dashboard' | 'clients'
  onNavigate: (view: 'dashboard' | 'clients') => void
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: '🏠', view: 'dashboard' },
  { label: 'Clientes', icon: '👥', view: 'clients' },
  { label: 'Agenda', icon: '📅', view: 'dashboard' },
  { label: 'CRM', icon: '🤝', view: 'dashboard' },
  { label: 'Financeiro', icon: '💰', view: 'dashboard' },
  { label: 'BPO', icon: '🏢', view: 'dashboard' },
  { label: 'Indicadores', icon: '📊', view: 'dashboard' },
  { label: 'Documentos', icon: '📄', view: 'dashboard' },
  { label: 'Configurações', icon: '⚙', view: 'dashboard' },
]

function Sidebar({ activeView, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand-block">
        <div className="brand-mark">GCF</div>
        <div>
          <h2>Gestão e Consultoria</h2>
          <p>Financeira</p>
        </div>
      </div>

      <nav className="nav-menu" aria-label="Menu lateral">
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`nav-link ${activeView === item.view ? 'active' : ''}`}
            onClick={() => onNavigate(item.view)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
