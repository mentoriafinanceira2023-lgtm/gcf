import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/DashboardPage";
import PlaceholderPage from "./pages/PlaceholderPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/clientes"
          element={
            <PlaceholderPage
              title="Clientes"
              description="Cadastro e gestão dos clientes do Sistema GCF"
            />
          }
        />

        <Route
          path="/cliente360"
          element={
            <PlaceholderPage
              title="Cliente 360°"
              description="Visão completa do cliente financeiro"
            />
          }
        />

        <Route
          path="/diagnostico"
          element={
            <PlaceholderPage
              title="Diagnóstico Financeiro"
              description="Área de inspeção e análise financeira"
            />
          }
        />

        <Route
          path="/documentos"
          element={
            <PlaceholderPage
              title="Documentos"
              description="Central de documentos, contratos e arquivos dos clientes"
            />
          }
        />

        <Route
          path="/contratos"
          element={
            <PlaceholderPage
              title="Contratos"
              description="Gerador e armazenamento de contratos"
            />
          }
        />

        <Route
          path="/bpo"
          element={
            <PlaceholderPage
              title="BPO Financeiro"
              description="Gestão financeira empresarial"
            />
          }
        />

        <Route
          path="/relatorios"
          element={
            <PlaceholderPage
              title="Relatórios"
              description="Indicadores e análises financeiras"
            />
          }
        />

        <Route
          path="/configuracoes"
          element={
            <PlaceholderPage
              title="Configurações"
              description="Configurações gerais do GCF"
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;