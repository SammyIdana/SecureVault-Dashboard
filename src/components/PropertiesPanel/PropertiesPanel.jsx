import { getFileColor, getFileTypeLabel } from '../../utils/fileUtils'
import './PropertiesPanel.css'

export default function PropertiesPanel({ selectedFile }) {
  return (
    <aside className="properties-panel">
      <div className="properties-panel__header label">Properties</div>

      {!selectedFile
        ? <EmptyState />
        : <FileDetails file={selectedFile} />}
    </aside>
  )
}

function EmptyState() {
  return (
    <div className="properties-panel__empty">
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none"
        stroke="var(--border)" strokeWidth="1">
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
        <polyline points="13 2 13 9 20 9"/>
      </svg>
      <p>Select a file to<br/>view properties</p>
    </div>
  )
}

function FileDetails({ file }) {
  const color = getFileColor(file.name)
  const label = getFileTypeLabel(file.name)

  return (
    <>
      {/* file icon + name at the top */}
      <div className="properties-panel__preview">
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none"
          stroke={color} strokeWidth="1.2">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
          <polyline points="13 2 13 9 20 9"/>
        </svg>
        <span className="properties-panel__filename">{file.name}</span>
      </div>

      <div className="properties-panel__divider" />

      {/* metadata rows */}
      <div className="properties-panel__rows">
        <PropRow label="Name"       value={file.name} truncate />
        <PropRow label="Type"       value={label} badge color={color} />
        <PropRow label="Size"       value={file.size} />
        <PropRow label="Encryption" value="AES-256 ✓" success />
        <PropRow label="Modified"   value="4 mo ago" />
      </div>

      <div className="properties-panel__divider" />

      {/* action buttons */}
      <div className="properties-panel__actions">
        <button className="btn-download">
          <DownloadIcon />
          Download
        </button>
        <button className="btn-more">
          <DotsIcon />
          More Options
        </button>
      </div>
    </>
  )
}

function PropRow({ label, value, badge, color, success, truncate }) {
  return (
    <div className="prop-row">
      <span className="prop-row__label">{label}</span>
      {badge ? (
        <span className="prop-row__badge"
          style={{ color, borderColor: `${color}44`, background: `${color}11` }}>
          {value}
        </span>
      ) : (
        <span className={`prop-row__value${success ? ' prop-row__value--success' : ''}${truncate ? ' prop-row__value--truncate' : ''}`}>
          {value}
        </span>
      )}
    </div>
  )
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  )
}

function DotsIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="1"/>
      <circle cx="19" cy="12" r="1"/>
      <circle cx="5"  cy="12" r="1"/>
    </svg>
  )
}