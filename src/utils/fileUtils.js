// grab the extension from a filename — "report.pdf" → "pdf"
export function getFileExtension(name) {
  const parts = name.split('.')
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : ''
}

// each file type gets its own color so the tree doesn't look like a wall of identical grey icons
export function getFileColor(name) {
  const ext = getFileExtension(name)
  const map = {
    pdf:        'var(--file-pdf)',
    docx:       'var(--file-word)',
    doc:        'var(--file-word)',
    xlsx:       'var(--file-excel)',
    xls:        'var(--file-excel)',
    png:        'var(--file-image)',
    jpg:        'var(--file-image)',
    jpeg:       'var(--file-image)',
    svg:        'var(--file-image)',
    yaml:       'var(--file-code)',
    yml:        'var(--file-code)',
    txt:        'var(--file-text)',
    gitignore:  'var(--file-other)',
    ttf:        'var(--file-other)',
  }
  return map[ext] || 'var(--file-other)'
}

// something more readable than just ".docx" in the properties panel
export function getFileTypeLabel(name) {
  const ext = getFileExtension(name)
  const map = {
    pdf:   'PDF Document',
    docx:  'Word Document',
    doc:   'Word Document',
    xlsx:  'Excel Spreadsheet',
    xls:   'Excel Spreadsheet',
    png:   'PNG Image',
    jpg:   'JPEG Image',
    jpeg:  'JPEG Image',
    svg:   'SVG Vector',
    yaml:  'YAML Config',
    yml:   'YAML Config',
    txt:   'Text File',
    ttf:   'Font File',
  }
  return map[ext] || ext.toUpperCase() || 'File'
}

// walks the tree recursively and returns the full path to a node as an array — e.g. [Legal, Active_Cases, Doe_vs_MegaCorp]
// this is what powers the breadcrumb trail
export function findPath(nodes, targetId, path = []) {
  for (const node of nodes) {
    const current = [...path, node]
    if (node.id === targetId) return current
    if (node.children) {
      const found = findPath(node.children, targetId, current)
      if (found) return found
    }
  }
  return null
}

// returns true if this node OR any of its children match the search query — used to decide whether to show or hide a branch during search
export function nodeContainsMatch(node, query) {
  if (!query) return true
  const q = query.toLowerCase()
  if (node.name.toLowerCase().includes(q)) return true
  if (node.children) {
    return node.children.some(child => nodeContainsMatch(child, q))
  }
  return false
}

// builds a readable subtitle like "3 folders · 2 files" for the main content panel header
export function countChildren(children = []) {
  const folders = children.filter(n => n.type === 'folder').length
  const files   = children.filter(n => n.type === 'file').length
  const parts   = []
  if (folders) parts.push(`${folders} folder${folders > 1 ? 's' : ''}`)
  if (files)   parts.push(`${files} file${files > 1 ? 's' : ''}`)
  return parts.join(' · ') || 'Empty folder'
}