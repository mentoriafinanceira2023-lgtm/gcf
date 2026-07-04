import { useEffect, useState } from "react"


function BPOPage(){


const [clientes,setClientes]=useState<any[]>([])


const [operacoes,setOperacoes]=useState<any[]>(()=>{

const dados=localStorage.getItem("gfa-bpo-operacoes")

return dados ? JSON.parse(dados) : []

})


const [competencia,setCompetencia]=useState("Julho/2026")

const [aberto,setAberto]=useState<number|null>(null)





// BUSCA CLIENTES DO CRM

useEffect(()=>{


const dados=localStorage.getItem("gfa-clientes")


if(dados){


const todos=JSON.parse(dados)


const bpos=todos.filter(

(c:any)=>

c.servico==="BPO Financeiro"

&&

c.status==="Ativo"

)


setClientes(bpos)


// remove operações sem cliente existente

setOperacoes(

ops=>ops.filter(

op=>

bpos.some(

(c:any)=>c.id===op.clienteId

)

)

)


}


},[])







// SALVA PROCESSOS

useEffect(()=>{


localStorage.setItem(

"gfa-bpo-operacoes",

JSON.stringify(operacoes)

)


},[operacoes])









function progresso(tarefas:any[]=[]){


if(tarefas.length===0){

return 0

}


const feitas=tarefas.filter(

t=>t.feito

).length



return Math.round(

(feitas/tarefas.length)*100

)


}









function criarFechamento(cliente:any){



const existe=operacoes.some(

op=>

op.clienteId===cliente.id

&&

op.competencia===competencia

)



if(existe){

alert("Fechamento já criado")

return

}




const novo={


id:Date.now(),

clienteId:cliente.id,

cliente:cliente.empresa,

competencia,

tarefas:[


{
nome:"Receber extratos bancários",
feito:false
},

{
nome:"Receber faturas cartões",
feito:false
},

{
nome:"Importar lançamentos",
feito:false
},

{
nome:"Conciliar movimentações",
feito:false
},

{
nome:"Atualizar DRE",
feito:false
},

{
nome:"Enviar relatório ao cliente",
feito:false
}


]


}



setOperacoes([

...operacoes,

novo

])


}









function alterar(id:number,item:string){


setOperacoes(

operacoes.map(op=>{


if(op.id!==id){

return op

}



return{


...op,


tarefas:op.tarefas.map((t:any)=>


t.nome===item

?

{...t,feito:!t.feito}

:

t


)


}


})


)


}








const lista=operacoes.filter(

op=>op.competencia===competencia

)



const andamento=lista.filter(

op=>progresso(op.tarefas)<100

).length



const fechados=lista.filter(

op=>progresso(op.tarefas)===100

).length







return(

<div>



<section

className="content-card"

style={{

background:"#0b1f3a",

color:"white"

}}

>


<h1>

BPO Financeiro 📂

</h1>


<p>

Gestão operacional integrada aos clientes GFA.

</p>


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


<option>Julho/2026</option>

<option>Agosto/2026</option>

<option>Setembro/2026</option>

<option>Outubro/2026</option>


</select>


</section>









<section className="stats-grid">


<div className="stat-card">

<p>Clientes BPO</p>

<strong>{clientes.length}</strong>

</div>



<div className="stat-card gold">

<p>Em andamento</p>

<strong>{andamento}</strong>

</div>



<div className="stat-card">

<p>Fechados</p>

<strong>{fechados}</strong>

</div>


</section>










<section className="content-card">


<h2>

🏢 Clientes para fechamento

</h2>




{clientes.map(cliente=>(


<div

className="cliente-alerta"

key={cliente.id}

>


<div

style={{

display:"flex",

justifyContent:"space-between",

width:"100%"

}}

>


<strong>

{cliente.empresa}

</strong>




<button

className="primary-button"

onClick={()=>criarFechamento(cliente)}

>

Criar fechamento

</button>



</div>


</div>


))}


</section>









<section className="content-card">


<h2>

📂 Fechamentos {competencia}

</h2>





{lista.map(op=>(


<div

className="cliente-alerta"

key={op.id}

>


<div style={{width:"100%"}}>


<h3>

🏢 {op.cliente}

</h3>



<p>

Progresso: {progresso(op.tarefas)}%

</p>



<progress

value={progresso(op.tarefas)}

max="100"

style={{width:"100%"}}

/>




<button

className="primary-button"

onClick={()=>setAberto(

aberto===op.id?null:op.id

)}

>

Abrir Processo

</button>





{aberto===op.id && (

<div>


{op.tarefas.map((t:any)=>(


<p

key={t.nome}

style={{cursor:"pointer"}}

onClick={()=>alterar(op.id,t.nome)}

>


{t.feito?"✅":"⬜"}

{" "}

{t.nome}


</p>


))}


</div>


)}



</div>


</div>


))}


</section>



</div>


)


}


export default BPOPage