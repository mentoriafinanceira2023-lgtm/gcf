import type { CRMCard } from '../types'

type LeadDetailsProps = {
  lead: CRMCard
  activeTab: string
}

function LeadDetails({ lead, activeTab }: LeadDetailsProps) {
  if (activeTab !== 'Geral') {
    return (
      <div className="lead-drawer__placeholder">
        <p>Conteúdo de {activeTab} em desenvolvimento.</p>
      </div>
    )
  }

  return (
    <div className="lead-drawer__content">
      <div className="lead-drawer__row">
        <strong>Nome</strong>
        <span>{lead.name}</span>
      </div>
      <div className="lead-drawer__row">
        <strong>Empresa</strong>
        <span>{lead.company}</span>
      </div>
      <div className="lead-drawer__row">
        <strong>Email</strong>
        <span>{lead.email}</span>
      </div>
      <div className="lead-drawer__row">
        <strong>Telefone</strong>
        <span>{lead.phone}</span>
      </div>
      <div className="lead-drawer__row">
        <strong>WhatsApp</strong>
        <span>{lead.whatsapp}</span>
      </div>
      <div className="lead-drawer__row">
        <strong>Cidade/Estado</strong>
        <span>{lead.city} - {lead.state}</span>
      </div>
      <div className="lead-drawer__row">
        <strong>Origem</strong>
        <span>{lead.origin}</span>
      </div>
      <div className="lead-drawer__row">
        <strong>Prioridade</strong>
        <span>{lead.priority}</span>
      </div>
      <div className="lead-drawer__row">
        <strong>Objetivo</strong>
        <span>{lead.clientGoal}</span>
      </div>
      <div className="lead-drawer__row">
        <strong>Dor Principal</strong>
        <span>{lead.mainPain}</span>
      </div>
      <div className="lead-drawer__row">
        <strong>Observações</strong>
        <span>{lead.observations}</span>
      </div>
    </div>
  )
}

export default LeadDetails
