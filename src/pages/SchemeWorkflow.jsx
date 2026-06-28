import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout.jsx'
import { UserRoute } from '../components/ProtectedRoute.jsx'
import { IconUpload, IconGear, IconDoc, IconArrow, IconCheck } from '../components/Icons.jsx'

const SCHEME_META = {
  'mera-kisan': { name: 'Mera Kisan Card', desc: 'Upload beneficiary data and generate Mera Kisan card PDFs.' },
  'ayushman-card': { name: 'Ayushman Card', desc: 'Upload records and generate PMJAY Ayushman card PDFs.' },
  demo: { name: 'Demo', desc: 'Try the upload, process and download workflow with sample data.' }
}

const STEPS = [
  { key: 'upload', label: 'Upload', Icon: IconUpload },
  { key: 'process', label: 'Process', Icon: IconGear },
  { key: 'download', label: 'Download', Icon: IconDoc }
]

function SchemeWorkflowContent() {
  const { schemeId } = useParams()
  const navigate = useNavigate()
  const meta = SCHEME_META[schemeId]

  const [step, setStep] = useState(0)
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [processing, setProcessing] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!meta) navigate('/user/dashboard', { replace: true })
  }, [meta, navigate])

  if (!meta) return null

  const handleUpload = (e) => {
    const picked = e.target.files?.[0]
    if (!picked) return
    setFile(picked)
    setStep(1)
    setDone(false)
    setProgress(0)
  }

  const runProcess = () => {
    setProcessing(true)
    setProgress(0)
    let value = 0
    const timer = setInterval(() => {
      value += 12
      setProgress(Math.min(value, 100))
      if (value >= 100) {
        clearInterval(timer)
        setProcessing(false)
        setDone(true)
        setStep(2)
      }
    }, 180)
  }

  const handleDownload = () => {
    const content = `Digital Document Generator — ${meta.name}\nGenerated: ${new Date().toLocaleString()}\nSource: ${file?.name || 'demo-data.csv'}\n\nThis is a sample result file for demonstration.`
    const blob = new Blob([content], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${schemeId}-result.pdf`
    a.click()
    URL.revokeObjectURL(url)
  }

  const reset = () => {
    setStep(0)
    setFile(null)
    setProgress(0)
    setProcessing(false)
    setDone(false)
  }

  return (
    <DashboardLayout role="user" title={meta.name} subtitle={meta.desc}>
      <Link to="/user/dashboard" className="back-link reveal">← Back to dashboard</Link>

      <div className="workflow-steps reveal">
        {STEPS.map((s, i) => (
          <div key={s.key} className={'workflow-step' + (i <= step ? ' is-active' : '') + (i < step ? ' is-done' : '')}>
            <div className="workflow-step-icon"><s.Icon width="18" height="18" /></div>
            <span>{s.label}</span>
            {i < STEPS.length - 1 && <div className="workflow-step-line" />}
          </div>
        ))}
      </div>

      <div className="dash-card workflow-panel reveal">
        {step === 0 && (
          <>
            <h2>Step 1 — Upload</h2>
            <p className="sub">Select a CSV, Excel or image file to begin.</p>
            <label className="upload-zone">
              <IconUpload width="32" height="32" />
              <span>{file ? file.name : 'Click to choose a file'}</span>
              <input type="file" accept=".csv,.xlsx,.xls,.jpg,.jpeg,.png,.pdf" hidden onChange={handleUpload} />
            </label>
          </>
        )}

        {step === 1 && (
          <>
            <h2>Step 2 — Process</h2>
            <p className="sub">Validate and map <strong>{file?.name}</strong> onto the {meta.name} template.</p>

            {!done && (
              <>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <p className="progress-label">{processing ? `Processing… ${progress}%` : 'Ready to process'}</p>
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={processing}
                  onClick={runProcess}
                >
                  {processing ? 'Processing…' : 'Start Processing'} <IconGear width="18" height="18" />
                </button>
              </>
            )}

            {done && (
              <div className="process-done">
                <IconCheck width="22" height="22" />
                <span>Processing complete. Your PDF is ready to download.</span>
              </div>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <h2>Step 3 — Download Result</h2>
            <p className="sub">Your {meta.name} document has been generated successfully.</p>
            <div className="download-actions">
              <button type="button" className="btn btn-primary btn-lg" onClick={handleDownload}>
                Download PDF <IconDoc width="18" height="18" />
              </button>
              <button type="button" className="btn btn-outline" onClick={reset}>
                Process another file
              </button>
            </div>
          </>
        )}

        {step === 1 && done && (
          <button type="button" className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setStep(2)}>
            Continue to download <IconArrow width="18" height="18" />
          </button>
        )}
      </div>
    </DashboardLayout>
  )
}

export default function SchemeWorkflow() {
  return (
    <UserRoute>
      <SchemeWorkflowContent />
    </UserRoute>
  )
}
