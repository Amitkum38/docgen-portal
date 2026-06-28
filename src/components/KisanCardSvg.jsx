/** Card template background (served from public/) */
export const CARD_BACKGROUND_URL = '/images/card-background.svg'

function truncate(str, max = 95) {
  const s = str || ''
  return s.length > max ? s.slice(0, max - 1) + '…' : s
}

function InfoRows({ fields }) {
  const rows = [
    { label: 'Name', value: fields.name, bold: true },
    { label: 'C/O', value: fields.co },
    { label: 'DOB', value: fields.dob },
    { label: 'Gender', value: fields.gender },
    { label: 'Mobile', value: fields.mobile },
    { label: 'Aadhar', value: fields.aadhar }
  ]

  return (
    <div className="mk-card-info">
      {rows.map((row) => (
        <div key={row.label} className={`mk-card-line${row.bold ? ' mk-card-line--bold' : ''}`}>
          {row.label} : <span>{row.value || '\u00A0'}</span>
        </div>
      ))}
    </div>
  )
}

export function CardFrontSvg({ fields, photoUrl, qrHtml }) {
  return (
    <div className="mk-card mk-card--front" id="cardFront">
      <div
        className="mk-card-photo"
        style={photoUrl ? { backgroundImage: `url(${photoUrl})` } : undefined}
      />
      <InfoRows fields={fields} />
      <div className="mk-card-qr">
        {qrHtml ? (
          <div dangerouslySetInnerHTML={{ __html: qrHtml }} />
        ) : (
          <span className="mk-card-qr-placeholder">QR</span>
        )}
      </div>
      <div className="mk-card-farmer-id">
        Farmer ID : <strong>{fields.farmerid || '\u00A0'}</strong>
      </div>
    </div>
  )
}

export function CardBackSvg({ fields }) {
  const cols = [
    { k: 'State', v: fields.state },
    { k: 'Sub Dist', v: fields.subdist },
    { k: 'Village', v: fields.village },
    { k: 'Survey No.', v: fields.survey },
    { k: 'Area', v: fields.area }
  ]

  return (
    <div className="mk-card mk-card--back" id="cardBack">
      <div className="mk-card-address">
        <span className="mk-card-address-label">Address:</span>{' '}
        {truncate(fields.address, 120) || '\u00A0'}
      </div>
      <div className="mk-card-grid">
        {cols.map((c) => (
          <div key={c.k} className="mk-card-grid-cell">
            <div className="mk-card-grid-k">{c.k}</div>
            <div className="mk-card-grid-v">{truncate(c.v, 18) || '\u00A0'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
