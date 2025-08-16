
import logo1 from '../logo1.jpg';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
export default function Header() {

  // Add these 3 simple functions to your existing header component
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

const toggleSidebar = () => {
  setIsSidebarOpen(!isSidebarOpen);
};

const closeSidebar = () => {
  setIsSidebarOpen(false);
};

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
   const updateLoginStatus = () => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  };
          console.log("isLoggedIn", isLoggedIn);
  window.addEventListener("storage", updateLoginStatus);
  window.addEventListener("loginStatusChanged", updateLoginStatus); 
  return () => {
    window.removeEventListener("storage", updateLoginStatus);
    window.removeEventListener("loginStatusChanged", updateLoginStatus);
  };
  }, [isLoggedIn]);

const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;


    navigate(`/search?q=${encodeURIComponent(query)}`);
    setQuery('');
    console.log(isLoggedIn);

  }
  const handleWatchListButton=(e)=>{
       
    const token = localStorage.getItem('token');
    if(!token){
      window.location.href='/login';

    }
    else{
      window.location.href='/watchlist';
    }

  }
  const handleLogout = (e) => {
  e.preventDefault();
  localStorage.removeItem('token');
  setIsLoggedIn(false);
  window.dispatchEvent(new Event("loginStatusChanged"));
  window.location.href='/';
};

return (
  <div className="header-container">
    <div className="header">
      {/* Hamburger Menu - Mobile only (LEFT SIDE) */}
      <button 
        className="hamburger-menu"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {/* Logo and Title - Always visible */}
      <h1 className="header-title">
        <img src={logo1} alt="Logo" className="header-logo" /> 
        The MovieDeck
      </h1>
      
      {/* Desktop Navigation - Hidden on mobile */}
      <nav className="nav desktop-nav" role="navigation" aria-label="Main navigation">
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/new-releases" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              New Releases
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/top-rated" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Top Rated
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/popular" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Popular
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Desktop Auth Section - Hidden on mobile */}
      <div className="auth-section desktop-auth">
        <ul className="auth-list">
          {!isLoggedIn && (
            <>
              <li className="auth-item">
                <NavLink to="/login" className="login-button auth-button">
                  Login
                </NavLink>
              </li>
              <li className="auth-item">
                <NavLink to="/signup" className="signup-button auth-button">
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
          {isLoggedIn && (
            <li className="auth-item">
              <NavLink 
                to="/" 
                className="logout-button auth-button" 
                onClick={handleLogout}
              >
                Log out
              </NavLink>
            </li>
          )}
          <li className="auth-item watchlist-item" onClick={handleWatchListButton}>
            <button className="watchlist-button" type="button">
              Watch List
            </button>
          </li>
        </ul>
      </div>

      {/* Desktop Search - Hidden on mobile */}
      <div className="search-section desktop-search">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            className="search-input"
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search for movies"
          />
          <button className="search-button" type="submit" aria-label="Search">
            Search
          </button>
        </form>
      </div>
    </div>

    {/* Sidebar Overlay - Mobile only */}
    <div 
      className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} 
      onClick={closeSidebar}
    >
      <div 
        className={`sidebar ${isSidebarOpen ? 'active' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button className="close-sidebar" onClick={closeSidebar} aria-label="Close menu">
          ×
        </button>
        
        {/* Mobile Navigation */}
        <nav className="mobile-nav" role="navigation" aria-label="Mobile navigation">
          <ul className="mobile-nav-list">
            <li className="mobile-nav-item">
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'}
                onClick={closeSidebar}
              >
                Home
              </NavLink>
            </li>
            <li className="mobile-nav-item">
              <NavLink 
                to="/new-releases" 
                className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'}
                onClick={closeSidebar}
              >
                New Releases
              </NavLink>
            </li>
            <li className="mobile-nav-item">
              <NavLink 
                to="/top-rated" 
                className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'}
                onClick={closeSidebar}
              >
                Top Rated
              </NavLink>
            </li>
            <li className="mobile-nav-item">
              <NavLink 
                to="/popular" 
                className={({ isActive }) => isActive ? 'mobile-nav-link active' : 'mobile-nav-link'}
                onClick={closeSidebar}
              >
                Popular
              </NavLink>
            </li>
          </ul>
        </nav>
        
        {/* Mobile Search */}
        <div className="mobile-search">
          <h3 className="mobile-section-title">Search</h3>
          <form className="mobile-search-form" onSubmit={handleSubmit}>
            <input
              className="mobile-search-input"
              type="text"
              placeholder="Search for a movie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search for movies"
            />
            <button className="mobile-search-button" type="submit" aria-label="Search">
              Search
            </button>
          </form>
        </div>
        
        {/* Mobile Auth */}
        <div className="mobile-auth">
          <h3 className="mobile-section-title">Account</h3>
          <ul className="mobile-auth-list">
            {!isLoggedIn && (
              <>
                <li className="mobile-auth-item">
                  <NavLink 
                    to="/login" 
                    className="mobile-login-button mobile-auth-button"
                    onClick={closeSidebar}
                  >
                    Login
                  </NavLink>
                </li>
                <li className="mobile-auth-item">
                  <NavLink 
                    to="/signup" 
                    className="mobile-signup-button mobile-auth-button"
                    onClick={closeSidebar}
                  >
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
            {isLoggedIn && (
              <li className="mobile-auth-item">
                <NavLink 
                  to="/" 
                  className="mobile-logout-button mobile-auth-button" 
                  onClick={(e) => {
                    handleLogout(e);
                    closeSidebar();
                  }}
                >
                  Log out
                </NavLink>
              </li>
            )}
            <li className="mobile-auth-item">
              <button 
                className="mobile-watchlist-button mobile-auth-button" 
                type="button"
                onClick={() => {
                  handleWatchListButton();
                  closeSidebar();
                }}
              >
                Watch List
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);
}
      