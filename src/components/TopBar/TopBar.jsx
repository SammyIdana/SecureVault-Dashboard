import './TopBar.css'

export default function TopBar(){
    return(
        <header className="topbar">
            {/* Logo text */}
            <div className="topbar__logo">
                <div className="topbar__logo-icon">
                    <LockIcon/>
                </div>
                <span className="topbar__logo-text">SecureVault</span>
            </div>

            {/* Nav controls */}
            <div className="topbar__nav">
                <button className="topbar__nav-btn" aria-label="New">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                </button>
                <button className="topbar__nav-btn" aria-label="Back">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"/>
                    </svg>
                </button>
                <button className="topbar__nav-btn" aria-label="Forward">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </button>
                <button className="topbar__nav-btn" aria-label="Refresh">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 4 23 10 17 10"/>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                    </svg>
                </button>
            </div>

            {/* Status badges + Profile icon */}
            <div className="topbar__status">
                <span className="topbar__badge topbar__badge--encrypted">Encrypted</span>
                <span className="topbar__badge topbar__badge--encrypted">
                    <span className="topbar__dot"/>
                    Secure
                </span>
                <div className="topbar__profile-icon" aria-label="User menu">SI</div>
            </div>
        </header>
    )
}

function LockIcon(){
    return(
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
    )
}