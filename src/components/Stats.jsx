const STATS = [
  { value: '50K+',  label: 'PDFs Generated' },
  { value: '12K+',  label: 'Active Users' },
  { value: '4',     label: 'Schemes Supported' },
  { value: '99.9%', label: 'Uptime' }
]

export default function Stats() {
  return (
    <section className="stats">
      <div className="container stats-inner">
        {STATS.map((s) => (
          <div key={s.label} className="stat">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
