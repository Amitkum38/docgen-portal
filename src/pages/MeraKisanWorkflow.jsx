import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout.jsx'
import { UserRoute } from '../components/ProtectedRoute.jsx'
import { CardFrontSvg, CardBackSvg } from '../components/KisanCardSvg.jsx'
import './MeraKisanWorkflow.css'
// Dev: Vite proxies /health and /extract to localhost:9000 (npm run dev:full).
// Prod: VITE_API_URL or default Render backend.
const API = import.meta.env.DEV
  ? ''
  : (import.meta.env.VITE_API_URL || 'https://docgen-portal-backend.onrender.com')
const EMPTY = {
  name: '',
  co: '',
  dob: '',
  gender: '',
  mobile: '',
  aadhar: '',
  farmerid: '',
  address: '',
  state: '',
  subdist: '',
  village: '',
  survey: '',
  area: ''
}

function loadQrScript() {
  if (window.qrcode) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-qrcode-generator]')
    if (existing) {
      existing.addEventListener('load', () => resolve())
      return
    }
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js'
    script.dataset.qrcodeGenerator = '1'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Could not load QR library'))
    document.head.appendChild(script)
  })
}

function MeraKisanContent() {
  const [fields, setFields] = useState(EMPTY)
  const [photoUrl, setPhotoUrl] = useState('')
  const [qrHtml, setQrHtml] = useState('')
  const [status, setStatus] = useState({ msg: '', color: '#356' })
  const [uploading, setUploading] = useState(false)
  const [rawText, setRawText] = useState('')
  const [showRaw, setShowRaw] = useState(false)
  const [serverReady, setServerReady] = useState(null)
  const aadhaarRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    let timer

    const checkHealth = () => {
      fetch(`${API}/health`)
        .then((r) => {
          if (cancelled) return
          setServerReady(r.ok)
          if (!r.ok) timer = setTimeout(checkHealth, 3000)
        })
        .catch(() => {
          if (cancelled) return
          setServerReady(false)
          timer = setTimeout(checkHealth, 3000)
        })
    }

    checkHealth()
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [])

  const makeQr = useCallback(async (text) => {
    try {
      await loadQrScript()
      if (!window.qrcode) {
        setQrHtml('QR')
        return
      }
      const qr = window.qrcode(0, 'M')
      qr.addData(text || ' ')
      qr.make()
      setQrHtml(qr.createImgTag(2, 0))
    } catch {
      setQrHtml('QR')
    }
  }, [])

  useEffect(() => {
    makeQr(fields.farmerid)
  }, [fields.farmerid, makeQr])

  const setField = (key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }))
  }

  const applyExtracted = (f) => {
    setFields((prev) => ({
      ...prev,
      ...(f.name ? { name: f.name } : {}),
      ...(f.co ? { co: f.co } : {}),
      ...(f.dob ? { dob: f.dob } : {}),
      ...(f.gender ? { gender: f.gender } : {}),
      ...(f.aadhar ? { aadhar: f.aadhar } : {}),
      ...(f.address ? { address: f.address } : {}),
      ...(f.state ? { state: f.state } : {}),
      ...(f.subdist ? { subdist: f.subdist } : {}),
      ...(f.village ? { village: f.village } : {})
    }))
  }

  const handleAadhaarUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setStatus({ msg: 'Uploading & reading the Aadhaar… this can take 10–30 seconds.', color: '#356' })
    try {
      const fd = new FormData()
      fd.append('aadhaar', file)
      const resp = await fetch(`${API}/extract`, {
        method: 'POST',
        body: fd
      })
      const text = await resp.text()
      let data
      try {
        data = text ? JSON.parse(text) : null
      } catch {
        throw new Error(
          resp.ok
            ? 'Invalid response from card server.'
            : 'Card server not reachable. Run: npm run dev:full (or npm run card-server in a second terminal).'
        )
      }
      if (!resp.ok) {
        setStatus({
          msg: data?.error || `Card server not running (HTTP ${resp.status}). Run: npm run dev:full`,
          color: '#b00'
        })
        setServerReady(false)
        return
      }
      if (data?.error) {
        setStatus({ msg: data.error, color: '#b00' })
        return
      }
      setServerReady(true)
      applyExtracted(data.fields || {})
      setRawText(
        '--- FIELDS FILLED ---\n' + JSON.stringify(data.fields || {}, null, 1) +
        '\n\n--- OCR TEXT READ ---\n' + (data.rawText || '')
      )
      setShowRaw(true)
      const got = Object.keys(data.fields || {}).filter((k) => data.fields[k])
      if (data.source === 'qr') {
        setStatus({
          msg: '✓ Read the Aadhaar QR code — exact data filled in. Check the Aadhaar number, then add farm details.',
          color: '#1f6b2e'
        })
      } else if (got.length) {
        setStatus({
          msg: `No QR found, used OCR (less accurate). Filled: ${got.join(', ')}. Please check every field.`,
          color: '#b06b00'
        })
      } else {
        setStatus({
          msg: 'Could not read this file. Use a clearer image/PDF that clearly shows the QR code.',
          color: '#b06b00'
        })
      }
    } catch (err) {
      setStatus({
        msg: `Upload failed: ${err.message || err}. Start both servers with npm run dev:full.`,
        color: '#b00'
      })
    } finally {
      setUploading(false)
      if (aadhaarRef.current) aadhaarRef.current.value = ''
    }
  }

  const handlePhoto = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setPhotoUrl(ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <DashboardLayout role="user">
      <div className="mk-page">
      <Link to="/user/dashboard" className="back-link reveal">← Back to dashboard</Link>

      <div className="mk-shell dash-card reveal">
        <div className="mk-preview mk-print-area">
          <div className="mk-cards">
            <div className="mk-card-scaler">
              <CardFrontSvg fields={fields} photoUrl={photoUrl} qrHtml={qrHtml} />
            </div>
            <div className="mk-card-scaler">
              <CardBackSvg fields={fields} />
            </div>
          </div>
          <div className="mk-caption">Front &amp; back preview — exactly what will print.</div>
        </div>

        <form className="mk-form" onSubmit={(e) => e.preventDefault()}>
          <h2>Mera Kisan Card</h2>
          <p className="sub">Auto-fill from an Aadhaar card, or type the details. Then print.</p>

          {serverReady === false && (
            <div className="mk-server-warn" role="alert">
              Card server is temporarily unavailable. Please try again in a few moments.
            </div>
          )}

          <div className="mk-ocr">
            <h3><span aria-hidden="true">🌱</span> Auto-fill from Aadhaar</h3>
            <p>Upload an Aadhaar card image or PDF — Name, DOB, Gender, Aadhaar No. &amp; Address fill in automatically.</p>
            <input
              ref={aadhaarRef}
              type="file"
              accept="image/*,application/pdf"
              onChange={handleAadhaarUpload}
              disabled={uploading}
            />
            {uploading && (
              <div className="mk-bar">
                <i style={{ width: '90%' }} />
              </div>
            )}
            {status.msg && <div className="mk-status" style={{ color: status.color }}>{status.msg}</div>}
            {showRaw && (
              <details className="mk-raw">
                <summary>Show text read from card</summary>
                <pre>{rawText}</pre>
              </details>
            )}
          </div>

          <div className="mk-form-grid">
            <div className="field">
              <label htmlFor="photo">Photo (for the card)</label>
              <input id="photo" type="file" accept="image/*" onChange={handlePhoto} />
            </div>
            <div className="field">
              <label htmlFor="dob">DOB</label>
              <input id="dob" value={fields.dob} placeholder="From Aadhaar" onChange={(e) => setField('dob', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" value={fields.name} placeholder="From Aadhaar" onChange={(e) => setField('name', e.target.value)} />
            </div>

            <div className="field">
              <label htmlFor="gender">Gender</label>
              <input id="gender" value={fields.gender} placeholder="From Aadhaar" onChange={(e) => setField('gender', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="co">C/O (Care of)</label>
              <input id="co" value={fields.co} placeholder="Enter manually" onChange={(e) => setField('co', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="aadhar">Aadhaar</label>
              <input id="aadhar" value={fields.aadhar} placeholder="From Aadhaar" onChange={(e) => setField('aadhar', e.target.value)} />
            </div>

            <div className="field">
              <label htmlFor="mobile">Mobile</label>
              <input id="mobile" value={fields.mobile} placeholder="Enter manually" onChange={(e) => setField('mobile', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="farmerid">Farmer ID</label>
              <input id="farmerid" value={fields.farmerid} placeholder="Enter manually" onChange={(e) => setField('farmerid', e.target.value)} />
            </div>
            <div className="field field--empty" aria-hidden="true" />

            <div className="field field--address">
              <label htmlFor="address">Address (full)</label>
              <textarea id="address" value={fields.address} placeholder="From Aadhaar" onChange={(e) => setField('address', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="state">State</label>
              <input id="state" value={fields.state} placeholder="From Aadhaar" onChange={(e) => setField('state', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="subdist">Sub District</label>
              <input id="subdist" value={fields.subdist} placeholder="Enter manually" onChange={(e) => setField('subdist', e.target.value)} />
            </div>

            <div className="field">
              <label htmlFor="village">Village</label>
              <input id="village" value={fields.village} placeholder="Enter manually" onChange={(e) => setField('village', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="survey">Survey No.</label>
              <input id="survey" value={fields.survey} placeholder="Enter manually" onChange={(e) => setField('survey', e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="area">Area</label>
              <input id="area" value={fields.area} placeholder="Enter manually" onChange={(e) => setField('area', e.target.value)} />
            </div>

            <div className="mk-actions">
              <button type="button" className="btn btn-primary full-btn" onClick={() => window.print()}>
                Print / Save PDF
              </button>
            </div>
            <p className="mk-hint">Tip: Paper size <strong>A4</strong>, margins <strong>None/Default</strong>, and enable <strong>Background graphics</strong> for best results.</p>
          </div>
        </form>
      </div>
      </div>
    </DashboardLayout>
  )
}

export default function MeraKisanWorkflow() {
  return (
    <UserRoute>
      <MeraKisanContent />
    </UserRoute>
  )
}
