import { NavLink } from "react-router-dom"


function AppSidebar(){


const menus=[

{
nome:"Dashboard",
icone:"🏠",
rota:"/dashboard"
},

{
nome:"Clientes",
icone:"👥",
rota:"/clientes"
},

{
nome:"Mentoria Financeira",
icone:"🧭",
rota:"/mentoria"
},

{
nome:"Agenda",
icone:"📅",
rota:"/agenda"
},

{
nome:"CRM",
icone:"🤝",
rota:"/crm"
},

{
nome:"Financeiro",
icone:"💰",
rota:"/financeiro"
},

{
nome:"BPO",
icone:"🏢",
rota:"/bpo"
},

{
nome:"Indicadores",
icone:"📊",
rota:"/indicadores"
},

{
nome:"Documentos",
icone:"📄",
rota:"/documentos"
},

{
nome:"Configurações",
icone:"⚙️",
rota:"/configuracoes"
}

]






return(

<aside className="sidebar">



<div
style={{
padding:"24px",
color:"white"
}}
>


<h2>
GFA
</h2>


<h3>
Gestão e Consultoria
</h3>


<p>
Financeira
</p>



</div>






<nav>


{menus.map(item=>(


<NavLink

key={item.rota}

to={item.rota}

className={({isActive})=>

isActive

?

"menu-item active"

:

"menu-item"

}

>


<span>

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



export default AppSidebar