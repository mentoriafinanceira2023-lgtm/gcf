import { useState } from 'react'
import { useAppState } from '../../../contexts/AppStateContext'
import LeadDetails from './LeadDetails'
import LeadTabs from './LeadTabs'

function LeadDrawer() {
  const [activeTab, setActiveTab] = useState('Geral')
  const { selectedLead, setSelectedLead } = useAppState()

  if (!selectedLead) return null

  const lead = selectedLead
  const onClose = () => setSelectedLead(null)

  return (
    <div className="drawer-overlay" role="dialog" aria-modal="true">
      <aside className="drawer-card">
        <div className="drawer-header">
          <div>
            <p className="eyebrow">Lead</p>
            <h3>{lead.name}</h3>
            <p className="drawer-company">{lead.company}</p>
          </div>
          <button type="button" className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <LeadTabs activeTab={activeTab} onChange={setActiveTab} />
        <LeadDetails lead={lead} activeTab={activeTab} />
      </aside>
    </div>
  )
}

export default LeadDrawer
