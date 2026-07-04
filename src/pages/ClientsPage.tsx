import { useEffect, useState } from "react"

import StatCard from "../components/StatCard"


function DashboardPage(){


const [clientes,setClientes] = useState<any[]>([])

const [bpo,setBpo] = useState<any[]>([])





useEffect(()=>{


const dadosClientes = localStorage.getItem(
"gfa-clientes"
)


const dadosBpo = localStorage.getItem(
"gfa-bpo-clientes"
)



if(dadosClientes){

setClientes(JSON.parse(dadosClientes))

}


if(dadosBpo){

setBpo(JSON.parse(dadosBpo))

}


},[])








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








const receita = clientes.reduce(

(total,c)=>

total + Number(c.valor || 0)

,0)





const ativos = clientes.filter(

c=>c.status==="Ativo"

).length






const clientesBpo = clientes.filter(

c=>c.servico==="BPO Financeiro"

).length






const consultorias = clientes.filter(

c=>c.servico.includes("Consultoria")

).length






const mentorias = clientes.filter(

c=>c.servico==="Mentoria Individual"

).length







const fechados = bpo.filter(

c=>progresso(c.tarefas)===100

).length






const andamento = bpo.filter(c=>{


const p=progresso(c.tarefas)


return p>0 && p<100


}).length









return(

<div>





<section

className="content-card"

style={{

background:"#0b1f3a",

color:"white"

}}

>


<p>

SISTEMA GFA

</p>



<h1>

Dashboard Executivo 📊

</h1>



<p>

Visão geral da operação financeira e clientes.

</p>



</section>










<section className="stats-grid">




<StatCard

title="Clientes"

value={String(clientes.length)}

detail="Carteira total"

accent="navy"

/>





<StatCard

title="Receita Mensal"

value={

receita.toLocaleString(

"pt-BR",

{

style:"currency",

currency:"BRL"

}

)

}

detail="Contratos ativos"

accent="gold"

/>







<StatCard

title="Clientes Ativos"

value={String(ativos)}

detail="Relacionamentos ativos"

accent="navy"

/>







<StatCard

title="BPO"

value={String(clientesBpo)}

detail="Clientes financeiros"

accent="gold"

/>



</section>









<section className="content-card">


<h2>

📂 Distribuição da Carteira

</h2>




<div className="action-grid">



<div className="mini-card">


<h3>BPO Financeiro</h3>


<p>{clientesBpo} clientes</p>


</div>






<div className="mini-card">


<h3>Consultorias</h3>


<p>{consultorias} clientes</p>


</div>






<div className="mini-card">


<h3>Mentorias</h3>


<p>{mentorias} clientes</p>


</div>




</div>




</section>










<section className="content-card">


<h2>

⚙ Operação BPO

</h2>




<div className="action-grid">



<div className="mini-card">


<h3>🔵 Em execução</h3>


<p>{andamento} processos</p>


</div>






<div className="mini-card">


<h3>🟢 Finalizados</h3>


<p>{fechados} fechamentos</p>


</div>




</div>




</section>





</div>


)

}



export default DashboardPage