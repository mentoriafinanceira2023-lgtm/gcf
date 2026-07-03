type ConvertLeadModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

function ConvertLeadModal({ isOpen, onClose, onConfirm }: ConvertLeadModalProps) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <p className="eyebrow">CRM</p>
            <h2>Converter Lead em Cliente</h2>
          </div>
          <button type="button" className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <p>Deseja realmente converter este Lead em Cliente?</p>
          <p>O histórico comercial será preservado.</p>
        </div>

        <div className="modal-footer">
          <div className="modal-actions">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="primary-btn" onClick={onConfirm}>
              Converter Cliente
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConvertLeadModal
