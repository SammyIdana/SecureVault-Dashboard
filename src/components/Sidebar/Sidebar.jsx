import SearchBar from '../SearchBar/SearchBar'
import TreeNode from '../TreeNode/TreeNode'
import './Sidebar.css'

export default function Sidebar({
    data, selectedId, expandedIds, searchQuery, onSearchChange,
    onToggle, onFolderOpen, onFileSelect
}) {
    return(
        <aside className="sidebar">
            <div className="sidebar__header">
                <span className="label">Vault Explorer</span>
            </div>

            <SearchBar value={searchQuery} onChange={onSearchChange}/>

            <nav className="sidebar__tree" role="tree" aria-label="File explorer">
                {data.map(node => (
                    <TreeNode
                        key={node.id}
                        node={node}
                        depth={0}
                        selectedId={selectedId}
                        expandedIds={expandedIds}
                        onToggle={onToggle}
                        onFolderOpen={onFolderOpen}
                        onFileSelect={onFileSelect}
                        searchQuery={searchQuery}
                    />
                ))}
            </nav>
        </aside>
    )
}