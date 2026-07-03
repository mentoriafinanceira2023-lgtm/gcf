import { useState } from "react"
import FinanceCard from "../components/Financeiro/FinanceCard"
import FinanceTable from "../components/Financeiro/FinanceTable"
import FinanceForm from "../components/Financeiro/FinanceForm"

function FinanceiroPage() {

  const [lancamentos, setLancamentos] = useState<any[]>([])

  function adicionarLancamento(item:any){
    setLancamentos([...lancamentos, item])
  }

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
  valor={`R$ ${lancamentos
    .filter(item => item.status === "Aberto")
    .reduce((total, item) => total + Number(item.valor || 0), 0)
    .toFixed(2)}`}
  descricao="Valores pendentes"
/>

        <FinanceCard
  titulo="Receita Prevista"
  valor={`R$ ${lancamentos.reduce((total, item) => total + Number(item.valor || 0), 0).toFixed(2)}`}
  descricao="Entradas previstas no mês"
/>

      </div>

      <FinanceForm adicionarLancamento={adicionarLancamento} />

      <FinanceTable lancamentos={lancamentos} />

    </div>
  )
}

export default FinanceiroPage