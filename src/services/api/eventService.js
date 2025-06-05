import eventsData from '../mockData/events.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let events = [...eventsData]

export const getAll = async () => {
  await delay(300)
  return [...events]
}

export const getById = async (id) => {
  await delay(200)
  const event = events.find(e => e.id === id)
  if (!event) throw new Error('Event not found')
  return { ...event }
}

export const create = async (eventData) => {
  await delay(400)
  const newEvent = {
    id: Date.now().toString(),
    ...eventData,
    attendees: [],
    createdAt: new Date().toISOString()
  }
  events.unshift(newEvent)
  return { ...newEvent }
}

export const update = async (id, data) => {
  await delay(300)
  const index = events.findIndex(e => e.id === id)
  if (index === -1) throw new Error('Event not found')
  
  events[index] = { ...events[index], ...data }
  return { ...events[index] }
}

export const deleteEvent = async (id) => {
  await delay(250)
  const index = events.findIndex(e => e.id === id)
  if (index === -1) throw new Error('Event not found')
  
  events.splice(index, 1)
  return { success: true }
}