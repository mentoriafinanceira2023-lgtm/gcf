import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { CRMCard } from '../types'

type CardProps = {
  card: CRMCard
  onClick: (card: CRMCard) => void
  onEdit: (card: CRMCard) => void
  onDelete: (card: CRMCard) => void
  onConvert: (card: CRMCard) => void
}

function Card({
  card,
  onClick,
  onEdit,
  onDelete,
  onConvert,
}: CardProps) {
  const [showMenu, setShowMenu] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: card.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} className="crm-card">

      <div
        className="crm-card__content"
        onClick={() => onClick(card)}
      >

        <div className="crm-card__header">

          <h4>{card.name}</h4>

          <div className="crm-card__actions">

            <span className="crm-card__stage">
              {card.stage}
            </span>

            <button
              type="button"
              className="crm-card__menu-btn"
              onClick={(e) => {
                e.stopPropagation()
                setShowMenu((old) => !old)
              }}
            >
              ⋮
            </button>

            <div
              className="crm-card__drag"
              {...attributes}
              {...listeners}
              onClick={(e) => e.stopPropagation()}
              title="Arrastar"
            >
              ⠿
            </div>

          </div>

        </div>

        <p className="crm-card__company">
          {card.company}
        </p>

        <p className="crm-card__email">
          {card.email}
        </p>

        <div className="crm-card__footer">
          <span>{card.value}</span>
          <small>{card.nextAction}</small>
        </div>

      </div>

      {showMenu && (

        <div
          className="crm-card__dropdown"
          onClick={(e) => e.stopPropagation()}
        >

          <button
            type="button"
            onClick={() => {
              setShowMenu(false)
              onEdit(card)
            }}
          >
            ✏️ Editar
          </button>

          <button
            type="button"
            onClick={() => {
              setShowMenu(false)
              onConvert(card)
            }}
          >
            👤 Converter em Cliente
          </button>

          <button
            type="button"
            className="crm-card__dropdown--danger"
            onClick={() => {
              setShowMenu(false)
              onDelete(card)
            }}
          >
            🗑️ Excluir
          </button>

        </div>

      )}

    </div>
  )
}

export default Card