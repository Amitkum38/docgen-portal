import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IconUser, IconLock, IconArrow } from '../components/Icons.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function UserLogin() {
  const navigate = useNavigate()
  const location = useLocation()
  const { loginUser } = useAuth()
  const redirectTo = location.state?.from || '/user/dashboard'
  const [form, setForm] = useState({ userId: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const result = await loginUser(form.userId, form.password)
    setSubmitting(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate(redirectTo)
  }

  return (
    <section className="page">
      <div className="container">
        <form className="auth-card auth-card--lg reveal" onSubmit={handleSubmit}>
          <div className="auth-badge auth-badge--user"><IconUser width="22" height="22" /></div>
          <h2>User Login</h2>
          <p className="sub">Login with your User ID and password to upload documents and generate PDFs.</p>

          {error && <p className="auth-error">{error}</p>}

          <div className="field">
            <label htmlFor="user-id">User ID</label>
            <div className="input-wrap">
              <IconUser width="18" height="18" />
              <input
                id="user-id"
                type="text"
                placeholder="your-user-id"
                required
                autoComplete="username"
                value={form.userId}
                onChange={(e) => { setForm({ ...form, userId: e.target.value }); setError('') }}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="user-password">Password</label>
            <div className="input-wrap">
              <IconLock width="18" height="18" />
              <input
                id="user-password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => { setForm({ ...form, password: e.target.value }); setError('') }}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary full-btn" disabled={submitting}>
            {submitting ? 'Logging in…' : 'Login'} <IconArrow width="18" height="18" />
          </button>

          <p className="auth-foot">Need an account? Contact your master admin.</p>
        </form>
      </div>
    </section>
  )
}
