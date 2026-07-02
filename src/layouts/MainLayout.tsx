import type { ReactNode } from 'react'
import AppHeader from '../components/AppHeader'
import AppSidebar from '../components/AppSidebar'

type MainLayoutProps = {
  title: string
  subtitle: string
  children: ReactNode
}

function MainLayout({ title, subtitle, children }: MainLayoutProps) {
  return (
    <div className="app-shell">
      <AppSidebar />

      <main className="main-panel">
        <AppHeader title={title} subtitle={subtitle} />
        {children}
      </main>
    </div>
  )
}

export default MainLayout
