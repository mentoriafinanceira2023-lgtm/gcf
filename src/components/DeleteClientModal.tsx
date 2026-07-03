type DeleteClientModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

function DeleteClientModal({ isOpen, onClose, onConfirm }: DeleteClientModalProps) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <p className="eyebrow">Clientes</p>
            <h2>Excluir Cliente</h2>
          </div>
          <button type="button" className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <p>Tem certeza que deseja excluir este Cliente?</p>
        </div>

        <div className="modal-footer">
          <div className="modal-actions">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="primary-btn" onClick={onConfirm}>
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteClientModal
