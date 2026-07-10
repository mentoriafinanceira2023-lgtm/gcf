import { useEffect, useState } from "react"


function MentoriaPage(){


const [clientes,setClientes]=useState<any[]>([])

const [clienteSelecionado,setClienteSelecionado]=useState<any>(null)


const [sessoes,setSessoes]=useState<any[]>(()=>{

const dados = localStorage.getItem("gfa-mentorias")

return dados ? JSON.parse(dados) : []

})


const modelo={

data:"",
tema:"",
diagnostico:"",
orientacao:"",
acao:"",
proxima:""

}


const [form,setForm]=useState(modelo)






useEffect(()=>{


const dados = localStorage.getItem("gfa-clientes")


if(dados){


const lista = JSON.parse(dados)


setClientes(

lista.filter(

(c:any)=>c.status==="Ativo"

)

)


}


},[])








useEffect(()=>{


localStorage.setItem(

"gfa-mentorias",

JSON.stringify(sessoes)

)


},[sessoes])









function salvarSessao(){


if(!clienteSelecionado){

alert("Escolha um cliente")

return

}



if(!form.tema){

alert("Informe o tema da sessão")

return

}




const novaSessao={

id:Date.now(),

clienteId:clienteSelecionado.id,

...form

}



setSessoes([

...sessoes,

novaSessao

])


setForm(modelo)


}







const historico = clienteSelecionado

?

sessoes.filter(

s=>s.clienteId===clienteSelecionado.id

)

:

[]










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

🧭 Mentoria Financeira GFA

</h1>


<p>

Controle das sessões, evolução e plano de ação dos clientes.

</p>


</section>










<section className="stats-grid">


<div className="stat-card">


<p>Clientes acompanhados</p>


<strong>

{clientes.length}

</strong>


</div>



<div className="stat-card gold">


<p>Sessões realizadas</p>


<strong>

{sessoes.length}

</strong>


</div>




<div className="stat-card">


<p>Clientes ativos</p>


<strong>

{clientes.length}

</strong>


</div>



</section>










<section className="content-card">


<h2>

👥 Escolher Cliente

</h2>





<select

className="input"

onChange={e=>{

const cliente = clientes.find(

c=>String(c.id)===e.target.value

)


setClienteSelecionado(cliente)


}}

>


<option>

Selecione

</option>



{clientes.map(c=>(


<option

key={c.id}

value={c.id}

>


{c.empresa}


</option>


))}


</select>


</section>











{clienteSelecionado && (


<section className="content-card">



<h2>

👤 {clienteSelecionado.empresa}

</h2>




<h3>

📈 Jornada GFA

</h3>



<div

style={{

display:"flex",

gap:"10px",

flexWrap:"wrap"

}}

>



{[

"Diagnóstico",

"Organização",

"Proteção",

"Investimentos",

"Independência"

].map(e=>(



<div

className="mini-card"

key={e}

>

{e}

</div>



))}



</div>







<h3>

➕ Nova Sessão

</h3>





<input

className="input"

type="date"

value={form.data}

onChange={e=>

setForm({...form,data:e.target.value})

}

/>





<input

className="input"

placeholder="Tema da sessão"

value={form.tema}

onChange={e=>

setForm({...form,tema:e.target.value})

}

/>





<textarea

className="input"

placeholder="Diagnóstico encontrado"

value={form.diagnostico}

onChange={e=>

setForm({...form,diagnostico:e.target.value})

}

/>





<textarea

className="input"

placeholder="Orientação passada"

value={form.orientacao}

onChange={e=>

setForm({...form,orientacao:e.target.value})

}

/>




<textarea

className="input"

placeholder="Plano de ação combinado"

value={form.acao}

onChange={e=>

setForm({...form,acao:e.target.value})

}

/>




<input

className="input"

placeholder="Próxima reunião"

value={form.proxima}

onChange={e=>

setForm({...form,proxima:e.target.value})

}

/>




<button

className="primary-button"

onClick={salvarSessao}

>

Salvar Sessão

</button>







<h3>

📚 Histórico do Cliente

</h3>




{historico.map(s=>(


<div

className="cliente-alerta"

key={s.id}

>


<div>


<strong>

📅 {s.data} - {s.tema}

</strong>


<p>

🔎 {s.diagnostico}

</p>


<p>

💡 {s.orientacao}

</p>


<p>

🎯 {s.acao}

</p>


<p>

➡ Próxima: {s.proxima}

</p>


</div>


</div>


))}





</section>


)}





</div>

)


}



export default MentoriaPage