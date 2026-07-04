const clientesBPO = [

  {
    nome: "VIP Podas",
    competencia: "Julho/2026",
    status: "Aguardando documentos",
    cor: "🟡",
    tarefas: [
      { nome: "Extratos recebidos", feito: false },
      { nome: "Faturas recebidas", feito: false },
      { nome: "Conciliação realizada", feito: false },
      { nome: "DRE fechado", feito: false },
      { nome: "Relatório enviado", feito: false },
    ],
  },

  {
    nome: "Salão Suellen",
    competencia: "Julho/2026",
    status: "Em processamento",
    cor: "🔵",
    tarefas: [
      { nome: "Extratos recebidos", feito: true },
      { nome: "Faturas recebidas", feito: true },
      { nome: "Conciliação realizada", feito: false },
      { nome: "DRE fechado", feito: false },
      { nome: "Relatório enviado", feito: false },
    ],
  },

  {
    nome: "Farmácia Karina",
    competencia: "Julho/2026",
    status: "Fechado",
    cor: "🟢",
    tarefas: [
      { nome: "Extratos recebidos", feito: true },
      { nome: "Faturas recebidas", feito: true },
      { nome: "Conciliação realizada", feito: true },
      { nome: "DRE fechado", feito: true },
      { nome: "Relatório enviado", feito: true },
    ],
  },

]


function BPOPage() {


return (

<div>


<section className="dashboard-header">

<div>

<p className="tag">
MÓDULO BPO
</p>

<h1>
Gestão BPO Clientes 📂
</h1>

<p>
Controle mensal de documentos, conciliações e fechamentos.
</p>

</div>


<button className="primary-button">
+ Novo Cliente BPO
</button>


</section>





<section className="stats-grid">


<div className="stat-card">

<p>Clientes BPO</p>

<strong>{clientesBPO.length}</strong>

<span>Total cadastrados</span>

</div>


<div className="stat-card gold">

<p>Aguardando</p>

<strong>
1
</strong>

<span>Falta documentação</span>

</div>


<div className="stat-card">

<p>Processando</p>

<strong>
1
</strong>

<span>Em fechamento</span>

</div>


<div className="stat-card gold">

<p>Finalizados</p>

<strong>
1
</strong>

<span>Mês concluído</span>

</div>


</section>





<section className="content-card">


<h2>
📂 Operação Mensal BPO
</h2>


<p>
Acompanhamento dos clientes ativos.
</p>




{clientesBPO.map((cliente)=>(


<div className="cliente-alerta" key={cliente.nome}>


<span>
{cliente.cor}
</span>


<div style={{width:"100%"}}>


<h3>
{cliente.nome}
</h3>


<p>
Competência: {cliente.competencia}
</p>


<strong>
Status: {cliente.status}
</strong>



<div style={{marginTop:"15px"}}>


{cliente.tarefas.map((item)=>(


<p key={item.nome}>

{item.feito ? "✅" : "⬜"} {item.nome}

</p>


))}


</div>



</div>


</div>


))}




</section>


</div>


)


}


export default BPOPage