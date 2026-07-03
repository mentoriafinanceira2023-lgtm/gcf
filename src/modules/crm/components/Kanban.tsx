import { DndContext, PointerSensor, useSensor, useSensors, type DragEndEvent } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useMemo, useState } from 'react'
import { useAppState } from '../../../contexts/AppStateContext'
import { crmStages } from '../../../repositories/LeadRepository'
import type { CRMCard, CRMStage, LeadFormValues } from '../types'
import Column from './Column'
import SearchBar from './SearchBar'
import LeadModal from './LeadModal'
import LeadDrawer from './LeadDrawer'
import ConvertLeadModal from './ConvertLeadModal'
import DeleteLeadModal from './DeleteLeadModal'

function Kanban() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [convertModalOpen, setConvertModalOpen] = useState(false)
  const [leadToConvert, setLeadToConvert] = useState<string | null>(null)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [leadToDelete, setLeadToDelete] = useState<CRMCard | null>(null)
  const { leads, createLead, updateLeadStage, setSelectedLead, convertLeadToClient, deleteLead } = useAppState()
  const sensors = useSensors(useSensor(PointerSensor))

  const filteredCards = useMemo(() => {
    const term = searchTerm.toLowerCase()
    return leads.filter((card) => {
      return (
        card.name.toLowerCase().includes(term) ||
        card.company.toLowerCase().includes(term)
      )
    })
  }, [leads, searchTerm])

  const groupedCards = useMemo(() => {
    return crmStages.reduce<Record<CRMStage, CRMCard[]>>((acc: Record<CRMStage, CRMCard[]>, stage: CRMStage) => {
      acc[stage] = filteredCards.filter((card: CRMCard) => card.stage === stage)
      return acc
    }, {} as Record<CRMStage, CRMCard[]>)
  }, [filteredCards])

  const handleCreateLead = (values: LeadFormValues) => {
    createLead(values)
    setFeedback(`Lead criado com sucesso para ${values.name}.`)
    window.setTimeout(() => setFeedback(''), 2500)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return
    }

    const leadId = String(active.id)
    const nextStage = String(over.id) as CRMStage

    if (nextStage === 'Cliente') {
      setLeadToConvert(leadId)
      setConvertModalOpen(true)
    } else {
      updateLeadStage(leadId, nextStage)
    }
  }

  const handleConvertConfirm = () => {
    if (leadToConvert) {
      convertLeadToClient(leadToConvert)
      setConvertModalOpen(false)
      setLeadToConvert(null)
      setFeedback('Lead convertido para Cliente com sucesso.')
      window.setTimeout(() => setFeedback(''), 2500)
    }
  }

  const handleCardEdit = (card: CRMCard) => {
    setSelectedLead(card)
  }

  const handleCardConvert = (card: CRMCard) => {
    setLeadToConvert(card.id)
    setConvertModalOpen(true)
  }

  const handleCardDelete = (card: CRMCard) => {
    setLeadToDelete(card)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    try {
      if (leadToDelete) {
        deleteLead(leadToDelete.id)
        setDeleteModalOpen(false)
        setLeadToDelete(null)
        setFeedback('Lead excluído com sucesso.')
        window.setTimeout(() => setFeedback(''), 2500)
      }
    } catch (error) {
      setFeedback('Erro ao excluir Lead. Tente novamente.')
      window.setTimeout(() => setFeedback(''), 3000)
      setDeleteModalOpen(false)
      setLeadToDelete(null)
    }
  }

  return (
    <section className="crm-board">
      <div className="crm-toolbar">
        <div>
          <p className="eyebrow">CRM</p>
          <h2>Pipeline de oportunidades</h2>
        </div>

        <div className="crm-toolbar__actions">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <button type="button" className="crm-button" onClick={() => setIsModalOpen(true)}>
            + Novo Lead
          </button>
        </div>
      </div>

      {feedback ? <div className="crm-feedback">{feedback}</div> : null}

      {leads.length === 0 && !searchTerm ? (
        <div className="empty-state">Você ainda não possui Leads cadastrados.</div>
      ) : (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="crm-columns">
            {crmStages.map((stage: CRMStage) => (
              <SortableContext key={stage} items={groupedCards[stage].map((card: CRMCard) => card.id)} strategy={verticalListSortingStrategy}>
                <Column key={stage} title={stage} cards={groupedCards[stage]} onCardClick={setSelectedLead} onCardEdit={handleCardEdit} onCardDelete={handleCardDelete} onCardConvert={handleCardConvert} />
              </SortableContext>
            ))}
          </div>
        </DndContext>
      )}

      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleCreateLead} />
      <LeadDrawer />
      <ConvertLeadModal 
        isOpen={convertModalOpen} 
        onClose={() => {
          setConvertModalOpen(false)
          setLeadToConvert(null)
        }} 
        onConfirm={handleConvertConfirm} 
      />
      <DeleteLeadModal 
        isOpen={deleteModalOpen} 
        onClose={() => {
          setDeleteModalOpen(false)
          setLeadToDelete(null)
        }} 
        onConfirm={handleDeleteConfirm} 
      />
    </section>
  )
}

export default Kanban
