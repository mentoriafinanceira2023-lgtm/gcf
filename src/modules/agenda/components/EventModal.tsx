import { useEffect, useState } from 'react'
import type { AgendaEvent, AgendaEventInput } from '../types'

type EventModalProps = {
  isOpen: boolean
  event?: AgendaEvent | null
  onClose: () => void
  onSubmit: (input: AgendaEventInput) => void
}

const emptyForm = (): AgendaEventInput => ({
  title: '',
  client: '',
  type: 'Follow-up',
  start: '',
  end: '',
  location: '',
  notes: '',
})

function EventModal({ isOpen, event, onClose, onSubmit }: EventModalProps) {
  const [form, setForm] = useState<AgendaEventInput>(emptyForm())

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title,
        client: event.client,
        type: event.type,
        start: event.start,
        end: event.end,
        location: event.location,
        notes: event.notes,
      })
      return
    }

    setForm(emptyForm())
  }, [event, isOpen])

  if (!isOpen) return null

  const handleChange = (field: keyof AgendaEventInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit(form)
    onClose()
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <p className="eyebrow">Agenda</p>
            <h2>{event ? 'Editar compromisso' : '+ Novo Compromisso'}</h2>
          </div>
          <button type="button" className="modal-close" onClick={onClose}>×</button>
        </div>

        <form className="client-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Título
              <input value={form.title} onChange={(e) => handleChange('title', e.target.value)} required />
            </label>
            <label>
              Cliente
              <input value={form.client} onChange={(e) => handleChange('client', e.target.value)} required />
            </label>
            <label>
              Tipo
              <select value={form.type} onChange={(e) => handleChange('type', e.target.value)}>
                <option value="Sessão de Alinhamento">Sessão de Alinhamento</option>
                <option value="Mentoria">Mentoria</option>
                <option value="Consultoria Empresarial">Consultoria Empresarial</option>
                <option value="Reunião BPO">Reunião BPO</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Outro">Outro</option>
              </select>
            </label>
            <label>
              Data
              <input type="date" value={form.start.slice(0, 10)} onChange={(e) => handleChange('start', `${e.target.value}T${form.start.slice(11, 16) || '09:00'}`)} required />
            </label>
            <label>
              Hora Inicial
              <input type="time" value={form.start.slice(11, 16)} onChange={(e) => handleChange('start', `${form.start.slice(0, 10)}T${e.target.value}`)} />
            </label>
            <label>
              Hora Final
              <input type="time" value={form.end.slice(11, 16)} onChange={(e) => handleChange('end', `${form.end.slice(0, 10)}T${e.target.value}`)} />
            </label>
            <label>
              Local
              <input value={form.location} onChange={(e) => handleChange('location', e.target.value)} />
            </label>
          </div>
          <label>
            Observações
            <textarea value={form.notes} onChange={(e) => handleChange('notes', e.target.value)} rows={4} />
          </label>

          <div className="modal-footer">
            <div className="modal-actions">
              <button type="button" className="secondary-btn" onClick={onClose}>Cancelar</button>
              <button type="submit" className="primary-btn">Salvar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EventModal
