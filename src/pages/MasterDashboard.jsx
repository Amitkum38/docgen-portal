import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout.jsx'
import { MasterRoute } from '../components/ProtectedRoute.jsx'
import { IconUser, IconLock, IconArrow, IconCheck } from '../components/Icons.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function MasterDashboardContent() {
  const navigate = useNavigate()
  const { createUser, fetchUsers } = useAuth()
  const [form, setForm] = useState({ userId: '', password: '', name: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [users, setUsers] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const loadUsers = useCallback(async () => {
    setLoadingUsers(true)
    try {
      setUsers(await fetchUsers())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoadingUsers(false)
    }
  }, [fetchUsers])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const handleCreate = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (form.password.length < 4) {
      setError('Password must be at least 4 characters.')
      return
    }

    setSubmitting(true)
    const result = await createUser(form)
    setSubmitting(false)

    if (!result.ok) {
      setError(result.error)
      return
    }

    setSuccess(`User "${form.userId.trim()}" created. Redirecting to user login…`)
    setForm({ userId: '', password: '', name: '' })
    await loadUsers()
    setTimeout(() => navigate('/user-login'), 1500)
  }

  return (
    <DashboardLayout
      role="master"
      title="Master Dashboard"
      subtitle="Create user accounts with a unique User ID and password. New users can sign in from the user login page."
    >
      <div className="dash-grid">
        <form className="dash-card reveal" onSubmit={handleCreate}>
          <div className="dash-card-head">
            <h2>Create User</h2>
            <p>Generate a User ID + password for Digital Document Generator access.</p>
          </div>

          {error && <p className="auth-error">{error}</p>}
          {success && <p className="auth-success">{success}</p>}

          <div className="field">
            <label htmlFor="new-user-id">User ID</label>
            <div className="input-wrap">
              <IconUser width="18" height="18" />
              <input
                id="new-user-id"
                type="text"
                placeholder="e.g. user001"
                required
                value={form.userId}
                onChange={(e) => setForm({ ...form, userId: e.target.value })}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="new-user-name">Name (optional)</label>
            <div className="input-wrap">
              <IconUser width="18" height="18" />
              <input
                id="new-user-name"
                type="text"
                placeholder="Beneficiary operator name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="new-user-password">Password</label>
            <div className="input-wrap">
              <IconLock width="18" height="18" />
              <input
                id="new-user-password"
                type="password"
                placeholder="Set a password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary full-btn" disabled={submitting}>
            {submitting ? 'Creating…' : 'Create User ID + Password'} <IconArrow width="18" height="18" />
          </button>
        </form>

        <div className="dash-card reveal">
          <div className="dash-card-head">
            <h2>Registered Users</h2>
            <p>{users.length} user{users.length !== 1 ? 's' : ''} in the system.</p>
          </div>

          {loadingUsers ? (
            <p className="dash-empty">Loading users…</p>
          ) : users.length === 0 ? (
            <p className="dash-empty">No users yet. Create the first account using the form.</p>
          ) : (
            <ul className="user-list">
              {users.map((u) => (
                <li key={u.userId} className="user-list-item">
                  <div>
                    <strong>{u.userId}</strong>
                    {u.name && <span className="user-list-name">{u.name}</span>}
                  </div>
                  <IconCheck width="16" height="16" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default function MasterDashboard() {
  return (
    <MasterRoute>
      <MasterDashboardContent />
    </MasterRoute>
  )
}
