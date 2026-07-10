import { useEffect, useState } from "react"


function ClientsPage(){


const modelo={

empresa:"",
responsavel:"",
telefone:"",
email:"",
servico:"Mentoria Individual",
status:"Ativo",
valor:"",

receita:"",
despesas:"",
dividas:"",
patrimonio:"",
reserva:"",

jornada:"Diagnóstico",
saude:"50",

observacao:""

}



const [clientes,setClientes]=useState<any[]>(()=>{

const dados=localStorage.getItem("gfa-clientes")

return dados ? JSON.parse(dados) : []

})


const [mentorias,setMentorias]=useState<any[]>([])

const [bpos,setBpos]=useState<any[]>([])


const [form,setForm]=useState(modelo)

const [cadastro,setCadastro]=useState(false)

const [editando,setEditando]=useState<any>(null)

const [clienteAberto,setClienteAberto]=useState<any>(null)

const [busca,setBusca]=useState("")





useEffect(()=>{


localStorage.setItem(

"gfa-clientes",

JSON.stringify(clientes)

)



const m=localStorage.getItem("gfa-mentorias")

const b=localStorage.getItem("gfa-bpo-operacoes")


if(m){

setMentorias(JSON.parse(m))

}


if(b){

setBpos(JSON.parse(b))

}


},[clientes])










function salvar(){


if(!form.empresa){

alert("Informe o cliente")

return

}




if(editando){


setClientes(

clientes.map(c=>

c.id===editando.id

?

{...c,...form}

:

c

)

)


}else{


setClientes([

...clientes,

{

id:Date.now(),

...form

}

])


}



setCadastro(false)

setEditando(null)

setForm(modelo)


}









function editar(cliente:any){


setForm(cliente)

setEditando(cliente)

setCadastro(true)


}









function excluir(id:number){


if(!confirm("Excluir cliente?")){

return

}



setClientes(

clientes.filter(c=>c.id!==id)

)


}








function progresso(tarefas:any[]=[]){


if(tarefas.length===0){

return 0

}


return Math.round(

(tarefas.filter(t=>t.feito).length/tarefas.length)*100

)


}









const lista=clientes.filter(c=>

c.empresa

.toLowerCase()

.includes(busca.toLowerCase())

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

Cliente 360° GFA 👥

</h1>


<p>

Central integrada: Cliente + Mentoria + BPO

</p>



<button

className="primary-button"

onClick={()=>{

setCadastro(true)

setEditando(null)

setForm(modelo)

}}

>

+ Novo Cliente

</button>



</section>









<section className="content-card">


<input

className="input"

placeholder="🔎 Buscar cliente"

value={busca}

onChange={e=>setBusca(e.target.value)}

/>


</section>










{cadastro && (


<section className="content-card">


<h2>

{editando?"Editar Cliente":"Novo Cliente"}

</h2>




<div

style={{

display:"grid",

gridTemplateColumns:"1fr 1fr",

gap:"12px"

}}

>


{Object.keys(modelo).map(c=>(


<input

key={c}

className="input"

placeholder={c}

value={(form as any)[c]}

onChange={e=>

setForm({

...form,

[c]:e.target.value

})

}

/>


))}


</div>




<br/>


<button

className="primary-button"

onClick={salvar}

>

Salvar

</button>



</section>


)}











<section className="content-card">


<h2>

📋 Clientes

</h2>





{lista.map(cliente=>(



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



<div>


<h3>

👤 {cliente.empresa}

</h3>


<p>

{cliente.servico}

</p>


<p>

💚 Saúde: {cliente.saude}%

</p>


</div>






<div>


<button

className="primary-button"

onClick={()=>setClienteAberto(cliente)}

>

Abrir 360°

</button>



<button

className="primary-button"

style={{marginLeft:8}}

onClick={()=>editar(cliente)}

>

Editar

</button>




<button

className="primary-button"

style={{

marginLeft:8,

background:"#8b0000"

}}

onClick={()=>excluir(cliente.id)}

>

Excluir

</button>



</div>


</div>


</div>



))}


</section>











{clienteAberto && (


<section className="content-card">


<h1>

👤 {clienteAberto.empresa}

</h1>





<h2>

📌 Dados

</h2>


<p>📱 {clienteAberto.telefone}</p>

<p>📧 {clienteAberto.email}</p>

<p>📂 {clienteAberto.servico}</p>







<h2>

💰 Resumo Financeiro

</h2>




<div className="stats-grid">


<div className="stat-card">

<p>Receita</p>

<strong>R$ {clienteAberto.receita}</strong>

</div>



<div className="stat-card">

<p>Dívidas</p>

<strong>R$ {clienteAberto.dividas}</strong>

</div>




<div className="stat-card gold">

<p>Patrimônio</p>

<strong>R$ {clienteAberto.patrimonio}</strong>

</div>




<div className="stat-card">

<p>Reserva</p>

<strong>R$ {clienteAberto.reserva}</strong>

</div>


</div>








<h2>

📈 Jornada GFA

</h2>


<p>

{clienteAberto.jornada}

</p>




<progress

value={clienteAberto.saude}

max="100"

style={{width:"100%"}}

/>








<h2>

🧭 Histórico Mentoria

</h2>




{mentorias

.filter(m=>m.clienteId===clienteAberto.id)

.map(m=>(


<div

className="cliente-alerta"

key={m.id}

>


<div>


<strong>

{m.data} - {m.tema}

</strong>


<p>

{m.acao}

</p>


</div>


</div>


))}









<h2>

🏢 BPO Financeiro

</h2>




{bpos

.filter(b=>b.clienteId===clienteAberto.id)

.map(b=>(


<div

className="cliente-alerta"

key={b.id}

>


<div style={{width:"100%"}}>


<strong>

{b.competencia}

</strong>



<p>

Progresso: {progresso(b.tarefas)}%

</p>



<progress

value={progresso(b.tarefas)}

max="100"

style={{width:"100%"}}

/>



</div>


</div>


))}







<br/>

<button

className="primary-button"

onClick={()=>setClienteAberto(null)}

>

Fechar

</button>



</section>


)}






</div>

)

}



export default ClientsPage