import { useEffect, useState } from "react"


function ClientsPage(){


const modelo={

empresa:"",
responsavel:"",
telefone:"",
email:"",
servico:"BPO Financeiro",
status:"Ativo",
valor:"",
inicio:"",
origem:"",
observacao:""

}



const [clientes,setClientes]=useState<any[]>(()=>{

const dados=localStorage.getItem("gfa-clientes")

return dados ? JSON.parse(dados) : []

})


const [form,setForm]=useState(modelo)

const [cadastro,setCadastro]=useState(false)

const [editando,setEditando]=useState<any>(null)

const [clienteAberto,setClienteAberto]=useState<any>(null)

const [busca,setBusca]=useState("")

const [filtro,setFiltro]=useState("Todos")






useEffect(()=>{


localStorage.setItem(

"gfa-clientes",

JSON.stringify(clientes)

)


},[clientes])








const servicos=[

"BPO Financeiro",
"Consultoria Empresarial",
"Mentoria Individual",
"Consultoria Financeira",
"Diagnóstico Financeiro",
"Outros"

]









function salvarCliente(){


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

...form,

criado:new Date().toLocaleDateString()

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



if(!confirm("Excluir cliente definitivamente?")){

return

}



setClientes(

clientes.filter(c=>c.id!==id)

)




const bpo=localStorage.getItem(

"gfa-bpo-operacoes"

)



if(bpo){


const dados=JSON.parse(bpo)


localStorage.setItem(

"gfa-bpo-operacoes",

JSON.stringify(

dados.filter(

(op:any)=>op.clienteId!==id

)

)

)


}


}










const receita=clientes.reduce(

(t,c)=>t+Number(c.valor||0)

,0)






const lista=clientes

.filter(c=>

c.empresa

.toLowerCase()

.includes(busca.toLowerCase())

)


.filter(c=>

filtro==="Todos"

?

true

:

c.servico===filtro

)


.sort(

(a,b)=>a.empresa.localeCompare(b.empresa)

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

Clientes 👥

</h1>


<p>

Central 360° GFA

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








<section className="stats-grid">



<div className="stat-card">


<p>Total Clientes</p>

<strong>{clientes.length}</strong>


</div>




<div className="stat-card gold">


<p>Receita Mensal</p>


<strong>


{

receita.toLocaleString(

"pt-BR",

{

style:"currency",

currency:"BRL"

}

)

}


</strong>


</div>




<div className="stat-card">


<p>Ativos</p>


<strong>


{

clientes.filter(

c=>c.status==="Ativo"

).length

}


</strong>


</div>



</section>










<section className="content-card">


<h2>

🔎 Clientes

</h2>



<div

style={{

display:"grid",

gridTemplateColumns:"2fr 1fr",

gap:"15px"

}}

>



<input

className="input"

placeholder="Buscar cliente"

value={busca}

onChange={e=>setBusca(e.target.value)}

/>




<select

className="input"

value={filtro}

onChange={e=>setFiltro(e.target.value)}

>


<option>Todos</option>


{servicos.map(s=>(

<option key={s}>{s}</option>

))}


</select>


</div>


</section>











{cadastro && (



<section className="content-card">



<h2>

{

editando

?

"✏️ Editar Cliente"

:

"➕ Novo Cliente"

}

</h2>





<div

style={{

display:"grid",

gridTemplateColumns:"1fr 1fr",

gap:"14px"

}}

>





{Object.keys(modelo).map(campo=>(


campo==="observacao"

?

<textarea

key={campo}

className="input"

placeholder={campo}

value={(form as any)[campo]}

style={{

gridColumn:"1/3",

height:"90px"

}}

onChange={e=>

setForm({

...form,

[campo]:e.target.value

})

}

/>


:


<input

key={campo}

className="input"

placeholder={campo}

value={(form as any)[campo]}

onChange={e=>

setForm({

...form,

[campo]:e.target.value

})

}

/>


))}



</div>





<br/>




<button

className="primary-button"

onClick={salvarCliente}

>

Salvar

</button>




<button

className="primary-button"

style={{marginLeft:10}}

onClick={()=>setCadastro(false)}

>

Cancelar

</button>



</section>


)}











<section className="content-card">


<h2>

📋 Meus Clientes

</h2>






{lista.map(cliente=>(


<div

className="cliente-alerta"

key={cliente.id}

>



<div

style={{

display:"grid",

gridTemplateColumns:"2fr 2fr 1fr 250px",

width:"100%",

alignItems:"center"

}}

>




<strong>

🏢 {cliente.empresa}

</strong>




<span>

{cliente.servico}

</span>





<span>

🟢 {cliente.status}

</span>






<div>



<button

className="primary-button"

onClick={()=>setClienteAberto(cliente)}

>

Detalhes

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



<h2>

🏢 {clienteAberto.empresa}

</h2>



<h3>Dados Gerais</h3>


<p>👤 {clienteAberto.responsavel}</p>

<p>📱 {clienteAberto.telefone}</p>

<p>📧 {clienteAberto.email}</p>




<h3>Contrato</h3>


<p>📂 {clienteAberto.servico}</p>

<p>💰 R$ {clienteAberto.valor}</p>

<p>📅 Início: {clienteAberto.inicio}</p>

<p>📌 Origem: {clienteAberto.origem}</p>




<h3>Observações</h3>


<p>{clienteAberto.observacao}</p>





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