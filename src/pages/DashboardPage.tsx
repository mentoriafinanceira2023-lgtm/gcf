import { useEffect, useState } from "react"


function ClientsPage(){


const [clientes,setClientes] = useState<any[]>(()=>{

const dados = localStorage.getItem("gfa-clientes")

return dados ? JSON.parse(dados) : []

})


const [operacoes,setOperacoes] = useState<any[]>([])

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


const bpo = localStorage.getItem(

"gfa-bpo-operacoes"

)


if(bpo){

setOperacoes(JSON.parse(bpo))

}



},[clientes])









const servicos=[

"BPO Financeiro",

"Consultoria Empresarial",

"Mentoria Individual",

"Consultoria Financeira",

"Diagnóstico Financeiro",

"Outros"

]









function progresso(tarefas:any[]=[]){


if(tarefas.length===0){

return 0

}


const feitas = tarefas.filter(

t=>t.feito

).length


return Math.round(

(feitas/tarefas.length)*100

)

}










function salvarCliente(){



if(!form.empresa){

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










const receita=clientes.reduce(

(t,c)=>t+Number(c.valor||0)

,0)





const clientesOrdenados=[...clientes].sort(

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

Central 360° de relacionamento GFA.

</p>




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

clientes.filter(

c=>c.status==="Ativo"

).length

}

</strong>

</div>


</section>










{cadastro && (


<section

className="content-card"

style={{maxWidth:"850px"}}

>


<h2>Novo Cliente</h2>




<div

style={{

display:"grid",

gridTemplateColumns:"1fr 1fr",

gap:"14px"

}}

>



<input

className="input"

placeholder="Cliente"

value={form.empresa}

onChange={e=>

setForm({...form,empresa:e.target.value})

}

/>




<input

className="input"

placeholder="Responsável"

value={form.responsavel}

onChange={e=>

setForm({...form,responsavel:e.target.value})

}

/>




<input

className="input"

placeholder="Telefone"

value={form.telefone}

onChange={e=>

setForm({...form,telefone:e.target.value})

}

/>





<select

className="input"

value={form.servico}

onChange={e=>

setForm({...form,servico:e.target.value})

}

>


{servicos.map(s=>(

<option key={s}>{s}</option>

))}


</select>






<input

className="input"

placeholder="Valor mensal"

value={form.valor}

onChange={e=>

setForm({...form,valor:e.target.value})

}

/>





<textarea

className="input"

placeholder="Observações"

value={form.observacao}

style={{

gridColumn:"1/3",

height:"80px"

}}

onChange={e=>

setForm({...form,observacao:e.target.value})

}

/>


</div>




<br/>

<button

className="primary-button"

onClick={salvarCliente}

>

Salvar

</button>




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

>



<div

style={{

display:"grid",

gridTemplateColumns:"2fr 2fr 1fr 120px",

width:"100%"

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



<section className="content-card">


<h2>

🏢 {clienteAberto.empresa}

</h2>




<p>👤 {clienteAberto.responsavel}</p>

<p>📱 {clienteAberto.telefone}</p>

<p>📂 {clienteAberto.servico}</p>

<p>💰 R$ {clienteAberto.valor}</p>

<p>📝 {clienteAberto.observacao}</p>




<hr/>




<h3>

⚙️ Histórico BPO

</h3>




{

operacoes

.filter(

op=>op.clienteId===clienteAberto.id

)

.map(op=>(



<div

key={op.id}

className="cliente-alerta"

>



<div style={{width:"100%"}}>



<strong>

{op.competencia}

</strong>




<p>

Progresso: {progresso(op.tarefas)}%

</p>



<progress

value={progresso(op.tarefas)}

max="100"

style={{width:"100%"}}

/>



</div>


</div>


))


}




<button

className="primary-button"

onClick={()=>setClienteAberto(null)}

>

Fechar

</button>





<button

className="primary-button"

style={{marginLeft:10}}

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