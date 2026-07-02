import { useEffect, useMemo, useState } from 'react'
import ClientList from '../components/ClientList'
import ClientModal from '../components/ClientModal'
import type { Client, ClientFormValues } from '../types/client'

const STORAGE_KEY = 'gcf-clients'

const createClient = (values: ClientFormValues): Client => ({
  id: crypto.randomUUID(),
  ...values,
})

function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const [selectedClient, setSelectedClient] = useState<Client | undefined>()

  useEffect(() => {
    const savedClients = localStorage.getItem(STORAGE_KEY)
    if (savedClients) {
      setClients(JSON.parse(savedClients))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients))
  }, [clients])

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
      setClients((prev) =>
        prev.map((client) => (client.id === selectedClient.id ? { ...client, ...values } : client)),
      )
      return
    }

    setClients((prev) => [createClient(values), ...prev])
  }

  const handleDelete = (id: string) => {
    setClients((prev) => prev.filter((client) => client.id !== id))
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
    </div>
  )
}

export default ClientsPage
