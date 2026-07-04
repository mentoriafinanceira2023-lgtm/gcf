import { useEffect, useState } from "react"


function BPOPage(){


const [mostrarCadastro,setMostrarCadastro] = useState(false)

const [nomeCliente,setNomeCliente] = useState("")

const [competencia,setCompetencia] = useState("Julho/2026")



const [clientesBPO,setClientesBPO] = useState<any[]>(()=>{

const dados = localStorage.getItem("gfa-bpo-clientes")

return dados ? JSON.parse(dados) : []

})




useEffect(()=>{

localStorage.setItem(
"gfa-bpo-clientes",
JSON.stringify(clientesBPO)
)

},[clientesBPO])





function calcularStatus(tarefas:any[]){


const total = tarefas.length

const feitas = tarefas.filter(
t=>t.feito
).length



if(feitas === 0){

return {
texto:"Aguardando documentos",
cor:"🟡"
}

}



if(feitas === total){

return {
texto:"Fechamento concluído",
cor:"🟢"
}

}



return {
texto:"Em processamento",
cor:"🔵"
}


}









function adicionarCliente(){


if(nomeCliente.trim()===""){
return
}



const novoCliente = {

id:Date.now(),

nome:nomeCliente,

competencia,


tarefas:[

{nome:"Extratos recebidos",feito:false},

{nome:"Faturas recebidas",feito:false},

{nome:"Conciliação realizada",feito:false},

{nome:"DRE fechado",feito:false},

{nome:"Relatório enviado",feito:false}

]

}



setClientesBPO([

...clientesBPO,

novoCliente

])


setNomeCliente("")

setMostrarCadastro(false)

}








function alterarChecklist(clienteId:number,tarefaNome:string){


const atualizado = clientesBPO.map(cliente=>{


if(cliente.id === clienteId){


return {

...cliente,


tarefas:cliente.tarefas.map((tarefa:any)=>{


if(tarefa.nome === tarefaNome){


return {

...tarefa,

feito:!tarefa.feito

}


}


return tarefa


})


}


}


return cliente


})



setClientesBPO(atualizado)


}









return(

<div>



<section className="dashboard-header">


<div>


<p className="tag">

MÓDULO BPO

</p>


<h1>

Gestão Operacional BPO 📂

</h1>


<p>

Controle inteligente de fechamentos financeiros.

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


<h2>Novo Cliente</h2>



<input

className="input"

placeholder="Nome do cliente"

value={nomeCliente}

onChange={(e)=>setNomeCliente(e.target.value)}

/>



<input

className="input"

value={competencia}

onChange={(e)=>setCompetencia(e.target.value)}

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


<strong>

{clientesBPO.length}

</strong>


<span>

Operações cadastradas

</span>


</div>



</section>










<section className="content-card">


<h2>

📋 Controle de Fechamentos

</h2>





{clientesBPO.length===0 && (

<p>Nenhum cliente cadastrado.</p>

)}






{clientesBPO.map(cliente=>{


const status = calcularStatus(cliente.tarefas)



return(


<div

className="cliente-alerta"

key={cliente.id}

>



<span>

{status.cor}

</span>



<div>


<h3>

{cliente.nome}

</h3>


<p>

Competência: {cliente.competencia}

</p>


<strong>

{status.texto}

</strong>


<br/>

<br/>




{cliente.tarefas.map((tarefa:any)=>(



<p

key={tarefa.nome}

onClick={()=>alterarChecklist(

cliente.id,

tarefa.nome

)}

style={{cursor:"pointer"}}

>


{tarefa.feito ? "✅":"⬜"} {tarefa.nome}


</p>



))}



</div>


</div>


)



})}



</section>



</div>


)


}



export default BPOPage