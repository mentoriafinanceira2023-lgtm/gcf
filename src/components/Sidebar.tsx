import { NavLink } from "react-router-dom"


function Sidebar() {


const menus = [

{
nome:"Dashboard",
rota:"/dashboard",
icone:"🏠"
},

{
nome:"Clientes",
rota:"/clientes",
icone:"👥"
},

{
nome:"Agenda",
rota:"/agenda",
icone:"🗓️"
},

{
nome:"CRM",
rota:"/crm",
icone:"🤝"
},

{
nome:"Financeiro",
rota:"/financeiro",
icone:"💰"
},

{
nome:"BPO",
rota:"/bpo",
icone:"🏢"
},

{
nome:"Indicadores",
rota:"/indicadores",
icone:"📊"
},

{
nome:"Documentos",
rota:"/documentos",
icone:"📄"
},

{
nome:"Configurações",
rota:"/configuracoes",
icone:"⚙️"
}

]


return (

<aside className="sidebar">


<div className="brand-block">


<div className="logo-circle">
GFA
</div>


<div>

<h2>
Gestão e Consultoria
</h2>

<p>
Financeira
</p>


</div>


</div>



<nav className="menu">


{menus.map((item)=>(


<NavLink


key={item.rota}

to={item.rota}

className={({isActive}) =>

isActive
?
"menu-link active"
:
"menu-link"

}


>


<span className="menu-icon">

{item.icone}

</span>


<span>

{item.nome}

</span>



</NavLink>


))}


</nav>


</aside>


)

}


export default Sidebar