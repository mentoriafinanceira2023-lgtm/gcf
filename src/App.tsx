import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout'
import ClientsPage from './pages/ClientsPage'
import DashboardPage from './pages/DashboardPage'
import PlaceholderPage from './pages/PlaceholderPage'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/dashboard" replace />}
      />

      <Route
        path="/dashboard"
        element={
          <MainLayout title="Dashboard" subtitle="Visão executiva da operação e dos principais indicadores do GCF.">
            <DashboardPage />
          </MainLayout>
        }
      />

      <Route
        path="/clientes"
        element={
          <MainLayout title="Clientes" subtitle="Gerencie clientes, contratos e relacionamento com praticidade.">
            <ClientsPage />
          </MainLayout>
        }
      />

      <Route
        path="/agenda"
        element={
          <MainLayout title="Agenda" subtitle="Organização de compromissos e reuniões.">
            <PlaceholderPage title="Agenda" description="A estrutura desta página está pronta para receber o módulo de agenda no futuro." />
          </MainLayout>
        }
      />

      <Route
        path="/crm"
        element={
          <MainLayout title="CRM" subtitle="Centralize o relacionamento com os clientes.">
            <PlaceholderPage title="CRM" description="A estrutura desta página está pronta para receber a gestão de relacionamento." />
          </MainLayout>
        }
      />

      <Route
        path="/financeiro"
        element={
          <MainLayout title="Financeiro" subtitle="Controle financeiro e acompanhamento de contratos.">
            <PlaceholderPage title="Financeiro" description="A estrutura desta página está pronta para receber as funcionalidades financeiras." />
          </MainLayout>
        }
      />

      <Route
        path="/bpo"
        element={
          <MainLayout title="BPO" subtitle="Gestão operacional e processos de back office.">
            <PlaceholderPage title="BPO" description="A estrutura desta página está pronta para receber os fluxos de BPO." />
          </MainLayout>
        }
      />

      <Route
        path="/indicadores"
        element={
          <MainLayout title="Indicadores" subtitle="Acompanhe os principais indicadores de desempenho.">
            <PlaceholderPage title="Indicadores" description="A estrutura desta página está pronta para receber os painéis analíticos." />
          </MainLayout>
        }
      />

      <Route
        path="/documentos"
        element={
          <MainLayout title="Documentos" subtitle="Organização e acesso aos documentos do consultor.">
            <PlaceholderPage title="Documentos" description="A estrutura desta página está pronta para receber o módulo de documentos." />
          </MainLayout>
        }
      />

      <Route
        path="/configuracoes"
        element={
          <MainLayout title="Configurações" subtitle="Parâmetros e preferências do sistema.">
            <PlaceholderPage title="Configurações" description="A estrutura desta página está pronta para receber as preferências do sistema." />
          </MainLayout>
        }
      />
    </Routes>
  )
}

export default App
