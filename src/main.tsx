import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { AppStateProvider } from './contexts/AppStateContext'
import { CalendarProvider } from './modules/agenda/CalendarProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppStateProvider>
        <CalendarProvider>
          <App />
        </CalendarProvider>
      </AppStateProvider>
    </BrowserRouter>
  </StrictMode>,
)
