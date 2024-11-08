import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import logo from '../../img/logo.png'; // Import the logo image
import '../../Styles/Navbar.css'; // Ensure the path to your CSS file is correct

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const onLogOut = () => {
    logout();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const authLinks = (
    <Fragment>
      <li className="user-greeting">Hello, {user && user.name}!</li>
      <li>
        <button onClick={onLogOut} className="sign-out-button">Sign Out</button>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      {/* Registration button removed */}
    </Fragment>
  );

  return (
    <nav className="navbar">
      <div className='nav-wrapper'>
        <Link to='/' className='brand-logo left' style={{ display: 'flex', alignItems: 'center' }}>
          <div className="logo-container">
            <img 
              src={logo} 
              alt='Memory Logo' 
              className='logo' 
              onError={(e) => { e.target.onerror = null; e.target.src = 'path/to/placeholder.png'; }} 
            />
          </div>
          <span className="logo-text">Banana Brain Busters</span>
        </Link>
        
        <ul id='nav-mobile' className={`right ${isMobileMenuOpen ? 'open' : ''}`}>
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
