import { useEffect, useState } from "react"


function BPOPage(){


const [clientes,setClientes] = useState<any[]>(()=>{

const dados = localStorage.getItem("gfa-bpo-clientes")

return dados ? JSON.parse(dados) : []

})


const [nome,setNome] = useState("")

const [mostrar,setMostrar] = useState(false)

const [aberto,setAberto] = useState<number | null>(null)





useEffect(()=>{

localStorage.setItem(
"gfa-bpo-clientes",
JSON.stringify(clientes)
)

},[clientes])






function progresso(tarefas:any[] = []){


if(tarefas.length===0){

return 0

}


const feitas = tarefas.filter(
t=>t.feito
).length


return Math.round(
(feitas/tarefas.length)*100
)

}






function status(p:number){


if(p===0){

return "🟡 Aguardando documentos"

}


if(p===100){

return "🟢 Fechado"

}


return "🔵 Em processamento"


}









function novoCliente(){


if(!nome){

return

}



const cliente={

id:Date.now(),

nome,

competencia:"Julho/2026",

observacao:"",

documentos:[],

ultimaAtualizacao:new Date().toLocaleDateString(),


tarefas:[

{nome:"Extratos bancários recebidos",feito:false},

{nome:"Faturas cartão recebidas",feito:false},

{nome:"Importação realizada",feito:false},

{nome:"Conciliação finalizada",feito:false},

{nome:"DRE atualizado",feito:false},

{nome:"Relatório enviado",feito:false}

]

}



setClientes([

...clientes,

cliente

])


setNome("")

setMostrar(false)


}








function alterarChecklist(id:number,tarefaNome:string){


setClientes(

clientes.map(c=>{


if(c.id===id){


return{


...c,

ultimaAtualizacao:new Date().toLocaleDateString(),

tarefas:(c.tarefas || []).map((t:any)=>{


if(t.nome===tarefaNome){


return{

...t,

feito:!t.feito

}

}


return t


})


}


}


return c


})


)


}








function salvarObservacao(id:number,texto:string){


setClientes(


clientes.map(c=>{


if(c.id===id){


return{

...c,

observacao:texto,

ultimaAtualizacao:new Date().toLocaleDateString()

}

}


return c


})


)


}









function adicionarDocumento(id:number,doc:string){


if(!doc){

return

}



setClientes(


clientes.map(c=>{


if(c.id===id){


return{


...c,

documentos:[

...(c.documentos || []),

doc

],

ultimaAtualizacao:new Date().toLocaleDateString()

}


}


return c


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

Gestão Operacional Inteligente 🚀

</h1>


<p>

Clientes, documentos, processos e fechamento mensal.

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


<h2>Novo Cliente</h2>


<input

className="input"

placeholder="Nome"

value={nome}

onChange={e=>setNome(e.target.value)}

/>


<button

className="primary-button"

onClick={novoCliente}

>

Cadastrar

</button>


</section>


)}









<section className="stats-grid">


<div className="stat-card">

<p>Clientes</p>

<strong>{clientes.length}</strong>

</div>



<div className="stat-card gold">

<p>Ativos</p>

<strong>

{
clientes.filter(
c=>progresso(c.tarefas)<100
).length
}

</strong>

</div>




<div className="stat-card">

<p>Fechados</p>

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

📂 Operações BPO

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




<strong>

{status(pct)}

</strong>




<p>

📊 Progresso: {pct}%

</p>




<progress

value={pct}

max="100"

style={{width:"100%"}}

/>





<p>

📅 Atualizado:

{" "}

{cliente.ultimaAtualizacao || "Sem registro"}

</p>





<button

className="primary-button"

onClick={()=>setAberto(

aberto===cliente.id ? null : cliente.id

)}

>

Abrir Gestão

</button>









{aberto===cliente.id && (



<div>



<hr/>




<h3>📋 Checklist</h3>




{(cliente.tarefas || []).map((t:any)=>(


<p

key={t.nome}

style={{cursor:"pointer"}}

onClick={()=>alterarChecklist(

cliente.id,

t.nome

)}

>

{t.feito?"✅":"⬜"} {t.nome}


</p>


))}








<h3>📎 Documentos</h3>



{(cliente.documentos || []).map((d:string)=>(


<p key={d}>

📄 {d}

</p>


))}




<input

className="input"

placeholder="Digite documento e aperte ENTER"

onKeyDown={(e:any)=>{


if(e.key==="Enter"){

adicionarDocumento(

cliente.id,

e.target.value

)

e.target.value=""

}


}}

/>









<h3>📝 Observações internas</h3>



<textarea

className="input"

value={cliente.observacao || ""}

placeholder="Anotações sobre este cliente..."

onChange={e=>

salvarObservacao(

cliente.id,

e.target.value

)

}

/>



</div>


)}




</div>



</div>


)


})}



</section>



</div>


)

}



export default BPOPage