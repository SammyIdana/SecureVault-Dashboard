import './Breadcrumb.css'

// Breadcrumb — Wildcard Feature
// When let's say you are 5 folders deep in a legal case structure, you shouldn't have to click back through each level manually
// Clicking any segment of the breadcrumb jumps you straight there

export default function Breadcrumb({ breadcrumbs, onNavigate }) {
  return (
    <nav className="breadcrumb" aria-label="Folder path">

      <VaultIcon />

      {/* Root is always clickable, our starting point */}
      <button
        className="breadcrumb__item breadcrumb__item--root"
        onClick={() => onNavigate(null)}
      >
        Vault
      </button>

      {/* Ancestor segments */}
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1
        return (
          <span key={crumb.id} className="breadcrumb__segment">
            <span className="breadcrumb__sep">/</span>

            {/* last segment is where we are, not clickable */}
            {isLast ? (
              <span className="breadcrumb__item breadcrumb__item--current">
                {crumb.name}
              </span>
            ) : (
              // everything else is a link back up the tree
              <button
                className="breadcrumb__item"
                onClick={() => onNavigate(crumb)}
              >
                {crumb.name}
              </button>
            )}
          </span>
        )
      })}
    </nav>
  )
}

function VaultIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="var(--accent-cyan)" strokeWidth="2" style={{ flexShrink: 0 }}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  )
}