import { useEffect, useState } from "react"

import StatCard from "../components/StatCard"


function DashboardPage(){


const [clientes,setClientes]=useState<any[]>([])

const [operacoes,setOperacoes]=useState<any[]>([])





useEffect(()=>{


function carregar(){


const dadosClientes =
localStorage.getItem("gfa-clientes")


const dadosBpo =
localStorage.getItem("gfa-bpo-operacoes")




if(dadosClientes){

setClientes(

JSON.parse(dadosClientes)

)

}




if(dadosBpo){

setOperacoes(

JSON.parse(dadosBpo)

)

}



}




carregar()



window.addEventListener(

"storage",

carregar

)



return ()=>{


window.removeEventListener(

"storage",

carregar

)


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









const receita=clientes.reduce(

(total,c)=>

total + Number(c.valor || 0)

,0)







const ativos=clientes.filter(

c=>c.status==="Ativo"

).length








const bpo=clientes.filter(

c=>

c.servico==="BPO Financeiro"

).length








const consultorias=clientes.filter(

c=>

c.servico.includes("Consultoria")

).length







const mentorias=clientes.filter(

c=>

c.servico==="Mentoria Individual"

).length








const processosAbertos=operacoes.filter(

op=>progresso(op.tarefas)<100

).length








const fechados=operacoes.filter(

op=>progresso(op.tarefas)===100

).length







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

Visão consolidada de clientes, contratos e BPO.

</p>



</section>









<section className="stats-grid">





<StatCard

title="Clientes"

value={String(clientes.length)}

detail="Base cadastrada"

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

detail="Contratos recorrentes"

accent="gold"

/>








<StatCard

title="Ativos"

value={String(ativos)}

detail="Clientes ativos"

accent="navy"

/>








<StatCard

title="BPO"

value={String(bpo)}

detail="Operações financeiras"

accent="gold"

/>





</section>









<section className="content-card">



<h2>

📂 Carteira de Serviços

</h2>




<div className="action-grid">





<div className="mini-card">


<h3>

💼 BPO Financeiro

</h3>


<strong>

{bpo}

</strong>


<p>

clientes

</p>



</div>







<div className="mini-card">


<h3>

📈 Consultorias

</h3>



<strong>

{consultorias}

</strong>



<p>

clientes

</p>


</div>







<div className="mini-card">


<h3>

👤 Mentorias

</h3>


<strong>

{mentorias}

</strong>


<p>

clientes

</p>



</div>




</div>



</section>










<section className="content-card">



<h2>

⚙️ Operação BPO

</h2>




<div className="action-grid">






<div className="mini-card">



<h3>

🔵 Em andamento

</h3>



<strong>

{processosAbertos}

</strong>


<p>

processos

</p>



</div>







<div className="mini-card">



<h3>

🟢 Fechados

</h3>



<strong>

{fechados}

</strong>


<p>

concluídos

</p>



</div>






</div>




</section>





</div>


)


}



export default DashboardPage