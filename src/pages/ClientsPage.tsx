import { useEffect, useState } from "react"


function ClientsPage(){


const [clientes,setClientes] = useState<any[]>(()=>{

const dados = localStorage.getItem("gfa-clientes")

return dados ? JSON.parse(dados) : []

})


const [cadastro,setCadastro] = useState(false)

const [clienteAberto,setClienteAberto] = useState<any>(null)


const [form,setForm] = useState({

empresa:"",
responsavel:"",
telefone:"",
servico:"BPO Financeiro",
status:"Ativo",
valor:"",
observacao:""

})



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


if(form.empresa.trim()===""){

return

}


const novo={

id:Date.now(),

...form,

criado:new Date().toLocaleDateString()

}


setClientes([...clientes,novo])


setForm({

empresa:"",
responsavel:"",
telefone:"",
servico:"BPO Financeiro",
status:"Ativo",
valor:"",
observacao:""

})


setCadastro(false)


}






function excluirCliente(id:number){


if(!confirm("Excluir cliente?")){

return

}


setClientes(

clientes.filter(c=>c.id!==id)

)

setClienteAberto(null)


}





const clientesOrdenados=[...clientes].sort(

(a,b)=>a.empresa.localeCompare(b.empresa)

)



const receita=clientes.reduce(

(t,c)=>t+Number(c.valor||0)

,0)








return(

<div>





<section className="dashboard-header">


<div>


<p className="tag">

CRM GFA

</p>


<h1>

Clientes 👥

</h1>


<p>

Gestão da carteira, contratos e relacionamento.

</p>


</div>



<button

className="primary-button"

onClick={()=>setCadastro(true)}

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

clientes.filter(c=>c.status==="Ativo").length

}

</strong>

</div>



</section>









{cadastro && (



<section

className="content-card"

style={{

maxWidth:"900px",

margin:"0 auto 25px auto"

}}

>



<h2>

👥 Cadastro de Cliente

</h2>




<div

style={{

display:"grid",

gridTemplateColumns:"1fr 1fr",

gap:"15px"

}}

>



<input

className="input"

placeholder="Cliente / Empresa"

value={form.empresa}

onChange={e=>setForm({...form,empresa:e.target.value})}

/>



<input

className="input"

placeholder="Responsável"

value={form.responsavel}

onChange={e=>setForm({...form,responsavel:e.target.value})}

/>




<input

className="input"

placeholder="Telefone"

value={form.telefone}

onChange={e=>setForm({...form,telefone:e.target.value})}

/>




<select

className="input"

value={form.servico}

onChange={e=>setForm({...form,servico:e.target.value})}

>


{servicos.map(s=>(

<option key={s}>{s}</option>

))}


</select>





<select

className="input"

value={form.status}

onChange={e=>setForm({...form,status:e.target.value})}

>

<option>Ativo</option>

<option>Proposta</option>

<option>Implantação</option>

<option>Pausado</option>

<option>Encerrado</option>


</select>





<input

className="input"

placeholder="Valor mensal"

value={form.valor}

onChange={e=>setForm({...form,valor:e.target.value})}

/>





<textarea

className="input"

placeholder="Observações estratégicas"

value={form.observacao}

onChange={e=>setForm({...form,observacao:e.target.value})}

style={{

gridColumn:"1/3",

height:"80px"

}}

/>



</div>







<div

style={{

display:"flex",

justifyContent:"flex-end",

gap:"10px",

marginTop:"15px"

}}

>



<button

className="primary-button"

onClick={()=>setCadastro(false)}

>

Cancelar

</button>




<button

className="primary-button"

onClick={salvarCliente}

>

Salvar Cliente

</button>



</div>




</section>


)}









<section className="content-card">


<h2>

📋 Meus Clientes

</h2>




{clientesOrdenados.map(cliente=>(



<div

className="cliente-alerta"

key={cliente.id}

style={{

padding:"18px 22px"

}}

>



<div

style={{

display:"grid",

gridTemplateColumns:"2fr 2fr 1fr 150px",

alignItems:"center",

width:"100%",

gap:"20px"

}}

>




<strong>

🏢 {cliente.empresa}

</strong>




<span>

{cliente.servico}

</span>





<span>

{

cliente.status==="Ativo"

?

"🟢 Ativo"

:

"🟡 "+cliente.status

}

</span>






<button

className="primary-button"

onClick={()=>setClienteAberto(cliente)}

>

Detalhes

</button>





</div>


</div>


))}





</section>











{clienteAberto && (



<section

className="content-card"

style={{

maxWidth:"700px",

margin:"20px auto"

}}

>



<h2>

🏢 {clienteAberto.empresa}

</h2>



<p>👤 Responsável: {clienteAberto.responsavel}</p>

<p>📱 Telefone: {clienteAberto.telefone}</p>

<p>📂 Serviço: {clienteAberto.servico}</p>

<p>📌 Status: {clienteAberto.status}</p>

<p>💰 Valor: R$ {clienteAberto.valor}</p>

<p>📅 Cadastro: {clienteAberto.criado}</p>

<p>📝 {clienteAberto.observacao}</p>




<button

className="primary-button"

onClick={()=>setClienteAberto(null)}

>

Fechar

</button>




<button

className="primary-button"

style={{marginLeft:"10px"}}

onClick={()=>excluirCliente(clienteAberto.id)}

>

Excluir

</button>




</section>


)}






</div>


)


}



export default ClientsPage