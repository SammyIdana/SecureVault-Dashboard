# SecureVault Dashboard

A high-performance, keyboard-accessible file explorer for SecureVault Inc. — built as part of the AmaliTech NSS Frontend Engineering Capstone.

## Live Demo

[Securevault-dashboard](https://sammyidana.github.io/SecureVault-Dashboard/)

## Design File

[Figma — Design System & UI Mockup](https://www.figma.com/design/5msPRoGJj7mkVwkoYQqz1u/SecureVaultDashBoard?node-id=0-1)

---

## Setup Instructions

```bash
git clone https://github.com/sammyidana/SecureVault-Dashboard.git
cd SecureVault-Dashboard
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Tech Stack

- **React 18** — component architecture and state management
- **Vite** — build tool and dev server
- **Pure CSS** — no component libraries, all components built from scratch
- **Google Fonts** — Fredoka (logo), DM Sans (UI)

---

## Recursive Strategy

The file explorer is powered by a single `TreeNode` component that calls itself.

Each `TreeNode` receives a `node` object from `data.json`. If the node is a folder and is expanded, it maps over `node.children` and renders a `TreeNode` for each one — passing `depth + 1` to increase the left indent. Those children do the same for their own children, and so on.

```jsx
{isFolder && isExpanded && node.children?.map(child => (
  <TreeNode
    key={child.id}
    node={child}
    depth={depth + 1}
    // ...
  />
))}
```

The two base cases that stop the recursion are `type === "file"` (no children to render) and empty `children` arrays. This means the component handles 2 levels of nesting or 20 levels with identical code — no special casing for depth.

---

## Features

### Core
- Recursive folder tree rendered from `data.json`
- Expand and collapse folders on click
- File selection with a Properties Panel showing name, type, size, and encryption status
- Grid and List view toggle for folder contents

### Keyboard Navigation
| Key | Action |
|-----|--------|
| `↑` `↓` | Move focus between visible tree nodes |
| `→` | Expand focused folder |
| `←` | Collapse focused folder |
| `↵ Enter` | Select focused file |

### Search
Typing in the search bar filters the tree in real time. Folders that contain matching files are automatically expanded so results are always visible — even when nested several levels deep.

### Wildcard Feature — Breadcrumb Navigation
The spec had no way to navigate back up the folder hierarchy without manually collapsing the tree. This is a real pain point for lawyers managing deeply nested case files.

The breadcrumb bar shows the full path to the current folder and makes every segment clickable — clicking any ancestor jumps straight there without touching the tree. This mirrors the navigation model of Windows Explorer, macOS Finder, and Google Drive, making it instantly familiar to non-technical users.

---

## Project Structure

src/

├── components/

│   ├── TopBar/           # Logo, nav controls, status badges

│   ├── Sidebar/          # Wraps search and file tree

│   ├── TreeNode/         # The recursive component

│   ├── SearchBar/        # Search field

│   ├── Breadcrumb/       # Wildcard feature

│   ├── MainContent/      # Grid and list view

│   └── PropertiesPanel/  # File metadata and actions

├── data/

│   └── data.json         # Vault file structure

├── utils/

│   └── fileUtils.js      # Path finder, search matcher, file type helpers

├── App.jsx               # State management and layout

└── index.css             # Design tokens and global styles