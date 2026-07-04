function BPOPage() {


const processos = []


return (

<div>


<section className="dashboard-header">


<div>


<p className="tag">
MÓDULO BPO
</p>


<h1>
Gestão Operacional BPO 📂
</h1>


<p>
Controle documentos, conciliações e fechamentos financeiros dos clientes.
</p>


</div>


<button className="primary-button">

+ Novo Processo

</button>


</section>




<section className="stats-grid">


<div className="stat-card">

<p>Clientes BPO</p>

<strong>
0
</strong>

<span>
Operações cadastradas
</span>

</div>



<div className="stat-card gold">

<p>Aguardando Documentos</p>

<strong>
0
</strong>

<span>
Pendências de clientes
</span>

</div>



<div className="stat-card">

<p>Em Processamento</p>

<strong>
0
</strong>

<span>
Conciliações abertas
</span>

</div>



<div className="stat-card gold">

<p>Fechados no mês</p>

<strong>
0
</strong>

<span>
Relatórios enviados
</span>

</div>


</section>




<section className="content-card">


<h2>
📥 Central de Documentos
</h2>


<p>
Recebimento e organização dos arquivos financeiros.
</p>



<div className="action-grid">


<div className="mini-card">

<h3>
🏦 Extratos Bancários
</h3>

<p>
Nenhum arquivo enviado.
</p>

</div>



<div className="mini-card">

<h3>
💳 Cartões
</h3>

<p>
Nenhuma fatura recebida.
</p>

</div>



<div className="mini-card">

<h3>
📑 Comprovantes
</h3>

<p>
Nenhum documento pendente.
</p>

</div>


</div>


</section>





<section className="content-card">


<h2>
✅ Checklist de Fechamento
</h2>



<div className="cliente-alerta">

<span>⬜</span>

<div>

<strong>
Receber documentos
</strong>

<p>
Extratos, cartões e comprovantes.
</p>

</div>

</div>




<div className="cliente-alerta">

<span>⬜</span>

<div>

<strong>
Realizar conciliação
</strong>

<p>
Conferência das movimentações.
</p>

</div>

</div>




<div className="cliente-alerta">

<span>⬜</span>

<div>

<strong>
Gerar DRE
</strong>

<p>
Resultado financeiro mensal.
</p>

</div>

</div>




<div className="cliente-alerta">

<span>⬜</span>

<div>

<strong>
Enviar relatório ao cliente
</strong>

<p>
Finalização do ciclo BPO.
</p>

</div>

</div>



</section>


</div>


)


}


export default BPOPage