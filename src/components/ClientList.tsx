import type { Client } from '../types/client'

type ClientListProps = {
  clients: Client[]
  searchTerm: string
  onEdit: (client: Client) => void
  onDelete: (id: string) => void
}

function ClientList({ clients, searchTerm, onEdit, onDelete }: ClientListProps) {
  const filteredClients = clients.filter((client) => {
    const term = searchTerm.toLowerCase()
    return (
      client.name.toLowerCase().includes(term) ||
      client.company.toLowerCase().includes(term) ||
      client.email.toLowerCase().includes(term)
    )
  })

  return (
    <div className="client-list-card">
      <div className="client-list-header">
        <h3>Clientes cadastrados</h3>
        <span>{filteredClients.length} registros</span>
      </div>

      {filteredClients.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum cliente encontrado.</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Empresa</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Contrato</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id}>
                  <td>
                    <strong>{client.name}</strong>
                    <div className="table-subtext">{client.email}</div>
                  </td>
                  <td>{client.company}</td>
                  <td>{client.type}</td>
                  <td>
                    <span className={`status-pill ${client.status.toLowerCase()}`}>{client.status}</span>
                  </td>
                  <td>{client.contractValue}</td>
                  <td>
                    <div className="row-actions">
                      <button type="button" className="link-btn" onClick={() => onEdit(client)}>
                        Editar
                      </button>
                      <button type="button" className="link-btn danger" onClick={() => onDelete(client.id)}>
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ClientList
