import type { LeadFormValues } from '../types'
import LeadForm from './LeadForm'

type LeadModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: LeadFormValues) => void
}

function LeadModal({ isOpen, onClose, onSubmit }: LeadModalProps) {
  if (!isOpen) return null

  const handleSubmit = (values: LeadFormValues) => {
    onSubmit(values)
    onClose()
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card modal-card--wide">
        <div className="modal-header">
          <div>
            <p className="eyebrow">CRM</p>
            <h2>Novo Lead</h2>
          </div>
          <button type="button" className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <LeadForm onSubmit={handleSubmit} onCancel={onClose} />
        </div>
      </div>
    </div>
  )
}

export default LeadModal
