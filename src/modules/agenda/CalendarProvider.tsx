import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { AgendaEvent, AgendaEventInput, AgendaView } from './types'

type CalendarContextValue = {
  events: AgendaEvent[]
  view: AgendaView
  setView: (view: AgendaView) => void
  createEvent: (input: AgendaEventInput) => AgendaEvent
  updateEvent: (id: string, input: AgendaEventInput) => AgendaEvent | null
  deleteEvent: (id: string) => void
  getEvents: () => AgendaEvent[]
}

const CalendarContext = createContext<CalendarContextValue | undefined>(undefined)

const initialEvents: AgendaEvent[] = []

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<AgendaEvent[]>(initialEvents)
  const [view, setView] = useState<AgendaView>('dayGridMonth')

  const createEvent = (input: AgendaEventInput) => {
    const event: AgendaEvent = {
      id: crypto.randomUUID(),
      ...input,
    }

    setEvents((prev) => [event, ...prev])
    return event
  }

  const updateEvent = (id: string, input: AgendaEventInput) => {
    let updatedEvent: AgendaEvent | null = null

    setEvents((prev) => {
      const next = prev.map((event) => {
        if (event.id !== id) {
          return event
        }

        updatedEvent = { ...event, ...input }
        return updatedEvent
      })

      return next
    })

    return updatedEvent
  }

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id))
  }

  const getEvents = () => events

  const value = useMemo(() => ({ events, view, setView, createEvent, updateEvent, deleteEvent, getEvents }), [events, view])

  return <CalendarContext.Provider value={value}>{children}</CalendarContext.Provider>
}

export function useCalendar() {
  const context = useContext(CalendarContext)

  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider')
  }

  return context
}
