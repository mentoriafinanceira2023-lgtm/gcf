import { useMemo, useState } from 'react'
import ClientList from '../components/ClientList'
import ClientModal from '../components/ClientModal'
import DeleteClientModal from '../components/DeleteClientModal'
import { useAppState } from '../contexts/AppStateContext'
import type { Client, ClientFormValues } from '../types/client'

function ClientsPage() {
  const { clients, createClient, updateClient, deleteClient } = useAppState()
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const [selectedClient, setSelectedClient] = useState<Client | undefined>()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [clientToDelete, setClientToDelete] = useState<string | null>(null)

  const handleCreate = () => {
    setModalMode('create')
    setSelectedClient(undefined)
    setIsModalOpen(true)
  }

  const handleEdit = (client: Client) => {
    setModalMode('edit')
    setSelectedClient(client)
    setIsModalOpen(true)
  }

  const handleSave = (values: ClientFormValues) => {
    if (modalMode === 'edit' && selectedClient) {
      updateClient(selectedClient.id, values)
      return
    }

    createClient(values)
  }

  const handleDelete = (id: string) => {
    setClientToDelete(id)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (clientToDelete) {
      deleteClient(clientToDelete)
      setDeleteModalOpen(false)
      setClientToDelete(null)
    }
  }

  const summary = useMemo(() => {
    const active = clients.filter((client) => client.status === 'Ativo').length
    const paused = clients.filter((client) => client.status === 'Pausado').length
    const finished = clients.filter((client) => client.status === 'Finalizado').length

    return { active, paused, finished }
  }, [clients])

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <p className="eyebrow">Módulo clientes</p>
          <h2>Clientes</h2>
        </div>
        <button type="button" className="primary-btn" onClick={handleCreate}>
          Novo Cliente
        </button>
      </div>

      <div className="summary-grid">
        <article className="summary-card">
          <strong>{summary.active}</strong>
          <span>Ativos</span>
        </article>
        <article className="summary-card">
          <strong>{summary.paused}</strong>
          <span>Pausados</span>
        </article>
        <article className="summary-card">
          <strong>{summary.finished}</strong>
          <span>Finalizados</span>
        </article>
      </div>

      <div className="search-bar">
        <input
          type="search"
          placeholder="Pesquisar por nome, empresa ou e-mail"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <ClientList clients={clients} searchTerm={searchTerm} onEdit={handleEdit} onDelete={handleDelete} />

      <ClientModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialValues={selectedClient}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
      <DeleteClientModal 
        isOpen={deleteModalOpen} 
        onClose={() => {
          setDeleteModalOpen(false)
          setClientToDelete(null)
        }} 
        onConfirm={handleDeleteConfirm} 
      />
    </div>
  )
}

export default ClientsPage
