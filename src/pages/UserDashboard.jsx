import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout.jsx'
import { UserRoute } from '../components/ProtectedRoute.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { IconArrow, IconHeart, IconWheat, IconGear } from '../components/Icons.jsx'

const SCHEMES = [
  {
    key: 'mera-kisan',
    name: 'Mera Kisan Card',
    sub: 'Auto-fill from Aadhaar',
    iconClass: 'ration',
    Icon: IconWheat,
    badge: 'Live'
  },
  {
    key: 'ayushman-card',
    name: 'Ayushman Card',
    sub: 'PMJAY health card',
    iconClass: 'ayushman',
    Icon: IconHeart
  },
  {
    key: 'demo',
    name: 'Demo',
    sub: 'Try the workflow',
    iconClass: 'abha',
    Icon: IconGear
  }
]

function UserDashboardContent() {
  const navigate = useNavigate()
  const { session } = useAuth()

  return (
    <DashboardLayout
      role="user"
      title="User Dashboard"
      subtitle={session?.name
        ? `Welcome, ${session.name}. Choose a scheme to upload data, process records and download PDFs.`
        : `Welcome, ${session?.userId}. Choose a scheme to upload data, process records and download PDFs.`}
    >
      <div className="schemes-grid schemes-grid--dash">
        {SCHEMES.map(({ Icon, ...s }, i) => (
          <button
            key={s.key}
            type="button"
            className="scheme-card reveal"
            style={{ '--i': i }}
            onClick={() => navigate(`/user/scheme/${s.key}`)}
          >
            {s.badge && <span className="pill">{s.badge}</span>}
            <div className={`scheme-icon ${s.iconClass}`}>
              <Icon width="26" height="26" />
            </div>
            <div className="scheme-text">
              <span className="scheme-name">{s.name}</span>
              <span className="scheme-sub">{s.sub}</span>
            </div>
            <span className="scheme-arrow"><IconArrow width="18" height="18" /></span>
          </button>
        ))}
      </div>

      <div className="workflow-hint reveal">
        <span className="kicker">Workflow</span>
        <p>
          Each scheme follows the same flow: <strong>Upload → Process → Download Result</strong>.
          For <strong>Mera Kisan Card</strong> auto-fill from Aadhaar, start the app with{' '}
          <code>npm run dev:full</code> (not <code>npm run dev</code> alone).
        </p>
      </div>
    </DashboardLayout>
  )
}

export default function UserDashboard() {
  return (
    <UserRoute>
      <UserDashboardContent />
    </UserRoute>
  )
}
