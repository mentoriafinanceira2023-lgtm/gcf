import { useMemo } from 'react'

type AppHeaderProps = {
  title: string
  subtitle: string
}

function AppHeader({ title, subtitle }: AppHeaderProps) {
  const now = useMemo(() => new Date(), [])

  const formattedDate = now.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  const greeting = now.getHours() < 12 ? 'Bom dia' : now.getHours() < 18 ? 'Boa tarde' : 'Boa noite'

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Painel corporativo</p>
        <h1>{title}</h1>
        <p className="subtitle">{subtitle}</p>
      </div>

      <div className="topbar-actions">
        <div className="header-meta">
          <div className="greeting">{greeting}, João</div>
          <div className="date-text">{formattedDate}</div>
        </div>
        <button type="button" className="notification-pill" aria-label="Notificações">
          🔔
        </button>
        <div className="user-chip">JS</div>
      </div>
    </header>
  )
}

export default AppHeader
