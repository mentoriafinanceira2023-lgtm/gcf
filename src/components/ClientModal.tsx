import { useEffect, useState } from 'react'
import type { Client, ClientFormValues } from '../types/client'

type ClientModalProps = {
  isOpen: boolean
  mode: 'create' | 'edit'
  initialValues?: Client
  onClose: () => void
  onSave: (values: ClientFormValues) => void
}

const initialFormValues = (): ClientFormValues => ({
  name: '',
  company: '',
  email: '',
  phone: '',
  whatsapp: '',
  type: 'Consultoria',
  contractValue: '',
  status: 'Ativo',
  objectives: '',
  observations: '',
})

function ClientModal({ isOpen, mode, initialValues, onClose, onSave }: ClientModalProps) {
  const [formValues, setFormValues] = useState<ClientFormValues>(initialFormValues())

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialValues) {
        setFormValues({
          name: initialValues.name,
          company: initialValues.company,
          email: initialValues.email,
          phone: initialValues.phone,
          whatsapp: initialValues.whatsapp,
          type: initialValues.type,
          contractValue: initialValues.contractValue,
          status: initialValues.status,
          objectives: initialValues.objectives,
          observations: initialValues.observations,
        })
      } else {
        setFormValues(initialFormValues())
      }
    }
  }, [isOpen, mode, initialValues])

  if (!isOpen) return null

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!formValues.name.trim()) {
      return
    }

    onSave(formValues)
    onClose()
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <p className="eyebrow">Cadastro</p>
            <h2>{mode === 'create' ? 'Novo cliente' : 'Editar cliente'}</h2>
          </div>
          <button type="button" className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="client-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Nome <span>*</span>
              <input name="name" value={formValues.name} onChange={handleChange} required />
            </label>
            <label>
              Empresa
              <input name="company" value={formValues.company} onChange={handleChange} />
            </label>
            <label>
              Email
              <input type="email" name="email" value={formValues.email} onChange={handleChange} />
            </label>
            <label>
              Telefone
              <input name="phone" value={formValues.phone} onChange={handleChange} />
            </label>
            <label>
              WhatsApp
              <input name="whatsapp" value={formValues.whatsapp} onChange={handleChange} />
            </label>
            <label>
              Tipo
              <select name="type" value={formValues.type} onChange={handleChange}>
                <option value="Mentoria">Mentoria</option>
                <option value="BPO">BPO</option>
                <option value="Consultoria">Consultoria</option>
                <option value="Outro">Outro</option>
              </select>
            </label>
            <label>
              Valor do contrato
              <input name="contractValue" value={formValues.contractValue} onChange={handleChange} />
            </label>
            <label>
              Status
              <select name="status" value={formValues.status} onChange={handleChange}>
                <option value="Ativo">Ativo</option>
                <option value="Pausado">Pausado</option>
                <option value="Finalizado">Finalizado</option>
              </select>
            </label>
          </div>

          <label>
            Objetivos
            <textarea name="objectives" value={formValues.objectives} onChange={handleChange} rows={3} />
          </label>

          <label>
            Observações
            <textarea name="observations" value={formValues.observations} onChange={handleChange} rows={4} />
          </label>

          <div className="modal-actions">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="primary-btn">
              Salvar cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ClientModal
