import { useEffect, useState } from 'react'
import type { LeadFormValues, LeadPriority, LeadStatus } from '../types'

type LeadFormProps = {
  initialValues?: LeadFormValues
  onSubmit: (values: LeadFormValues) => void
  onCancel: () => void
}

const emptyValues: LeadFormValues = {
  name: '',
  company: '',
  phone: '',
  whatsapp: '',
  email: '',
  city: '',
  state: '',
  origin: 'Indicação',
  productInterest: '',
  potentialValue: null,
  priority: 'Média',
  status: 'Novo',
  clientGoal: '',
  mainPain: '',
  observations: '',
}

const formatCurrencyValue = (value: number | null) => {
  if (value === null) {
    return ''
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value / 100)
}

function LeadForm({ initialValues, onSubmit, onCancel }: LeadFormProps) {
  const [values, setValues] = useState<LeadFormValues>(emptyValues)
  const [potentialValueInput, setPotentialValueInput] = useState('')
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues)
      setPotentialValueInput(formatCurrencyValue(initialValues.potentialValue))
    } else {
      setValues(emptyValues)
      setPotentialValueInput('')
    }
  }, [initialValues])

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target

    if (name === 'potentialValue') {
      const digits = value.replace(/\D/g, '')
      const cents = digits ? Number(digits) : null
      setValues((prev) => ({ ...prev, potentialValue: cents }))
      setPotentialValueInput(cents === null ? '' : formatCurrencyValue(cents))
      setError('')
      return
    }

    setValues((prev) => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleNext = () => {
    if (step === 1) {
      if (!values.name.trim() || !values.phone.trim()) {
        setError('Nome e telefone são obrigatórios para continuar.')
        return
      }
    }

    setError('')
    setStep((prev) => Math.min(prev + 1, 3))
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!values.name.trim() || !values.phone.trim()) {
      setError('Nome e telefone são obrigatórios.')
      return
    }

    setError('')
    onSubmit(values)
  }

  const handlePrioritySelect = (priority: LeadPriority) => {
    setValues((prev) => ({ ...prev, priority }))
  }

  const handleStatusSelect = (status: LeadStatus) => {
    setValues((prev) => ({ ...prev, status }))
  }

  const steps = ['Dados Básicos', 'Comercial', 'Diagnóstico']

  return (
    <form id="lead-form" className="lead-form" onSubmit={handleSubmit}>
      <div className="wizard-steps" aria-label="Indicador de etapas">
        {steps.map((label, index) => {
          const currentStepNumber = index + 1
          const isActive = step === currentStepNumber
          const isComplete = step > currentStepNumber

          return (
            <div key={label} className={`wizard-step ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''}`}>
              <span>{currentStepNumber}</span>
              <strong>{label}</strong>
            </div>
          )
        })}
      </div>

      {step === 1 ? (
        <div className="lead-form__grid">
          <label>
            Nome
            <input name="name" value={values.name} onChange={handleChange} required />
          </label>
          <label>
            Empresa
            <input name="company" value={values.company} onChange={handleChange} />
          </label>
          <label>
            Telefone
            <input name="phone" value={values.phone} onChange={handleChange} />
          </label>
          <label>
            WhatsApp
            <input name="whatsapp" value={values.whatsapp} onChange={handleChange} />
          </label>
          <label>
            Email
            <input type="email" name="email" value={values.email} onChange={handleChange} />
          </label>
          <label>
            Cidade
            <input name="city" value={values.city} onChange={handleChange} />
          </label>
          <label>
            Estado
            <input name="state" value={values.state} onChange={handleChange} />
          </label>
          <label>
            Origem
            <select name="origin" value={values.origin} onChange={handleChange}>
              <option value="Indicação">Indicação</option>
              <option value="Site">Site</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Rede Social">Rede Social</option>
              <option value="Evento">Evento</option>
              <option value="Outro">Outro</option>
            </select>
          </label>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="lead-form__grid">
          <label>
            Produto de Interesse
            <input name="productInterest" value={values.productInterest} onChange={handleChange} />
          </label>
          <label>
            Valor Potencial
            <input
              name="potentialValue"
              inputMode="numeric"
              pattern="[0-9]*"
              value={potentialValueInput}
              onChange={handleChange}
              placeholder="R$ 0,00"
            />
          </label>
          <label className="lead-field--full">
            Prioridade
            <div className="segment-group">
              {(['Baixa', 'Média', 'Alta', 'Urgente'] as LeadPriority[]).map((priority) => (
                <button
                  key={priority}
                  type="button"
                  className={`segment-button ${values.priority === priority ? 'active' : ''}`}
                  onClick={() => handlePrioritySelect(priority)}
                >
                  {priority}
                </button>
              ))}
            </div>
          </label>
          <label className="lead-field--full">
            Status inicial
            <div className="segment-group">
              {(['Novo', 'Em análise', 'Aguardando retorno', 'Qualificado'] as LeadStatus[]).map((status) => (
                <button
                  key={status}
                  type="button"
                  className={`segment-button ${values.status === status ? 'active' : ''}`}
                  onClick={() => handleStatusSelect(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </label>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="lead-form__grid lead-form__grid--stacked">
          <label className="lead-field--full">
            Objetivo do Cliente
            <textarea name="clientGoal" value={values.clientGoal} onChange={handleChange} rows={4} />
          </label>
          <label className="lead-field--full">
            Dor Principal
            <textarea name="mainPain" value={values.mainPain} onChange={handleChange} rows={4} />
          </label>
          <label className="lead-field--full">
            Observações
            <textarea name="observations" value={values.observations} onChange={handleChange} rows={4} />
          </label>
        </div>
      ) : null}

      {error ? <p className="modal-error">{error}</p> : null}

      <div className="modal-footer">
        <div className="modal-actions">
          <button type="button" className="secondary-btn" onClick={onCancel}>
            Cancelar
          </button>
          {step > 1 ? (
            <button type="button" className="secondary-btn" onClick={() => setStep((prev) => prev - 1)}>
              Voltar
            </button>
          ) : null}
          {step < 3 ? (
            <button type="button" className="primary-btn" onClick={handleNext}>
              Próximo
            </button>
          ) : (
            <button type="submit" className="primary-btn">
              Salvar Lead
            </button>
          )}
        </div>
      </div>
    </form>
  )
}

export default LeadForm
