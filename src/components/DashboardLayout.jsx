import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function DashboardLayout({ role, title, subtitle, children }) {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    navigate(role === 'master' ? '/master-login' : '/user-login')
  }

  return (
    <div className="dash-shell">
      <header className="dash-header">
        <div className="container dash-header-inner">
          <Link to="/user/dashboard" className="brand">
            <img src="/logo.png" alt="" className="brand-logo" />
            <div className="brand-text">
              <span className="brand-title">Digital Document Generator</span>
              <  span className="brand-sub"> Fast • Secure • Reliable</span>
            </div>
          </Link>

          <div className="dash-header-meta">
            <span className={`dash-role dash-role--${role}`}>{role === 'master' ? 'Master' : 'User'}</span>
            <button type="button" className="btn btn-outline btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dash-main">
        <div className="container">
          {(title || subtitle) && (
            <div className="dash-head reveal">
              {title && <h1>{title}</h1>}
              {subtitle && <p className="lead">{subtitle}</p>}
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  )
}
