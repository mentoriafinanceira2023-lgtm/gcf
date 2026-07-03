import type { CRMCard, CRMStage, LeadFormValues } from '../modules/crm/types'

export const crmStages: CRMStage[] = [
  'Lead',
  'Prospecto',
  'Sessão de Alinhamento',
  'Proposta',
  'Cliente',
]

const formatCurrencyValue = (value: number | null) => {
  if (value === null) {
    return ''
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value / 100)
}

// Stateless utility functions for Lead operations
export const leadRepository = {
  create(values: LeadFormValues): CRMCard {
    return {
      id: crypto.randomUUID(),
      ...values,
      stage: 'Lead',
      value: formatCurrencyValue(values.potentialValue),
      nextAction: 'Aguardando follow-up',
    }
  },

  update(id: string, values: Partial<CRMCard>, leads: CRMCard[]): CRMCard | null {
    const lead = leads.find((lead) => lead.id === id)
    if (!lead) return null

    return {
      ...lead,
      ...values,
    }
  },

  move(id: string, stage: CRMStage, leads: CRMCard[]): CRMCard | null {
    const lead = leads.find((l) => l.id === id)
    if (!lead) return null

    return {
      ...lead,
      stage,
      nextAction: stage === 'Cliente' ? 'Encerrar atendimento' : 'Aguardando follow-up',
    }
  },
}

export default leadRepository
