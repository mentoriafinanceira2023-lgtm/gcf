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



setClientes([

...clientes,

novo

])



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

Carteira central de clientes e contratos.

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

<p>Total</p>

<strong>{clientes.length}</strong>

</div>




<div className="stat-card gold">

<p>Receita mensal</p>

<strong>


R$ {


clientes.reduce(

(t,c)=>t+Number(c.valor||0)

,0)


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











{cadastro && (


<div className="content-card">


<h2>

➕ Novo Cliente

</h2>




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

placeholder="Observações"

value={form.observacao}

onChange={e=>setForm({...form,observacao:e.target.value})}

/>






<button

className="primary-button"

onClick={salvarCliente}

>

Salvar

</button>




<button

className="primary-button"

style={{marginLeft:"10px"}}

onClick={()=>setCadastro(false)}

>

Cancelar

</button>




</div>


)}









<section className="content-card">


<h2>

📋 Lista de Clientes

</h2>






{clientesOrdenados.map(cliente=>(



<div

className="cliente-alerta"

key={cliente.id}

>


<div

style={{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

width:"100%"

}}

>




<div>



<strong>

🏢 {cliente.empresa}

</strong>



<p>

{cliente.servico}

</p>



</div>






<div>


<span>


{

cliente.status==="Ativo"

?

"🟢 Ativo"

:

"🟡 "+cliente.status

}


</span>



{" "}




<button

className="primary-button"

onClick={()=>setClienteAberto(cliente)}

>

Detalhes

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




<p>

👤 Responsável: {clienteAberto.responsavel}

</p>



<p>

📱 Telefone: {clienteAberto.telefone}

</p>



<p>

📂 Serviço: {clienteAberto.servico}

</p>




<p>

📌 Status: {clienteAberto.status}

</p>




<p>

💰 Valor mensal: R$ {clienteAberto.valor}

</p>



<p>

📅 Cadastro: {clienteAberto.criado}

</p>




<p>

📝 {clienteAberto.observacao}

</p>





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

Excluir Cliente

</button>



</section>


)}






</div>

)


}



export default ClientsPage