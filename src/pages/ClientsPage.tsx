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
inicio:"",
origem:"",

jornada:"Diagnóstico",
saude:"50",
proximaReuniao:"",

receita:"",
despesas:"",
dividas:"",
patrimonio:"",
reserva:"",
poupanca:"",

perfil:"Moderado",
objetivo:"",

sessoes:"",
anotacoes:"",
plano:"",
proximos:""

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





useEffect(()=>{


localStorage.setItem(

"gfa-clientes",

JSON.stringify(clientes)

)


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


if(!confirm("Excluir cliente?")){

return

}


setClientes(

clientes.filter(c=>c.id!==id)

)


}









const lista=clientes.filter(c=>

c.empresa.toLowerCase()

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

CRM Financeiro 360° 💼

</h1>



<p>

Gestão completa da jornada financeira dos clientes.

</p>




<button

className="primary-button"

onClick={()=>{

setCadastro(true)

setForm(modelo)

}}

>

+ Novo Cliente

</button>



</section>








<section className="content-card">


<h2>

🔎 Carteira de Clientes

</h2>




<input

className="input"

placeholder="Pesquisar cliente..."

value={busca}

onChange={e=>setBusca(e.target.value)}

/>



</section>








{cadastro && (


<section className="content-card">


<h2>

{

editando

?

"Editar Cliente"

:

"Novo Cliente"

}

</h2>




<div

style={{

display:"grid",

gridTemplateColumns:"1fr 1fr",

gap:"12px"

}}

>



{Object.keys(modelo).map(campo=>(


<textarea

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

onClick={salvar}

>

Salvar Cliente

</button>



</section>

)}<section className="content-card">


<h2>

👥 Clientes

</h2>



<div

style={{

display:"grid",

gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",

gap:"18px"

}}

>



{lista.map(cliente=>(


<div

key={cliente.id}

className="stat-card"

style={{

borderRadius:"18px"

}}

>



<h2>

👤 {cliente.empresa}

</h2>



<p>

📂 {cliente.servico}

</p>



<p>

📍 Jornada:

<strong>

{" "}{cliente.jornada}

</strong>

</p>



<p>

💚 Saúde Financeira

</p>



<progress

value={cliente.saude}

max="100"

style={{

width:"100%"

}}

/>



<strong>

{cliente.saude}%

</strong>




<p>

📅 Próxima reunião:

<br/>

{cliente.proximaReuniao || "Não definida"}

</p>





<button

className="primary-button"

onClick={()=>setClienteAberto(cliente)}

>

CRM 360°

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


))}


</div>


</section>









{clienteAberto && (


<section className="content-card">



<h1>

👤 {clienteAberto.empresa}

</h1>



<p>

{clienteAberto.email}

</p>




<hr/>




<h2>

📌 Resumo Financeiro

</h2>





<div className="stats-grid">



<div className="stat-card">


<p>Receita Mensal</p>

<strong>

R$ {clienteAberto.receita}

</strong>


</div>





<div className="stat-card">


<p>Despesas Fixas</p>

<strong>

R$ {clienteAberto.despesas}

</strong>


</div>





<div className="stat-card gold">


<p>Patrimônio</p>


<strong>

R$ {clienteAberto.patrimonio}

</strong>


</div>




<div className="stat-card">


<p>Reserva</p>

<strong>

R$ {clienteAberto.reserva}

</strong>


</div>



</div>









<h2>

📊 Indicadores

</h2>




<p>

💳 Dívidas:

R$ {clienteAberto.dividas}

</p>



<p>

📈 Taxa de poupança:

{clienteAberto.poupanca}%

</p>




<p>

🎯 Objetivo:

{clienteAberto.objetivo}

</p>




<p>

Perfil:

{clienteAberto.perfil}

</p>










<h2>

📝 Mentoria

</h2>



<p>

Sessões:

{clienteAberto.sessoes}

</p>




<p>

Anotações:

{clienteAberto.anotacoes}

</p>




<p>

Plano de ação:

{clienteAberto.plano}

</p>




<p>

Próximos passos:

{clienteAberto.proximos}

</p>









<h2>

📈 Jornada GFA

</h2>




<div

style={{

display:"flex",

gap:"10px",

flexWrap:"wrap"

}}

>



{

[

"Diagnóstico",

"Organização",

"Proteção",

"Investimentos",

"Independência"

]

.map(etapa=>(


<div

key={etapa}

className="mini-card"

>


{

clienteAberto.jornada===etapa

?

"🟢 "

:

"⚪ "

}


{etapa}



</div>


))


}



</div>





<br/>




<button

className="primary-button"

onClick={()=>setClienteAberto(null)}

>

Fechar CRM

</button>




</section>


)}







</div>

)


}



export default ClientsPage