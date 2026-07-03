import { useMemo, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useCalendar } from '../modules/agenda/CalendarProvider'
import EventModal from '../modules/agenda/components/EventModal'
import type { AgendaEvent, AgendaEventInput } from '../modules/agenda/types'

function AgendaPage() {
  const { events, view, setView, createEvent, updateEvent, deleteEvent } = useCalendar()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<AgendaEvent | null>(null)

  const calendarEvents = useMemo(() => events.map((event) => ({
    id: event.id,
    title: `${event.title} • ${event.client}`,
    start: event.start,
    end: event.end,
    extendedProps: event,
  })), [events])

  const handleSave = (input: AgendaEventInput) => {
    if (selectedEvent) {
      updateEvent(selectedEvent.id, input)
      setSelectedEvent(null)
      return
    }

    createEvent(input)
  }

  const handleDelete = () => {
    if (!selectedEvent) return
    deleteEvent(selectedEvent.id)
    setSelectedEvent(null)
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h2>Agenda</h2>
          <p>Organize compromissos e reuniões do GCF.</p>
        </div>
        <div className="crm-toolbar__actions">
          <button type="button" className="secondary-btn" onClick={() => setView('dayGridMonth')}>Mensal</button>
          <button type="button" className="secondary-btn" onClick={() => setView('timeGridWeek')}>Semanal</button>
          <button type="button" className="secondary-btn" onClick={() => setView('timeGridDay')}>Diária</button>
          <button type="button" className="primary-btn" onClick={() => { setSelectedEvent(null); setIsModalOpen(true) }}>+ Novo Compromisso</button>
        </div>
      </div>

      <div className="content-card">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={view}
          headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
          events={calendarEvents}
          editable
          selectable
          selectMirror
          dayMaxEvents
          eventClick={(info) => {
            setSelectedEvent(info.event.extendedProps as AgendaEvent)
            setIsModalOpen(true)
          }}
          eventDrop={(info) => {
            const updated = info.event.extendedProps as AgendaEvent
            updateEvent(updated.id, {
              ...updated,
              start: info.event.start?.toISOString() ?? updated.start,
              end: info.event.end?.toISOString() ?? updated.end,
            })
          }}
          datesSet={(arg) => {
            if (arg.view.type === 'dayGridMonth') setView('dayGridMonth')
            if (arg.view.type === 'timeGridWeek') setView('timeGridWeek')
            if (arg.view.type === 'timeGridDay') setView('timeGridDay')
          }}
        />
      </div>

      {selectedEvent ? (
        <div className="modal-actions" style={{ justifyContent: 'flex-start' }}>
          <button type="button" className="secondary-btn" onClick={() => { setSelectedEvent(null); setIsModalOpen(true) }}>Editar</button>
          <button type="button" className="link-btn danger" onClick={handleDelete}>Excluir</button>
        </div>
      ) : null}

      <EventModal isOpen={isModalOpen} event={selectedEvent} onClose={() => { setIsModalOpen(false); setSelectedEvent(null) }} onSubmit={handleSave} />
    </div>
  )
}

export default AgendaPage
