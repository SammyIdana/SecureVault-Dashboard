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

The file tree is built from a single component `TreeNode` that knows how 
to render itself.

When `TreeNode` receives a folder, it renders the folder row, then loops over 
its children and renders a `TreeNode` for each one. Each of those children does 
the same thing for their own children. This keeps going until there are no more 
children left — that's when the recursion stops.

The result is that the same lines of code can render a folder that is 2 
levels deep or 20 levels deep without any changes.

```jsx
{isFolder && isExpanded && node.children.map(child => (
  <TreeNode
    key={child.id}
    node={child}
    depth={depth + 1}  // indent gets deeper each level
  />
))}
```

Two things stop the recursion from going forever:
- A node with `type === "file"` never tries to render children
- A folder with an empty `children` array has nothing left to loop over

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