import { useState } from "react"


function BPOPage() {


const [mostrarCadastro, setMostrarCadastro] = useState(false)

const [nomeCliente, setNomeCliente] = useState("")

const [competencia, setCompetencia] = useState("Julho/2026")


const [clientesBPO, setClientesBPO] = useState([

{
nome: "VIP Podas",
competencia: "Julho/2026",
status: "Aguardando documentos",
cor:"🟡",
tarefas:[
{nome:"Extratos recebidos", feito:false},
{nome:"Faturas recebidas", feito:false},
{nome:"Conciliação realizada", feito:false},
{nome:"DRE fechado", feito:false},
{nome:"Relatório enviado", feito:false},
]
},

{
nome:"Salão Suellen",
competencia:"Julho/2026",
status:"Em processamento",
cor:"🔵",
tarefas:[
{nome:"Extratos recebidos", feito:true},
{nome:"Faturas recebidas", feito:true},
{nome:"Conciliação realizada", feito:false},
{nome:"DRE fechado", feito:false},
{nome:"Relatório enviado", feito:false},
]
}

])





function adicionarCliente(){


if(nomeCliente.trim() === ""){
return
}


const novoCliente = {

nome:nomeCliente,

competencia:competencia,

status:"Aguardando documentos",

cor:"🟡",

tarefas:[

{nome:"Extratos recebidos", feito:false},

{nome:"Faturas recebidas", feito:false},

{nome:"Conciliação realizada", feito:false},

{nome:"DRE fechado", feito:false},

{nome:"Relatório enviado", feito:false}

]

}


setClientesBPO([...clientesBPO, novoCliente])

setNomeCliente("")

setMostrarCadastro(false)


}





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



<button 
className="primary-button"
onClick={()=>setMostrarCadastro(true)}
>

+ Novo Cliente BPO

</button>


</section>





{mostrarCadastro && (


<section className="content-card">


<h2>
➕ Novo Cliente BPO
</h2>



<input

placeholder="Nome do cliente"

value={nomeCliente}

onChange={(e)=>setNomeCliente(e.target.value)}

className="input"

/>



<input

placeholder="Competência"

value={competencia}

onChange={(e)=>setCompetencia(e.target.value)}

className="input"

/>



<button

className="primary-button"

onClick={adicionarCliente}

>

Salvar Cliente

</button>


</section>


)}






<section className="stats-grid">


<div className="stat-card">

<p>Clientes BPO</p>

<strong>{clientesBPO.length}</strong>

<span>Total cadastrados</span>

</div>


<div className="stat-card gold">

<p>Aguardando</p>

<strong>
{clientesBPO.filter(c=>c.status==="Aguardando documentos").length}
</strong>

<span>Pendências</span>

</div>


<div className="stat-card">

<p>Processando</p>

<strong>
{clientesBPO.filter(c=>c.status==="Em processamento").length}
</strong>

<span>Em fechamento</span>

</div>


<div className="stat-card gold">

<p>Finalizados</p>

<strong>
0
</strong>

<span>Relatórios enviados</span>

</div>


</section>






<section className="content-card">


<h2>
📂 Operação Mensal BPO
</h2>


<p>
Clientes em acompanhamento.
</p>



{clientesBPO.map((cliente)=>(


<div 
className="cliente-alerta"
key={cliente.nome}
>


<span>
{cliente.cor}
</span>


<div>


<h3>
{cliente.nome}
</h3>


<p>
Competência: {cliente.competencia}
</p>


<strong>
Status: {cliente.status}
</strong>


<br/><br/>


{cliente.tarefas.map((tarefa)=>(


<p key={tarefa.nome}>

{tarefa.feito ? "✅":"⬜"} {tarefa.nome}

</p>


))}



</div>


</div>



))}




</section>



</div>

)


}



export default BPOPage