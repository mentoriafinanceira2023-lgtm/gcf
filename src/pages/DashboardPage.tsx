import { useEffect, useState } from "react"


function BPOPage(){


const [clientes,setClientes] = useState<any[]>([])

const [operacoes,setOperacoes] = useState<any[]>(()=>{

const dados = localStorage.getItem("gfa-bpo-operacoes")

return dados ? JSON.parse(dados) : []

})


const [competencia,setCompetencia] = useState("Julho/2026")

const [aberto,setAberto] = useState<number | null>(null)






useEffect(()=>{


const dados = localStorage.getItem("gfa-clientes")


if(dados){


const lista = JSON.parse(dados)


setClientes(

lista.filter(

(c:any)=>

c.servico==="BPO Financeiro"

&&

c.status==="Ativo"


)

)


}



},[])








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








function iniciarFechamento(cliente:any){



const existe = operacoes.some(

op=>

op.clienteId===cliente.id

&&

op.competencia===competencia


)



if(existe){

return

}




const nova={


id:Date.now(),


clienteId:cliente.id,


nome:cliente.empresa,


competencia,


observacao:"",



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
nome:"Importação financeira",
feito:false
},


{
nome:"Conciliação bancária",
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



setOperacoes([

...operacoes,

nova

])


}










function alterarChecklist(id:number,tarefa:string){



setOperacoes(


operacoes.map(op=>{


if(op.id===id){



return{


...op,


tarefas:op.tarefas.map((t:any)=>{


if(t.nome===tarefa){


return{

...t,

feito:!t.feito

}


}


return t


})


}


}



return op


})


)


}










const operacoesMes = operacoes.filter(

op=>op.competencia===competencia

)









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

BPO Financeiro ⚙️

</h1>



<p>

Gestão dos fechamentos mensais dos clientes.

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











<section className="content-card">


<h2>

Clientes disponíveis BPO

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

🏢 {cliente.empresa}

</strong>




<button

className="primary-button"

onClick={()=>iniciarFechamento(cliente)}

>

Iniciar fechamento

</button>




</div>



</div>


))}



</section>









<section className="content-card">


<h2>

📂 Fechamentos {competencia}

</h2>





{operacoesMes.map(op=>{


const pct=progresso(op.tarefas)



return(



<div

className="cliente-alerta"

key={op.id}

>



<div style={{width:"100%"}}>



<h3>

🏢 {op.nome}

</h3>




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

aberto===op.id

?

null

:

op.id

)}

>

Processo

</button>







{aberto===op.id && (


<div>


<br/>




{op.tarefas.map((t:any)=>(


<p

key={t.nome}

style={{cursor:"pointer"}}

onClick={()=>alterarChecklist(

op.id,

t.nome

)}

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



)



})}





</section>





</div>

)


}



export default BPOPage