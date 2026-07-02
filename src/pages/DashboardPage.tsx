import StatCard from '../components/StatCard'

const stats = [
  { title: 'Clientes Ativos', value: '184', detail: '+12% este trimestre' },
  { title: 'Receita do Mês', value: 'R$ 248 mil', detail: 'Meta atingida' },
  { title: 'Consultorias', value: '27', detail: 'Em andamento' },
  { title: 'Pendências', value: '9', detail: '3 urgentes' },
]

function DashboardPage() {
  return (
    <>
      <section className="stats-grid" aria-label="Resumo executivo">
        {stats.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            detail={item.detail}
            accent={item.title === 'Pendências' ? 'gold' : 'navy'}
          />
        ))}
      </section>

      <section className="content-card">
        <h2>Bem-vindo ao GCF</h2>
        <p>
          Esta estrutura inicial organiza o ambiente corporativo com navegação lateral fixa, cabeçalho superior e uma área principal preparada para futuras funcionalidades.
        </p>
      </section>
    </>
  )
}

export default DashboardPage
