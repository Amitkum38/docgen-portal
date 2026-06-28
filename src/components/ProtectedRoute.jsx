import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function AuthGate({ children, loginPath, allowedRole }) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="page">
        <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>
          Loading…
        </div>
      </div>
    )
  }

  if (!session || session.role !== allowedRole) {
    return <Navigate to={loginPath} replace />
  }

  return children
}

export function MasterRoute({ children }) {
  return <AuthGate loginPath="/master-login" allowedRole="master">{children}</AuthGate>
}

export function UserRoute({ children }) {
  return <AuthGate loginPath="/user-login" allowedRole="user">{children}</AuthGate>
}
