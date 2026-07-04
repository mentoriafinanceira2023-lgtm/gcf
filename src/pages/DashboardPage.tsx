import StatCard from "../components/StatCard"


function DashboardPage() {


const clientes = []

const receitaMes = 0

const bpoAtivos = 0

const pendencias = 0



const indicadores = [

{
titulo:"Clientes",
valor:String(clientes.length),
detalhe:"Clientes cadastrados"
},

{
titulo:"Receita Mensal",
valor:receitaMes.toLocaleString(
"pt-BR",
{
style:"currency",
currency:"BRL"
}
),
detalhe:"Receitas registradas"
},

{
titulo:"BPO Ativos",
valor:String(bpoAtivos),
detalhe:"Operações em andamento"
},

{
titulo:"Pendências",
valor:String(pendencias),
detalhe:"Nenhuma pendência"
}

]


return (

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
Painel executivo de gestão financeira, clientes e BPO.
</p>


</div>


<button className="primary-button">

+ Novo Cliente

</button>


</section>



<section className="stats-grid">


{indicadores.map((item,index)=>(


<StatCard

key={item.titulo}

title={item.titulo}

value={item.valor}

detail={item.detalhe}

accent={index === 1 ? "gold" : "navy"}


/>


))}


</section>




<section className="content-card">


<h2>
🚀 Central GFA
</h2>


<p>
Sua operação financeira aparecerá aqui conforme os dados forem cadastrados.
</p>



<div className="action-grid">


<div className="mini-card">

<h3>👥 Clientes</h3>

<p>
Nenhum cliente cadastrado ainda.
</p>

</div>



<div className="mini-card">

<h3>💰 Financeiro</h3>

<p>
Nenhuma receita lançada.
</p>

</div>



<div className="mini-card">

<h3>📊 Indicadores</h3>

<p>
Aguardando informações.
</p>

</div>


</div>


</section>



<section className="content-card">


<h2>
⚠️ Acompanhamentos
</h2>


<p>
Nenhuma ação pendente no momento.
</p>


</section>



</div>


)

}


export default DashboardPage