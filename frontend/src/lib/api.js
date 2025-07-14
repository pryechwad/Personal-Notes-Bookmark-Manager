const BASE = 'http://localhost:5000/api'

const getAuthHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  }
}

// Auth API
export async function login(credentials) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  })
  return res.json()
}

export async function register(userData) {
  const res = await fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  })
  return res.json()
}

// Notes API
export async function fetchNotes(params = {}) {
  const query = new URLSearchParams(params).toString()
  const res = await fetch(`${BASE}/notes${query ? `?${query}` : ''}`, {
    headers: getAuthHeaders()
  })
  return res.json()
}

export async function createNote(data) {
  const res = await fetch(`${BASE}/notes`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function updateNote(id, data) {
  const res = await fetch(`${BASE}/notes/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function deleteNote(id) {
  const res = await fetch(`${BASE}/notes/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  return res.json()
}

export async function toggleNoteFavorite(id) {
  const res = await fetch(`${BASE}/notes/${id}/favorite`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  })
  return res.json()
}

// Bookmarks API
export async function fetchBookmarks(params = {}) {
  const query = new URLSearchParams(params).toString()
  const res = await fetch(`${BASE}/bookmarks${query ? `?${query}` : ''}`, {
    headers: getAuthHeaders()
  })
  return res.json()
}

export async function createBookmark(data) {
  const res = await fetch(`${BASE}/bookmarks`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function updateBookmark(id, data) {
  const res = await fetch(`${BASE}/bookmarks/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  })
  return res.json()
}

export async function deleteBookmark(id) {
  const res = await fetch(`${BASE}/bookmarks/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  return res.json()
}

export async function toggleBookmarkFavorite(id) {
  const res = await fetch(`${BASE}/bookmarks/${id}/favorite`, {
    method: 'PATCH',
    headers: getAuthHeaders()
  })
  return res.json()
}
