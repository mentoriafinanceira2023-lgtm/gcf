import { useEffect, useState } from "react"


function BPOPage(){


const [competencia,setCompetencia] = useState("Julho/2026")

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






function progresso(tarefas:any[]){


if(!tarefas || tarefas.length===0){

return 0

}


const feitas = tarefas.filter(t=>t.feito).length


return Math.round(

(feitas/tarefas.length)*100

)


}






function status(p:number){


if(p===0){

return "🟡 Aguardando"

}


if(p===100){

return "🟢 Fechado"

}


return "🔵 Em execução"


}









function criarCliente(){


if(!nome){

return

}



const novo={


id:Date.now(),


nome,


competencia,


documentos:[],


observacao:"",


tarefas:[


{
nome:"Extratos recebidos",
feito:false
},


{
nome:"Faturas recebidas",
feito:false
},


{
nome:"Importação realizada",
feito:false
},


{
nome:"Conciliação concluída",
feito:false
},


{
nome:"DRE atualizado",
feito:false
},


{
nome:"Relatório enviado",
feito:false
}


]


}




setClientes([

...clientes,

novo

])


setNome("")

setMostrar(false)


}









function alterarChecklist(id:number,tarefaNome:string){


setClientes(


clientes.map(cliente=>{


if(cliente.id===id){



return{


...cliente,


tarefas:cliente.tarefas.map((t:any)=>{


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


return cliente


})


)


}









const clientesMes = clientes.filter(

c=>c.competencia===competencia

)








return(

<div>





<section className="dashboard-header">


<div>


<p className="tag">

BPO GFA

</p>


<h1>

Calendário Operacional 📅

</h1>


<p>

Controle mensal dos fechamentos financeiros.

</p>


</div>



<button

className="primary-button"

onClick={()=>setMostrar(true)}

>

+ Cliente

</button>



</section>










<section className="content-card">


<h2>

📅 Competência

</h2>




<select

className="input"

value={competencia}

onChange={e=>setCompetencia(e.target.value)}

>


<option>

Junho/2026

</option>


<option>

Julho/2026

</option>


<option>

Agosto/2026

</option>


<option>

Setembro/2026

</option>



</select>




</section>










{mostrar && (



<section className="content-card">


<h2>

Novo cliente - {competencia}

</h2>




<input

className="input"

placeholder="Nome do cliente"

value={nome}

onChange={e=>setNome(e.target.value)}

/>



<button

className="primary-button"

onClick={criarCliente}

>

Salvar

</button>



</section>


)}










<section className="stats-grid">


<div className="stat-card">


<p>Clientes mês</p>


<strong>

{clientesMes.length}

</strong>


</div>






<div className="stat-card gold">


<p>Em andamento</p>


<strong>


{


clientesMes.filter(c=>{

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


clientesMes.filter(

c=>progresso(c.tarefas)===100

).length


}


</strong>



</div>



</section>











<section className="content-card">


<h2>

📂 Fechamentos {competencia}

</h2>







{clientesMes.length===0 && (


<p>

Nenhum cliente nesta competência.

</p>


)}









{clientesMes.map(cliente=>{


const pct=progresso(cliente.tarefas)


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

Progresso: {pct}%

</p>





<progress

value={pct}

max="100"

style={{width:"100%"}}

/>






<button

className="primary-button"

onClick={()=>setAberto(

aberto===cliente.id

?

null

:

cliente.id

)}

>

Abrir Processo

</button>








{aberto===cliente.id && (


<div>


<br/>




{cliente.tarefas.map((t:any)=>(


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