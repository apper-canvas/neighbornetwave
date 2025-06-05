import noticesData from '../mockData/notices.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let notices = [...noticesData]

export const getAll = async () => {
  await delay(250)
  return [...notices]
}

export const getById = async (id) => {
  await delay(200)
  const notice = notices.find(n => n.id === id)
  if (!notice) throw new Error('Notice not found')
  return { ...notice }
}

export const create = async (noticeData) => {
  await delay(400)
  const newNotice = {
    id: Date.now().toString(),
    ...noticeData,
    createdAt: new Date().toISOString()
  }
  notices.unshift(newNotice)
  return { ...newNotice }
}

export const update = async (id, data) => {
  await delay(300)
  const index = notices.findIndex(n => n.id === id)
  if (index === -1) throw new Error('Notice not found')
  
  notices[index] = { ...notices[index], ...data }
  return { ...notices[index] }
}

export const deleteNotice = async (id) => {
  await delay(250)
  const index = notices.findIndex(n => n.id === id)
  if (index === -1) throw new Error('Notice not found')
  
  notices.splice(index, 1)
  return { success: true }
}