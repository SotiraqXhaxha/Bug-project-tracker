import { NavLink } from 'react-router-dom';
import UserBadge from './UserBadge';

function Navbar({ theme, onToggleTheme, currentUser, onLogout }) {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/projects', label: 'Projects' },
    { path: '/tasks', label: 'Tasks' },
    { path: '/kanban', label: 'Kanban Board' },
    { path: '/team', label: 'Team' },
    { path: '/about', label: 'About' },
  ];

  return (
    <header className="navbar">
      <div className="container navbar-inner">
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
          <button className="theme-toggle" onClick={onToggleTheme} type="button">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button className="btn btn-danger" onClick={onLogout} type="button">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
