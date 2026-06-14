import { countChildren, getFileColor, getFileExtension } from '../../utils/fileUtils'
import './MainContent.css'

export default function MainContent({
  items, currentFolder, selectedId,
  viewMode, onViewModeChange,
  onFolderOpen, onFileSelect,
}) {
  const subtitle = currentFolder
    ? countChildren(currentFolder.children)
    : `${items.length} items`

  return (
    <div className="main-content">

      {/* Folder heading row */}
      <div className="main-content__header">
        <div className="main-content__folder-info">
          <FolderSVG size={22} />
          <div>
            <h1 className="main-content__folder-name">
              {currentFolder ? currentFolder.name : 'Vault Root'}
            </h1>
            <p className="main-content__folder-meta">
              {subtitle} · Last modified 4 months ago
            </p>
          </div>
        </div>

        {/* Grid or List view toggle */}
        <div className="view-toggle" role="group" aria-label="View mode">
          <button
            className={`view-toggle__btn ${viewMode === 'grid' ? 'view-toggle__btn--active' : ''}`}
            onClick={() => onViewModeChange('grid')}
            aria-pressed={viewMode === 'grid'}
          >
            <GridIcon /> Grid
          </button>
          <button
            className={`view-toggle__btn ${viewMode === 'list' ? 'view-toggle__btn--active' : ''}`}
            onClick={() => onViewModeChange('list')}
            aria-pressed={viewMode === 'list'}
          >
            <ListIcon /> List
          </button>
        </div>
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="main-content__empty">
          <FolderSVG size={48} muted />
          <p>This folder is empty</p>
        </div>
      )}

      {/* Grid view */}
      {viewMode === 'grid' && items.length > 0 && (
        <div className="content-grid">
          {items.map(item => (
            <GridCard
              key={item.id}
              item={item}
              isSelected={selectedId === item.id}
              onFolderOpen={onFolderOpen}
              onFileSelect={onFileSelect}
            />
          ))}
        </div>
      )}

      {/* List view */}
      {viewMode === 'list' && items.length > 0 && (
        <div className="content-list">
          <div className="content-list__header">
            <span>Name</span>
            <span>Type</span>
            <span>Size</span>
          </div>
          {items.map(item => (
            <ListRow
              key={item.id}
              item={item}
              isSelected={selectedId === item.id}
              onFolderOpen={onFolderOpen}
              onFileSelect={onFileSelect}
            />
          ))}
        </div>
      )}

    </div>
  )
}

/* Grid Card */
function GridCard({ item, isSelected, onFolderOpen, onFileSelect }) {
  const isFolder = item.type === 'folder'

  function handleClick() {
    isFolder ? onFolderOpen(item) : onFileSelect(item)
  }

  return (
    <div
      className={`grid-card ${isSelected ? 'grid-card--selected' : ''}`}
      onClick={handleClick}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
      tabIndex={0}
      role={isFolder ? 'button' : 'option'}
      aria-selected={isSelected}
    >
      <div className="grid-card__icon">
        {isFolder
          ? <FolderSVG size={48} />
          : <FileSVG name={item.name} size={42} />}
      </div>
      <span className="grid-card__name">{item.name}</span>
    </div>
  )
}

/* List Row */
function ListRow({ item, isSelected, onFolderOpen, onFileSelect }) {
  const isFolder = item.type === 'folder'
  const ext = isFolder ? '—' : getFileExtension(item.name).toUpperCase()

  return (
    <div
      className={`list-row ${isSelected ? 'list-row--selected' : ''}`}
      onClick={() => isFolder ? onFolderOpen(item) : onFileSelect(item)}
      onKeyDown={e => e.key === 'Enter' && (isFolder ? onFolderOpen(item) : onFileSelect(item))}
      tabIndex={0}
    >
      <div className="list-row__name">
        {isFolder ? <FolderSVG size={16} /> : <FileSVG name={item.name} size={15} />}
        <span>{item.name}</span>
      </div>
      <span className="list-row__type">{ext}</span>
      <span className="list-row__size">{item.size || '—'}</span>
    </div>
  )
}

/* SVG Icons */
function FolderSVG({ size = 20, muted = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill={muted ? 'var(--border)' : 'var(--folder-blue)'} opacity="0.9">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  )
}

function FileSVG({ name, size = 20 }) {
  const color = getFileColor(name)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke={color} strokeWidth="1.5">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
      <polyline points="13 2 13 9 20 9"/>
    </svg>
  )
}

function GridIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2">
      <rect x="3"  y="3"  width="7" height="7"/>
      <rect x="14" y="3"  width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/>
      <rect x="3"  y="14" width="7" height="7"/>
    </svg>
  )
}

function ListIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2">
      <line x1="8"  y1="6"  x2="21" y2="6"/>
      <line x1="8"  y1="12" x2="21" y2="12"/>
      <line x1="8"  y1="18" x2="21" y2="18"/>
      <line x1="3"  y1="6"  x2="3.01" y2="6"/>
      <line x1="3"  y1="12" x2="3.01" y2="12"/>
      <line x1="3"  y1="18" x2="3.01" y2="18"/>
    </svg>
  )
}