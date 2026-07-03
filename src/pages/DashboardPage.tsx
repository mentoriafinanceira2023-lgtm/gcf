import { useMemo } from 'react'
import StatCard from '../components/StatCard'
import { useAppState } from '../contexts/AppStateContext'

function DashboardPage() {
  const { leads, clients } = useAppState()

  const stats = useMemo(() => {
    const consultorias = leads.length
    const pendencias = leads.filter((lead) => lead.stage === 'Lead' || lead.stage === 'Prospecto').length

    return [
      { title: 'Clientes Ativos', value: clients.length.toString(), detail: 'Clientes cadastrados' },
      { title: 'Receita do Mês', value: 'R$ 0,00', detail: 'Sem receita registrada' },
      { title: 'Consultorias', value: consultorias.toString(), detail: 'Em andamento' },
      { title: 'Pendências', value: pendencias.toString(), detail: 'Aguardando avanço' },
    ]
  }, [clients, leads])

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
        {leads.length === 0 ? (
          <p>Você ainda não possui Leads cadastrados.</p>
        ) : (
          <p>
            Esta estrutura inicial organiza o ambiente corporativo com navegação lateral fixa, cabeçalho superior e uma área principal preparada para futuras funcionalidades.
          </p>
        )}
      </section>
    </>
  )
}

export default DashboardPage
