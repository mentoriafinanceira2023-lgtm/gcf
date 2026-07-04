import { useEffect, useState } from "react"


function BPOPage(){


const [clientes,setClientes] = useState<any[]>([])


const [operacoes,setOperacoes] = useState<any[]>(()=>{

const dados = localStorage.getItem("gfa-bpo-operacoes")

return dados ? JSON.parse(dados) : []

})


const [competencia,setCompetencia] = useState("Julho/2026")

const [processo,setProcesso] = useState<number|null>(null)





// BUSCA CLIENTES DO CRM

useEffect(()=>{


function carregarClientes(){


const dados = localStorage.getItem("gfa-clientes")


if(dados){


const todos = JSON.parse(dados)


const somenteBpo = todos.filter(

(c:any)=>

c.servico==="BPO Financeiro"

&&

c.status==="Ativo"

)


setClientes(somenteBpo)


}


}



carregarClientes()



window.addEventListener(

"storage",

carregarClientes

)



return ()=>{

window.removeEventListener(

"storage",

carregarClientes

)

}


},[])








// SALVA OPERAÇÕES

useEffect(()=>{


localStorage.setItem(

"gfa-bpo-operacoes",

JSON.stringify(operacoes)

)


},[operacoes])










function progresso(tarefas:any[]){


if(!tarefas){

return 0

}


const feitas = tarefas.filter(

t=>t.feito

).length



return Math.round(

(feitas/tarefas.length)*100

)


}









function criarProcesso(cliente:any){



const existe = operacoes.find(

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

nome:"Receber documentos",

feito:false

},


{

nome:"Lançamentos financeiros",

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

nome:"Reunião fechamento",

feito:false

}


]


}





setOperacoes([

...operacoes,

novo

])



}









function marcar(id:number,item:string){



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

BPO Financeiro 📂

</h1>


<p>

Operação integrada ao cadastro de clientes.

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

Clientes BPO disponíveis

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

onClick={()=>criarProcesso(cliente)}

>

Criar fechamento

</button>




</div>


</div>


))}



</section>











<section className="content-card">


<h2>

📂 Operações {competencia}

</h2>






{operacoesMes.map(op=>(



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

onClick={()=>setProcesso(

processo===op.id

?

null

:

op.id

)}

>

Abrir Processo

</button>






{processo===op.id && (


<div>


{

op.tarefas.map((t:any)=>(


<p

key={t.nome}

onClick={()=>marcar(op.id,t.nome)}

style={{cursor:"pointer"}}

>


{t.feito ? "✅":"⬜"}

{" "}

{t.nome}


</p>


))


}


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