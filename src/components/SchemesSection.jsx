import { useNavigate } from 'react-router-dom'
import { IconArrow, IconHeart, IconLeaf, IconWheat } from './Icons.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const SCHEME_ROUTES = {
  aadhaar: 'mera-kisan',
  ayushman: 'ayushman-card',
  abha: 'demo',
  ration: 'demo'
}

const SCHEMES = [
  {
    key: 'aadhaar',
    name: 'Mera Kisan Card',
    sub: 'Auto-fill from Aadhaar',
    Icon: IconWheat,
    iconClass: 'ration',
    badge: 'Most used'
  },
  {
    key: 'ayushman',
    name: 'Ayushman',
    sub: 'PMJAY Health Card',
    Icon: IconHeart,
    iconClass: 'ayushman'
  },
  {
    key: 'abha',
    name: 'ABHA',
    sub: 'Health Account ID',
    Icon: IconLeaf,
    iconClass: 'abha'
  },
  {
    key: 'ration',
    name: 'MP Ration Card',
    sub: 'State Ration Card',
    Icon: IconWheat,
    iconClass: 'ration'
  }
]

export default function SchemesSection() {
  const navigate = useNavigate()
  const { isUserLoggedIn } = useAuth()

  const openScheme = (key) => {
    const route = SCHEME_ROUTES[key] || 'demo'
    if (isUserLoggedIn) {
      navigate(`/user/scheme/${route}`)
    } else {
      navigate('/user-login', { state: { from: `/user/scheme/${route}` } })
    }
  }

  return (
    <section className="schemes" id="schemes">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="kicker">Government Schemes</span>
            <h2>Generate PDFs in a few clicks</h2>
            <p className="section-sub">Choose a scheme to start — upload the data, preview the document and download a print-ready PDF.</p>
          </div>
          <a className="link-arrow" href="#features">
            View all features <IconArrow width="16" height="16" />
          </a>
        </div>

        <div className="schemes-grid">
          {SCHEMES.map(({ Icon, ...s }, i) => (
            <button key={s.key} className="scheme-card reveal" style={{ '--i': i }} type="button" onClick={() => openScheme(s.key)}>
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
      </div>
    </section>
  )
}
