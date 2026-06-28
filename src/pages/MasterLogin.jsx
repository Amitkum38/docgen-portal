import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IconUser, IconLock, IconShield, IconArrow } from '../components/Icons.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function MasterLogin() {
  const navigate = useNavigate()
  const { loginMaster } = useAuth()
  const [form, setForm] = useState({ userId: '', password: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const result = await loginMaster(form.userId, form.password)
    setSubmitting(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate('/master/dashboard')
  }

  return (
    <section className="page">
      <div className="container">
        <form className="auth-card auth-card--lg reveal" onSubmit={handleSubmit}>
          <div className="auth-badge"><IconShield width="22" height="22" /></div>
          <h2>Master Login</h2>
          <p className="sub">Sign in to manage users and Digital Document Generator operations.</p>

          {error && <p className="auth-error">{error}</p>}

          <div className="field">
            <label htmlFor="master-id">Master ID</label>
            <div className="input-wrap">
              <IconUser width="18" height="18" />
              <input
                id="master-id"
                type="text"
                placeholder="master"
                required
                autoComplete="username"
                value={form.userId}
                onChange={(e) => { setForm({ ...form, userId: e.target.value }); setError('') }}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="master-password">Password</label>
            <div className="input-wrap">
              <IconLock width="18" height="18" />
              <input
                id="master-password"
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
            {submitting ? 'Logging in…' : 'Login as Master'} <IconArrow width="18" height="18" />
          </button>

          <p className="auth-foot">Not a master? <Link to="/user-login">User login</Link></p>
        </form>
      </div>
    </section>
  )
}
