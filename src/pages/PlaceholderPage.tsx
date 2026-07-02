type PlaceholderPageProps = {
  title: string
  description: string
}

function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <section className="content-card">
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  )
}

export default PlaceholderPage
