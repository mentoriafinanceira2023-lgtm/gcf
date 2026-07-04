import { Navigate, Route, Routes } from "react-router-dom"

import "./App.css"

import MainLayout from "./layouts/MainLayout"

import DashboardPage from "./pages/DashboardPage"
import ClientsPage from "./pages/ClientsPage"
import PlaceholderPage from "./pages/PlaceholderPage"
import BPOPage from "./pages/BPOPage"


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

          <MainLayout

            title="Dashboard"

            subtitle="Visão executiva da operação e dos principais indicadores do GGCF."

          >

            <DashboardPage />

          </MainLayout>

        }

      />




      <Route

        path="/clientes"

        element={

          <MainLayout

            title="Clientes"

            subtitle="Gerencie clientes, contratos e relacionamento com praticidade."

          >

            <ClientsPage />

          </MainLayout>

        }

      />




      <Route

        path="/bpo"

        element={

          <MainLayout

            title="BPO Financeiro"

            subtitle="Gestão operacional dos clientes BPO."

          >

            <BPOPage />

          </MainLayout>

        }

      />




      <Route

        path="/agenda"

        element={

          <MainLayout

            title="Agenda"

            subtitle="Controle reuniões, entregas e compromissos."

          >

            <PlaceholderPage />

          </MainLayout>

        }

      />





      <Route

        path="/crm"

        element={

          <MainLayout

            title="CRM"

            subtitle="Pipeline comercial e relacionamento."

          >

            <PlaceholderPage />

          </MainLayout>

        }

      />






      <Route

        path="/financeiro"

        element={

          <MainLayout

            title="Financeiro"

            subtitle="Receitas, recebimentos e resultados."

          >

            <PlaceholderPage />

          </MainLayout>

        }

      />






      <Route

        path="/indicadores"

        element={

          <MainLayout

            title="Indicadores"

            subtitle="Acompanhe evolução dos clientes."

          >

            <PlaceholderPage />

          </MainLayout>

        }

      />





      <Route

        path="/documentos"

        element={

          <MainLayout

            title="Documentos"

            subtitle="Arquivos e documentos importantes."

          >

            <PlaceholderPage />

          </MainLayout>

        }

      />




      <Route

        path="/configuracoes"

        element={

          <MainLayout

            title="Configurações"

            subtitle="Ajustes do sistema."

          >

            <PlaceholderPage />

          </MainLayout>

        }

      />



    </Routes>

  )

}


export default App