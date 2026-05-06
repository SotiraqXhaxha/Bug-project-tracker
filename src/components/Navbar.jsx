import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import UserBadge from './UserBadge';

function Navbar({ theme, onToggleTheme, currentUser, onLogout }) {
  // State i drawer mobile
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/projects', label: 'Projects' },
    { path: '/tasks', label: 'Tasks' },
    { path: '/kanban', label: 'Kanban Board' },
    { path: '/team', label: 'Team' },
    { path: '/profile', label: 'Profile' },
    { path: '/about', label: 'About' },
  ];

  // Bllokon scroll te body
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  // Mbyll drawer-in shpejt
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="navbar-main">
          <div className="brand">
            <span className="brand-badge">BPT</span>
            <div>
              <h1>Bug Project Tracker</h1>
              <p>Developer Workflow Dashboard</p>
            </div>
          </div>

          <nav className="nav-links">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="navbar-actions">
            <UserBadge user={currentUser} />
            <button
              className={`theme-switch ${theme === 'light' ? 'light' : 'dark'}`}
              onClick={onToggleTheme}
              type="button"
              aria-label="Toggle theme"
              aria-pressed={theme === 'light'}
            >
              <span className="theme-switch-track">
                <span className="theme-switch-icon sun">☀</span>
                <span className="theme-switch-icon moon">☾</span>
                <span className="theme-switch-knob" />
              </span>
              <span className="theme-switch-label">
                {theme === 'dark' ? 'Dark' : 'Light'}
              </span>
            </button>
            <button className="btn btn-danger" onClick={onLogout} type="button">
              Logout
            </button>
          </div>

          <button
            className="menu-toggle"
            type="button"
            aria-label="Open menu"
            onClick={() => setIsDrawerOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div
        className={`mobile-overlay ${isDrawerOpen ? 'open' : ''}`}
        onClick={closeDrawer}
      />

      <aside className={`mobile-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-head">
          <div className="brand">
            <span className="brand-badge">BPT</span>
            <div>
              <h1>Bug Project Tracker</h1>
              <p>Developer Workflow Dashboard</p>
            </div>
          </div>

          <button
            className="drawer-close"
            type="button"
            aria-label="Close menu"
            onClick={closeDrawer}
          >
            ×
          </button>
        </div>

        <div className="mobile-drawer-body">
          <nav className="mobile-nav-links">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? 'active' : ''}`
                }
                onClick={closeDrawer}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mobile-drawer-footer">
            <UserBadge user={currentUser} />
            <div className="mobile-drawer-actions">
              <button
                className={`theme-switch ${theme === 'light' ? 'light' : 'dark'}`}
                onClick={onToggleTheme}
                type="button"
                aria-label="Toggle theme"
                aria-pressed={theme === 'light'}
              >
                <span className="theme-switch-track">
                  <span className="theme-switch-icon sun">☀</span>
                  <span className="theme-switch-icon moon">☾</span>
                  <span className="theme-switch-knob" />
                </span>
                <span className="theme-switch-label">
                  {theme === 'dark' ? 'Dark' : 'Light'}
                </span>
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  closeDrawer();
                  onLogout();
                }}
                type="button"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>
    </header>
  );
}

export default Navbar;
