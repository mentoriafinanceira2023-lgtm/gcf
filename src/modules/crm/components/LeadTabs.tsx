type LeadTabsProps = {
  activeTab: string
  onChange: (tab: string) => void
}

const tabs = ['Geral', 'Timeline', 'Financeiro', 'Documentos', 'Agenda', 'Observações']

function LeadTabs({ activeTab, onChange }: LeadTabsProps) {
  return (
    <div className="lead-tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          className={`lead-tabs__button ${activeTab === tab ? 'active' : ''}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

export default LeadTabs
