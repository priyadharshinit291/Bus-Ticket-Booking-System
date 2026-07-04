import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

// Top navigation bar shown on every page
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Track the logged-in user (dummy auth via Local Storage, no backend)
  const [currentUser, setCurrentUser] = useState(null);

  // Re-check login state whenever the route changes (e.g. after login/logout)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(user);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow-sm">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          🚌 QuickRide
        </NavLink>

        {/* Hamburger toggle for mobile view */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-2 align-items-lg-center">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => "nav-link" + (isActive ? " fw-bold text-white" : "")}
                to="/"
                end
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => "nav-link" + (isActive ? " fw-bold text-white" : "")}
                to="/search-results"
              >
                Search Buses
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => "nav-link" + (isActive ? " fw-bold text-white" : "")}
                to="/my-bookings"
              >
                My Bookings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => "nav-link" + (isActive ? " fw-bold text-white" : "")}
                to="/contact"
              >
                Contact
              </NavLink>
            </li>

            {/* Show Login link if logged out, or user name + Logout button if logged in */}
            {currentUser ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-white-50">👤 {currentUser.name}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light btn-sm ms-lg-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <NavLink to="/login" className="btn btn-light btn-sm ms-lg-2 fw-semibold">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
