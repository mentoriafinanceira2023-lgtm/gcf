export type ClientType = 'Mentoria' | 'BPO' | 'Consultoria' | 'Outro'
export type ClientStatus = 'Ativo' | 'Pausado' | 'Finalizado'

export interface Client {
  id: string
  name: string
  company: string
  email: string
  phone: string
  whatsapp: string
  type: ClientType
  contractValue: string
  status: ClientStatus
  objectives: string
  observations: string
}

export interface ClientFormValues {
  name: string
  company: string
  email: string
  phone: string
  whatsapp: string
  type: ClientType
  contractValue: string
  status: ClientStatus
  objectives: string
  observations: string
}
