import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBusAlt, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../Context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="wf-navbar">
      <div className="container d-flex align-items-center justify-content-between">
        <Link to="/" className="wf-brand">
          <FaBusAlt className="text-amber" />
          Wayfare<span className="dot">.</span>
        </Link>
        <div className="d-none d-md-flex align-items-center">
          <NavLink to="/" end className="wf-nav-link">Search</NavLink>
          <NavLink to="/my-tickets" className="wf-nav-link">My Tickets</NavLink>
          <a href="#help" className="wf-nav-link">Help</a>
        </div>

        {user ? (
          <div className="d-flex align-items-center gap-3">
            <span className="d-none d-sm-flex align-items-center gap-2" style={{ color: '#fff', fontSize: '0.9rem' }}>
              <FaUserCircle className="text-amber fs-5" />
              {user.name.split(' ')[0]}
            </span>
            <button
              className="btn-outline-line"
              style={{ borderColor: '#fff', color: '#fff' }}
              onClick={handleLogout}
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="d-flex align-items-center gap-2">
            <Link to="/login" className="wf-nav-link d-none d-sm-inline">Sign In</Link>
            <Link to="/signup" className="btn-outline-line" style={{ borderColor: '#fff', color: '#fff' }}>
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
