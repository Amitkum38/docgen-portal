import { useNavigate } from 'react-router-dom'
import { IconArrow, IconShield, IconBolt, IconCheck } from './Icons.jsx'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="hero">
      <div className="bg-blob bg-blob--a" aria-hidden="true" />
      <div className="bg-blob bg-blob--b" aria-hidden="true" />

      <div className="container hero-grid">
        <div className="hero-copy reveal">
          <span className="eyebrow">
            <span className="dot" />
            Secure &nbsp;•&nbsp; Fast &nbsp;•&nbsp; Government-Ready
          </span>

          <h1>
            Welcome to the<br />
            <span className="accent">Digital Document Generator</span>
          </h1>

          <p className="lead">
            Upload, process and generate Aadhaar, Ayushman &amp; other government
            scheme card PDFs with ease — all in one beautiful, modern dashboard.
          </p>

          <div className="hero-cta">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/master-login')}>
              Master Login <IconArrow width="18" height="18" />
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => navigate('/user-login')}>
              User Login
            </button>
          </div>

          <div className="hero-trust">
            <div className="trust-item">
              <IconShield width="18" height="18" />
              <span>End-to-end encrypted</span>
            </div>
            <div className="trust-item">
              <IconBolt width="18" height="18" />
              <span>Generates in &lt; 2s</span>
            </div>
            <div className="trust-item">
              <IconCheck width="18" height="18" />
              <span>50k+ PDFs created</span>
            </div>
          </div>
        </div>

        <HeroArt />
      </div>
    </section>
  )
}

function HeroArt() {
  return (
    <div className="hero-art reveal" aria-hidden="true">
      <div className="halo halo--outer" />
      <div className="halo halo--mid" />
      <div className="halo halo--inner" />
      <div className="hero-orb" />
      <img src="/logo.png" alt="Digital Document Generator" className="hero-logo" />

      <div className="chip chip--top">
        <span className="chip-dot" />
        Live • Processing
      </div>
      <div className="chip chip--bottom">
        <IconCheck width="14" height="14" />
        PDF generated
      </div>
    </div>
  )
}
