interface FinanceCardProps {
  titulo: string
  valor: string
  descricao: string
}

function FinanceCard({ titulo, valor, descricao }: FinanceCardProps) {
  return (
    <div className="card">
      <h3>{titulo}</h3>
      <h2>{valor}</h2>
      <p>{descricao}</p>
    </div>
  )
}

export default FinanceCard