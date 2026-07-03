export type CRMStage = 'Lead' | 'Prospecto' | 'Sessão de Alinhamento' | 'Proposta' | 'Cliente'

export type LeadPriority = 'Baixa' | 'Média' | 'Alta' | 'Urgente'
export type LeadOrigin = 'Indicação' | 'Site' | 'WhatsApp' | 'Rede Social' | 'Evento' | 'Outro'
export type LeadStatus = 'Novo' | 'Em análise' | 'Aguardando retorno' | 'Qualificado'

export interface CRMCard {
  id: string
  name: string
  company: string
  email: string
  phone: string
  whatsapp: string
  city: string
  state: string
  origin: LeadOrigin
  productInterest: string
  potentialValue: number | null
  priority: LeadPriority
  status: LeadStatus
  clientGoal: string
  mainPain: string
  observations: string
  stage: CRMStage
  value: string
  nextAction: string
}

export interface LeadFormValues {
  name: string
  company: string
  phone: string
  whatsapp: string
  email: string
  city: string
  state: string
  origin: LeadOrigin
  productInterest: string
  potentialValue: number | null
  priority: LeadPriority
  status: LeadStatus
  clientGoal: string
  mainPain: string
  observations: string
}
