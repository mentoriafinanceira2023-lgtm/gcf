import { useEffect, useState } from "react"

import StatCard from "../components/StatCard"


function DashboardPage(){


const [clientesBPO,setClientesBPO] = useState<any[]>([])



useEffect(()=>{


const dados = localStorage.getItem("gfa-bpo-clientes")


if(dados){

setClientesBPO(JSON.parse(dados))

}


},[])







function progresso(tarefas:any[] = []){


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







const totalClientes = clientesBPO.length



const finalizados = clientesBPO.filter(

cliente=>progresso(cliente.tarefas)===100

).length





const andamento = clientesBPO.filter(cliente=>{


const pct = progresso(cliente.tarefas)


return pct>0 && pct<100


}).length





const pendentes = clientesBPO.filter(

cliente=>progresso(cliente.tarefas)===0

).length






const produtividade =

totalClientes===0

?

0

:

Math.round(

(finalizados/totalClientes)*100

)









return(

<div>





<section className="dashboard-header">


<div>


<p className="tag">

SISTEMA GFA

</p>



<h1>

Bom dia, Jefferson 👋

</h1>




<p>

Central executiva de gestão financeira e operações BPO.

</p>



</div>


</section>









<section className="stats-grid">



<StatCard

title="Clientes BPO"

value={String(totalClientes)}

detail="Operações cadastradas"

accent="navy"

/>






<StatCard

title="Em execução"

value={String(andamento)}

detail="Fechamentos em andamento"

accent="gold"

/>







<StatCard

title="Finalizados"

value={String(finalizados)}

detail="Fechamentos concluídos"

accent="navy"

/>







<StatCard

title="Produtividade"

value={`${produtividade}%`}

detail="Taxa de fechamento mensal"

accent="gold"

/>



</section>









<section className="content-card">


<h2>

🚀 Central Operacional GFA

</h2>



<p>

Resumo automático baseado nos processos BPO cadastrados.

</p>




<div className="action-grid">



<div className="mini-card">


<h3>

🟡 Pendentes

</h3>


<p>

{pendentes} clientes aguardando início.

</p>



</div>






<div className="mini-card">


<h3>

🔵 Em andamento

</h3>


<p>

{andamento} processos em execução.

</p>



</div>







<div className="mini-card">


<h3>

🟢 Concluídos

</h3>


<p>

{finalizados} fechamentos entregues.

</p>



</div>




</div>




</section>









<section className="content-card">


<h2>

⚠️ Próximas ações BPO

</h2>





{

clientesBPO

.filter(cliente=>progresso(cliente.tarefas)<100)

.slice(0,5)

.map(cliente=>(



<div

className="cliente-alerta"

key={cliente.id}

>



<span>

⚠️

</span>



<div>



<strong>

{cliente.nome}

</strong>



<p>

Progresso atual:

{" "}

{progresso(cliente.tarefas)}%

</p>



</div>



</div>



))

}




{clientesBPO.length===0 && (

<p>

Nenhuma operação BPO cadastrada.

</p>

)}



</section>






</div>


)


}



export default DashboardPage