import { useState, useMemo, useCallback } from 'react'
import data from './data/data.json'
import { findPath, nodeContainsMatch } from './utils/fileUtils'

import TopBar          from './components/TopBar/TopBar'
import Sidebar         from './components/Sidebar/Sidebar'
import Breadcrumb      from './components/Breadcrumb/Breadcrumb'
import MainContent     from './components/MainContent/MainContent'
import PropertiesPanel from './components/PropertiesPanel/PropertiesPanel'

import './App.css'

export default function App() {
  // which file the user clicked — drives the properties panel
  const [selectedFile,  setSelectedFile]  = useState(null)

  // tracks which folder ids are open in the tree
  const [expandedIds,   setExpandedIds]   = useState(new Set())

  // whatever the user typed in the search box
  const [searchQuery,   setSearchQuery]   = useState('')

  // the folder whose contents are shown in the main grid/list
  // null means we're at vault root
  const [currentFolder, setCurrentFolder] = useState(null)

  const [viewMode, setViewMode] = useState('grid')

  // derive breadcrumb trail from wherever we currently are
  const breadcrumbs = useMemo(() => {
    if (!currentFolder) return []
    return findPath(data, currentFolder.id) || []
  }, [currentFolder])

  // when searching, automatically expand any folder that has
  // a matching descendant so the user can actually see results
  const activeExpandedIds = useMemo(() => {
    if (!searchQuery) return expandedIds
    const ids = new Set(expandedIds)
    const autoExpand = (nodes) => {
      for (const node of nodes) {
        if (node.type === 'folder' && node.children) {
          if (nodeContainsMatch(node, searchQuery)) {
            ids.add(node.id)
            autoExpand(node.children)
          }
        }
      }
    }
    autoExpand(data)
    return ids
  }, [searchQuery, expandedIds])

  // clicking the arrow next to a folder just opens/closes it in the tree
  const handleToggle = useCallback((id) => {
    setExpandedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  // clicking a folder name does two things: expands it in the tree
  // AND navigates the main panel into it
  const handleFolderOpen = useCallback((node) => {
    setCurrentFolder(node)
    setSelectedFile(null)
  }, [])

  // clicking a file just highlights it and shows its details
  const handleFileSelect = useCallback((node) => {
    setSelectedFile(node)
  }, [])

  // breadcrumb click — jump straight to any ancestor folder
  const handleBreadcrumbNav = useCallback((node) => {
    setCurrentFolder(node) // passing null takes us back to root
    setSelectedFile(null)
  }, [])

  // what the main panel grid/list actually renders
  const currentItems = currentFolder
    ? (currentFolder.children || [])
    : data

  return (
    <div className="app">
      <TopBar />

      <div className="workspace">
        <Sidebar
          data={data}
          selectedId={selectedFile?.id}
          expandedIds={activeExpandedIds}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onToggle={handleToggle}
          onFolderOpen={handleFolderOpen}
          onFileSelect={handleFileSelect}
        />

        <div className="panel-main">
          <Breadcrumb
            breadcrumbs={breadcrumbs}
            onNavigate={handleBreadcrumbNav}
          />
          <MainContent
            items={currentItems}
            currentFolder={currentFolder}
            selectedId={selectedFile?.id}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onFolderOpen={handleFolderOpen}
            onFileSelect={handleFileSelect}
          />
        </div>

        <PropertiesPanel selectedFile={selectedFile} />
      </div>
    </div>
  )
}