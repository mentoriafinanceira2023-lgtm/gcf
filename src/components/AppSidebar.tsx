import { NavLink } from 'react-router-dom'

type NavItem = {
  label: string
  icon: string
  path: string
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: '🏠', path: '/dashboard' },
  { label: 'Clientes', icon: '👥', path: '/clientes' },
  { label: 'Agenda', icon: '📅', path: '/agenda' },
  { label: 'CRM', icon: '🤝', path: '/crm' },
  { label: 'Financeiro', icon: '💰', path: '/financeiro' },
  { label: 'BPO', icon: '🏢', path: '/bpo' },
  { label: 'Indicadores', icon: '📊', path: '/indicadores' },
  { label: 'Documentos', icon: '📄', path: '/documentos' },
  { label: 'Configurações', icon: '⚙', path: '/configuracoes' },
]

function AppSidebar() {
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
          <NavLink key={item.path} to={item.path} className="nav-link">
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default AppSidebar
