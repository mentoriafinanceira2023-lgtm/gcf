import { useDroppable } from '@dnd-kit/core'
import type { CRMCard, CRMStage } from '../types'
import Card from './Card'

type ColumnProps = {
  title: CRMStage
  cards: CRMCard[]
  onCardClick: (card: CRMCard) => void
  onCardEdit: (card: CRMCard) => void
  onCardDelete: (card: CRMCard) => void
  onCardConvert: (card: CRMCard) => void
}

function Column({ title, cards, onCardClick, onCardEdit, onCardDelete, onCardConvert }: ColumnProps) {
  const { setNodeRef } = useDroppable({ id: title })

  return (
    <section className="crm-column" ref={setNodeRef}>
      <div className="crm-column__header">
        <h3>{title}</h3>
        <span>{cards.length}</span>
      </div>

      <div className="crm-column__body">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={onCardClick} onEdit={onCardEdit} onDelete={onCardDelete} onConvert={onCardConvert} />
        ))}
      </div>
    </section>
  )
}

export default Column
