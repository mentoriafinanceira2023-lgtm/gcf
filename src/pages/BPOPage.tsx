import { useEffect, useState } from "react"


function BPOPage(){


const [clientes,setClientes] = useState<any[]>(()=>{

const dados = localStorage.getItem("gfa-bpo-clientes")

return dados ? JSON.parse(dados) : []

})


const [nome,setNome] = useState("")

const [mostrar,setMostrar] = useState(false)



useEffect(()=>{

localStorage.setItem(
"gfa-bpo-clientes",
JSON.stringify(clientes)
)

},[clientes])





function progresso(tarefas:any[]){

const total = tarefas.length

const feitas = tarefas.filter(
t=>t.feito
).length


return Math.round(
(feitas / total) * 100
)

}




function statusCliente(percentual:number){


if(percentual===0){

return "🟡 Aguardando cliente"

}


if(percentual===100){

return "🟢 Fechado"

}


return "🔵 Em execução"


}






function proximaAcao(tarefas:any[]){


const pendente = tarefas.find(
t=>!t.feito
)


return pendente
?
pendente.nome
:
"Processo concluído"


}







function novoCliente(){


if(!nome){

return

}



const cliente={


id:Date.now(),

nome,

competencia:"Julho/2026",


tarefas:[


{
etapa:"📥 Coleta",
nome:"Receber extratos bancários",
feito:false
},


{
etapa:"📥 Coleta",
nome:"Receber faturas cartões",
feito:false
},


{
etapa:"⚙️ Processamento",
nome:"Importar movimentações",
feito:false
},


{
etapa:"⚙️ Processamento",
nome:"Realizar conciliação",
feito:false
},


{
etapa:"📊 Gestão",
nome:"Atualizar DRE",
feito:false
},


{
etapa:"📊 Gestão",
nome:"Analisar indicadores",
feito:false
},


{
etapa:"🤝 Entrega",
nome:"Enviar relatório ao cliente",
feito:false
}


]


}



setClientes([

...clientes,

cliente

])


setNome("")

setMostrar(false)


}







function alterar(id:number,nomeTarefa:string){



setClientes(

clientes.map(cliente=>{


if(cliente.id===id){



return {


...cliente,


tarefas:cliente.tarefas.map((t:any)=>{


if(t.nome===nomeTarefa){


return {

...t,

feito:!t.feito

}


}


return t


})


}



}


return cliente


})


)


}








return(

<div>



<section className="dashboard-header">


<div>


<p className="tag">

CENTRAL BPO GFA

</p>


<h1>

Operação Financeira Inteligente 🚀

</h1>


<p>

Controle completo dos fechamentos mensais dos clientes.

</p>


</div>



<button

className="primary-button"

onClick={()=>setMostrar(true)}

>

+ Cliente BPO

</button>



</section>








{mostrar && (


<section className="content-card">


<h2>

Novo Cliente

</h2>



<input

className="input"

placeholder="Nome do cliente"

value={nome}

onChange={e=>setNome(e.target.value)}

/>


<button

className="primary-button"

onClick={novoCliente}

>

Salvar

</button>


</section>


)}








<section className="stats-grid">


<div className="stat-card">

<p>Total Clientes</p>

<strong>

{clientes.length}

</strong>

</div>



<div className="stat-card gold">

<p>Em andamento</p>

<strong>

{

clientes.filter(
c=>progresso(c.tarefas)<100
).length

}

</strong>

</div>




<div className="stat-card">

<p>Finalizados</p>

<strong>

{

clientes.filter(
c=>progresso(c.tarefas)===100
).length

}

</strong>

</div>


</section>








<section className="content-card">


<h2>

📋 Esteira de Fechamentos

</h2>






{clientes.map(cliente=>{


const pct = progresso(cliente.tarefas)


return(


<div

className="cliente-alerta"

key={cliente.id}

>


<div style={{width:"100%"}}>



<h3>

🏢 {cliente.nome}

</h3>



<p>

Competência: {cliente.competencia}

</p>



<strong>

{statusCliente(pct)}

</strong>




<p>

Progresso: {pct}%

</p>




<p>

➡ Próxima ação:
{" "}
{proximaAcao(cliente.tarefas)}

</p>





<hr/>




{cliente.tarefas.map((t:any)=>(


<p

key={t.nome}

style={{cursor:"pointer"}}

onClick={()=>alterar(

cliente.id,

t.nome

)}

>


{t.feito?"✅":"⬜"}

{" "}

{t.etapa}

 -

{" "}

{t.nome}


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
