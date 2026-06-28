import { IconUpload, IconGear, IconDoc, IconArrow } from './Icons.jsx'

const STEPS = [
  {
    n: '01',
    title: 'Upload Data',
    desc: 'Login and upload an individual record or a bulk CSV/Excel sheet of beneficiaries.',
    Icon: IconUpload
  },
  {
    n: '02',
    title: 'Auto Process',
    desc: 'We validate fields, format values and map them onto official scheme templates.',
    Icon: IconGear
  },
  {
    n: '03',
    title: 'Download PDF',
    desc: 'Preview the document and download a print-ready, high-quality PDF instantly.',
    Icon: IconDoc
  }
]

export default function HowItWorks() {
  return (
    <section className="how" id="how">
      <div className="container">
        <div className="section-head center">
          <div>
            <span className="kicker">How it works</span>
            <h2>From raw data to ready-to-print PDF</h2>
            <p className="section-sub">A simple 3-step workflow that scales from a single card to thousands of records.</p>
          </div>
        </div>

        <div className="steps">
          {STEPS.map(({ Icon, ...s }, i) => (
            <div className="step" key={s.n}>
              <div className="step-icon"><Icon width="24" height="24" /></div>
              <div className="step-n">{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              {i < STEPS.length - 1 && (
                <div className="step-arrow"><IconArrow width="20" height="20" /></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
