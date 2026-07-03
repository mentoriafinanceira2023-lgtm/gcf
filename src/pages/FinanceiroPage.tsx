import FinanceCard from "../components/Financeiro/FinanceCard"

function FinanceiroPage() {
  return (
    <div>
      <h1>Gestão Financeira</h1>

      <p>Visão estratégica do negócio</p>

      <div className="dashboard-grid">

        <FinanceCard
          titulo="Receita Prevista"
          valor="R$ 0,00"
          descricao="Entradas previstas no mês"
        />

        <FinanceCard
          titulo="Recebido"
          valor="R$ 0,00"
          descricao="Valores confirmados"
        />

        <FinanceCard
          titulo="Em Aberto"
          valor="R$ 0,00"
          descricao="Valores pendentes"
        />

        <FinanceCard
          titulo="Resultado"
          valor="R$ 0,00"
          descricao="Resultado operacional"
        />

      </div>
    </div>
  )
}

export default FinanceiroPage