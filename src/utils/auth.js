// Dev: Vite proxies /auth, /health, /extract to localhost:9000.
// Prod: VITE_API_URL or default Render backend.
const API = import.meta.env.DEV
  ? ''
  : (import.meta.env.VITE_API_URL || 'https://docgen-portal-backend.onrender.com')

async function api(path, options = {}) {
  const resp = await fetch(`${API}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })
  const text = await resp.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    throw new Error('Invalid response from server.')
  }
  if (!resp.ok) {
    throw new Error(data?.error || `Request failed (${resp.status})`)
  }
  return data
}

export async function fetchSession() {
  const data = await api('/auth/session')
  return data.session
}

export async function loginMaster(userId, password) {
  try {
    const data = await api('/auth/master/login', {
      method: 'POST',
      body: JSON.stringify({ userId, password }),
    })
    return { ok: true, session: data.session }
  } catch (err) {
    return { ok: false, error: err.message }
  }
}

export async function loginUser(userId, password) {
  try {
    const data = await api('/auth/user/login', {
      method: 'POST',
      body: JSON.stringify({ userId, password }),
    })
    return { ok: true, session: data.session }
  } catch (err) {
    return { ok: false, error: err.message }
  }
}

export async function logout() {
  await api('/auth/logout', { method: 'POST' })
}

export async function fetchUsers() {
  const data = await api('/auth/users')
  return data.users
}

export async function createUser({ userId, password, name = '' }) {
  try {
    await api('/auth/users', {
      method: 'POST',
      body: JSON.stringify({ userId, password, name }),
    })
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err.message }
  }
}
