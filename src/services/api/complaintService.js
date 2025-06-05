import complaintsData from '../mockData/complaints.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let complaints = [...complaintsData]

export const getAll = async () => {
  await delay(350)
  return [...complaints]
}

export const getById = async (id) => {
  await delay(200)
  const complaint = complaints.find(c => c.id === id)
  if (!complaint) throw new Error('Complaint not found')
  return { ...complaint }
}

export const create = async (complaintData) => {
  await delay(450)
  const newComplaint = {
    id: Date.now().toString(),
    ...complaintData,
    status: 'submitted',
    createdAt: new Date().toISOString()
  }
  complaints.unshift(newComplaint)
  return { ...newComplaint }
}

export const update = async (id, data) => {
  await delay(300)
  const index = complaints.findIndex(c => c.id === id)
  if (index === -1) throw new Error('Complaint not found')
  
  complaints[index] = { ...complaints[index], ...data }
  return { ...complaints[index] }
}

export const deleteComplaint = async (id) => {
  await delay(250)
  const index = complaints.findIndex(c => c.id === id)
  if (index === -1) throw new Error('Complaint not found')
  
  complaints.splice(index, 1)
  return { success: true }
}