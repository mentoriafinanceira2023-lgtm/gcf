type StatCardProps = {
  title: string
  value: string
  detail: string
  accent?: 'gold' | 'navy'
}

function StatCard({ title, value, detail, accent = 'navy' }: StatCardProps) {
  return (
    <article className={`stat-card ${accent}`}>
      <p>{title}</p>
      <h3>{value}</h3>
      <span>{detail}</span>
    </article>
  )
}

export default StatCard
