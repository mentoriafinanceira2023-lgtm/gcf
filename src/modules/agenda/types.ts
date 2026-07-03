export type AgendaEventType = 'Sessão de Alinhamento' | 'Mentoria' | 'Consultoria Empresarial' | 'Reunião BPO' | 'Follow-up' | 'Outro'

export type AgendaView = 'dayGridMonth' | 'timeGridWeek' | 'timeGridDay'

export interface AgendaEvent {
  id: string
  title: string
  client: string
  type: AgendaEventType
  start: string
  end: string
  location: string
  notes: string
}

export interface AgendaEventInput {
  title: string
  client: string
  type: AgendaEventType
  start: string
  end: string
  location: string
  notes: string
}
