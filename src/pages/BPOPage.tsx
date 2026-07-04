import { useEffect, useState } from "react"


function BPOPage(){


const [clientes,setClientes] = useState<any[]>(()=>{

const dados = localStorage.getItem("gfa-bpo-clientes")

return dados ? JSON.parse(dados) : []

})


const [nome,setNome] = useState("")

const [mostrar,setMostrar] = useState(false)

const [filtro,setFiltro] = useState("Todos")

const [aberto,setAberto] = useState<number | null>(null)



useEffect(()=>{

localStorage.setItem(
"gfa-bpo-clientes",
JSON.stringify(clientes)
)

},[clientes])





function progresso(tarefas:any[]){

const feitas = tarefas.filter(t=>t.feito).length

return Math.round(
(feitas / tarefas.length) * 100
)

}





function status(p:number){

if(p===0){

return "🟡 Aguardando"

}

if(p===100){

return "🟢 Fechado"

}

return "🔵 Execução"

}





function proxima(tarefas:any[]){

const item = tarefas.find(t=>!t.feito)

return item ? item.nome : "Finalizado"

}






function novoCliente(){


if(!nome){

return

}


const novo = {


id:Date.now(),

nome,

competencia:"Julho/2026",


tarefas:[

{nome:"Extratos recebidos",feito:false},

{nome:"Cartões recebidos",feito:false},

{nome:"Importação financeira",feito:false},

{nome:"Conciliação bancária",feito:false},

{nome:"DRE atualizado",feito:false},

{nome:"Relatório enviado",feito:false}

]


}



setClientes([...clientes,novo])

setNome("")

setMostrar(false)


}






function alterar(id:number,tarefa:string){



setClientes(

clientes.map(c=>{


if(c.id===id){


return {


...c,


tarefas:c.tarefas.map((t:any)=>{


if(t.nome===tarefa){

return {

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





const lista = clientes.filter(c=>{


const p = progresso(c.tarefas)


if(filtro==="Pendentes"){

return p===0

}


if(filtro==="Execução"){

return p>0 && p<100

}


if(filtro==="Fechados"){

return p===100

}


return true


})








return(

<div>



<section className="dashboard-header">


<div>


<p className="tag">

CENTRAL BPO

</p>


<h1>

Esteira Operacional 🚀

</h1>


<p>

Controle inteligente dos fechamentos financeiros.

</p>


</div>



<button

className="primary-button"

onClick={()=>setMostrar(true)}

>

+ Cliente

</button>



</section>






{mostrar && (


<section className="content-card">


<h2>Novo Cliente</h2>


<input

className="input"

placeholder="Nome cliente"

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

<p>Clientes</p>

<strong>{clientes.length}</strong>

</div>



<div className="stat-card gold">

<p>Em execução</p>

<strong>

{
clientes.filter(c=>{

const p=progresso(c.tarefas)

return p>0 && p<100

}).length
}

</strong>

</div>



<div className="stat-card">

<p>Fechados</p>

<strong>

{
clientes.filter(c=>progresso(c.tarefas)===100).length
}

</strong>

</div>


</section>







<section className="content-card">


<h2>

🔎 Filtros

</h2>


{["Todos","Pendentes","Execução","Fechados"].map(item=>(


<button

key={item}

className="primary-button"

style={{marginRight:10}}

onClick={()=>setFiltro(item)}

>

{item}

</button>


))}



</section>









<section className="content-card">


<h2>

Clientes BPO

</h2>




{lista.map(cliente=>{


const p = progresso(cliente.tarefas)



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

{status(p)}

</strong>



<p>

Progresso: {p}%

</p>




<progress

value={p}

max="100"

style={{width:"100%"}}

/>



<p>

➡ Próxima ação: {proxima(cliente.tarefas)}

</p>





<button

className="primary-button"

onClick={()=>setAberto(

aberto===cliente.id ? null : cliente.id

)}

>

Ver Processo

</button>





{aberto===cliente.id && (


<div>


<br/>


{cliente.tarefas.map((t:any)=>(


<p

key={t.nome}

style={{cursor:"pointer"}}

onClick={()=>alterar(

cliente.id,

t.nome

)}

>

{t.feito?"✅":"⬜"} {t.nome}

</p>


))}


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