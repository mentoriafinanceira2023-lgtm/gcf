import { useState } from "react"

type Props = {
  adicionarLancamento: (item: any) => void
}

function FinanceForm({ adicionarLancamento }: Props) {

  const [descricao, setDescricao] = useState("")
  const [cliente, setCliente] = useState("")
  const [vencimento, setVencimento] = useState("")
  const [valor, setValor] = useState("")
  const [status, setStatus] = useState("Aberto")

  function salvar() {

    const novo = {
      descricao,
      cliente,
      vencimento,
      valor: `R$ ${valor}`,
      status
    }

    adicionarLancamento(novo)

    setDescricao("")
    setCliente("")
    setVencimento("")
    setValor("")
  }


  return (

    <div className="finance-form">

      <h3>Novo Lançamento</h3>


      <input
        placeholder="Descrição"
        value={descricao}
        onChange={(e)=>setDescricao(e.target.value)}
      />


      <input
        placeholder="Cliente"
        value={cliente}
        onChange={(e)=>setCliente(e.target.value)}
      />


      <input
        type="date"
        value={vencimento}
        onChange={(e)=>setVencimento(e.target.value)}
      />


      <input
        placeholder="Valor"
        value={valor}
        onChange={(e)=>setValor(e.target.value)}
      />


      <select
        value={status}
        onChange={(e)=>setStatus(e.target.value)}
      >

        <option>Aberto</option>
        <option>Recebido</option>

      </select>


      <button onClick={salvar}>
        Salvar lançamento
      </button>


    </div>

  )
}


export default FinanceForm