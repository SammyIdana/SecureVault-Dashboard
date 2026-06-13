import { useRef } from 'react'
import { getFileColor, nodeContainsMatch } from '../../utils/fileUtils'
import './TreeNode.css'

// ============================================================
// TreeNode — the recursive core of the file explorer.
// Each node renders itself, then maps its children as more
// TreeNode instances. Depth increases by 1 each level,
// controlling the left indent. Base cases: type === 'file'
// (no children rendered) and empty children arrays.
// ============================================================

export default function TreeNode({
  node,
  depth,
  selectedId,
  expandedIds,
  onToggle,
  onFolderOpen,
  onFileSelect,
  searchQuery,
}) {
  const rowRef  = useRef(null)
  const isFolder   = node.type === 'folder'
  const isExpanded = expandedIds.has(node.id)
  const isSelected = selectedId === node.id

  // Search filter: hide branch if nothing inside matches
  if (searchQuery && !nodeContainsMatch(node, searchQuery)) return null

  function handleClick(e) {
    e.stopPropagation()
    if (isFolder) {
      onToggle(node.id)
      onFolderOpen(node)
    } else {
      onFileSelect(node)
    }
  }

  function handleKeyDown(e) {
    switch (e.key) {
      case 'ArrowRight':
        if (isFolder && !isExpanded) {
          onToggle(node.id)
          onFolderOpen(node)
        }
        break
      case 'ArrowLeft':
        if (isFolder && isExpanded) onToggle(node.id)
        break
      case 'Enter':
        isFolder ? (onToggle(node.id), onFolderOpen(node)) : onFileSelect(node)
        break
      case 'ArrowDown': {
        e.preventDefault()
        const rows = [...document.querySelectorAll('.tree-node__row')]
        const i    = rows.indexOf(e.currentTarget)
        if (i < rows.length - 1) rows[i + 1].focus()
        break
      }
      case 'ArrowUp': {
        e.preventDefault()
        const rows = [...document.querySelectorAll('.tree-node__row')]
        const i    = rows.indexOf(e.currentTarget)
        if (i > 0) rows[i - 1].focus()
        break
      }
      default: break
    }
  }

  return (
    <div
      className="tree-node"
      role="treeitem"
      aria-expanded={isFolder ? isExpanded : undefined}
      aria-selected={isSelected}
    >
      {/* ── Row ── */}
      <div
        ref={rowRef}
        className={`tree-node__row${isSelected ? ' tree-node__row--selected' : ''}`}
        style={{ paddingLeft: `${8 + depth * 14}px` }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Chevron */}
        <span className="tree-node__chevron">
          {isFolder && (
            isExpanded
              ? <ChevronDown />
              : <ChevronRight />
          )}
        </span>

        {/* Icon */}
        <span className="tree-node__icon"
          style={{ color: isFolder ? 'var(--folder-blue)' : getFileColor(node.name) }}>
          {isFolder
            ? (isExpanded ? <FolderOpenIcon /> : <FolderIcon />)
            : <FileIcon />}
        </span>

        {/* Name */}
        <span className="tree-node__name">{node.name}</span>

        {/* Empty badge */}
        {isFolder && node.children?.length === 0 && (
          <span className="tree-node__empty">empty</span>
        )}
      </div>

      {/* ── Recursive children ── */}
      {isFolder && isExpanded && node.children?.length > 0 && (
        <div role="group">
          {node.children.map(child => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              expandedIds={expandedIds}
              onToggle={onToggle}
              onFolderOpen={onFolderOpen}
              onFileSelect={onFileSelect}
              searchQuery={searchQuery}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Inline SVG icons (no external library) ── */
function ChevronRight() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  )
}
function ChevronDown() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  )
}
function FolderIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24"
      fill="currentColor" opacity="0.85">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1
        2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  )
}
function FolderOpenIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1
        2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
    </svg>
  )
}
function FileIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.5">
      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0
        0 0 2-2V9z"/>
      <polyline points="13 2 13 9 20 9"/>
    </svg>
  )
}