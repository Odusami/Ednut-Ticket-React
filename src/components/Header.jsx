import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const toggleRef = useRef(null);

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !toggleRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menu whenever a nav link is clicked
  const handleNavLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <header className="header" data-testid="header">
      <div className="container">
        <div className="header-content">
          <h2 to="/" className="logo" data-testid="logo">
            Ednut Ticket
          </h2>

          <nav
            ref={navRef}
            className={`nav ${isMobileMenuOpen ? "nav--open" : ""}`}
          >
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={handleNavLinkClick}
                  className={`nav-link ${
                    isActive("/dashboard") ? "active" : ""
                  }`}
                  data-testid="nav-dashboard"
                >
                  Dashboard
                </Link>
                <Link
                  to="/tickets"
                  onClick={handleNavLinkClick}
                  className={`nav-link ${isActive("/tickets") ? "active" : ""}`}
                  data-testid="nav-tickets"
                >
                  Tickets
                </Link>
                <div className="user-menu">
                  <span title={user?.name} data-testid="user-greeting">{user?.firstLetter}</span>
                  <button
                    onClick={handleLogout}
                    className="btn btn--secondary"
                    data-testid="logout-btn"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/auth" className="nav-link" data-testid="nav-auth">
                  Login
                </Link>
                <Link
                  to="/auth"
                  className="btn btn--primary"
                  data-testid="nav-get-started"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>

          <button
            ref={toggleRef}
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
