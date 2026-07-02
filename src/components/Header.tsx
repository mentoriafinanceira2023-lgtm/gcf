type HeaderProps = {
  title: string
  subtitle: string
}

function Header({ title, subtitle }: HeaderProps) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Painel corporativo</p>
        <h1>{title}</h1>
        <p className="subtitle">{subtitle}</p>
      </div>

      <div className="topbar-actions">
        <button type="button" className="secondary-btn">
          + Nova consulta
        </button>
        <div className="user-chip">
          <span>JS</span>
        </div>
      </div>
    </header>
  )
}

export default Header
