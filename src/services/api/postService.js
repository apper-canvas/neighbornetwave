import postsData from '../mockData/posts.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let posts = [...postsData]

export const getAll = async () => {
  await delay(300)
  return [...posts]
}

export const getById = async (id) => {
  await delay(200)
  const post = posts.find(p => p.id === id)
  if (!post) throw new Error('Post not found')
  return { ...post }
}

export const create = async (postData) => {
  await delay(400)
  const newPost = {
    id: Date.now().toString(),
    ...postData,
    likes: 0,
    comments: [],
    createdAt: new Date().toISOString()
  }
  posts.unshift(newPost)
  return { ...newPost }
}

export const update = async (id, data) => {
  await delay(300)
  const index = posts.findIndex(p => p.id === id)
  if (index === -1) throw new Error('Post not found')
  
  posts[index] = { ...posts[index], ...data }
  return { ...posts[index] }
}

export const deletePost = async (id) => {
  await delay(250)
  const index = posts.findIndex(p => p.id === id)
  if (index === -1) throw new Error('Post not found')
  
  posts.splice(index, 1)
  return { success: true }
}