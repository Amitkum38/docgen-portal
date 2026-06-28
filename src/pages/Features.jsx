import { IconUpload, IconDoc, IconShield, IconBolt, IconUser, IconGear } from '../components/Icons.jsx'

const FEATURES = [
  { title: 'Bulk Upload',        desc: 'Upload CSV/Excel data and process hundreds of records in one go.',     Icon: IconUpload, tone: 'a' },
  { title: 'Scheme Templates',   desc: 'Ready-made templates for Aadhaar, Ayushman, ABHA and Ration cards.',   Icon: IconDoc,    tone: 'b' },
  { title: 'Secure & Private',   desc: 'Encrypted storage and role-based access for admins and users.',         Icon: IconShield, tone: 'c' },
  { title: 'One-click Export',   desc: 'Generate print-ready PDFs in seconds with consistent formatting.',      Icon: IconBolt,   tone: 'd' },
  { title: 'Master Controls',    desc: 'Create users, assign quotas and monitor Digital Document Generator activity.',              Icon: IconUser,   tone: 'e' },
  { title: 'Audit Logs',         desc: 'Track every upload, generation and download with full history.',         Icon: IconGear,   tone: 'f' }
]

export default function Features() {
  return (
    <section className="page" id="features">
      <div className="container">
        <span className="kicker">Features</span>
        <h1>Everything you need to ship faster</h1>
        <p className="lead">Built for service centres, CSCs and operators — speed, safety and scale, in one product.</p>

        <div className="feature-grid">
          {FEATURES.map(({ Icon, tone, ...f }) => (
            <div className={`feature feature--${tone}`} key={f.title}>
              <div className="feature-icon"><Icon width="22" height="22" /></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
