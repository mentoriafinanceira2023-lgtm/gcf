import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Client, ClientFormValues, ClientType } from '../types/client'
import type { CRMCard, CRMStage, LeadFormValues } from '../modules/crm/types'

type AppStateContextValue = {
  clients: Client[]
  leads: CRMCard[]
  selectedLead: CRMCard | null
  setSelectedLead: (lead: CRMCard | null) => void
  createClient: (values: ClientFormValues) => Client
  updateClient: (id: string, values: ClientFormValues) => void
  deleteClient: (id: string) => void
  createLead: (values: LeadFormValues) => CRMCard
  updateLeadStage: (id: string, stage: CRMStage) => void
  updateLead: (id: string, values: Partial<CRMCard>) => void
  deleteLead: (id: string) => void
  convertLeadToClient: (leadId: string) => void
}

const AppStateContext = createContext<AppStateContextValue | undefined>(undefined)

const formatCurrencyValue = (value: number | null) => {
  if (value === null) {
    return ''
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value / 100)
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem('gcf_clients')
    return saved ? JSON.parse(saved) : []
  })
  const [leads, setLeads] = useState<CRMCard[]>(() => {
    const saved = localStorage.getItem('gcf_leads')
    return saved ? JSON.parse(saved) : []
  })
  const [selectedLead, setSelectedLead] = useState<CRMCard | null>(null)

  // Persist clients to localStorage
  useEffect(() => {
    localStorage.setItem('gcf_clients', JSON.stringify(clients))
  }, [clients])

  // Persist leads to localStorage
  useEffect(() => {
    localStorage.setItem('gcf_leads', JSON.stringify(leads))
  }, [leads])

  const createClient = (values: ClientFormValues) => {
    const client: Client = {
      id: crypto.randomUUID(),
      ...values,
    }

    setClients((prev) => [client, ...prev])
    return client
  }

  const updateClient = (id: string, values: ClientFormValues) => {
    setClients((prev) => prev.map((client) => (client.id === id ? { ...client, ...values } : client)))
  }

  const deleteClient = (id: string) => {
    setClients((prev) => prev.filter((client) => client.id !== id))
  }

  const createLead = (values: LeadFormValues) => {
    const lead: CRMCard = {
      id: crypto.randomUUID(),
      ...values,
      stage: 'Lead',
      value: formatCurrencyValue(values.potentialValue),
      nextAction: 'Aguardando follow-up',
    }

    setLeads((prev) => [lead, ...prev])
    return lead
  }

  const updateLeadStage = (id: string, stage: CRMStage) => {
    setLeads((prev) => prev.map((lead) => (lead.id === id ? { ...lead, stage, nextAction: stage === 'Cliente' ? 'Encerrar atendimento' : 'Aguardando follow-up' } : lead)))
  }

  const updateLead = (id: string, values: Partial<CRMCard>) => {
    setLeads((prev) => prev.map((lead) => (lead.id === id ? { ...lead, ...values } : lead)))
  }

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((lead) => lead.id !== id))
  }

  const convertLeadToClient = (leadId: string) => {
    const lead = leads.find((l) => l.id === leadId)
    if (!lead) return

    // Verificar duplicidade por email
    const existingClientByEmail = clients.find((c) => c.email === lead.email)
    
    // Mapear productInterest para ClientType
    let clientType: ClientType = 'Outro'
    if (lead.productInterest.includes('Consultoria')) clientType = 'Consultoria'
    else if (lead.productInterest.includes('BPO')) clientType = 'BPO'
    else if (lead.productInterest.includes('Mentoria')) clientType = 'Mentoria'

    if (existingClientByEmail) {
      // Atualizar cliente existente
      setClients((prev) => prev.map((client) => 
        client.email === lead.email 
          ? {
              ...client,
              name: lead.name,
              company: lead.company,
              phone: lead.phone,
              whatsapp: lead.whatsapp,
              type: clientType,
              contractValue: lead.value,
              objectives: lead.clientGoal,
              observations: lead.observations,
            }
          : client
      ))
    } else {
      // Criar novo cliente
      const newClient: Client = {
        id: crypto.randomUUID(),
        name: lead.name,
        company: lead.company,
        email: lead.email,
        phone: lead.phone,
        whatsapp: lead.whatsapp,
        type: clientType,
        contractValue: lead.value,
        status: 'Ativo',
        objectives: lead.clientGoal,
        observations: lead.observations,
      }
      setClients((prev) => [newClient, ...prev])
    }

    // Mover lead para etapa Cliente
    updateLeadStage(leadId, 'Cliente')
  }

  const value = useMemo(() => ({
    clients,
    leads,
    selectedLead,
    setSelectedLead,
    createClient,
    updateClient,
    deleteClient,
    createLead,
    updateLeadStage,
    updateLead,
    deleteLead,
    convertLeadToClient,
  }), [clients, leads, selectedLead])

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const context = useContext(AppStateContext)

  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider')
  }

  return context
}
